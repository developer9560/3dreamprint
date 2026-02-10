import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': 'var(--color-amber)',
                'primary-dark': 'var(--color-amber-dark)',
                'secondary': 'var(--color-slate)',
                'accent': 'var(--color-amber-light)',
                'background': 'var(--color-cream)',
                'surface': 'var(--color-white)',
                'text-primary': 'var(--color-text)',
                'text-muted': 'var(--color-text-secondary)',
            },
            fontFamily: {
                heading: ['Montserrat', 'Poppins', 'sans-serif'],
                body: ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
