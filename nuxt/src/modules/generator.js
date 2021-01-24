// https://dev.to/andynoir/sitemap-for-dynamic-routes-in-nuxtjs-4b96

const generator = function () {
  this.nuxt.hook('generate:done', async (context) => {
    const routesToExclude =
    process.env.NUXT_ENV_EXCLUDE_ROUTES
      ? process.env.NUXT_ENV_EXCLUDE_ROUTES.split(',') : []
    const allRoutes = await Array.from(context.generatedRoutes)
    const routes = await allRoutes.filter((route) => !routesToExclude.includes(route))
    this.nuxt.options.sitemap.routes = await [...routes]
  })
}

export default generator