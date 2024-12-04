import { z } from 'zod';

export const registryFileSchemaType = z.enum([
    "templates/fields",
    "templates/blocks",
    "templates/components",
])

export const registryFileSchema = z.object({
    path: z.string(),
    type: registryFileSchemaType,
})

export const registryItemSchema = z.object({
    name: z.string(),
    type: registryFileSchemaType,
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(registryFileSchema),
    docs: z.string().optional(),
})
export type RegistryFile = z.infer<typeof registryFileSchema>

export type RegistryItem = z.infer<typeof registryItemSchema>

export const registryIndexSchema = z.array(registryItemSchema);