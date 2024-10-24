// tailwind.config.ts
import type { Config } from "tailwindcss/types/config";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				custom_gray_100: "#222126",
				custom_gray_200: "#131315",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},

			backgroundImage: {
				hero: 'url("/images/hero.png")',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
