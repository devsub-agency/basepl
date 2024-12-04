import path from "path";
import { getPackageManager } from "../getPackageManager";
import { RegistryItem } from "../registry/schema";
import { spinner } from "../spinner";
import fse from "fs-extra";
import { type PackageJson } from "type-fest"
import { logger } from "../logging/logger";
import prompts from "prompts";
import { execa } from "execa";

export const addDependencies = async (cwd: string, dependencies: RegistryItem["dependencies"]) => {
    if (!dependencies?.length) {
        return
    }
    const dependenciesSpinner = spinner(`Installing dependencies.`).start();
    const packageManager = await getPackageManager({ options: null, projectDir: cwd });
    let flag = ""
    if (isUsingReact19(cwd) && packageManager === "npm") {
        dependenciesSpinner.stopAndPersist();
        logger.warn(
            "\nIt looks like you are using React 19. \nSome packages may fail to install due to peer dependency issues in npm (see https://ui.shadcn.com/react-19).\n"
        )
        const confirmation = await prompts([
            {
                type: "select",
                name: "flag",
                message: "How would you like to proceed?",
                choices: [
                    { title: "Use --force", value: "force" },
                    { title: "Use --legacy-peer-deps", value: "legacy-peer-deps" },
                ],
            },
        ])

        if (confirmation) {
            flag = confirmation.flag
        }
    }
    dependenciesSpinner?.start();
    await execa(
        packageManager,
        [
            packageManager === "npm" ? "install" : "add",
            ...(packageManager === "npm" && flag ? [`--${flag}`] : []),
            ...dependencies,
        ],
        {
            cwd: cwd,
        }
    )
    dependenciesSpinner?.succeed()
};

const isUsingReact19 = (cwd: string) => {
    const packageJsonPath = path.join(cwd, "package.json")
    const packageJson = fse.readJSONSync(packageJsonPath, { throws: true }) as PackageJson

    if (!packageJson?.dependencies?.react) {
        return false
    }

    return /^(?:\^|~)?19(?:\.\d+)*(?:-.*)?$/.test(packageJson.dependencies.react)
} 