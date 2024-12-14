import fs from 'fs-extra'
import path from 'path'
import glob from 'fast-glob'
import { RegistryItem, IndexFile } from '../docs/schema'

function processPath(filePath: string): IndexFile {
  return {
    path: filePath,
  }
}

function createRegistryItem(name: string, file: IndexFile): RegistryItem {
  return {
    name,
    file,
  }
}

async function generateDocsIndex() {
  const rootDir = process.cwd()
  const docsDir = path.join(rootDir, 'docs')
  
  await fs.ensureDir(docsDir)

  const fields = await glob('src/fields/*.ts')
  const blocks = await glob('src/blocks/*/*.ts')
  const examples = await glob('examples/**/*.tsx')

  const items: Record<string, RegistryItem> = {}

  // Process fields
  for (const field of fields) {
    const name = path.parse(field).name
    items[name] = createRegistryItem(name, processPath(field))
  }

  // Process blocks
  for (const block of blocks) {
    const dirs = block.split('/')
    const name = dirs[2]
    items[name] = createRegistryItem(name, processPath(block))
  }

  // Process examples
  for (const example of examples) {
    const parts = example.split('/')
    console.log(parts)
    const name = `${parts[parts.length-2]}-${path.parse(parts[parts.length-1]).name}`
    items[name] = createRegistryItem(
      name, 
      {
        path: example,
        component: `React.lazy(() => import("@/${example}"))`
      }
    )
  }

  // Generate TypeScript content
  const indexContent = `//@ts-nocheck
//this file is auto generated do not change it
import React from "react";
import { RegistryItem } from "./schema";

export const Index: Record<string, RegistryItem> = {
${Object.entries(items).map(([key, item]) => `  "${key}": {
    name: "${item.name}",
    file: {
      path: "${item.file.path}"${item.file.component ? `,
      component: ${item.file.component}` : ''}
    },
    registryDependencies: []
  }`).join(',\n')}
};`

  await fs.writeFile(
    path.join(docsDir, 'index.ts'),
    indexContent
  )
}

generateDocsIndex()
  .catch(console.error)