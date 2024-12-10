import { z } from "zod";
import fse from "fs-extra";
import { execa } from "execa";
import { initOptionSchema } from "../commands/init";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export async function getPackageManager(args: {
  options: z.infer<typeof initOptionSchema> | null;
  projectDir: string;
}): Promise<PackageManager> {
  const { options, projectDir } = args;

  try {
    // Check for flag or lockfile
    let detected: PackageManager = "npm";
    if (options?.pnpm || fse.existsSync(`${projectDir}/pnpm-lock.yaml`)) {
      detected = "pnpm";
    } else if (options?.yarn || fse.existsSync(`${projectDir}/yarn.lock`)) {
      detected = "yarn";
    } else if (
      options?.npm ||
      fse.existsSync(`${projectDir}/package-lock.json`)
    ) {
      detected = "npm";
    } else if (options?.bun || fse.existsSync(`${projectDir}/bun.lockb`)) {
      detected = "bun";
    } else if (await commandExists("pnpm")) {
      // Prefer pnpm if it's installed
      detected = "pnpm";
    }

    return detected;
  } catch (ignore) {
    return "npm";
  }

  async function commandExists(command: string): Promise<boolean> {
    try {
      process.platform === "win32"
        ? await execa`where ${command}`
        : await execa`command -v ${command}`;
      return true;
    } catch {
      return false;
    }
  }
}
