import { describe, expect, it, vi, beforeEach } from 'vitest'
import fse from 'fs-extra';
import { existsSync } from 'fs';
import path from 'path'
import { checkProjectSetUp, checkShadcnPresents, getPayloadAppDetails } from '../../../src/utils/preflights/preflightInit'
import { logger } from '../../../src/utils/logging/logger'

vi.mock('fs', () => ({
    default: {
      readJson: vi.fn()
    },
    existsSync: vi.fn()
  }))

vi.mock('path', async () => {
    const actual = await vi.importActual<typeof import('path')>('path')
    return {
        ...actual,
        resolve: (...args: string[]) => args.join('/')
    }
})

vi.mock('../../../src/utils/logging/logger', () => ({
    logger: {
        warn: vi.fn()
    }
}))

describe('preflightInit utilities', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('checkProjectSetUp', () => {
        it('should return true when payload.config.ts exists', async () => {
            vi.mocked(existsSync).mockReturnValue(true)
            const result = await checkProjectSetUp('/test/path')
            expect(result).toBe(true)
        })

        it('should return false when payload.config.ts does not exist', async () => {
            vi.mocked(existsSync).mockReturnValue(false)
            const result = await checkProjectSetUp('/test/path')
            expect(result).toBe(false)
        })
    })

    describe('checkShadcnPresents', () => {
        it('should return true when components.json exists', async () => {
            vi.mocked(existsSync).mockReturnValue(true)
            const result = await checkShadcnPresents('/test/path')
            expect(result).toBe(true)
        })

        it('should return false when components.json does not exist', async () => {
            vi.mocked(existsSync).mockReturnValue(false)
            const result = await checkShadcnPresents('/test/path')
            expect(result).toBe(false)
        })
    })

    describe('getPayloadAppDetails', () => {
        it('should detect valid payload setup', async () => {
            vi.mocked(existsSync).mockReturnValue(true)
            vi.mocked(fse.readJson).mockImplementation(() => (Promise.resolve({
                dependencies: { payload: '3.0.0' }
            })))

            const result = await getPayloadAppDetails('/test/path')
            expect(result).toEqual({
                isSrcDir: true,
                isSupportedPayloadVersion: true,
                payloadVersion: '3.0.0'
            })
        })

        it('should handle missing src directory', async () => {
            vi.mocked(fs.existsSync).mockReturnValue(false)
            vi.mocked(fsExtra.readJson).mockResolvedValue({
                dependencies: { payload: '3.0.0' }
            })

            const result = await getPayloadAppDetails('/test/path')
            expect(result.isSrcDir).toBe(false)
        })

        it('should handle missing payload dependency', async () => {
            vi.mocked(fs.existsSync).mockReturnValue(true)
            vi.mocked(fsExtra.readJson).mockResolvedValue({
                dependencies: {}
            })

            const result = await getPayloadAppDetails('/test/path')
            expect(result).toEqual({
                isSrcDir: true,
                isSupportedPayloadVersion: false,
                payloadVersion: null
            })
        })

        it('should handle latest version', async () => {
            vi.mocked(fs.existsSync).mockReturnValue(true)
            const readJson = vi.hoisted(() => vi.fn())
            vi.mocked(readJson).mockResolvedValue({
                dependencies: { payload: 'latest' }
            })

            const result = await getPayloadAppDetails('/test/path')
            expect(result.isSupportedPayloadVersion).toBe(true)
        })

        it('should handle unsupported version', async () => {
            vi.mocked(fs.existsSync).mockReturnValue(true)
            vi.mocked(fsExtra.readJson).mockResolvedValue({
                dependencies: { payload: '2.0.0' }
            })

            const result = await getPayloadAppDetails('/test/path')
            expect(result.isSupportedPayloadVersion).toBe(false)
            expect(logger.warn).toHaveBeenCalled()
        })

        it('should handle invalid version format', async () => {
            vi.mocked(fs.existsSync).mockReturnValue(true)
            vi.mocked(fsExtra.readJson).mockResolvedValue({
                dependencies: { payload: 'invalid' }
            })

            const result = await getPayloadAppDetails('/test/path')
            expect(result.isSupportedPayloadVersion).toBe(false)
            expect(logger.warn).toHaveBeenCalled()
        })
    })
})