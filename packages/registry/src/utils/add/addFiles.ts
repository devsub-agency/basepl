import path, { basename } from "path";
import { RegistryFile, RegistryItem } from "../registry/schema";
import { spinner } from "../spinner";
import { existsSync } from "fs-extra";
import prompts from "prompts";
import { logger, loggingColor } from "../logging/logger";
import fs from "fs-extra";
import handleError from "../error/handle-error";

export const addFiles = async (options: { cwd: string, overwrite?: boolean }, files: RegistryItem["files"]) => {
    if (!files?.length) {
        return
    }

    const filesCreated = []
    const filesUpdated = []
    const filesSkipped = []

    const filesCreatedSpinner = spinner(`Updating files.`).start();
    for (const file of files) {
        const targetDir = getFileTargetDir(file);
        const fileName = basename(file.path);
        const targetPath = path.join(targetDir, fileName);
        const existingFile = existsSync(targetPath);

        if (existingFile && !options.overwrite) {
            filesCreatedSpinner.stop()
            const { overwrite } = await prompts({
                type: "confirm",
                name: "overwrite",
                message: `The file ${loggingColor.info(
                    fileName
                )} already exists. Would you like to overwrite?`,
                initial: false,
            })

            if (!overwrite) {
                filesSkipped.push(path.relative(options.cwd, targetPath))
                continue
            }
            filesCreatedSpinner?.start()
        }

        if (!existsSync(targetDir)) {
            await fs.mkdir(targetDir, { recursive: true })
        }
        const content = await getFileContent(file)
        await fs.writeFile(targetPath, content, "utf-8")
        existingFile
            ? filesUpdated.push(path.relative(options.cwd, targetPath))
            : filesCreated.push(path.relative(options.cwd, targetPath))

    };
}

const getFileTargetDir = (file: RegistryFile) => {
    const targetPath = "";
    if (file.type === "templates/fields") {
        targetPath + "/fields";
    }
    if (file.type === "templates/blocks") {
        targetPath + "/blocks";
    }
    if (file.type === "templates/components") {
        targetPath + "/components";
    }
    const componentName = file.path.split('/')[1];
    return `${targetPath}/${componentName}`;
}

const getFileContent = async (file: RegistryFile): Promise<string> => {
    try {
        const templatePath = path.join(
            process.cwd(),
            'packages',
            'registry',
            'src',
            'templates',
            file.path
        )

        // Read file content
        const content = await fs.readFile(templatePath, 'utf-8')
        return content
    } catch (error) {
        logger.error(`Failed to read file content for ${file.path} from registry. Please try again. If this error please open an issue on GitHub.`)
        handleError(error)
        return ""
    }
}