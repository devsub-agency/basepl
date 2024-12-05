import { z } from 'zod'

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


  export const registryItemSchema = z.object({
    name: z.string(),
    type: registryFileSchemaType,
    files: z.array(registryItemFileSchema)
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

export const registryIndexSchema = z.array(registryIndexItem);