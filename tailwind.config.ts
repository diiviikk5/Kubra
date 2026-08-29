import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"EB Garamond"', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        pixel: ["'Geist Pixel'", 'monospace'],
      },
      colors: {
        canvas: {
          DEFAULT: '#f5f5f5',
          soft: '#fafafa',
          deep: '#0c0a09',
        },
        surface: {
          card: '#ffffff',
          strong: '#f0efed',
          dark: '#0c0a09',
          'dark-elevated': '#1c1917',
        },
        hairline: {
          DEFAULT: '#e7e5e4',
          soft: '#f0efed',
          strong: '#d6d3d1',
        },
        ink: {
          DEFAULT: '#0c0a09',
          primary: '#292524',
          'primary-active': '#0c0a09',
        },
        text: {
          ink: '#0c0a09',
          body: '#4e4e4e',
          'body-strong': '#292524',
          muted: '#777169',
          'muted-soft': '#a8a29e',
        },
        gradient: {
          mint: '#a7e5d3',
          peach: '#f4c5a8',
          lavender: '#c8b8e0',
          sky: '#a8c8e8',
          rose: '#e8b8c4',
        }
      },
      boxShadow: {
        'soft-drop': '0 4px 16px rgba(0, 0, 0, 0.04)',
        'card-elevated': '0 8px 30px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        pill: '9999px',
        xl: '16px',
        xxl: '24px',
      }
    },
  },
  plugins: [],
};
export default config;
