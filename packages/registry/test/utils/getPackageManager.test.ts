import { describe, it, vi, expect, beforeEach } from 'vitest'

import fse from 'fs-extra'
import { execa } from 'execa'
import { getPackageManager } from '../../src/utils/getPackageManager'
import { z } from 'zod'
import { initOptionSchema } from '../../src/commands/init'

vi.mock('fs-extra', () => ({
  default: {
    existsSync: vi.fn()
  }
}))

vi.mock('execa', () => ({
  execa: vi.fn()
}))

const testOptions: z.infer<typeof initOptionSchema> = {
    cwd: 'test',
    yes: true,
    defaults: false
}

describe('getPackageManager', () => {
  const mockProjectDir = '/test/project'
  
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(fse.existsSync).mockReturnValue(false)
    vi.mocked(execa).mockResolvedValue({ stdout: '', stderr: '' } as any)
  })

  it('should detect pnpm from options', async () => {
    const result = await getPackageManager({
      options: {...testOptions, pnpm: true },
      projectDir: mockProjectDir
    })
    expect(result).toBe('pnpm')
  })

  it('should detect pnpm from lockfile', async () => {
    vi.mocked(fse.existsSync).mockImplementation((path) => 
      path === `${mockProjectDir}/pnpm-lock.yaml`
    )
    const result = await getPackageManager({
      options: null,
      projectDir: mockProjectDir
    })
    expect(result).toBe('pnpm')
  })

  it('should detect yarn from options', async () => {
    const result = await getPackageManager({
      options: {...testOptions, yarn: true },
      projectDir: mockProjectDir
    })
    expect(result).toBe('yarn')
  })

  it('should detect yarn from lockfile', async () => {
    vi.mocked(fse.existsSync).mockImplementation((path) => 
      path === `${mockProjectDir}/yarn.lock`
    )
    const result = await getPackageManager({
      options: null,
      projectDir: mockProjectDir
    })
    expect(result).toBe('yarn')
  })

  it('should detect npm from options', async () => {
    const result = await getPackageManager({
      options: {...testOptions, npm: true },
      projectDir: mockProjectDir
    })
    expect(result).toBe('npm')
  })

  it('should detect npm from lockfile', async () => {
    vi.mocked(fse.existsSync).mockImplementation((path) => 
      path === `${mockProjectDir}/package-lock.json`
    )
    const result = await getPackageManager({
      options: null,
      projectDir: mockProjectDir
    })
    expect(result).toBe('npm')
  })

  it('should detect bun from options', async () => {
    const result = await getPackageManager({
      options: {...testOptions, bun: true },
      projectDir: mockProjectDir
    })
    expect(result).toBe('bun')
  })

  it('should detect bun from lockfile', async () => {
    vi.mocked(fse.existsSync).mockImplementation((path) => 
      path === `${mockProjectDir}/bun.lockb`
    )
    const result = await getPackageManager({
      options: null,
      projectDir: mockProjectDir
    })
    expect(result).toBe('bun')
  })

  it('should prefer pnpm if command exists', async () => {
    vi.mocked(execa).mockResolvedValueOnce({ stdout: '/usr/local/bin/pnpm' } as any)
    const result = await getPackageManager({
      options: null,
      projectDir: mockProjectDir
    })
    expect(result).toBe('pnpm')
  })

  it('should default to npm on error', async () => {
    vi.mocked(fse.existsSync).mockImplementation(() => {
      throw new Error('File system error')
    })
    const result = await getPackageManager({
      options: null,
      projectDir: mockProjectDir
    })
    expect(result).toBe('npm')
  })
})