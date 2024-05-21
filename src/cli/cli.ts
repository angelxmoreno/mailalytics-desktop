import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Function to get Tauri App Support Path
const getTauriAppSupportPath = (appName: string) => {
    const homeDir = os.homedir();
    const platform = os.platform();

    switch (platform) {
        case 'darwin': // macOS
            return path.join(homeDir, 'Library', 'Application Support', appName);
        case 'win32': // Windows
            return path.join(homeDir, 'AppData', 'Roaming', appName);
        case 'linux': // Linux
            return path.join(homeDir, '.config', appName);
        default:
            throw new Error('Unsupported platform');
    }
};
 
// Read Tauri Configuration
const tauriConfigPath = path.resolve(__dirname, '..', '..', 'src-tauri', 'tauri.conf.json');
const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf-8'));
const identifier = tauriConfig.identifier;
const tauriAppSupportPath = getTauriAppSupportPath(identifier);

console.log(`
DATABASE_URL="${tauriAppSupportPath}/tauriAppDB.db"
`);