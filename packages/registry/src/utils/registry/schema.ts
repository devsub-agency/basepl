import { z } from 'zod';

export const registryFileSchemaType = z.enum([
    "templates/fields",
    "templates/blocks",
    "templates/components",
])

export const registryItemFileSchema = z.object({
    path: z.string(),
    content: z.string().optional(),
    type: registryFileSchemaType,
  })


  /**
   * In the index.json we list every file contained in a folder. The representation of files is always a folder in the registry.
   * When we fetch the content from the registry these files are all seperated as individual items. The structure is the same as later in the project. 
   */
  export const registryItemSchema = z.object({
    name: z.string(),
    type: registryFileSchemaType,
    file: registryItemFileSchema
})

export const registryIndexFileItem = z.object({
    path: z.string(),
    type: registryFileSchemaType,
})

export const registryIndexItem = z.object({
    name: z.string(),
    type: registryFileSchemaType,
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(registryIndexFileItem)
})
export type RegistryFile = z.infer<typeof registryIndexFileItem>

export type RegistryItem = z.infer<typeof registryIndexItem>

export const registryIndexSchema = z.array(registryIndexItem);