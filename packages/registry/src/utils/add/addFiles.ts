import { existsSync, promises as fs } from "fs";
import path, { basename, dirname } from "path";
import prompts from "prompts";
import handleError from "../error/handle-error";
import { logger, loggingColor } from "../logging/logger";
import { RegistryFile, registryIndexFileItem, registryIndexSchema, RegistryItem, registryItemFileSchema, registryItemSchema } from "../registry/schema";
import { spinner } from "../spinner";
import { fetchRegistry } from "../registry/fetchRegistry";

const getFileTargetDir = (file: RegistryFile, cwd: string) => {
    let basePath = "";
    switch (file.type) {
        case "templates/fields":
            basePath = "fields";
            break;
        case "templates/blocks":
            basePath = "blocks";
            break;
        case "templates/components":
            basePath = "components";
            break;
    }
    return path.join(cwd, "src", basePath);
};

const getFileContent = async (file: RegistryFile): Promise<string> => {
    try {
        logger.info(`\n Reading template: ${file.path}`);
        const result = await fetchRegistry(file.path);
        const t = registryItemSchema.parse(result);
        return t.files[0].content || "";
    } catch (error) {
        logger.error(`Failed to read template: ${file.path}`);
        handleError(error);
        return "";
    }
};

export const addFiles = async (options: { cwd: string, overwrite?: boolean }, files: RegistryItem["files"]) => {
    if (!files?.length) return;

    const filesCreated: string[] = [];
    const filesUpdated: string[] = [];
    const filesSkipped: string[] = [];

    const addFileSpinner = spinner('Adding files change ...').start();

    try {
        for (const file of files) {
            const targetDir = getFileTargetDir(file, options.cwd);
            const fileName = basename(file.path);
            const targetPath = path.join(targetDir, fileName);

            if (existsSync(targetPath) && !options.overwrite) {
                addFileSpinner.stop();
                const { overwrite } = await prompts({
                    type: "confirm",
                    name: "overwrite",
                    message: `File ${loggingColor.info(fileName)} exists. Overwrite?`,
                    initial: false,
                });

                if (!overwrite) {
                    filesSkipped.push(path.relative(options.cwd, targetPath));
                    addFileSpinner.start();
                    continue;
                }
                addFileSpinner.start();
            }

            await fs.mkdir(targetDir, { recursive: true });
            const content = await getFileContent(file);
            await fs.writeFile(targetPath, content, 'utf-8');

            const relativePath = path.relative(options.cwd, targetPath);
            existsSync(targetPath) ? filesUpdated.push(relativePath) : filesCreated.push(relativePath);
        }

        addFileSpinner.succeed('Files added successfully');

        if (filesCreated.length) {
            logger.info('Created files:\n' + filesCreated.map(f => `  ${f}`).join('\n'));
        }
        if (filesUpdated.length) {
            logger.info('Updated files:\n' + filesUpdated.map(f => `  ${f}`).join('\n'));
        }
        if (filesSkipped.length) {
            logger.info('Skipped files:\n' + filesSkipped.map(f => `  ${f}`).join('\n'));
        }
    } catch (error) {
        addFileSpinner.fail('Failed to add files');
        handleError(error);
    }
};