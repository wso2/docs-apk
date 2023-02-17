'use strict'
const meta = require('./meta')
module.exports = MetaPlugin
function MetaPlugin(md) {
  md.meta = md.meta || {}
  md.block.ruler.before('code', 'meta', meta(md), { alt: [] })
}
