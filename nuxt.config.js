const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width,height=device-height'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'coco'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [
      //{src:"https://cdn.bootcss.com/jquery/3.3.1/core.js"} //引入第三方JS
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/static/css/reset.css',
    '~/static/css/common.less',
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~/plugins/tool',
      ssr: false
    }, //工具库
    {
      src: '~/plugins/element-ui',
      ssr: false
    }, //element-ui
    {
      src: '~/plugins/init',
      ssr: false
    }, //初始化数据
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    vendor: ['element-ui'],
  }
}
