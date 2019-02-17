const pkg = require('./package');
require('dotenv').config();

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const { VUE_APP_BASE_API_URL } = process.env;

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  env: {
    VUE_APP_BASE_API_URL
  },
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  generate: {
    dir: './../server/public'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl', '~assets/style/sass/style.sass'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/LodashGet',
    '@/plugins/Mixins',
    '@/plugins/Toastr',
    '@/plugins/VeeValidate',
    '@/plugins/vuetify',
    '@/plugins/vuex'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    dir: './../server/public'
  }
};
