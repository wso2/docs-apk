<template>
  <RouterLink
    v-if="isInternal"
    class="nav-link"
    :class="{ active }"
    :to="link"
    @focusout="focusoutAction"
    @click.native="setSideBarIndex()"
  >
    <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    {{ item.text }}
  </RouterLink>
  <a
    v-else
    class="nav-link external"
    :href="link"
    :target="target"
    :rel="rel"
    @focusout="focusoutAction"
  >
    <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script src="./NavLink" />

<style lang="stylus">
.nav-link
  line-height 1.4rem
  color #2E6CE6 !important
  padding-right 1rem
  padding-left 1rem
  padding-top 0.5rem
  padding-bottom 0.5rem
  font-size 15px
  font-weight 500

  @media (max-width $MQMobile)
    color var(--text-color) !important

    &:hover, &.active
      color var(--accent-color) !important
</style>
