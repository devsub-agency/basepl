import { execa } from 'execa';
import handleError from './error/handle-error';
import { PackageManager } from './getPackageManager';

interface InitShadcnProps {
    cwd: string;
    packageManager: PackageManager;
}

export async function initShadcn({ cwd, packageManager }: InitShadcnProps){
    try {
        const command = packageManager === 'npm'
            ? ['npx', 'shadcn@latest', 'init']
            : [packageManager, 'dlx', 'shadcn@latest', 'init'];

        await execa(command[0], command.slice(1), {
            cwd,
            stdio: 'inherit',
            shell: true
        });

    } catch (error) {
        handleError(error);
    }
}