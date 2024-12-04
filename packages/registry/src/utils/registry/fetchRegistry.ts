import handleError from "../error/handle-error";
import { logger } from "../logging/logger";
import { registryIndexSchema } from "./schema";

const REGISTRY_URL = 'http://localhost:3000/registry'

export const getRegistryIndex = async () => {
    try{
        const result = await fetchRegistry('index.json');
    return registryIndexSchema.parse(result);
    } catch(e) {
        logger.error("\n");
        handleError(e);
    }
}

const fetchRegistry = async (path: string) => {
    try {
        const result = await fetch(getRegistryUrl(path));
        if (!result.ok) {
            throw new Error(`Failed to fetch registry: ${result.statusText}`)
        }
        return result.json();
    } catch(e) {
        logger.error("\n");
        handleError(e);
        return null;
    }

}


const getRegistryUrl = (path: string) => {
    return `${REGISTRY_URL}/${path}`
}