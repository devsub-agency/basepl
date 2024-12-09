import { initOptionSchema } from "@/src/commands/init";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";
import { z } from "zod";
import { logger } from "../logging/logger";

export type PayloadAppDetails = {
  isSrcDir: boolean;
  isSupportedPayloadVersion: boolean;
  payloadVersion: string | null;
};

const MINIMUM_MAJOR_VERSION = 3;
const SUPPORTED_SPECIAL_VERSIONS = ["latest"];

export async function preFlightInit(
  options: z.infer<typeof initOptionSchema>,
) {}

//Default check for project
export const checkProjectSetUp = async (projectDir: string) => {
  const isPayloadPresents = existsSync(
    path.resolve(projectDir, "src/payload.config.ts"),
  );
  return isPayloadPresents;
};

export const checkShadcnPresents = async (projectDir: string) => {
  const isShadcnPresents = existsSync(
    path.resolve(projectDir, "components.json"),
  );
  return isShadcnPresents;
};

export const getPayloadAppDetails = async (
  projectDir: string,
): Promise<PayloadAppDetails> => {
  const isSrcDir = existsSync(path.resolve(projectDir, "src"));
  const packageObj = await fs.readJson(
    path.resolve(projectDir, "package.json"),
  );
  const payloadVersion = packageObj.dependencies?.payload ?? null;

  if (!payloadVersion) {
    return createPayloadDetails(isSrcDir, false, null);
  }

  const versionMatch = payloadVersion.match(
    /^(?:(?<major>\d+)|(?<special>latest|beta))$/i,
  );

  if (!versionMatch) {
    logger.warn(`Could not determine payload version from ${payloadVersion}`);
    return createPayloadDetails(isSrcDir, false, payloadVersion);
  }

  const { special, major } = versionMatch.groups;
  const isSupported = isVersionSupported(special, major);

  if (!isSupported) {
    logger.warn(
      `Unsupported payload version ${payloadVersion}. Version must be latest or >= ${MINIMUM_MAJOR_VERSION}.0.0`,
    );
  }

  return createPayloadDetails(isSrcDir, isSupported, payloadVersion);
};

const isVersionSupported = (special?: string, major?: string): boolean => {
  if (special) {
    return SUPPORTED_SPECIAL_VERSIONS.includes(special.toLowerCase());
  }
  return major ? parseInt(major) >= MINIMUM_MAJOR_VERSION : false;
};

const createPayloadDetails = (
  isSrcDir: boolean,
  isSupportedPayloadVersion: boolean,
  payloadVersion: string | null,
): PayloadAppDetails => ({
  isSrcDir,
  isSupportedPayloadVersion,
  payloadVersion,
});
