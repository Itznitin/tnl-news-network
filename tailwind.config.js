module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}','./components/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: { extend: { colors: { accent: '#ff3b30' } } },
  plugins: [ require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/line-clamp') ]
}
