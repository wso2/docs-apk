const {config} = require("vuepress-theme-hope");

const HOSTNAME = process.env.HOSTNAME || 'https://wso2.com'
const BASE_PATH = process.env.BASE_PATH || '/apk/docs/'
const CANONICAL_BASE = process.env.CANONICAL_BASE || `${HOSTNAME}${BASE_PATH}`

module.exports = config({
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: "Docs",
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: "Get started with APK. Fully integrated developer experience to create seamless login experiences in minutes.",
    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['meta', {name: 'google-site-verification', content: 't7sfVDHspOQUclosR3wjsyXV34xmdbqiefY0WeLfqgM'}],
        ['script', {}, `
            (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                 'gtm.start': new Date().getTime(),
                 event: 'gtm.js'
               });
               var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
               j.setAttributeNode(d.createAttribute('data-ot-ignore'));
               j.async = true;
               j.src =
                 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
               f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-PSTXMT');
        `
        ]  
        /**
        ['script', {src: '/scripts/analytics.js'}],
        ['script', {src: '/scripts/hotjar.js'}],
        ['script', {src: '/scripts/app-insights.js'}],
        ['noscript', {}, 
            `<iframe src="//www.googletagmanager.com/ns.html?id=GTM-PSTXMT" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        ],
        ['script', {}, `
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({'gtm.start':
                            new Date().getTime(), event: 'gtm.js'});
                var f = d.getElementsByTagName(s)[0], d
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-PSTXMT');
        `
        ]
        */
    ],

    base: BASE_PATH,
    dest: 'docs/.vuepress/dist/apk/docs',

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */

    themeConfig: {
        hostname : HOSTNAME,
        displayAllHeaders: false,
        repo: '',
        editLinks: true,
        docsDir: '',
        docVersion: "BETA",
        productTitle: "Documentation",
        editLinkText: 'Edit this page on Github',
        logo: '/assets/img/apk-logo-b.png',

        search: true,
        algoliaType: "full",
        Navbar: true,
        blog: false,
        feed: false,
        pwa: false,
        sitemap: true,
        darkmode: 'switch',
        footer: {
            display: true,
            content: '© ' + new Date().getFullYear() + ' WSO2 LLC'
        },
        git: {
            contributor:false
        },
        pageInfo: false,
        nextLinks: false,
        prevLinks: false,
        nav: [
          {
            text: "Get Started",
            link: "/get-started/"
          },
//          {
//            text: "API Management",
//            link: "/apim/"
//          },
          {
            text: 'Catalogs',
            link: '/catalogs/'
          },
          {
            text: 'References',
            link: '/references/'
          },
          {
            text: 'Setup',
            link: '/setup/'
          },
          {
            text: 'Reach Out',
            link: '/reachout/'
          },
          {
            text: "API Management",
            link: "/apim/"
          }
        ],
        sidebar: {
            '/get-started/' : [
                ['', 'Overview'],
                ['quick-start-guide.md', 'Quick Start'],
                {
                    title: 'Basic Flow',
                    prefix: 'basic-flow/',
                    path: 'basic-flow/',
                    sidebarDepth: 1,
                    children: [
                        ['create-api.md', 'Create an API'],
                        ['discover-your-services.md', 'Discover Your Services'],
                        {
                            title: 'Create an API Proxy',
                            prefix: 'api-proxy/',
                            path: 'api-proxy/',
                            sidebarDepth: 2,
                            children: [
                                ['from-scratch.md', 'From Scratch'],
                                ['from-existing-definition.md', 'From an Existing Definition']
                            ]
                        },
                        ['test-api.md', 'Test API'],
                        ['publish-api.md', 'Publish Your API']
                    ]
                }
            ],
            '/catalogs/' : [
                ['', 'Overview'],
                {
                    title: 'API Catalogs',
                    prefix: 'rest-api/',
                    path: 'rest-api/',
                    sidebarDepth: 2,
                    children: [
                        ['gateway-api-catalog.md', 'Gateway'],
                        ['back-office-api-catalog.md', 'Back Office'],
                        ['runtime-api-catalog.md', 'Runtime'],
                        ['developer-portal-api-catalog.md', 'Developer Portal'],
                        ['admin-api-catalog.md', 'Admin']
                    ]
                },
                ['cli-catalog.md', 'CLI Catalog'],
                ['crd-catalog.md', 'CRD Catalog']
            ],
            '/references/' : [
                ['', 'Overview'],
                ['about-this-release.md', 'About This Release'],
                ['architecture.md', 'Architecture'],
                ['https://wso2.com/api-manager/', 'Product Pitch'],
                {
                    title: 'Key Concepts',
                    prefix: 'key-concepts/',
                    path: 'key-concepts/',
                    sidebarDepth: 1,
                    children: [
                        ['key-concept1.md', 'Key Concept 1'],
                        ['key-concept2.md', 'Key Concept 2']
                    ]
                },
                {
                    title: 'APK Deck',
                    prefix: 'apk-deck/',
                    path: 'apk-deck/',
                    sidebarDepth: 2,
                    children: [
                        {
                            title: 'Gateway',
                            prefix: 'gateway/',
                            path: 'gateway/',
                            sidebarDepth: 3,
                            children: [
                                ['gateway1.md', 'Topic 1'],
                                ['gateway2.md', 'Topic 2']
                            ]
                        },
                        {
                            title: 'Key Manager',
                            prefix: 'key-manager/',
                            path: 'key-manager/',
                            sidebarDepth: 3,
                            children: [
                                ['key-manager1.md', 'Topic 1'],
                                ['key-manager2.md', 'Topic 2']
                            ]
                        },
                        {
                            title: 'Back Office',
                            prefix: 'back-office/',
                            path: 'back-office/',
                            sidebarDepth: 3,
                            children: [
                                ['back-office1.md', 'Topic 1'],
                                ['back-office2.md', 'Topic 2']
                            ]
                        },
                        {
                            title: 'Runtime',
                            prefix: 'runtime/',
                            path: 'runtime/',
                            sidebarDepth: 3,
                            children: [
                                ['runtime1.md', 'Topic 1'],
                                ['runtime2.md', 'Topic 2']
                            ]
                        },
                        {
                            title: 'Developer Portal',
                            prefix: 'devportal/',
                            path: 'devportal/',
                            sidebarDepth: 3,
                            children: [
                                ['devportal1.md', 'Topic 1'],
                                ['devportal2.md', 'Topic 2']
                            ]
                        },
                        {
                            title: 'Admin',
                            prefix: 'admin/',
                            path: 'admin/',
                            sidebarDepth: 3,
                            children: [
                                ['admin1.md', 'Topic 1'],
                                ['admin2.md', 'Topic 2']
                            ]
                        }
                    ]
                }
            ],
            '/setup/' : [
                ['', 'Overview'],
                ['prerequisites.md', 'Prerequisites'],
                ['architecture.md', 'Install'],
                {
                    title: 'Deploy',
                    prefix: 'deploy/',
                    path: 'deploy/',
                    sidebarDepth: 1,
                    children: [
                        ['', 'Deployment Patterns'],
                        ['deployment-pattern-1.md', 'All-in-One'],
                        {
                            title: 'Distributed',
                            prefix: 'distributed/',
                            path: 'distributed/',
                            sidebarDepth: 2,
                            children: [
                                ['deployment-pattern-2.md', 'Deployment Pattern 2'],
                                ['deployment-pattern-3.md', 'Deployment Pattern 3']
                            ]
                        }
                    ]
                },
                ['ci-cd.md', 'CI/CD'],
                {
                    title: 'Customizations',
                    prefix: 'customizations/',
                    path: 'customizations/',
                    sidebarDepth: 1,
                    children: [
                        {
                            title: 'Gateway',
                            prefix: 'gateway/',
                            path: 'gateway/',
                            sidebarDepth: 2,
                            children: [
                                ['gateway-customizations-1.md', 'Gateway Customizations 1'],
                                ['gateway-customizations-2.md', 'Gateway Customization 2']
                            ]
                        },
                        {
                            title: 'Key Manager',
                            prefix: 'key-manager/',
                            path: 'key-manager/',
                            sidebarDepth: 2,
                            children: [
                                ['key-manager-customizations-1.md', 'Key Manager Customizations 1'],
                                ['key-manager-customizations-2.md', 'Key Manager Customization 2']
                            ]
                        }
                    ]
                }
            ],
            '/reachout/' : [
                ['', 'Overview'],
                ['https://wso2.com/subscription/#support', 'Support'],
                ['community.md', 'Community'],
                ['report-bugs.md', 'Report Bugs'],
                ['https://wso2.com/training/', 'Training and Certification'],
                ['https://wso2.com/library/', 'Resources']
            ]
        },
        mdEnhance: {
            align : true
        },
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
        'tabs',
        ['check-md', {
            exitLevel: 'error'
        }],
        'vuepress-plugin-chunkload-redirect',
        ['@xiaopanda/vuepress-plugin-code-copy', {
            buttonStaticIcon: true,
            buttonIconTitle: "Copy to clipboard",
            buttonAlign: "top",
            buttonColor: "#888"
        }],
        [require('./plugins/canonical'), { CANONICAL_BASE }],
        ['robots', { 
            host: CANONICAL_BASE,
            sitemap: "/sitemap.xml",
            policies: [
                {
                    userAgent: '*',
                    allow: '/'
                }
            ]
        }]
    ]
});
