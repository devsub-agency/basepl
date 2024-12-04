import { addOptionsSchema } from '@/src/commands/add';
import { z } from 'zod';
import { logger } from '../logging/logger';
import { filterRequestedComponents } from '../registry/componentsFilter';
import { getRegistryIndex } from '../registry/fetchRegistry';
import { resolveRegistryDependencies } from '../registry/resolveRegistryDependencies';
import { addDependencies } from './addDependencies';
import { addFiles } from './addFiles';

export const addComponents = async (components: string[], options: z.infer<typeof addOptionsSchema>) => {
    const registryInfo = await getRegistryIndex();
    if (!registryInfo) {
        logger.error("Failed to fetch registry");
        process.exit(1);
    }

    const { found, notFound } = filterRequestedComponents(registryInfo, components);

    if (notFound.length > 0) {
        logger.warn(`Components not found in registry: ${notFound.join(', ')}`);

        if (found.length === 0) {
            logger.error('No valid components to install');
            process.exit(1);
        }
    }

    const itemsToRegister = await resolveRegistryDependencies(found, registryInfo);

    await addDependencies(options.cwd, itemsToRegister.flatMap(item => item.dependencies?.filter((dep): dep is string => dep !== undefined) ?? []));
    await addFiles({ cwd: options.cwd, overwrite: options.overwrite }, itemsToRegister.flatMap(item => item.files));
}
