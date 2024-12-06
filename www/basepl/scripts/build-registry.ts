import { z } from 'zod'
import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import { registryFileSchemaType } from 'templates/schema';

function parseRegistryDependencies(content: string): string[] {
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]\.\.\/([^/'"\s]+)/g;
  const deps = new Set<string>();
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const componentPath = match[2];
    if (componentPath) {
      deps.add(componentPath);
    }
  }
  
  return Array.from(deps);
}

//TODO notice external dependencies automatically
async function buildRegistry() {
  const templatesDir = path.join(process.cwd(), 'templates')
  const publicDir = path.join(process.cwd(), 'public/registry')
  
  await fs.ensureDir(publicDir)
  
  const files = await glob('**/*.{ts,tsx}', {
    cwd: templatesDir
  })
  
  // Group files by component name
  const components = new Map<string, {
    name: string;
    type: string;
    files: any[];
    registryDependencies: Set<string>;
  }>();
  
  for (const file of files) {
    if (file.includes('schema.ts')) continue;
    
    const [type, name, filename] = file.split('/')
    const filePath = path.join(templatesDir, file)
    const content = await fs.readFile(filePath, 'utf-8')
    const registryType = `templates/${type}` as z.infer<typeof registryFileSchemaType>
    
    // Get or create component group
    let component = components.get(name);
    if (!component) {
      component = {
        name,
        type: registryType,
        files: [],
        registryDependencies: new Set()
      };
      components.set(name, component);
    }
    
    // Add file to component
    component.files.push({
      path: file,
      type: registryType
    });
    
    // Parse and add dependencies
    const deps = parseRegistryDependencies(content);
    deps.forEach(dep => component.registryDependencies.add(dep));
    
    // Write individual file
    const registryItem = {
      name: path.parse(filename).name,
      type: registryType,
      files: {
        path: file,
        type: registryType,
        content
      }
    };
    
    const targetPath = path.join(
      publicDir, 
      type,
      name,
      `${path.parse(filename).name}.json`
    );
    
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeJson(targetPath, registryItem, { spaces: 2 });
  }
  
  // Create index with dependencies
  const registryIndex = Array.from(components.values()).map(component => ({
    name: component.name,
    type: component.type,
    files: component.files,
    registryDependencies: Array.from(component.registryDependencies)
  }));
  
  await fs.writeJson(
    path.join(publicDir, 'index.json'),
    registryIndex,
    { spaces: 2 }
  );
}

buildRegistry().catch(console.error);