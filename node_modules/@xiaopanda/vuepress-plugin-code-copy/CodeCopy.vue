<template>
  <div>
    <svg
      class="copy-button"
      v-show="showCopyButton"
      @click="success"
      :class="{ hover: iconClass }"
      :style="alignStyle"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-labelledby="copyIconTitle"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
      :color="color"
    >
      <title id="copyIconTitle">{{ iconTitle }}</title>
      <rect width="12" height="14" x="8" y="7" />
      <polyline points="16 3 4 3 4 17" />
    </svg>

    <svg
      class="copy-ok"
      v-show="!showCopyButton"
      :style="alignStyle"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-labelledby="okIconTitle"
      stroke="#3eaf7c"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
      color="#3eaf7c"
    >
      <title id="okIconTitle">Ok</title>
      <polyline points="4 13 9 18 20 7" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCopyButton: true,
    };
  },
  computed: {
    iconClass() {
      return !BUTTON_STATIC_ICON;
    },
    iconTitle() {
      return BUTTON_ICON_TITLE;
    },
    alignStyle() {
      let style = {};
      style[BUTTON_ALIGN] = "0.5em";
      return style;
    },
    color() {
      return BUTTON_COLOR;
    },
  },
  methods: {
    success() {
      this.showCopyButton = !this.showCopyButton;
      setTimeout(() => {
        this.reset();
      }, 500);
    },
    reset() {
      this.showCopyButton = !this.showCopyButton;
    },
  },
};
</script>

<style scoped>
.copy-button {
  position: absolute;
  z-index: 3;
  right: 0.5em;
  cursor: pointer;
  opacity: 0.75;
}

.copy-button.hover {
  opacity: 0;
}

.copy-button:hover {
  opacity: 1.75 !important;
}

.copy-ok {
  position: absolute;
  z-index: 3;
  right: 0.5em;
  /* top: 0.5em; */
}
</style>