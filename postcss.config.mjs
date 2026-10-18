const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Tailwind v4 wraps all its CSS in @layer, which phones older than ~2022 (Chrome < 99, iOS < 15.4) ignore,
    // leaving the page unstyled. This rewrites the layers into plain rules with the same priority.
    "@csstools/postcss-cascade-layers": {},
  },
};

export default config;
