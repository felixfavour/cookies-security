// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    encKey: ''
  },
  nitro: {
    preset: 'node-server'
  }
})
