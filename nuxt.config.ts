// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'http://localhost:8098' }],
    },
  },
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n', // '@sidebase/nuxt-auth',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  runtimeConfig: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
    AUTH_NO_ORIGIN: process.env.AUTH_NO_ORIGIN,
    NUXT_AUTH_ORIGIN: process.env.NUXT_AUTH_ORIGIN,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NUXT_SECRET: process.env.NUXT_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET_KEY: process.env.STRIPE_WEBHOOK_SECRET_KEY,
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
})
