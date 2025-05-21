import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const SiIcons = require('react-icons/si');

console.log('Available Si icons for React:');
Object.keys(SiIcons).filter(key => key.toLowerCase().includes('react')).forEach(icon => {
  console.log(icon);
});
