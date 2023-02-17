<template>
  <RouterLink class="item" :to="itemRouterPath">
    <a>
      <img
        class="item-icon"
        :src="require(`../theme/assets/${ itemIconPath }`)"
        width="100"
        height="100"
      />
    </a>
    <p class="item-name" v-text="itemName"></p>
  </RouterLink>
</template>

<script>
export default {
  name: "ItemCard",
  methods: {
    navigate(url) {
      void this.$router.push(url);
    },
  },
  props: {
    itemIconPath: String,
    itemName: String,
    itemRouterPath: String
  },
};
</script>

<style src="../theme/styles/components/cardView.styl" lang="stylus"/>
