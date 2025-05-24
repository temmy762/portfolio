# Modern Professional Portfolio Website

A comprehensive, modern portfolio website built with Next.js and Tailwind CSS, designed for developers and creatives. This project features a sleek UI, comprehensive admin dashboard, content management, and SEO optimization.

## Key Features

- **Modern UI/UX Design**: Sleek, responsive interface with Tailwind CSS
- **Next.js App Router**: Leveraging the latest Next.js capabilities
- **Admin Dashboard**: Secure content management system
- **CRUD Operations**: Manage projects, blog posts, services, testimonials
- **Firebase Integration**: Authentication and image storage
- **Email Integration**: Contact form with EmailJS
- **Dark Mode**: Full light/dark theme support
- **Animations**: Framer Motion animations for enhanced UX
- **GitHub API Integration**: Showcase your repositories
- **SEO Optimization**: Meta tags, structured data, and sitemap
- **Accessibility**: WCAG compliance features built-in
- **Static Export**: Compatible with Hostinger and other static hosts

## Getting Started

### Prerequisites

- Node.js 16.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase credentials
   - Add your EmailJS credentials
   - Add your GitHub token (optional)

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio/
├── public/            # Static assets
├── scripts/           # Build and utility scripts
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   │   ├── admin/     # Admin dashboard components
│   │   ├── layout/    # Layout components (header, footer)
│   │   ├── sections/  # Page sections (hero, about, etc.)
│   │   └── ui/        # UI components (buttons, cards, etc.)
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and services
│   │   ├── data/      # Static portfolio data
│   │   ├── schema/    # SEO schema definitions
│   │   ├── services/  # Service integrations
│   │   └── utils/     # Utility functions
│   └── types/         # TypeScript type definitions
```

## Customization

### Portfolio Content

Edit the data files in `src/lib/data/portfolio-data.ts` to add your:
- Projects
- Services
- Blog posts
- Testimonials
- Skills
- Work experience
- Education
- Personal information

### Theme Customization

- Color scheme: Edit the color variables in `tailwind.config.js`
- UI elements: Update components in `src/components/ui/`
- Animations: Modify animation settings in `tailwind.config.js`

### CSS and Tailwind Setup

This project uses Tailwind CSS for styling with a well-organized configuration:

- **Base Configuration**: See `tailwind.config.js` for theme settings, plugins, and extensions
- **Custom Components**: Reusable UI components with consistent styling
- **Utility Classes**: Leverage Tailwind's utility-first approach for rapid development
- **Dark Mode**: Full dark mode support via the `class` strategy
- **Animations**: Uses `tailwindcss-animate` plugin for smooth animations
- **CSS Variables**: Custom properties for colors and design tokens in `globals.css`

For detailed information about the CSS configuration, see the [CSS Configuration Guide](./CSS_CONFIGURATION.md).

## Documentation

Detailed documentation files are included in the project:

- [Firebase Setup](./FIREBASE_SETUP.md) - Firebase authentication and storage
- [EmailJS Setup](./EMAILJS_SETUP.md) - Contact form email integration
- [SEO Guide](./SEO_GUIDE.md) - Search engine optimization guidelines
- [Analytics Guide](./ANALYTICS_GUIDE.md) - Google Analytics implementation
- [Accessibility Guide](./ACCESSIBILITY_GUIDE.md) - Accessibility features

## Deployment

### Static Export (Hostinger, Netlify, etc.)

```bash
npm run export
```

The static site will be generated in the `out` directory, ready for upload to any static hosting service.

### Vercel Deployment

Push to GitHub and import the repository in Vercel for automatic deployment.

## Admin Access

1. Navigate to `/admin/login`
2. Log in with your Firebase credentials
3. Manage your portfolio content through the admin dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [EmailJS](https://www.emailjs.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
