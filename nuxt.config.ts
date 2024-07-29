// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "https://vadalar.uz/api/"
    }
  },
  modules: ["nuxt-swiper", "@pinia/nuxt"],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ["@/assets/scss/main.scss"]
})