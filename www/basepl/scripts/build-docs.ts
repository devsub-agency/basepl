import fs from 'fs-extra'
import path from 'path'
import glob from 'fast-glob'
import { IndexFile, RegistryItem } from '@/docs/schema'

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
  console.log('Generating docs index...')
  const rootDir = process.cwd()
  const docsDir = path.join(rootDir, 'src/docs')
  
  await fs.ensureDir(docsDir)

  const fields = await glob('src/fields/*.ts')
  const blocks = await glob('src/blocks/*/*')
  const examples = await glob('src/examples/**/*.tsx')

  const items: Record<string, RegistryItem> = {}

  console.log(`Processing ${fields.length} fields`)
  // Process fields
  for (const field of fields) {
    const name = path.parse(field).name
    items[name] = createRegistryItem(name, processPath(field))
  }

  console.log(`Processing ${blocks.length} blocks`)
  // Process blocks
  for (const block of blocks) {
    const dirs = block.split('/')
    let name = dirs[2]
    if (block.endsWith('.tsx')) {
      name = name + '-Component'
    }
    items[name] = createRegistryItem(name, processPath(block))
  }

  console.log(`Processing ${examples.length} examples`)
  // Process examples
  for (const example of examples) {
    const parts = example.split('/')
    const name = `${parts[parts.length-2]}-${path.parse(parts[parts.length-1]).name}`
    const relativePath = example.replace('src/', '@/')
    items[name] = createRegistryItem(
      name, 
      {
        path: example,
        component: `React.lazy(() => import("${relativePath}"))`
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
    }
  }`).join(',\n')}
};`

  await fs.writeFile(
    path.join(docsDir, 'index.ts'),
    indexContent
  )
  console.log('Docs index generated successfully')
}

generateDocsIndex()
  .catch(console.error)