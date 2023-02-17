"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlias = void 0;
const path_1 = require("path");
const getAlias = (themeConfig, ctx) => {
    const { siteConfig } = ctx;
    // Resolve algolia
    const isAlgoliaSearch = Boolean(themeConfig.algolia) ||
        Object.keys((siteConfig.locales && themeConfig.locales) || {}).some((base) => themeConfig.locales[base].algolia);
    const blogEnabled = themeConfig.blog !== false;
    const commentEnabled = themeConfig.comment &&
        themeConfig.comment.type &&
        themeConfig.comment.type !== "disable";
    const themeColorEnabled = !(themeConfig.themeColor === false && themeConfig.darkmode === "disable");
    const noopModule = "vuepress-theme-hope/util/noopModule";
    return {
        "@AlgoliaSearchBox": isAlgoliaSearch
            ? themeConfig.algoliaType === "full"
                ? path_1.resolve(__dirname, "../components/AlgoliaSearch/Full.vue")
                : path_1.resolve(__dirname, "../components/AlgoliaSearch/Dropdown.vue")
            : noopModule,
        "@BlogInfo": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BlogInfo.vue")
            : noopModule,
        "@BlogHome": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BlogHome.vue")
            : noopModule,
        "@BlogPage": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BlogPage.vue")
            : noopModule,
        "@Comment": commentEnabled
            ? "@mr-hope/vuepress-plugin-comment/lib/client/Comment.vue"
            : noopModule,
        "@ThemeColor": themeColorEnabled
            ? path_1.resolve(__dirname, "../components/Theme/ThemeColor.vue")
            : noopModule,
    };
};
exports.getAlias = getAlias;
//# sourceMappingURL=alias.js.map