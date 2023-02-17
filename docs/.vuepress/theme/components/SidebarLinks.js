import Vue from "vue";
import SidebarGroup from "@theme/components/SidebarGroup.vue";
import SidebarLink from "@theme/components/SidebarLink.vue";
import { isActive } from "@theme/util/path";
const descendantIsActive = (route, item) => {
    if (item.type === "group") {
        if (item.path === "") {
            return item.children.some((child) => {
                if (child.type === "group")
                    return descendantIsActive(route, child);
                return child.type === "page" && isActive(route, child.path);
            });
        } else {
            // Added condition for collapsible sidebar item with an index page.
            if (item.path === route.path) {
                return true;
            } else {
                return item.children.some((child) => {
                    if (child.type === "group")
                        return descendantIsActive(route, child);
                    return child.type === "page" && isActive(route, child.path);
                });
            }
        }
    }
    return false;
};
const resolveOpenGroupIndex = (route, items) => {
    for (let i = 0; i < items.length; i++)
        if (descendantIsActive(route, items[i]))
            return i;
    return -1;
};
export default Vue.extend({
    name: "SidebarLinks",
    components: { SidebarGroup, SidebarLink },
    props: {
        items: {
            type: Array,
            required: true,
        },
        depth: { type: Number, required: true },
    },
    data: () => ({
        openGroupIndex: null,
    }),
    watch: {
        $route() {
            this.refreshIndex();
        },
    },
    created() {
        this.$root.$refs.SidebarLinksComponent = this;
        this.openGroupIndex = -1;
        this.refreshIndex();
    },
    methods: {
        refreshIndex() {
            const index = resolveOpenGroupIndex(this.$route, this.items);
            if (index > -1)
                this.openGroupIndex = index;
        },
        toggleGroup(index) {
            this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
        },
        isActive(page) {
            return isActive(this.$route, page.regularPath);
        },
        resetIndex() {
            this.openGroupIndex = -1;
        }
    },
});
//# sourceMappingURL=SidebarLinks.js.map
