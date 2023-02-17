<template>
    <div class="tech-item-container">
      <div class="label-container">
        <img v-else-if="source === 'third-party'" class="status-label" :src="require(`../theme/assets/images/third-party-label.svg`)" />
      </div>
      <div class="tech-item">
        <a class="icon-container">
        <img class="tech-icon" :src="require(`../theme/assets/${ techIconPath }`)" width="100" height="100"/>
        </a>
        <p class="tech-name" v-text="techName"></p>
        <div class="tech-links">
          <a class="tech-link" @click="navigate(sdkPath)">
              <i class="fa fa-flask"></i>
              Try It
          </a>
          <a class="tech-link" :href="appUrl" target="_blank">
              <i class="fas fa-download"></i>
              Sample App
          </a>
          <a class="tech-link" :href="gitUrl" target="_blank">
              <i class="fab fa-github"></i>
              Github
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import MyTransition from "@theme/components/MyTransition.vue";
export default {
  name: 'SDKItemCard',
  components: { MyTransition },
  methods: {
    navigate(url) {
      void this.$router.push(url);
    }
  },
  props: {
      techIconPath: String,
      techName: String,
      sdkPath: String,
      gitUrl: String,
      appUrl: String,
      source: String
  }
}
</script>

<style src="../theme/styles/components/sdkOverview.styl" lang="stylus"/>
