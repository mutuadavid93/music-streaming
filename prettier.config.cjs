module.exports = {
  plugins: [
    import("prettier-plugin-tailwindcss").then((module) => module.default),
  ],
};
