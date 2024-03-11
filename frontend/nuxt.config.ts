// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: false,
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": "postcss-nesting",
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/image", "@nuxtjs/eslint-module"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  imports: {
    dirs: ["./stores"],
  },
});
