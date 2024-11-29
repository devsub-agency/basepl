#!/usr/bin/env node

import packageJson from '../package.json';
import {Command} from "commander";

async function main() {
  console.log(`Hello, world! This is ${packageJson.name} v${packageJson.version}`);

    const program = new Command()
        .name("payloadbase")
        .description("add fields and blocks to your payload cms project")
        .version(
            packageJson.version || "1.0.0",
            "-v, --version",
            "display the version number"
        )
}

main()