const {exec} = require('child_process');
const {readdir} = require('fs/promises');
const {resolve} = require('path');
const {promisify} = require('util');

const which = require('which');

const execAsync = promisify(exec);

/**
 * Check if extension is installed and install it if not.
 *
 * @returns {Promise<void>} Promise.
 */
const checkExtension = async () => {
    const codeExists = which.sync('code', {nothrow: true});

    if (!codeExists) {
        process.exit(0);
    }

    const packagedExtension = (await readdir('./dist/vscode')).find(file => file.endsWith('.vsix'));
    const {stdout} = await execAsync('code --list-extensions --show-versions');
    const extensions = stdout.split('\n');
    const highlight = extensions.find(extension => extension.startsWith('nfq.nfq-react-grid-highlight'));

    if (!highlight) {
        await execAsync(`code --install-extension ${resolve('./dist/vscode', packagedExtension)}`);
        process.exit(0);
    }

    const installedVersion = highlight.split('@')[1];
    const packagedVersion = packagedExtension.split('-').pop().split('.vsix')[0];

    if (installedVersion !== packagedVersion) {
        await execAsync(`code --install-extension ${resolve('./dist/vscode', packagedExtension)}`);
        process.exit(0);
    }

    process.exit(0);
};

void checkExtension();