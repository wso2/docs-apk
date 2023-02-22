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
/**
 // Workaround for redirection - Create a blank page by the name of the page being removed.

  router.beforeEach((to, from, next) => {
    const redirectList = {
      '<old-path>': '<New-path>',
    }
    const redirect = redirectList[to.path]

    if (redirect) {
      next({ path: redirect })
    } else next()
  })
 */
}
