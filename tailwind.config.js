/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Add our custom cyan color as the primary blue color
        blue: {
          50: '#e6faff',
          100: '#b3f0ff',
          200: '#80e6ff',
          300: '#4ddbff',
          400: '#1ad1ff',
          500: '#00ccff',  // Our primary brand color: #00ccff
          600: '#00a3cc',
          700: '#007a99',
          800: '#005266',
          900: '#002933',
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
} 