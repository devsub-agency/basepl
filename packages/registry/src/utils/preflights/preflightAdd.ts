import {addOptionsSchema} from "../../commands/add";
import * as ERRORS from "../error/errors";
import {z} from "zod";
import fs from "fs-extra";
import path from "path";
import { logger } from "../logging/logger";

export const preFlightAdd = (options: z.infer<typeof addOptionsSchema>) => {
    if (!fs.existsSync(options.cwd) || !fs.existsSync(path.resolve(options.cwd, "package.json"))) {
        logger.error("Target project does not exist or is not a valid Payload project");
        process.exit(0);
    }
}