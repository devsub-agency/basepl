import { existsSync } from "fs"
import fs from 'fs-extra'
import { describe, it, vi, expect, beforeEach } from 'vitest'
import { checkProjectSetUp, checkShadcnPresents, getPayloadAppDetails } from "../../../src/utils/preflights/preflightInit"
import { logger } from "../../../src/utils/logging/logger"

vi.mock('fs')
vi.mock('fs-extra', () => ({
  default: {
    readJson: vi.fn()
  }
}))
vi.mock('../../../src/utils/logging/logger', () => ({
  logger: {
    warn: vi.fn()
  }
}))

describe('Project Setup Checks', () => {
  describe('checkProjectSetUp', () => {
    it('returns true when payload.config.ts exists', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      const result = await checkProjectSetUp('/test/path')
      expect(result).toBe(true)
    })

    it('returns false when payload.config.ts does not exist', async () => {
      vi.mocked(existsSync).mockReturnValue(false)
      const result = await checkProjectSetUp('/test/path')
      expect(result).toBe(false)
    })
  })

  describe('checkShadcnPresents', () => {
    it('returns true when components.json exists', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      const result = await checkShadcnPresents('/test/path')
      expect(result).toBe(true)
    })

    it('returns false when components.json does not exist', async () => {
      vi.mocked(existsSync).mockReturnValue(false)
      const result = await checkShadcnPresents('/test/path')
      expect(result).toBe(false)
    })
  })

  describe('getPayloadAppDetails', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })

    it('handles missing payload version', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(fs.readJson).mockResolvedValue({ dependencies: {} })

      const result = await getPayloadAppDetails('/test/path')
      expect(result).toEqual({
        isSrcDir: true,
        isSupportedPayloadVersion: false,
        payloadVersion: null
      })
    })

    it('handles valid latest version', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(fs.readJson).mockResolvedValue({
        dependencies: { payload: 'latest' }
      })

      const result = await getPayloadAppDetails('/test/path')
      expect(result.isSupportedPayloadVersion).toBe(true)
    })

    it('handles valid version', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(fs.readJson).mockResolvedValue({
        dependencies: { payload: '3.9.0' }
      })

      const result = await getPayloadAppDetails('/test/path')
      expect(result.isSupportedPayloadVersion).toBe(true)
    })

    it('handles invalid version format', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(fs.readJson).mockResolvedValue({
        dependencies: { payload: '1.2.3' }
      })

      const result = await getPayloadAppDetails('/test/path')
      expect(result.isSupportedPayloadVersion).toBe(false)
      expect(logger.warn).toHaveBeenCalled()
    })

    it('handles fs read error', async () => {
      vi.mocked(existsSync).mockReturnValue(true)
      vi.mocked(fs.readJson).mockRejectedValue(new Error('Read error'))

      await expect(getPayloadAppDetails('/test/path')).rejects.toThrow('Read error')
    })
  })
})