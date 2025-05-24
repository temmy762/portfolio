/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {},
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-reporter': {
      clearReportedMessages: true,
    },
  },
};

export default config;
