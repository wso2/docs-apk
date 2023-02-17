import Vue from "vue";
import MyTransition from "@theme/components/MyTransition.vue";
import NavLink from "@theme/components/NavLink.vue";
import { navigate } from "@theme/util/navigate";
import Banner from "../../components/Banner";
export default Vue.extend({
    name: "Home",
    components: { MyTransition, NavLink, Banner },
    computed: {
        actionLinks() {
            const { action } = this.$frontmatter;
            if (Array.isArray(action))
                return action;
            return [action];
        },
    },
    methods: {
        navigate(link) {
            navigate(link, this.$router, this.$route);
        },
    },
});
//# sourceMappingURL=Home.js.map
