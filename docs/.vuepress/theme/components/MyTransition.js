import Vue from "vue";
export default Vue.extend({
    name: "MyTransition",
    props: {
        delay: { type: Number, default: 0 },
        duration: { type: Number, default: 0.25 },
    },
    methods: {
        setStyle(items) {
            items.style.transition = `transform ${this.duration}s ease-in-out ${this.delay}s, opacity ${this.duration}s ease-in-out ${this.delay}s`;
            items.style.transform = "translateY(-20px)";
            items.style.opacity = "0";
        },
        unsetStyle(items) {
            items.style.transform = "translateY(0)";
            items.style.opacity = "1";
        },
        quickUnsetStyle(items) {
            items.style.transition = `transform 0s ease-in-out 0s, opacity 0s ease-in-out 0s`;
            items.style.opacity = "0";
        }
    },
});
//# sourceMappingURL=MyTransition.js.map