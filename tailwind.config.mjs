// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-offset": "var(--color-surface-offset)",
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-faint": "var(--color-text-faint)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-highlight": "var(--color-primary-highlight)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs:   ["clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", { lineHeight: "1.5" }],
        sm:   ["clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",    { lineHeight: "1.5" }],
        base: ["clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",   { lineHeight: "1.6" }],
        lg:   ["clamp(1.125rem, 1rem + 0.75vw, 1.5rem)",    { lineHeight: "1.4" }],
        xl:   ["clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)",   { lineHeight: "1.3" }],
        "2xl":["clamp(2rem, 1.2rem + 2.5vw, 3.5rem)",       { lineHeight: "1.2" }],
      },
      spacing: {
        1:  "0.25rem",
        2:  "0.5rem",
        3:  "0.75rem",
        4:  "1rem",
        5:  "1.25rem",
        6:  "1.5rem",
        8:  "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px oklch(0.2 0.01 80 / 0.06)",
        md: "0 4px 12px oklch(0.2 0.01 80 / 0.08)",
        lg: "0 12px 32px oklch(0.2 0.01 80 / 0.12)",
      },
      maxWidth: {
        narrow:  "640px",
        default: "960px",
        wide:    "1200px",
      },
      transitionTimingFunction: {
        interactive: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};