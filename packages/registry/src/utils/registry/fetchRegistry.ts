import path from "path";
import handleError from "../error/handle-error";
import { logger } from "../logging/logger";
import { registryIndexSchema } from "./schema";

const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://basepl.com/registry";

export const getRegistryIndex = async () => {
  try {
    const result = await fetchRegistry("index.json");
    return registryIndexSchema.parse(result);
  } catch (e) {
    logger.error("\n");
    handleError(e);
  }
};

export const fetchRegistry = async (path: string) => {
  try {
    const result = await fetch(getRegistryUrl(path));
    if (!result.ok) {
      throw new Error(`Failed to fetch registry: ${result.statusText}`);
    }
    return result.json();
  } catch (e) {
    logger.error("\n");
    handleError(e);
    return null;
  }
};

const getRegistryUrl = (path: string) => {
  if (!path.endsWith(".json")) {
    path = replaceExtensionWithJson(path);
  }
  return `${REGISTRY_URL}/${path}`;
};

const replaceExtensionWithJson = (filePath: string): string => {
  if (filePath.endsWith(".json")) return filePath;

  const parsedPath = path.parse(filePath);
  return path.format({
    ...parsedPath,
    base: undefined,
    ext: ".json",
  });
};
