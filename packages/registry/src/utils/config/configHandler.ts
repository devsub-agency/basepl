import path from "path";
import fs from "fs-extra";
import { ConfigFile } from "./configFile";

export const CONFIG_FILE = ".payloadbase.json";

export const createConfig = async (
  cwd: string,
  config: Partial<ConfigFile>,
) => {
  const defaultConfig: ConfigFile = {
    version: "1.0.0",
    initialized: true,
    timestamp: new Date().toISOString(),
    shadcnInstalled: false,
    ...config,
  };
  await fs.writeJSON(path.join(cwd, CONFIG_FILE), defaultConfig, { spaces: 2 });
};

export const getConfig = async (cwd: string): Promise<ConfigFile | null> => {
  try {
    return await fs.readJSON(path.join(cwd, CONFIG_FILE));
  } catch {
    return null;
  }
};

export const checkInitialized = async (cwd: string): Promise<boolean> => {
  const config = await getConfig(cwd);
  return Boolean(config?.initialized);
};

export const defaultConfig: ConfigFile = {
  version: "1.0.0",
  initialized: true,
  timestamp: new Date().toISOString(),
  shadcnInstalled: false,
};
