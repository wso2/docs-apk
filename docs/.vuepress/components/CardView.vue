<template>
  <!-- This component reads from README.md and generates UI components dynamically. -->
  <main class="item-page" ref="itemPage">
    <MyTransition :delay="0.01">
        <header class="title-container">
          <h2 v-text="$frontmatter.heading"></h2>
          <p class="description" v-text="$frontmatter.subHeading"></p>
        </header>
    </MyTransition>
    <MyTransition v-if="$frontmatter.secondarySearch == true" :delay="0.01">
      <div class="search-container">
        <input class="search" v-model="query" type="text" placeholder="Search for technologies...">
      </div>
    </MyTransition>
    <MyTransition :delay="0.01">
      <transition-group v-if="getItems.length > 0" class="item-container" name="cardAnim" mode="out-in">
        <ItemCard
          v-for="item in getItems"
          :key="item.name"
          :itemIconPath="item.icon"
          :itemName="item.name"
          :itemRouterPath="item.path"
        ></ItemCard>
      </transition-group>
      <h4 v-else class="item-container" v-text="$frontmatter.searchEmptyText" name="cardAnim" mode="out-in"></h4>
    </MyTransition>
  </main>
</template>

<script>
import MyTransition from "@theme/components/MyTransition.vue";
import ItemCard from './ItemCard.vue';
export default {
  name: 'CardView',
  components: { MyTransition, ItemCard },
  data: () => ({
    query: "",
  }),
  computed: {
    getItems() {
      const { items } = this.$frontmatter;
      if (!this.query) {
        if (Array.isArray(items))
            return items;
        return [items];
      }
      else {
        const search = this.query.toUpperCase();
        return items.filter(function (item) {
          return item.name.toUpperCase().includes(search);
        });
      }
    }
  }
}
</script>

<style src="../theme/styles/components/cardView.styl" lang="stylus"/>
