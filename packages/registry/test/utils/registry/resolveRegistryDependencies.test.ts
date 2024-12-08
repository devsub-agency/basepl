import { describe, expect, it } from 'vitest'
import { resolveRegistryDependencies } from '../../../src/utils/registry/resolveRegistryDependencies'
import { RegistryItem } from '../../../src/utils/registry/schema'

describe('resolveRegistryDependencies', () => {
  it('should resolve items with no dependencies', async () => {
    const items: RegistryItem[] = [
      { name: 'Button', dependencies: [], files: [], type: 'templates/components', registryDependencies: [] }
    ]
    const result = await resolveRegistryDependencies(items, items)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Button')
  })

  it('should resolve single dependency correctly', async () => {
    const registry: RegistryItem[] = [
      { name: 'Button', dependencies: [], files: [], type: 'templates/components', registryDependencies: [] },
      { name: 'Form', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['Button'] }
    ]
    const result = await resolveRegistryDependencies([registry[1]], registry)
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Button')
    expect(result[1].name).toBe('Form')
  })

  it('should handle multiple dependencies', async () => {
    const registry: RegistryItem[] = [
      { name: 'Button', dependencies: [], files: [], type: 'templates/fields', registryDependencies: [] },
      { name: 'Input', dependencies: [], files: [], type: 'templates/fields', registryDependencies: [] },
      { name: 'Form', dependencies: [], files: [], type: 'templates/blocks', registryDependencies: ['Button', 'Input'] }
    ]
    const result = await resolveRegistryDependencies([registry[2]], registry)
    expect(result).toHaveLength(3)
    expect(result.map(item => item.name)).toContain('Button')
    expect(result.map(item => item.name)).toContain('Input')
    expect(result[2].name).toBe('Form')
  })

  it('should handle circular dependencies', async () => {
    const registry: RegistryItem[] = [
      { name: 'A', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['B'] },
      { name: 'B', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['A'] }
    ]
    const result = await resolveRegistryDependencies([registry[0]], registry)
    expect(result).toHaveLength(2)
    expect(new Set(result.map(item => item.name))).toEqual(new Set(['A', 'B']))
  })

  it('should handle empty input array', async () => {
    const result = await resolveRegistryDependencies([], [])
    expect(result).toHaveLength(0)
  })

  it('should handle dependencies not found in registry', async () => {
    const items: RegistryItem[] = [
      { name: 'Form', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['NonExistent'] }
    ]
    const result = await resolveRegistryDependencies(items, items)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Form')
  })

  it('should handle complex dependency chain', async () => {
    const registry: RegistryItem[] = [
      { name: 'A', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['B', 'C'] },
      { name: 'B', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['D'] },
      { name: 'C', dependencies: [], files: [], type: 'templates/components', registryDependencies: ['D'] },
      { name: 'D', dependencies: [], files: [], type: 'templates/components', registryDependencies: [] }
    ]
    const result = await resolveRegistryDependencies([registry[0]], registry)
    expect(result).toHaveLength(4)
    expect(result[0].name).toBe('D')
    expect(result[result.length - 1].name).toBe('A')
  })
})