// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css:["~/assets/style.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-fonts',{
        families:{
          'Nunito': [200,400,600,800],
          download: true,
          inject: true
        }
      }
    ]

  ]
})
