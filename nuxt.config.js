import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Admin Panel',
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
    '@/assets/css/style.css',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ]
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',

  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  router: {
    middleware: ['auth', 'isUser']
  },
  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: "/auth/login",
      home: "/"
    },
    strategies: {
      local: {
        token: {
          property: "token"
          //   required: true,
          // type: 'Bearer'
          // name: "token"
        },
        user: {
          property: "data"
          // autoFetch: true
        },
        endpoints: {
          logout: { url: '/user/logout', method: 'post' },
          login: { url: "/user/signin", method: "post" },
          user: { url: "/user/me", method: "get" }
        }
      }
    }
  },

  axios: {
    // baseURL: "http://localhost:2022/api",
    baseURL: "http://localhost:8080/api/"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/vue-tinymce-editor/],
    babel: {
      plugins: [
        // '@babel/plugin-proposal-class-properties',
        // '@babel/plugin-proposal-private-methods',

        // or with JUST the line below 
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
    },
  }
}
