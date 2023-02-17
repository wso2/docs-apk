<template>
  <div :class="`${ displayType }`">
  <a v-if="externalLink && openInNewTab" :class="`button ${ buttonType }`" :href="externalLink" target="_blank">
    <div v-if="startIconPath"  class="start-icon-container">
      <img :src="require(`../theme/assets/${ startIconPath }`)"/>
    </div>
    {{ buttonText }}
    <div v-if="endIconPath"  class="end-icon-container">
      <img :src="require(`../theme/assets/${ endIconPath }`)"/>
    </div>
  </a>
  <a v-else-if="externalLink && !openInNewTab" :class="`button ${ buttonType }`" :href="externalLink">
    <div v-if="startIconPath"  class="start-icon-container">
      <img :src="require(`../theme/assets/${ startIconPath }`)"/>
    </div>
    {{ buttonText }}
    <div v-if="endIconPath"  class="end-icon-container">
      <img :src="require(`../theme/assets/${ endIconPath }`)"/>
    </div>
  </a>
  <button v-else :class="`button ${ buttonType }`" @click="handleClick">
    <div v-if="startIconPath"  class="start-icon-container">
      <img :src="require(`../theme/assets/${ startIconPath }`)"/>
    </div>
    {{ buttonText }}
    <div v-if="endIconPath"  class="end-icon-container">
      <img :src="require(`../theme/assets/${ endIconPath }`)"/>
    </div>
  </button>
  </div>
</template>

<script>

export default {
  name: "Button",
  props:  {
    buttonType: String,
    buttonText: String,
    buttonPath: String,
    externalLink: String,
    displayType: String,
    openInNewTab: Boolean,
    startIconPath: String,
    endIconPath: String
  },
  methods: {
  	handleClick: function(){
  	  if (this.buttonPath) {
        this.$router.push(this.buttonPath);
      }
    }
  }
};
</script>

<style lang="stylus">
.button
  border none
  padding 15px 30px
  text-align center
  text-decoration none
  display inline-block
  font-size 16px
  margin 4px 2px
  cursor pointer
  border-radius 4px
  font-weight 600
  font-family inherit

  &:hover 
    text-decoration none !important

  &.default
    background-color #e0e1e2
    color #5a5a5a

  &.primary
    background-color#2E6CE6
    color #fff
    border-style solid
    border-width 1px
    border-color#2E6CE6
    width 200px
    transition 0.3s ease-out

    &:hover
      box-shadow inset 200px 0 60px 0 #ffffff
      color#2E6CE6

  &.primary-outlined
    background-color transparent
    color#2E6CE6
    border-style solid
    border-width 1px
    border-color#2E6CE6
    width 200px
    transition 0.3s ease-out

    &:hover
      box-shadow inset 200px 0 60px 0#2E6CE6
      color #fff

  &.danger
     background-color #db2828
     color #fff

  &.success
     background-color #37ba45
     color #fff

  &.info
     background-color #2b85d0
     color #fff

  &.default-outlined
    background-color transparent
    color#2E6CE6
    border-style solid
    border-width 0.124em
    border-color#2E6CE6

  &.grey-outlined
    background-color transparent
    color #5a5a5a
    border-style solid
    border-width 0.145em
    border-color #e0e1e2
  
  &.grey-outlined-icon
    display inline-block
    vertical-align baseline
    min-height 1em
    line-height 2.75em
    background-color var(--bgcolor-light)
    color var(--text-color)
    border-style solid
    border-width 2px
    border-color var(--border-color)
    padding 5px 25px
    margin 0 2px 5px 0
    font-weight 500
    font-size 15px
    transition .3s

    &:hover
      border-color var(--accent-color-l10)

    .start-icon-container
      display flex
      float left

      img
        pointer-events none
        border none !important
        padding 3px 2px 3px 0 !important
        margin 0 5px 0 0 !important
        width auto
        height 35px

    .end-icon-container
      display flex
      float right

      img
        pointer-events none
        border none !important
        padding 12px 5px 8px 5px !important
        margin 0 !important
        width 18px
        height auto

.inline-button
  display inline
</style>

