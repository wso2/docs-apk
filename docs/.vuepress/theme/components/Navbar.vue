<template>
  <div class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
        :to="$localePath"
        class="home-link"
    >
      <img
          v-if="$site.themeConfig.productTitle"
          class="logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$site.themeConfig.productTitle"
      >
      <span
          v-if="$site.themeConfig.productTitle"
          ref="siteName"
          class="site-name"
      >{{ $site.themeConfig.productTitle }}</span>
      <!-- <span
          v-if="$site.themeConfig.docVersion"
          class="site-version"
      >{{ $site.themeConfig.docVersion }}</span> -->
    </RouterLink>
    <div class="site-nav">
      <NavLinks class="can-hide" />
    </div>
    <div
        class="links"
        :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <DarkmodeSwitch class="darkmode-switch"/>
      <AlgoliaSearchBox
          v-if="isAlgoliaSearch"
          :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
      <div @click="appInsightEvent">
        <Button
          class="header-signup-btn"
          buttonType="default-outlined"
          buttonText="Download APK"
          v-bind:openInNewTab="true"
          externalLink="https://wso2.com/api-manager/"
        />
      </div>
    </div>
  </div>
</template>

<!--<script src="./Navbar" />-->

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import Button from "../../components/Button"
import DarkmodeSwitch from "@theme/components/Theme/DarkmodeSwitch.vue"
export default {
  name: 'Navbar',
  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
    Button, 
    DarkmodeSwitch
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
  },
  methods: {
    appInsightEvent: function (e) {
      window.appInsights.trackEvent({name: "docs-header-click-signup"});
    }
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
.navbar
  position fixed
  display flex
  justify-content center
  z-index 20
  top 0
  left 0
  right 0
  height $navbarHeight
  width 100vw
  padding $navbarVerticalPadding 1.5em
  background var(--bgcolor)
  box-sizing border-box
  line-height $navbarHeight - $navbarVerticalPadding * 2
  transition 0.3s ease-in-out
  box-shadow 0 2px 8px var(--card-shadow-color)

  @media (max-width 1236px)
    padding $navbarVerticalPadding 10px

  .has-sidebar &
    padding $navbarVerticalPadding 1.5em
    box-shadow 0 2px 8px var(--card-shadow-color)

  @media (max-width $MQMobile)
    padding-left $navbarMobileHorizontalPadding + 2.4rem

  // .hide-navbar &.can-hide
  //   transform translateY(-100%)

  a, span, img
    display inline-block
    color #080808

  .home-link
    height 90%
    flex 2
    display flex
    justify-content flex-start
    
    @media (max-width $MQNarrow)
      flex 0 0
      flex-basis auto

    @media (max-width $MQMobile)
      margin-left 15px

  .logo
    min-width $navbarHeight - $navbarVerticalPadding * 2
    height 20px
    padding 12px 0px 10px 7px
    vertical-align top

    @media (max-width $MQMobile)
      height 20px

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
    font-size 20px
    font-weight 500
    color #080808
    position relative
    padding-left 5px

    @media (max-width $MQMobile)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

  .site-version
    font-size 0.5em
    font-weight 600
    color white
    position absolute
    background-color #f77301
    padding 3px 6px
    border-radius 4px
    line-height 0.5rem !important
    margin-left -2rem
    margin-top -2px

    @media (max-width $MQMobile)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

  .links
    top $navbarVerticalPadding
    right $navbarHorizontalPadding
    box-sizing border-box
    font-size 1.0rem
    white-space nowrap
    height 49px
    flex 2
    display flex
    justify-content flex-end

    @media (max-width $MQNarrow)
      flex 0 0
      flex-basis auto

    @media (max-width $MQMobile)
      padding-left 0
      top $navbarMobileVerticalPadding
      right $navbarMobileHorizontalPadding

  .button
    padding 7px 15px !important
    margin-left 10px !important
    font-size 14px !important
    width auto
    line-height 1
    border-radius 0.25em
  
  .site-nav
    transition all 0.3s
    color #fff
    display flex
    justify-content center
    flex 3

    @media (max-width $MQNarrow)
      flex 3
  
  .header-signup-btn
    @media (max-width $MQNarrow)
      display none
</style>
