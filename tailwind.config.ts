import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        porcelain: "#EEE9E4",
        "porcelain-soft": "#F5F1EC",
        oak: "#C0AE94",
        "oak-soft": "#D6C8B2",
        "stone-moss": "#6D705A",
        "stone-moss-deep": "#565942",
        olive: "#4D4738",
        "olive-deep": "#3A3528",
        earth: "#755F4A",
        seafoam: "#BAB9A7",
        terracotta: "#B56A4E",
        "lemon-rind": "#D9B86C",
        ink: "#2A271E",
      },
      fontFamily: {
        serif: [
          "var(--font-dm-serif-display)",
          "DM Serif Display",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-manrope)",
          "Manrope",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
} satisfies Config;

export default config;
