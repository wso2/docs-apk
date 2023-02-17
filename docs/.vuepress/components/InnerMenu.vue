<template>
  <div class="innerMenu">
    <NavLinks class="can-hide" />
  </div>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
export default {
  name: 'InnerMenu',
  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },
  data () {
    return {
      linksWrapMaxWidth: null
    }
  },
  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },
  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
            - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}
function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
.innerMenu
  position fixed
  z-index 5
  top 0
  left 0
  right 0
  height $navbarHeight
  padding $navbarVerticalPadding $navbarHorizontalPadding
  background #212a32
  box-sizing border-box
  box-shadow 0 2px 8px var(--card-shadow-color)
  backdrop-filter saturate(200%) blur(20px)
  line-height $navbarHeight - $navbarVerticalPadding * 2
  transition transform 0.3s ease-in-out
  margin-top 58px

  @media (max-width $MQMobile)
    display none
    margin-top 52px !important
    height $navbarMobileHeight
    padding $navbarMobileVerticalPadding $navbarMobileHorizontalPadding
    padding-left $navbarMobileHorizontalPadding + 2.4rem
    line-height $navbarMobileHeight - $navbarMobileVerticalPadding * 2

  .hide-navbar &.can-hide
    transform translateY(-100%)

  a, span, img
    display inline-block

  .home-link:hover .site-name
    color var(--accent-color)

  .logo
    min-width $navbarHeight - $navbarVerticalPadding * 2
    height $navbarHeight - $navbarVerticalPadding * 2
    margin-right 0.8rem
    vertical-align top

    @media (max-width $MQMobile)
      min-width $navbarMobileHeight - $navbarMobileVerticalPadding * 2
      height $navbarMobileHeight - $navbarMobileVerticalPadding * 2

    .theme-light &
      &.light
        display block

      &.dark
        display none

    .theme-dark &
      &.light
        display none

      &.dark
        display block

  .can-hide
    @media (max-width $MQMobile)
      display none

  .site-name
    font-size 1.3rem
    font-weight 600
    color var(--text-color)
    position relative

    @media (max-width $MQMobile)
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

  .links
    position absolute
    top $navbarVerticalPadding
    right $navbarHorizontalPadding
    display flex
    box-sizing border-box
    padding-left 1.5rem
    font-size 1.0rem
    white-space nowrap
    color white

    @media (max-width $MQMobile)
      padding-left 0
      top $navbarMobileVerticalPadding
      right $navbarMobileHorizontalPadding
</style>
