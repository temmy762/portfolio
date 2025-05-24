import * as fs from 'fs';
import * as path from 'path';

function createPlaceholderImage(text: string, filename: string) {
  // Create a basic SVG with text
  const svg = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#22c55e"/>
      <text x="400" y="300" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  // Write the SVG file
  const outputPath = path.join(process.cwd(), 'public', 'images', 'projects', filename);
  fs.writeFileSync(outputPath, svg);
}

// Create placeholder images
const placeholders = [
  { text: 'Web Project', filename: 'web-project-placeholder.svg' },
  { text: 'Mobile App', filename: 'mobile-app-placeholder.svg' },
  { text: 'Design Project', filename: 'design-project-placeholder.svg' },
  { text: 'Backend Project', filename: 'backend-project-placeholder.svg' },
  { text: 'E-commerce Platform', filename: 'ecommerce.svg' },
  { text: 'Real Estate App', filename: 'realestate.svg' },
  { text: 'WordPress Website', filename: 'wordpress.svg' },
  { text: 'Task Manager', filename: 'taskmanager.svg' },
  { text: 'Fitness App', filename: 'fitnessapp.svg' },
  { text: 'WordPress Plugin', filename: 'wordpressplugin.svg' },
];

placeholders.forEach(({ text, filename }) => {
  createPlaceholderImage(text, filename);
});
