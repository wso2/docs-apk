import { __decorate } from "tslib";
import { Component, Mixins } from "vue-property-decorator";
import Anchor from "@theme/components/Anchor.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
let Timeline = class Timeline extends Mixins(TimelineMixin) {
    get hint() {
        return ((this.$themeConfig.blog && this.$themeConfig.blog.timeline) ||
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.$themeLocaleConfig.blog.timelineText ||
            getDefaultLocale().blog.timelineText);
    }
    get anchorConfig() {
        return this.$timeline.map((item) => ({
            title: item.year.toString(),
            level: 2,
            slug: item.year.toString(),
        }));
    }
    navigate(url) {
        void this.$router.push(url);
    }
};
Timeline = __decorate([
    Component({ components: { Anchor, MyTransition } })
], Timeline);
export default Timeline;
//# sourceMappingURL=Timeline.js.map