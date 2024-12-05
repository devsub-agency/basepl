// scripts/build-registry.ts
import { z } from 'zod'
import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import { 
  registryFileSchemaType, 
  registryItemSchema,
  registryIndexSchema, 
  registryIndexItem 
} from '../templates/schema'

type RegistryIndexType = z.infer<typeof registryIndexItem>
type RegistryItemType = z.infer<typeof registryItemSchema>

//TODO automaticly parse dependencies from content
async function buildRegistry() {
  const templatesDir = path.join(process.cwd(), 'templates')
  const publicDir = path.join(process.cwd(), 'public/registry')
  
  await fs.ensureDir(publicDir)
  
  const files = await glob('**/*.{ts,tsx}', {
    cwd: templatesDir
  })
  
  const registryIndex: RegistryIndexType[] = []
  
  for (const file of files) {
    if (file.includes('schema.ts')) continue
    
    const [type, name, ...rest] = file.split('/')
    const componentName = name
    const filePath = path.join(templatesDir, file)
    const content = await fs.readFile(filePath, 'utf-8')
    const registryType = `templates/${type}` as z.infer<typeof registryFileSchemaType>
    
    // Find or create registry index item
    let indexItem = registryIndex.find(i => i.name === componentName)
    if (!indexItem) {
      indexItem = {
        name: componentName,
        type: registryType,
        dependencies: [], // TODO: Parse from content
        registryDependencies: [], // TODO: Parse from content
        files: []
      }
      registryIndex.push(indexItem)
    }
    
    // Add file to index (without content)
    indexItem.files.push({
      path: file,
      type: registryType
    })
    
    // Create individual file with content
    const registryItem: RegistryItemType = {
      name: componentName,
      type: registryType,
      files: [{
        path: file,
        type: registryType,
        content
      }]
    }
    
    // Write individual JSON file
    const targetPath = path.join(
      publicDir,
      type,
      name,
      `${path.parse(file).name}.json`
    )
    await fs.ensureDir(path.dirname(targetPath))
    await fs.writeJson(targetPath, registryItem, { spaces: 2 })
  }
  
  // Validate and write index.json
  const validatedIndex = registryIndexSchema.parse(registryIndex)
  await fs.writeJson(
    path.join(publicDir, 'index.json'),
    validatedIndex,
    { spaces: 2 }
  )
}

buildRegistry().catch(console.error)