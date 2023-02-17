<script src="./SidebarLink" />

<style lang="stylus">
.sidebar
  .sidebar-links
    ul.sidebar-sub-headers
      padding-left 1rem
      font-size 14px

      .has-anchor &
        @media (min-width $MQWide)
          display none

  & > .sidebar-links > li:first-child > a
    font-size 14px
    line-height 1.9
    padding 11.5px 0

a.sidebar-link
  display inline-block
  box-sizing border-box
  width 100%
  color var(--text-color)
  font-size 14px
  line-height 1.4
  font-weight 400

  &:hover
    color var(--accent-color)

  &.active
    color var(--accent-color)
    border-left-color var(--accent-color)

  .sidebar-group &
    padding-left 20px

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      font-weight 500
</style>
