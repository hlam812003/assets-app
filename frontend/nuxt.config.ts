// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/main.css', 'animate.css'],
  components: {
    global: true,
    dirs: ['~/components']
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    [
      '@pinia/nuxt', { 
        disableVuex: false,
        autoImports: ['defineStore']
      }
  ],
  ]
})
