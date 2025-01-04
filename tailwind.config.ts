import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        spaceGrotesk: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      colors: {
        background: "#FDF4E5",
        foreground: "var(--foreground)",
        AzulEletrico: {
          DEFAULT: "#1C4AE5"
        },
        VerdeMenta: {
          DEFAULT: "#00D468"
        },
        AzulCeu: {
          DEFAULT: "#A0B5FF"
        },
        BrancoCreme: {
          DEFAULT: "#FDF4E5"
        },
        Branco: {
          DEFAULT: "#FFFAF2"
        },
        AzulMeiaNoite: {
          DEFAULT: "#000928"
        },
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: '0',
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: '1',
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
