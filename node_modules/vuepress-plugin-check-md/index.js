const { checkAndThrow } = require('check-md')
const { compose, deeplyParseHeaders, slugify } = require('@vuepress/shared-utils')

module.exports = (opts = {}) => {
  return {
    extendCli(cli) {
      cli
        .command('check-md [targetDir]', 'Checks dead links of markdown.')
        .option('--fix', 'fix dead links like a expert.')
        .option('--pattern', 'glob pattern of resolved markdowns.')
        .option('--ignore', 'glob pattern to specify paths from being checked.')
        .action((dir = '.') => {
          const cwd = dir
          const root = ['./', './.vuepress/public']

          checkAndThrow({
            pattern: '**/*.md',
            ignore: ['**/node_modules'],
            exitLevel: 'error',
            root,
            ...opts,
            defaultIndex: ['README.md', 'index.md'],
            slugify: compose(deeplyParseHeaders, slugify),
            cwd,
          })
        })
    }
  }
}
