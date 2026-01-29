// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/ui'
  ],
  runtimeConfig: {
    apiKey: process.env.API_KEY || 'default-dev-key'
  }
})