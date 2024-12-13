import * as fs from 'fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { addOptionsSchema } from '../../../src/commands/add'
import { logger } from '../../../src/utils/logging/logger'
import { preFlightAdd } from '../../../src/utils/preflights/preflightAdd'
import path from 'path'

vi.mock('fs', () => ({
    existsSync: vi.fn()
}))

vi.mock('../../../src/utils/logging/logger', () => ({
    logger: {
        error: vi.fn()
    }
}))

vi.mock('path', async () => {
    const actual = await vi.importActual<typeof import('path')>('path')
    return {
        ...actual,
        resolve: (...args: string[]) => args.join('/')
    }
})

describe('preFlightAdd', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)

    it('should handle relative paths', () => {
        const relativeOptions: z.infer<typeof addOptionsSchema> = {
            cwd: './relative/path',
            components: [],
            yes: true,
            overwrite: false,
            config: false
        }

        vi.mocked(fs.existsSync)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)

        preFlightAdd(relativeOptions)

        expect(fs.existsSync).toHaveBeenCalledWith(relativeOptions.cwd)
        expect(logger.error).not.toHaveBeenCalled()
        expect(mockExit).not.toHaveBeenCalled()
    })

    it('should handle empty components array', () => {
        const emptyComponentsOptions: z.infer<typeof addOptionsSchema> = {
            cwd: '/test/path',
            components: [],
            yes: true,
            overwrite: false,
            config: false
        }

        vi.mocked(fs.existsSync)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)

        preFlightAdd(emptyComponentsOptions)

        expect(fs.existsSync).toHaveBeenCalledTimes(2)
        expect(logger.error).not.toHaveBeenCalled()
        expect(mockExit).not.toHaveBeenCalled()
    })

    it('should handle missing package.json', () => {
        const options: z.infer<typeof addOptionsSchema> = {
            cwd: '/test/path',
            components: [],
            yes: true,
            overwrite: false,
            config: false
        }
    
        vi.mocked(fs.existsSync)
            .mockReturnValueOnce(true)  // cwd exists
            .mockReturnValueOnce(false) // package.json doesn't exist
    
        preFlightAdd(options)
    
        expect(fs.existsSync).toHaveBeenCalledWith(options.cwd)
        expect(logger.error).toHaveBeenCalledWith("Target project does not exist or is not a valid Payload project")
        expect(mockExit).toHaveBeenCalledWith(0)
    })
})