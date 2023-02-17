<template>
  <section
    :class="[
      {
        collapsable: item.collapsable,
        'is-sub-group': depth !== 0,
      },
      `depth-${depth}`,
    ]"
    class="sidebar-group"
  >
    <RouterLink
      v-if="item.path"
      :class="{
        open,
        active: isActive($route, item.path),
      }"
      class="sidebar-heading clickable"
      :to="item.path"
      @click="$emit('toggle')"
    >
      <p
        :class="{ clickable: item.collapsable, open }"
        class="sidebar-heading"
        @click="$emit('toggle')"
      >
        <span>{{ item.title }}</span>
        <i v-if="item.collapsable" :class="open ? 'down' : 'right'" class="fas fa-angle-right sidebar-caret"></i>
      </p>
    </RouterLink>
    <a v-else class="sidebar-heading clickable">
      <p
        :class="{ clickable: item.collapsable, open }"
        class="sidebar-heading"
        @click="$emit('toggle')"
      >
        <span>{{ item.title }}</span>
        <i v-if="item.collapsable" :class="open ? 'down' : 'right'" class="fas fa-angle-right sidebar-caret"></i>
      </p>
    </a>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !item.collapsable"
        class="sidebar-group-items"
        :depth="depth + 1"
        :items="item.children"
      />
    </DropdownTransition>
  </section>
</template>

<script src="./SidebarGroup" />

<style lang="stylus">
.sidebar-group
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      color inherit
      cursor auto

  // refine styles of nested sidebar groups
  &.is-sub-group
    & > .sidebar-heading
      padding-left 20px
      font-size 14px
      font-weight normal

      &:not(.clickable)
        opacity 0.8

    & > .sidebar-group-items
      padding-left 1rem

      & > li > .sidebar-link
        border-left none
  
  &.depth-1
    line-height 1.9

  &.depth-2
    & > .sidebar-heading
      border-left none
  
  &.depth-0
    padding-bottom 10px
    padding-top 10px

.sidebar-heading
  box-sizing border-box
  width 100%
  margin 0
  color var(--text-color)
  font-size 14px
  cursor pointer
  transition color 0.15s ease
  user-select none

  .depth-1 &
    font-size 14px
    line-height 1.4

  .depth-2 &
    font-size 14px
  
  .depth-3 &
    font-size 14px

  img
    padding-right 0.3em !important
    
    // Invert color of the icon in the dark theme
    .theme-dark &
      filter invert(1)

  &.open, &:hover
    color inherit
  
  &.active
    .clickable
      color inherit

  .arrow
    position relative
    vertical-align middle
    float right
    top 15px

  &.clickable
    &.active
      border-left-color var(--accent-color)
      color var(--accent-color)

    &:hover
      color var(--accent-color)

.sidebar-group-items
  transition height 0.1s ease-out
  overflow hidden

.sidebar-caret
  float right
  padding-right 5px
  transition 0.3s
  font-size 12px

  .depth-0 &
    line-height 2.5

  .depth-1 &
    line-height 1.7

  &.down
    transform rotate(90deg) translateY(3px)
</style>
