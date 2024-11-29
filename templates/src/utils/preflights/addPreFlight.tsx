import {addOptionsSchema} from "../../commands/add";
import * as ERRORS from "../error/errors";
import {z} from "zod";
import fs from "fs-extra";


const preFlightAdd = (options: z.infer<typeof addOptionsSchema>) => {
    const errors: Record<string, boolean> = {}

    if (!fs.existsSync(options.cwd)) {
        errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
        return {
            errors,
            config: null,
        }
    }
}