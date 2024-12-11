import { visit } from 'unist-util-visit'
import { Node } from 'unist'
import { Element, Properties } from 'hast'

interface ComponentConfig {
  name: string
  import: string
}

interface ImportSpecifier {
  type: 'ImportSpecifier'
  imported: { type: 'Identifier'; name: string }
  local: { type: 'Identifier'; name: string }
}

interface ImportData {
  type: 'mdxjsEsm'
  value: string
  data: {
    estree: {
      type: 'Program'
      body: Array<{
        type: 'ImportDeclaration'
        specifiers: ImportSpecifier[]
        source: { type: 'Literal'; value: string }
      }>
    }
  }
}

interface TreeData extends Node {
  data?: {
    imports?: ImportData[]
    [key: string]: unknown
  }
}

const componentMap: Record<string, ComponentConfig> = {
  ComponentPreview: {
    name: 'ComponentPreview',
    import: '@/components/component-preview'
  },
  ConfigPreview: {
    name: 'ConfigPreview',
    import: '@/components/config-preview'
  }
}

export function rehypeComponent() {
  return (tree: TreeData) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'ComponentPreview' ||
        node.tagName === 'ConfigPreview'
      ) {
        const component = componentMap[node.tagName]

        if (!tree.data) {
          tree.data = {}
        }

        if (!tree.data.imports) {
          tree.data.imports = []
        }

        // Add component import
        tree.data.imports.push({
          type: 'mdxjsEsm',
          value: `import { ${component.name} } from "${component.import}"`,
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ImportDeclaration',
                  specifiers: [
                    {
                      type: 'ImportSpecifier',
                      imported: { type: 'Identifier', name: component.name },
                      local: { type: 'Identifier', name: component.name }
                    }
                  ],
                  source: { type: 'Literal', value: component.import }
                }
              ]
            }
          }
        })

        // Transform props
        const props = Object.entries(node.properties || {}).reduce<Properties>(
            (acc, [key, value]) => {
              if (key.startsWith('data-')) {
                const propName = key.replace('data-', '')
                // Ensure value matches Properties type constraints
                if (
                  typeof value === 'string' ||
                  typeof value === 'number' ||
                  typeof value === 'boolean' ||
                  Array.isArray(value) ||
                  value === null ||
                  value === undefined
                ) {
                  acc[propName] = value
                }
              }
              return acc
            },
            {}
          )
        // Update node
        node.properties = props
      }
    })
  }
}
