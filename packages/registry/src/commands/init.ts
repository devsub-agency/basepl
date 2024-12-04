import { Command } from "commander";
import { z } from "zod";
import { logger, loggingColor } from "../utils/logging/logger";
import handleError from "../utils/error/handle-error";
import { get } from "http";
import { checkProjectSetUp, checkShadcnPresents, getPayloadAppDetails } from "../utils/preflights/preflightInit";
import { getPackageManager } from "../utils/getPackageManager";
import prompts from "prompts";
import { initShadcn } from "../utils/initShadcn";
import { spinner } from "../utils/spinner";
import { CONFIG_FILE, createConfig, defaultConfig } from "../utils/config/configHandler";
import path from "path";
import { write } from "fs";

export const initOptionSchema = z.object({
    cwd: z.string(),
    yes: z.boolean(),
    defaults: z.boolean(),
    nodeps: z.boolean(),
    npm: z.boolean(),
    bun: z.boolean(),
    yarn: z.boolean(),
    pnpm: z.boolean(),
})


export const init = new Command()
    .name("init")
    .description("Initialize your project and install dependencies.")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-y, --yes", "skip confirmation prompt.", true)
    .option("-d, --defaults,", "use default configuration.", false)
    .option("--no-deps,", "do not install any dependencies", false)
    .option("--use-npm,", "use npm to install dependencies", false)
    .action(async (o) => {
        try {
            const options = initOptionSchema.parse(o);
            const isPayloadPresents = await checkProjectSetUp(options.cwd);
            if (!isPayloadPresents) {
                logger.error('Payload is not present in the project.');
                logger.warn(`Please init the project with payload first. Use ${loggingColor.success('\'npx create-payload-app\'')} or check out the official payload documentation.`);
                process.exit(0);
            }
            const appDetails = await getPayloadAppDetails(options.cwd);
            if (!appDetails.isSupportedPayloadVersion) {
                process.exit(0);
            }
            const packageManager = await getPackageManager({ options, projectDir: options.cwd });
            const isShadcnPresents = await checkShadcnPresents(options.cwd);
            if (isShadcnPresents) {
                logger.info('Shadcn is already present in the project.');
            } else {
                logger.info('Shadcn is not present in the project.');
                if (!options.yes) {
                    const { proceed } = await prompts({
                        type: 'confirm',
                        name: 'proceed',
                        message: 'Do you want to install shadcn/ui in the project?',
                        initial: true
                    })

                    if (!proceed) {
                        process.exit(0);
                    }
                }
                await initShadcn({ cwd: options.cwd, packageManager });
            }

            if(!options.yes) {
                const { proceed } = await prompts({
                    type: "confirm",
                    name: "proceed",
                    message: `Write configuration to ${loggingColor.info(
                        `${CONFIG_FILE}`
                    )}. Proceed?`,
                    initial: true,
                  })
              
                  if (!proceed) {
                    process.exit(0)
                  }
            }

            const componentSpinner = spinner(`Writing ${CONFIG_FILE}.`).start();
            const targetPath = path.resolve(options.cwd, CONFIG_FILE);
            await createConfig(targetPath, { ...defaultConfig, shadcnInstalled: true });
            componentSpinner.succeed();

            logger.success('Project is ready to install components!')
            logger.info(`Use ${loggingColor.success('\'npx payloadbase@latest add <component>\'')} to install components. For a list of available components and for further information check the documentation.`);
        } catch (e) {
            logger.break();
            handleError(e);
        }
    }
)

