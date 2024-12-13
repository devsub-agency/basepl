import {addOptionsSchema} from "../../commands/add";
import {z} from "zod";
import {existsSync} from 'fs'
import path from "path";
import { logger } from "../logging/logger";

export const preFlightAdd = (options: z.infer<typeof addOptionsSchema>) => {
    console.log(path.resolve(options.cwd, "package.json"))
    if (!existsSync(options.cwd) || !existsSync(path.resolve(options.cwd, "package.json"))) {
        logger.error("Target project does not exist or is not a valid Payload project");
        process.exit(0);
    }
}