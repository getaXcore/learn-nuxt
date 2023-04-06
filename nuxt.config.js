export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'learn-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxt/http',
    '@nuxtjs/axios',
    // '@pinia/nuxt',
  ],

  bootstrapVue: {
    icons: true
  },

  http: {    
    // proxyHeaders: false 
  },

  axios: {
    // extra config e.g
    // BaseURL: 'https://link-to-API'
  },

  pinia: {
    // autoImports: [
    //   // automatically imports `defineStore`
    //   'defineStore', // import { defineStore } from 'pinia'
    //   ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    // ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ['npm-package-name'],
    transpile: ['axios'],
    extend (config, { isDev, isClient }) {
 
      config.node = {
           fs: 'empty'
       }

      // ....
   }
  },

  publicRuntimeConfig: {
    baseUrlFruit: process.env.BASE_URL_FRUIT,
    getFruit: process.env.GET_FRUIT_URL,
    apiKeyFruit: process.env.API_KEY_FRUIT,
    baseUrlUsersReporting: process.env.BASE_URL_USERS_REPORTING,
    getUsersReporting: process.env.GET_USERS_REPORTING,
  },
}
