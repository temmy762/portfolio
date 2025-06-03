/**
 * Critical CSS extraction utilities for above-the-fold content
 * This module helps inline critical styles for faster initial page loads
 */

export interface CriticalCSSConfig {
  /** Width for critical CSS viewport */
  width: number;
  /** Height for critical CSS viewport */
  height: number;
  /** Inline styles threshold in bytes */
  inlineThreshold: number;
}

export const DEFAULT_CRITICAL_CONFIG: CriticalCSSConfig = {
  width: 1300,
  height: 900,
  inlineThreshold: 10000, // 10KB threshold
};

/**
 * Critical CSS rules for above-the-fold content
 * These styles are essential for the initial viewport rendering
 */
export const CRITICAL_CSS_RULES = `
/* Critical Base Styles */
*,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}
body{margin:0;line-height:inherit}

/* Critical CSS Variables */
:root{
  --background:0 0% 100%;
  --foreground:240 10% 3.9%;
  --card:0 0% 100%;
  --card-foreground:240 10% 3.9%;
  --primary:142.1 76.2% 36.3%;
  --primary-foreground:355.7 100% 97.3%;
  --secondary:240 4.8% 95.9%;
  --secondary-foreground:240 5.9% 10%;
  --border:240 5.9% 90%;
  --ring:142.1 76.2% 36.3%;
  --radius:0.5rem;
}

.dark{
  --background:20 14.3% 4.1%;
  --foreground:0 0% 95%;
  --card:24 9.8% 10%;
  --card-foreground:0 0% 95%;
  --primary:142.1 70.6% 45.3%;
  --primary-foreground:144.9 80.4% 10%;
  --secondary:240 3.7% 15.9%;
  --secondary-foreground:0 0% 98%;
  --border:240 3.7% 15.9%;
  --ring:142.4 71.8% 29.2%;
}

/* Critical Layout Styles */
body{
  background-color:hsl(var(--background));
  color:hsl(var(--foreground));
  font-feature-settings:"rlig" 1,"calt" 1;
  min-height:100vh;
  display:flex;
  flex-direction:column;
}

/* Critical Hero Section Styles */
.min-h-screen{min-height:100vh}
.flex{display:flex}
.items-center{align-items:center}
.justify-center{justify-content:center}
.pt-16{padding-top:4rem}
.pb-24{padding-bottom:6rem}
.overflow-hidden{overflow:hidden}
.relative{position:relative}
.absolute{position:absolute}
.inset-0{inset:0}
.container{width:100%}
.mx-auto{margin-left:auto;margin-right:auto}
.px-4{padding-left:1rem;padding-right:1rem}
.z-10{z-index:10}
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
.gap-8{gap:2rem}

/* Critical Typography */
.text-3xl{font-size:1.875rem;line-height:2.25rem}
.text-4xl{font-size:2.25rem;line-height:2.5rem}
.text-5xl{font-size:3rem;line-height:1}
.text-6xl{font-size:3.75rem;line-height:1}
.font-bold{font-weight:700}
.leading-tight{line-height:1.25}
.text-gray-900{color:rgb(17 24 39)}
.text-white{color:rgb(255 255 255)}
.text-green-600{color:rgb(22 163 74)}
.text-green-500{color:rgb(34 197 94)}
.mb-4{margin-bottom:1rem}
.mb-6{margin-bottom:1.5rem}
.block{display:block}

/* Critical Button Styles */
.bg-green-600{background-color:rgb(22 163 74)}
.hover\\:bg-green-700:hover{background-color:rgb(21 128 61)}
.text-white{color:rgb(255 255 255)}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.py-3{padding-top:0.75rem;padding-bottom:0.75rem}
.rounded-md{border-radius:0.375rem}
.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}

/* Critical Responsive Styles */
@media (min-width:640px){
  .sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}
  .sm\\:text-5xl{font-size:3rem;line-height:1}
  .sm\\:text-6xl{font-size:3.75rem;line-height:1}
  .sm\\:mb-6{margin-bottom:1.5rem}
  .sm\\:mb-8{margin-bottom:2rem}
}

@media (min-width:768px){
  .md\\:text-5xl{font-size:3rem;line-height:1}
  .md\\:text-6xl{font-size:3.75rem;line-height:1}
}

@media (min-width:1024px){
  .lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .lg\\:gap-12{gap:3rem}
  .lg\\:text-6xl{font-size:3.75rem;line-height:1}
  .lg\\:text-7xl{font-size:4.5rem;line-height:1}
}

/* Critical Dark Mode Styles */
.dark .dark\\:text-white{color:rgb(255 255 255)}
.dark .dark\\:text-green-500{color:rgb(34 197 94)}
.dark .dark\\:bg-gray-900{background-color:rgb(17 24 39)}
.dark .dark\\:bg-gray-800{background-color:rgb(31 41 55)}

/* Critical Background Gradients */
.bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}
.from-white{--tw-gradient-from:#fff var(--tw-gradient-from-position);--tw-gradient-to:rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
.to-gray-50{--tw-gradient-to:#f9fafb var(--tw-gradient-to-position)}
.dark\\:from-gray-900{--tw-gradient-from:#111827 var(--tw-gradient-from-position);--tw-gradient-to:rgb(17 24 39 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
.dark\\:to-gray-800{--tw-gradient-to:#1f2937 var(--tw-gradient-to-position)}

/* Ensure critical content is visible immediately */
.flex-grow{flex-grow:1}
#main-content{flex-grow:1;padding-top:4rem}

/* Font loading optimization */
.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
`;

