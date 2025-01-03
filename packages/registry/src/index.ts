#!/usr/bin/env node

import { Command } from "commander";
import packageJson from "../package.json";
import add from "./commands/add";
import { init } from "./commands/init";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command()
    .name("basepl")
    .description("add fields and blocks to your payload cms project")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number",
    );

  program.addCommand(add).addCommand(init);

  program.parse();
}

main();
