import { languages } from './lib/constants'

export default defineNuxtConfig({
    app: {
        baseURL: process.env.NUXT_APP_BASE_URL || '/',
    },
    nitro: {
        baseURL: process.env.NUXT_APP_BASE_URL || '/',
    },
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
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
        public: {
            BASE_URL: process.env.BASE_URL || 'https://www.i18nlocale.com',
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
