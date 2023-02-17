"use strict";
const alias_1 = require("./node/alias");
const config_1 = require("./node/config");
const eject_1 = require("./node/eject");
const plugins_1 = require("./node/plugins");
// Theme API.
const themeAPI = (themeConfig, ctx) => ({
    alias: alias_1.getAlias(themeConfig, ctx),
    plugins: plugins_1.getPluginConfig(themeConfig),
    additionalPages: themeConfig.blog === false
        ? []
        : [
            {
                path: "/article/",
                frontmatter: { layout: "Blog" },
            },
            {
                path: "/star/",
                frontmatter: { layout: "Blog" },
            },
            {
                path: "/encrypt/",
                frontmatter: { layout: "Blog" },
            },
            {
                path: "/slide/",
                frontmatter: { layout: "Blog" },
            },
            {
                path: "/timeline/",
                frontmatter: { layout: "Blog" },
            },
        ],
    extendCli: (cli) => {
        cli
            .command("eject-hope [targetDir]", "copy vuepress-theme-hope into .vuepress/theme for customization.")
            .option("--debug", "eject in debug mode")
            .action((dir = ".") => {
            void eject_1.eject(dir);
        });
    },
});
themeAPI.config = config_1.config;
module.exports = themeAPI;
//# sourceMappingURL=index.js.map