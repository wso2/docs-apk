<template>
  <nav v-if="userLinks.length || repoLink" class="nav-links">
    <!-- user links -->
    <div v-for="item in userLinks" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>



    <!-- repo link -->
    <a
      v-if="repoLink && $themeConfig.repoDisplay !== false"
      class="repo-link"
      rel="noopener noreferrer"
      :href="repoLink"
      target="_blank"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script src="./NavLinks" />

<style lang="stylus">
.nav-links
  display inline-block

.nav-item
  position relative
  display inline-block
  line-height 2rem
  font-size 15px
  color white !important
  padding 0
  border-radius 5px
  transition 0.3s

  &:hover
    background-color #E6E6E6

  @media (max-width $MQMobile)
    margin-left 0

  &:first-child
    margin-left 0

  > .nav-link
    transition 0.3s

    @media (min-width $MQMobile)
      color var(--dark-grey)

      &.active
        font-weight 700

      &:hover, &.active
        ^[0]:hover &
          background-color #E6E6E6

.repo-link
  color var(--dark-grey)
  margin-left 1.5rem

  @media (max-width $MQMobile)
    margin-left 0

.mobile-signup
  display none !important
  margin 0.5em 1rem

  .button
    padding 5px 10px

  @media (max-width $MQMobile)
    display block !important
</style>
