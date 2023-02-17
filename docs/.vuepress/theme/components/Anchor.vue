<script src="./Anchor" />

<style lang="stylus">
$headings = 2 3 4 5 6

.anchor-place-holder
  position fixed
  top ($navbarHeight + 3rem)
  max-width $contentWidth
  right 17rem

  & + .theme-default-content:not(.custom)
    padding-top 0

#anchor
  display none
  position absolute
  width 16rem
  max-height 80vh
  //overflow-y scroll

  @media (min-width $MQWide)
    .has-anchor &
      display block

  &::-webkit-scrollbar-track-piece
    background transparent

  &::-webkit-scrollbar
    width 3px

  &::-webkit-scrollbar-thumb:vertical
    background #ddd

    .theme-dark &
      background #333

  .anchor-wrapper
    position relative

    &::after
      content ' '
      position absolute
      top 4px
      left 5px
      bottom 0px
      width 3px
      margin-left -2px
      background var(--border-color)
      z-index -1

    > .anchor-list
      margin 0

  .anchor-list
    padding 0

  .anchor
    box-sizing border-box
    padding 0px 0px 0px 20px
    line-height 1.5
    list-style none

    &.anchor2
      padding-top 8px
      padding-bottom 8px
    
    &.anchor3
      padding-top 5px
      padding-bottom 5px

    .anchor-link
      display inline-block
      position relative
      max-width 100%
      color var(--right-nav-color)

      > div
        //text-overflow ellipsis
        //overflow hidden
        line-height 1.2

      &::before
        content ' '
        position absolute
        z-index 2
        top 50%
        width 3px
        height 33px
        margin-left -1px
        margin-top -16px

      &.active
        color var(--accent-color)

        &::before
          background var(--accent-color)

      &:hover
        color var(--accent-color)

    for $heading in $headings
      &.anchor{$heading} .anchor-link
        font-size (16 - $heading)px

        &::before
          left (-20 * $heading + 24)px
</style>

