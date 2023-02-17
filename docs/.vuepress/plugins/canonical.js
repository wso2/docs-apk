
// pulled and modified from https://github.com/ipfs/ipfs-blog/blob/062afac2b114501429e0b3ccd75bdc6975349456/src/.vuepress/plugins/canonical.js
// ensure one trailing slash is present
const normalizePath = (path) => path.replace('/_blog', '').replace(/\/*$/, '/');
// dedup any slashes
const dedupSlashes = (url) => url.replace(/([^:]\/)\/+/g, "$1");

module.exports = ({ CANONICAL_BASE } = {}) => ({
  name: 'vuepress-default-canonical',
  extendPageData({ frontmatter, path }) {
    // If no canonicalUrl is explicitly defined in the frontmatter, construct it from the permaLink or $page.path
    if (!frontmatter.canonicalUrl && CANONICAL_BASE) {
      frontmatter.canonicalUrl = dedupSlashes(CANONICAL_BASE + normalizePath(frontmatter.permalink || path || ''));
    }
  },
});
