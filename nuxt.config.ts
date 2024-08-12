// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "https://vadalar.uz/api/"
    }
  },
  modules: ["nuxt-swiper", "@pinia/nuxt", "@nuxtjs/i18n", "nuxt-primevue"],
  primevue: {
    options: {
      ripple: true
    },
    components: {
      include: ['Button']
    }
  },
  i18n: {
    defaultLocale: "uz",
    langDir: "./locales/",
    locales: [
      {
        name: "uz",
        code: "uz",
        file: "uz.json",
        img: './assets/images/png/uzb-flag.png'
      },
      {
        name: "ru",
        code: "ru",
        file: "ru.json"

      },
      {
        name: "en",
        code: "en",
        file: "en.json"
      }
    ]
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ["@/assets/scss/main.scss", 'primevue/resources/themes/aura-light-green/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',],
})