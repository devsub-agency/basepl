import glob from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';

function parseRegistryDependencies(content: string): string[] {
  const importPatterns = [
    {
      pattern: /import\s*{\s*([^}]+)\s*}\s*from\s*["']@\/fields\/([^'"]+)["']/g,
      groupIndex: 2
    },
    {
      pattern: /import\s*{\s*([^}]+)\s*}\s*from\s*["']\.\.\/([^/]+)\/config["']/g,
      groupIndex: 2
    },
    {
      pattern: /import\s*{\s*([^}]+)\s*}\s*from\s*["']\.\/([^/]+)["']/g,
      groupIndex: 2
    }
  ];
  
  const deps = new Set<string>();
  
  for (const {pattern, groupIndex} of importPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const componentName = match[groupIndex];
      if (componentName) {
        deps.add(componentName);
      }
    }
  }
  
  return Array.from(deps);
}

async function processFiles(files: string[], baseDir: string, components: Map<string, any>, publicDir: string, isBlock: boolean) {
  for (const file of files) {
    if (file.includes('schema.ts') || file.includes('index.ts')) continue;

    const pathParts = file.split('/')
    const type = isBlock ? 'blocks' : 'fields'

    // For blocks: first part is component name, last part is filename
    const name = isBlock ? pathParts[0] : path.parse(file).name
    const filename = path.parse(pathParts[pathParts.length - 1]).name

    const filePath = path.join(baseDir, file)
    const content = await fs.readFile(filePath, 'utf-8')
    const registryType = `templates/${type}`

    // Rest of component handling remains the same
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

    component.files.push({
      path: file,
      type: registryType
    });

    const deps = parseRegistryDependencies(content);
    deps.forEach(dep => component.registryDependencies.add(dep));

    const registryItem = {
      name: filename,
      type: registryType,
      files: {
        path: file,
        type: registryType,
        content
      }
    };

    const targetPath = isBlock
      ? path.join(publicDir, type, name, `${filename}.json`)
      : path.join(publicDir, type, `${filename}.json`);

    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeJson(targetPath, registryItem, { spaces: 2 });
  }
}

async function buildRegistry() {
  const blocksDir = path.join(process.cwd(), 'src/blocks')
  const fieldsDir = path.join(process.cwd(), 'src/fields')
  const publicDir = path.join(process.cwd(), 'public/registry')

  await fs.ensureDir(publicDir)

  const blocks = await glob('*/*.{ts,tsx}', {
    cwd: blocksDir
  })

  //TODO fix this
  const fields = await glob('*.ts', {
    cwd: fieldsDir
  })

  const components = new Map<string, {
    name: string;
    type: string;
    files: any[];
    registryDependencies: Set<string>;
  }>();

  await processFiles(blocks, blocksDir, components, publicDir, true)
  await processFiles(fields, fieldsDir, components, publicDir, false)

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