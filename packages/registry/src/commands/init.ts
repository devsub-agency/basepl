import { Command } from "commander";
import path from "path";
import prompts from "prompts";
import { z } from "zod";
import { CONFIG_FILE, createConfig, defaultConfig } from "../utils/config/configHandler";
import handleError from "../utils/error/handle-error";
import { getPackageManager } from "../utils/getPackageManager";
import { initShadcn } from "../utils/initShadcn";
import { logger, loggingColor } from "../utils/logging/logger";
import { checkProjectSetUp, checkShadcnPresents, getPayloadAppDetails } from "../utils/preflights/preflightInit";
import { spinner } from "../utils/spinner";

export const initOptionSchema = z.object({
    cwd: z.string(),
    yes: z.boolean(),
    defaults: z.boolean(),
    npm: z.boolean().optional(),
    bun: z.boolean().optional(),
    yarn: z.boolean().optional(),
    pnpm: z.boolean().optional(),
    config: z.boolean().optional(),
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
    .option("--npm,", "use npm to install dependencies", false)
    .option("--bun,", "use bun to install dependencies", false)
    .option("--yarn,", "use yarn to install dependencies", false)
    .option("--pnpm,", "use pnpm to install dependencies", false)
    .option("--config,", `initialize in config only mode, not components can be installed.`, false)
    .action(async (o) => {
        try {
            const options = initOptionSchema.parse(o);
            const payloadCheckSpinner = spinner('Checking project setup.').start();
            const isPayloadPresents = await checkProjectSetUp(options.cwd);
            let isShadcnPresentInitialized = false;
            if (!isPayloadPresents) {
                payloadCheckSpinner.fail();
                logger.error('Payload is not present in the project.');
                logger.warn(`Please init the project with payload first. Use ${loggingColor.success('\'npx create-payload-app\'')} or check out the official payload documentation.`);
                process.exit(0);
            }
            payloadCheckSpinner.succeed();
            const appDetails = await getPayloadAppDetails(options.cwd);
            if (!appDetails.isSupportedPayloadVersion) {
                process.exit(0);
            }
            if (!options.config) {
                const packageManager = await getPackageManager({ options, projectDir: options.cwd });
                const isShadcnPresents = await checkShadcnPresents(options.cwd);
                if (isShadcnPresents) {
                    isShadcnPresentInitialized = true;
                    logger.info('Shadcn is already present in the project.');
                } else {
                    logger.info('Shadcn is not present in the project.');
                    if (!options.yes) {
                        const { proceed } = await prompts({
                            type: 'confirm',
                            name: 'proceed',
                            message: 'Do you want to install shadcn/ui in the project? If not, you wont be able to install components, only config files.',
                            initial: true
                        })
    
                        if (proceed) {
                             await initShadcn({ cwd: options.cwd, packageManager });
                             isShadcnPresentInitialized = true;
                        } else {
                            logger.info('Initialize in config only mode. No components will be installed.');
                        }
                    }
                }
            } else {
                logger.info('Initialize in config only mode. No components will be installed.');
            }
        
            if (!options.yes) {
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
            await createConfig(options.cwd, { ...defaultConfig, shadcnInstalled: isShadcnPresentInitialized });
            componentSpinner.succeed();

            logger.success('Project is ready to install components!')
            logger.info(`Use ${loggingColor.success('\'add <component>\'')} to install components. For a list of available components and for further information check the documentation.`);
        } catch (e) {
            logger.break();
            handleError(e);
        }
    }
    )

