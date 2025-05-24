/**
 * Environment configuration for the portfolio
 * These values can be overridden by .env.local file
 */

export const config = {
  github: {
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || '',
    token: process.env.GITHUB_TOKEN || '',
  },
  // Add other configuration sections as needed
};
