<template>
  <main class="page">
    <MyTransition>
      <BreadCrumb :key="$route.path" />
          </MyTransition>

    <slot name="top" />

    <MyTransition v-if="commentEnable" :delay="0.04">
      <PageInfo :key="$route.path" />
    </MyTransition>

    <MyTransition :delay="0.08">
      <Password
        v-if="pagePassword && !pageDescrypted"
        :key="$route.path"
        :page="true"
        @password-verify="password = $event"
      />
    </MyTransition>

    <MyTransition v-if="!pagePassword || pageDescrypted" :delay="0.12">
      <Anchor :key="$route.path" :header="headers" />
    </MyTransition>

    <MyTransition v-show="!pagePassword || pageDescrypted" :delay="0.08">
      <Content :key="$route.path" class="theme-default-content" />
    </MyTransition>

    <MyTransition v-if="!pagePassword || pageDescrypted" :delay="0.12">
      <PageEdit :key="$route.path" />
    </MyTransition>

    <MyTransition v-if="!pagePassword || pageDescrypted" :delay="0.14">
      <PageNav :key="$route.path" v-bind="{ sidebarItems }" />
    </MyTransition>

    <MyTransition
      v-if="(!pagePassword || pageDescrypted) && commentEnable"
      :delay="0.16"
    >
      <Comment :key="$route.path" />
    </MyTransition>

    <slot name="bottom" />
  </main>
</template>

<script src="./Page" />

<style lang="stylus">
.page
  display block
  box-sizing border-box
  min-height 100vh
  padding-bottom 2rem
  background var(--bgcolor)
  margin-top 100px
  padding-left 24rem

  @media (max-width $MQMobile)
    min-height 100vh

  // narrow desktop / iPad
  @media (max-width $MQNarrow)
    padding-left $mobileSidebarWidth

  @media (min-width ($MQMobile + 1px))
    .theme-container:not(.has-sidebar) &
      padding-left 0
    
    .theme-container:not(.has-anchor) &
      padding-right 2rem

  // wide mobile
  @media (max-width $MQMobile)
    padding-left 0

  @media (min-width $MQWide)
    padding-right 12rem

    .has-anchor &
      padding-right 20rem
  
  .page-title
    max-width $contentWidth + 200rem
    padding-bottom 0

    .has-anchor &
      max-width $contentWidth

  .breadcrumb
    max-width $contentWidth + 200rem
    padding-bottom 1rem

    .has-anchor &
      max-width $contentWidth

    li
      font-size 14px
      font-weight 600
</style>
