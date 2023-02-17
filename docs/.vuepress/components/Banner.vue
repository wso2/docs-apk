<template>
  <div class="banner">
    {{ bannerText }}
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props:  {
    bannerText: String,
  },
  data () {
    return {
      linksWrapMaxWidth: null,
      bannerText: this.bannerText
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
.banner
  position fixed
  z-index 5
  top 0
  left 0
  right 0
  height 3rem
  padding $navbarVerticalPadding $navbarHorizontalPadding
  background var(--banner-bgcolor)
  box-sizing border-box
  box-shadow 0 2px 8px var(--card-shadow-color)
  backdrop-filter saturate(200%) blur(20px)
  transition transform 0.3s ease-in-out
  margin-top 70px
  text-align center
  vertical-align center
  font-size 0.9em
  line-height: 25px;
  font-weight bold

  @media (max-width $MQMobile)
    margin-top 52px !important
    height $navbarMobileHeight
    padding $navbarMobileVerticalPadding $navbarMobileHorizontalPadding
    padding-left $navbarMobileHorizontalPadding + 2.4rem
    line-height 1.15rem

</style>
