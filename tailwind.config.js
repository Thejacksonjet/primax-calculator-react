// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
          },
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
          },
          blue: {
            500: '#3b82f6',
            600: '#2563eb',
          },
        },
      },
    },
    plugins: [],
    // Add this to force Tailwind to use RGB instead of oklch
    corePlugins: {
      colorFormat: 'rgb', // Forces Tailwind to output colors as RGB, which html2canvas can parse
    },
  };