// scripts/copy-htaccess.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const sourcePath = path.resolve(__dirname, '../public/.htaccess');
const destPath = path.resolve(__dirname, '../out/.htaccess');

// Check if the build directory exists
if (!fs.existsSync(path.dirname(destPath))) {
  console.error('Error: The "out" directory does not exist. Run the build command first.');
  process.exit(1);
}

// Copy the .htaccess file
try {
  fs.copyFileSync(sourcePath, destPath);
  console.log('✅ .htaccess file copied to the build directory successfully');
} catch (error) {
  console.error('❌ Error copying .htaccess file:', error.message);
  process.exit(1);
}
