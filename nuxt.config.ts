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
  },
  hooks: {
    'close': () => { } // Placeholder
  },
  // Filter out the specific /_nuxt/ 404 error from the console
  devServer: {
    // There isn't a direct "suppress error" config, but we can try to route it.
    // Actually, the most reliable way to silence a specific CLI error is often a custom hook or reporter if available.
    // For now, let's try to add a server route that overlaps?? NO.
    // Given the difficulty of silencing Nuxt CLI errors cleanly from config,
    // I will try to use `routeRules` to redirect it?
  },
  routeRules: {
    '/_nuxt/': { redirect: '/404' } // Try to redirect it to something valid or ignore it
  }
})