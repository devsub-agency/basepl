import { describe, it, vi, expect, beforeEach } from 'vitest';
import { initShadcn } from '../../src/utils/initShadcn';
import handleError  from '../../src/utils/error/handle-error';
import { execa } from 'execa';
// Mock dependencies
vi.mock('execa', () => ({
    execa: vi.fn()
}));

vi.mock('./error/handle-error', () => ({
    default: vi.fn()
}));

describe('initShadcn', () => {
    const mockCwd = '/test/path';
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should execute correct command with npm', async () => {
        await initShadcn({ cwd: mockCwd, packageManager: 'npm' });

        expect(execa).toHaveBeenCalledWith(
            'npx',
            ['shadcn@latest', 'init'],
            expect.objectContaining({
                cwd: mockCwd,
                stdio: 'inherit',
                shell: true
            })
        );
    });

    it('should execute correct command with pnpm', async () => {
        await initShadcn({ cwd: mockCwd, packageManager: 'pnpm' });

        expect(execa).toHaveBeenCalledWith(
            'pnpm',
            ['dlx', 'shadcn@latest', 'init'],
            expect.objectContaining({
                cwd: mockCwd,
                stdio: 'inherit',
                shell: true
            })
        );
    });

    it('should execute correct command with yarn', async () => {
        await initShadcn({ cwd: mockCwd, packageManager: 'yarn' });

        expect(execa).toHaveBeenCalledWith(
            'yarn',
            ['dlx', 'shadcn@latest', 'init'],
            expect.objectContaining({
                cwd: mockCwd,
                stdio: 'inherit',
                shell: true
            })
        );
    });

    it('should handle errors properly', async () => {
        const mockError = new Error('Command failed');
        vi.mocked(execa).mockRejectedValueOnce(mockError);

        await initShadcn({ cwd: mockCwd, packageManager: 'npm' });

        expect(handleError).toHaveBeenCalledWith(mockError);
    });
});