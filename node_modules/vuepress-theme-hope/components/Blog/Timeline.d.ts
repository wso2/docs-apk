import { TimelineMixin } from "@theme/util/articleMixin";
import type { SidebarHeader } from "@theme/util/groupHeader";
declare const Timeline_base: import("vue-class-component/lib/declarations").VueClass<TimelineMixin>;
export default class Timeline extends Timeline_base {
    get hint(): string;
    get anchorConfig(): SidebarHeader[];
    navigate(url: string): void;
}
export {};
