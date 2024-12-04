#!/usr/bin/env node

import { Command } from "commander";
import packageJson from '../package.json';
import add from './commands/add';
import { init } from './commands/init';

async function main() {
  console.log(`Hello, world! This is ${packageJson.name} v${packageJson.version}`);

  const program = new Command()
    .name("payloadbase")
    .description("add fields and blocks to your payload cms project")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    );

  program.addCommand(add).addCommand(init);
}

main()