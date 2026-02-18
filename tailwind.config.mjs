/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				cortex: {
					bg: '#0a0a0a',
					card: '#111111',
					lime: '#ccff00',
					violet: '#6600ff',
					mist: 'rgba(255, 255, 255, 0.05)',
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
		},
	},
	plugins: [],
}