/**
 * Get critical CSS based on route
 */
export function getCriticalCSS(route: string = '/'): string {
  // Base critical CSS for all routes
  let criticalCSS = CRITICAL_CSS_RULES;

  // Route-specific critical CSS
  switch (route) {
    case '/':
      // Home page specific critical styles
      criticalCSS += `
/* Home page hero section specific */
.order-2{order:2}
.lg\\:order-1{order:1}
.w-12{width:3rem}
.sm\\:w-16{width:4rem}
.h-\\[1px\\]{height:1px}
.bg-green-500{background-color:rgb(34 197 94)}
.mr-4{margin-right:1rem}
.text-sm{font-size:0.875rem;line-height:1.25rem}
.sm\\:text-base{font-size:1rem;line-height:1.5rem}
.font-medium{font-weight:500}
.text-gray-600{color:rgb(75 85 99)}
.dark\\:text-gray-300{color:rgb(209 213 219)}
.max-w-lg{max-width:32rem}
      `;
      break;
    case '/projects':
      // Projects page specific critical styles
      criticalCSS += `
/* Projects page specific */
.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
      `;
      break;
    case '/blog':
      // Blog page specific critical styles
      criticalCSS += `
/* Blog page specific */
.prose{color:var(--tw-prose-body);max-width:65ch}
.prose-lg{font-size:1.125rem;line-height:1.7777778}
      `;
      break;
  }

  return criticalCSS;
}

/**
 * Generate critical CSS link preload tags
 */
export function generateCriticalCSSPreload(): string {
  return `
<link rel="preload" href="/fonts/GeistVF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/GeistMonoVF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  `.trim();
}

/**
 * Check if CSS should be inlined based on size
 */
export function shouldInlineCSS(css: string, config: CriticalCSSConfig = DEFAULT_CRITICAL_CONFIG): boolean {
  const size = new Blob([css]).size;
  return size <= config.inlineThreshold;
}

/**
 * Minify CSS string
 */
export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
    .replace(/\s*{\s*/g, '{') // Clean up braces
    .replace(/;\s*/g, ';') // Clean up semicolons
    .replace(/,\s*/g, ',') // Clean up commas
    .trim();
}

/**
 * Extract critical CSS for specific viewport
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function extractCriticalCSS(_html: string): Promise<string> {
  // In a production environment, you would use a tool like critical or puppeteer
  // For now, we return our predefined critical CSS
  return getCriticalCSS();
}
