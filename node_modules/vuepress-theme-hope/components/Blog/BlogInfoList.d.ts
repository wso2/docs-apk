import { StarMixin } from "@theme/util/articleMixin";
declare const BlogInfo_base: import("vue-class-component/lib/declarations").VueClass<StarMixin>;
export default class BlogInfo extends BlogInfo_base {
    private active;
    private get i18n();
    private get articleNumber();
    private setActive;
    private navigate;
}
export {};
