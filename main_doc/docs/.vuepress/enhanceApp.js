/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // /playground/ は VuePress ではなく Nuxt で生成した別アプリ (npm run site) なのでページごと読み込む
  router.beforeEach((to, from, next) => {
    if (typeof window !== "undefined" && to.path.startsWith("/playground")) {
      window.location.href = to.fullPath
      return
    }
    next()
  })
}
