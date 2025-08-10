import { languages } from './lib/constants'

export default defineNuxtConfig({
    app: {
        baseURL: '/i18n/demo/',
    },
    nitro: {
        baseURL: '/i18n/demo',
    },
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@sidebase/nuxt-auth',
        'shadcn-nuxt',
        '@pinia/nuxt',
        'nuxt-icon',
        'nuxt-gtag',
        '@nuxt/content',
    ],
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: languages
            .filter(l => l.code !== 'all')
            .map(l => {
                return {
                    code: l.code,
                    name: l.title,
                }
            }),
        vueI18n: './i18n.config.ts',
    },
    runtimeConfig: {
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        TWITTER_API_KEY: process.env.TWITTER_API_KEY,
        TWITTER_API_SECRET_KEY: process.env.TWITTER_API_SECRET_KEY,
        TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
        TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
        AUTH_ORIGIN: process.env.AUTH_ORIGIN,
        AUTH_NO_ORIGIN: process.env.AUTH_NO_ORIGIN,
        NUXT_AUTH_ORIGIN: process.env.NUXT_AUTH_ORIGIN,
        AUTH_SECRET: process.env.AUTH_SECRET,
        NUXT_SECRET: process.env.NUXT_SECRET,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET_KEY: process.env.STRIPE_WEBHOOK_SECRET_KEY,
        EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
        EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
        EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
        EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
        EMAIL_FROM: process.env.EMAIL_FROM,
        public: {
            BASE_URL: process.env.BASE_URL || 'https://isolated.tech/i18n/demo',
        },
    },
    routeRules: {
        '/blog': { prerender: true },
    },
    gtag: {
        id: 'G-PCC7Y485VW',
    },
    content: {
        documentDriven: true,
    },
})
