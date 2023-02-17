<template>
  <div class="fragment-line-height-fix">
   <Content :pageKey="getPageKey()" />
  </div>
</template>

<script>

export default {
  name: "CommonGuide",
  props: [ 'guide' ],
  methods: {
      getPageKey() {
        const pages = this.$site.pages
        let requiredGuideKey;
        for (let i in pages) {
        	if(pages[i].relativePath === this.guide){
        	  requiredGuideKey = pages[i].key;
        	  }
        	}
        return requiredGuideKey;
        }
    }
};
</script>
