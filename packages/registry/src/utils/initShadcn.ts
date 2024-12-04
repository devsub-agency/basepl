import { execa } from 'execa';
import { logger } from './logging/logger';
import { PackageManager } from './getPackageManager';
import { spinner } from './spinner';
import handleError from './error/handle-error';

interface InitShadcnProps {
    cwd: string;
    packageManager: PackageManager;
}

export async function initShadcn({ cwd, packageManager }: InitShadcnProps){
    const shadcnSpinner = spinner('Installing shadcn/ui...').start();
    try {
        const command = packageManager === 'npm'
            ? ['npx', 'shadcn@latest', 'init']
            : [packageManager, 'dlx', 'shadcn@latest', 'init'];

        await execa(command[0], command.slice(1), {
            cwd,
            stdio: 'inherit',
            shell: true
        });

        shadcnSpinner.succeed('shadcn/ui installed successfully');
    } catch (error) {
        shadcnSpinner.fail('Failed to install shadcn components');
        handleError(error);
    }
}