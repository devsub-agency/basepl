import { promisify } from "util";
import { exec } from "child_process";

const fieldDependenciesRegEx = "@/registry/fields/[^']*";

const execAsync = promisify(exec);

const dependencyChecker = async (fieldPath: string) => {
  const { stdout } = await execAsync(
    `grep -oP ${fieldDependenciesRegEx} ${fieldPath}`,
  );
  return stdout.split("\n").filter((dep: string) => dep !== "");
};
