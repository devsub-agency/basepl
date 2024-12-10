import { red, white, green, yellow } from "kleur/colors";

export const loggingColor = {
  error: red,
  warn: yellow,
  info: white,
  success: green,
};

export const logger = {
  error(...args: unknown[]) {
    console.log(loggingColor.error(args.join(" ")));
  },
  warn(...args: unknown[]) {
    console.log(loggingColor.warn(args.join(" ")));
  },
  info(...args: unknown[]) {
    console.log(loggingColor.info(args.join(" ")));
  },
  success(...args: unknown[]) {
    console.log(loggingColor.success(args.join(" ")));
  },
  log(...args: unknown[]) {
    console.log(args.join(" "));
  },
  break() {
    console.log("");
  },
};
