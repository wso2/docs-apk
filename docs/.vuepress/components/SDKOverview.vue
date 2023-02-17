<template>
  <!-- This component reads from docs/sdks/README.md and generates UI components dynamically. -->
  <main class="sdks-page">
    <div  
      v-for="(sdkDomain, index) in $frontmatter.sdkContent"
      :key="index"
    >
      <MyTransition :delay="0.01">
        <div class="sub-title-container">
          <h2 v-text="sdkDomain.name"></h2>
        </div>
      </MyTransition>
      <MyTransition :delay="0.01">
        <div class="tech-container">
          <SDKItemCard
            v-for="(technology, index) in sdkDomain.technologies"
            :key="index"
            :techIconPath="technology.icon"
            :techName="technology.name"
            :sdkPath="technology.sdkPath"
            :gitUrl="technology.gitUrl"
            :appUrl="technology.appUrl"
            :source="technology.source"
          ></SDKItemCard>
        </div>
      </MyTransition>
    </div>
  </main>
</template>

<script>
import MyTransition from "@theme/components/MyTransition.vue";
import SDKItemCard from './SDKItemCard.vue';
export default {
  name: 'SDKOverview',
  components: { MyTransition, SDKItemCard },
}
</script>

<style src="../theme/styles/components/sdkOverview.styl" lang="stylus"/>
