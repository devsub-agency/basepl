import { Command } from "commander";
import { logger } from "../utils/logging/logger";
import fs from "fs-extra";
import path from "path";
import {z} from "zod";

//TODO: options for targetDir, options and check for overwrite, create folder if not exists
//add index.json somewhere with name to path mapping and dependencies to other copmponents
export const addOptionsSchema = z.object({
    components: z.array(z.string()).optional(),
    overwrite: z.boolean(),
    cwd: z.string(),
    path: z.string().optional(),
    silent: z.boolean()
})

const addCommand = new Command("add")
    .description("add fields and blocks to your payload cms project")
    .argument(
        "[components...]",
        "the fields and blocks to add."
    )
    .option("-o, --overwrite", "overwrite existing files.", false)
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-p, --path <path>", "the path to add the component to.")
    .option("-s, --silent", "mute output.", false)
    .action(async (comp, opt) => {
        try {
            const options = addOptionsSchema.parse({
                components: comp,
                cwd: path.resolve(opt.cwd),
                ...opt,
            })
            const fieldsPath = process.env.FIELDS_PATH;
            if (!fieldsPath) {
                logger.error("FIELDS_PATH is not set in the .env file");
                process.exit(1);
            }

            const fieldTemplatePath = path.resolve(__dirname, "../../templates/fields", `${fieldName}.ts`);
            const destinationPath = path.resolve(fieldsPath, `${fieldName}.ts`);

            if (!fs.existsSync(fieldTemplatePath)) {
                logger.error(`Field template ${fieldName} does not exist`);
                process.exit(1);
            }

            await fs.copy(fieldTemplatePath, destinationPath);
            logger.success(`Field ${fieldName} has been added to your project`);
        } catch (error) {
            logger.error("An error occurred while adding the field:", error);
            process.exit(1);
        }
    });

export default addCommand;