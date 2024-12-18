import { execa } from "execa";
import { logger } from "./logging/logger";
import { PackageManager } from "./getPackageManager";
import { spinner } from "./spinner";
import handleError from "./error/handle-error";

interface InitShadcnProps {
  cwd: string;
  packageManager: PackageManager;
}

export async function initShadcn({ cwd, packageManager }: InitShadcnProps) {
  try {
    const command =
      packageManager === "npm"
        ? ["npx", "shadcn@latest", "init"]
        : [packageManager, "dlx", "shadcn@latest", "init"];

    await execa(command[0], command.slice(1), {
      cwd,
      stdio: "inherit",
      shell: true,
    });
  } catch (error) {
    handleError(error);
  }
}
