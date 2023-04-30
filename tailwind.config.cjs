/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Helvetica', 'Arial', 'sans-serif'],
			serif: ['Georgia', 'serif'],
			mono: ['Menlo', 'monospace']
		}
	},
	plugins: [],
}
