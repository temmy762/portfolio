// Script to check available icons
import * as SiIcons from 'react-icons/si';

console.log('Available Si icons for React Native:');
Object.keys(SiIcons).filter(key => key.toLowerCase().includes('react')).forEach(icon => {
  console.log(icon);
});
