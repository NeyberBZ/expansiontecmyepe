// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],  // ← sintaxis v3
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-offset": "var(--color-surface-offset)",
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        text: { DEFAULT: "var(--color-text)", muted: "var(--color-text-muted)", faint: "var(--color-text-faint)", inverse: "var(--color-text-inverse)" },
        primary: { DEFAULT: "var(--color-primary)", hover: "var(--color-primary-hover)", highlight: "var(--color-primary-highlight)" },
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "Georgia", "serif"],
        body: ["Satoshi", "system-ui", "sans-serif"],
      },
      maxWidth: {
        narrow:  "640px",
        default: "960px",
        wide:    "1200px",
      },
    },
  },
  plugins: [],
};