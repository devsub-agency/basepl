import { Command } from "commander";
import path from "path";
import { z } from "zod";
import { addComponents } from "../utils/add/addComponents";
import { checkInitialized } from "../utils/config/configHandler";
import { logger } from "../utils/logging/logger";
import { preFlightAdd } from "../utils/preflights/preflightAdd";

//TODO: options for targetDir, options and check for overwrite, create folder if not exists
//add index.json somewhere with name to path mapping and dependencies to other copmponents
export const addOptionsSchema = z.object({
    components: z.array(z.string()).optional(),
    yes: z.boolean(),
    overwrite: z.boolean(),
    cwd: z.string(),
    config: z.boolean(),
})

const add = new Command("add")
    .description("add fields and blocks to your payload cms project")
    .argument(
        "[components...]",
        "the fields and blocks to add."
    )
    .option("-y, --yes", "skip confirmation prompt.", true)
    .option("-o, --overwrite", "overwrite existing files.", false)
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("--config", "only add the config.ts without component", false)
    .action(async (comp, opt) => {
        try {
            const options = addOptionsSchema.parse({
                components: comp,
                cwd: path.resolve(opt.cwd),
                ...opt,
            })
            const isInitialized = await checkInitialized(options.cwd);
            if (!isInitialized) {
                logger.error("Project is not initialized. Please run 'payloadbase init' first");
                process.exit(0);
            }

            if (!options.components?.length) {
                logger.error("Provide at least one field or block to install!");
                process.exit(0);
            }
            preFlightAdd(options);

            await addComponents(options.components, options);
        } catch (error) {
            logger.error("An error occurred while adding the field:", error);
            process.exit(1);
        }
    });

export default add;