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
//         algolia: {
//             appId: "FZZ2G9EYKZ",
//             // This is search only API key.
//             apiKey: "eb6a5c630b8ebd2d4d862a2b0aaa7a67",
//             indexName: "apk-algolia"
//         },
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
            link: "/get-started/",
          },
          {
            text: "API Management",
            link: "/apim/",
          },
          {
            text: 'Catalogs',
            link: '/catalogs/'
          },
          {
            text: 'References',
            link: '/references/',
          },
          {
            text: 'Setup',
            link: '/setup/'
          },
          {
            text: 'Reach Out',
            link: '/reach-out/'
          },
        ],
        sidebar: {
            '/get-started/' : [
                ['quick-start-guide.md', 'Quick Start'],
                {
                    title: 'Basic Flow',
                    prefix: 'basic-flow',
                    //path: 'basic-flow/',
                    children: [
                        ['create-api.md', 'Create an API'],
                        ['discover-your-services.md', 'Discover Your Services'],
                        {
                         title: 'Create an API Proxy',
                         prefix: 'api-proxy/',
                         //path: 'attributes/',
                        children: [
                            ['from-scratch.md', 'From Scratch'],
                            ['from-existing-definition.md', 'From an Existing Definition'],
                        ]
                        },
                        ['test-api.md', 'Test API'],
                        ['publish-api.md', 'Publish Your API'],
                    ]
                }
            ]
//          '/catalogs/' : [
//              {
//                  title: 'Catalogs',
//                  prefix: 'catalogs',
//                  //path: 'catalogs/',
//                  children: [
//                      //['', 'CRD Catalog'],
//                      {
//                          title: 'API Catalogs',
//                          prefix: 'rest-api/',
//                          //path: 'attributes/',
//                          //sidebarDepth: 2,
//                          children: [
//                              ['rest-api/gateway-api-catalog.md', 'Gateway'],
//                              ['rest-api/back-office-api-catalog.md', 'Back Office'],
//                              ['rest-api/runtime-api-catalog.md', 'Runtime'],
//                              ['rest-api/developer-portal-api-catalog.md', 'Developer Portal'],
//                              ['rest-api/admin-api-catalog.md', 'Admin'],
//                              ]
//                      },
//                      ['cli-catalog.md', 'CLI Catalog'],
//                      ['k8s-crd-catalog.md', 'CRD Catalog'],
//                  ]
//              }
//          ],
//
//
//
//
//                ['apk-use-cases.md', 'Learn by Use Case'],
 //               ['explore-apk.md', 'Explore APK'],
 //           ],
//          '/guides/' : [
//              ['', 'Guides - Overview'],
//              {
//                  title: 'Applications',
//                  prefix: 'applications/',
//                  path: 'applications/',
//                  sidebarDepth: 2,
//                  children: [
//                          ['register-single-page-app.md', 'Register an SPA'],
//                          ['register-oidc-web-app.md', 'Register web app with OIDC'],
//                          ['register-saml-web-app.md', 'Register web app with SAML'],
//                          ['register-standard-based-app.md', 'Register a standard-based app'],
//                          ['register-mobile-app.md', 'Register a mobile app'],
//                  ]
//              },
//              {   
//                  title: 'Authentication',
//                  prefix: 'authentication/',
//                  path: 'authentication/',
//                  sidebarDepth: 2,
//                  children: [
//                  {
//                      title: 'Add Login to Apps',
//                      path: 'add-login-to-apps/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['add-login-to-single-page-app.md', 'Add login to an SPA'],
//                          ['add-login-to-web-app.md', 'Add login to a web app'],
//                          ['add-login-to-mobile-app.md', 'Add login to an mobile app']
//                      ]
//                  },
//                  {
//                      title: 'Add passwordless login',
//                      prefix: 'passwordless-login/',
//                      path: 'passwordless-login/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['add-passwordless-login-with-fido.md', 'Add login with security key/biometrics'],
//                          ['add-passwordless-login-with-magic-link.md', 'Add login with magic link'],
//                      ]
//                  },
//                  {
//                      title: 'Enable User Attributes',
//                      prefix: 'user-attributes/',
//                      path: 'user-attributes/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['enable-attributes-for-oidc-app.md', 'Enable attributes for OIDC apps'],
//                          ['enable-attributes-for-saml-app.md', 'Enable attributes for SAML apps'],
//                      ]
//                  },                    
//                  ['manage-consent-for-attributes', 'Manage consent for user attributes'],
//                  {
//                      title: 'Add Social Login',
//                      prefix: 'social-login/',
//                      path: 'social-login/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['add-facebook-login.md', 'Add Facebook login'],
//                          ['add-github-login.md', 'Add Github login'],
//                          ['add-google-login.md', 'Add Google login'],
//                          ['add-microsoft-login.md', 'Add Microsoft Login'],
//                      ]
//                  },
//                  {
//                      title: 'Add Decentralized Login',
//                      prefix: 'decentralized-login/',
//                      path: 'decentralized-login/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['sign-in-with-ethereum.md', 'Sign In With Ethereum']
//                      ]
//                  },
//                  {
//                      title: 'Add Standard-Based Login',
//                      prefix: 'enterprise-login/',
//                      path: 'enterprise-login/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['add-oidc-idp-login.md', 'Add login with OIDC IdP'],
//                          ['add-saml-idp-login.md', 'Add login with SAML IdP'],
//                      ]
//                  },
//                  ['add-organization-login', 'Add Organization Login'],
//                  {
//                      title: 'Add Multi-Factor Authentication',
//                      prefix: 'mfa/',
//                      path: 'mfa',
//                      sidebarDepth: 2,
//                      children: [
//                          ['add-totp-login.md', 'Add TOTP'],
//                          ['add-emailotp-login.md', 'Add Email OTP'],
//                          ['add-smsotp-login.md', 'Add SMS OTP'],
//                      ]
//                  },
//                  {
//                      title: 'Add Conditional Authentication',
//                      prefix: 'conditional-auth/',
//                      path: 'conditional-auth/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['configure-conditional-auth.md', 'Set up conditional authentication'],
//                          {
//                              title: 'Add Access Control',
//                              path: 'access-control/',
//                              sidebarDepth: 2,
//                              children: [
//                                  ['user-age-based-template.md', 'Age-based access'],
//                                  ['group-based-template-access-control.md', 'Group-based access'],
//                              ]
//                          },
//                          {
//                              title: 'Add Adaptive MFA',
//                              path: 'adaptive-mfa/',
//                              sidebarDepth: 2,
//                              children: [
//                                  ['group-based-template.md', 'MFA based on user group'],
//                                  ['sign-in-option-based-template.md', 'MFA based on sign-in option'],
//                                  ['new-device-based-template.md', 'MFA based on user device'],
//                                  ['ip-based-template.md', 'MFA based on IP address'],
//                                  ['add-authentications-based-on-api-calls.md', 'MFA based on advanced conditions (using WSO2 Choreo)                                    '],
//                              ]
//                          },
//                          ['write-your-first-script.md', 'Write a custom authentication script'],
//                      ]
//                  },
//                  {
//                      title: 'Configure OIDC Flows',
//                      path: 'oidc',
//                      prefix: 'oidc/',
//                      children: [
//                          ['discover-oidc-configs.md', 'Discover OIDC endpoints'],
//                          ['implement-auth-code.md', 'Implement login using the Authorization Code flow'],
//                          ['implement-auth-code-with-pkce.md', 'Implement login using the Authorization Code flow and PKCE'],
//                          ['validate-id-tokens.md', 'Validate ID tokens'],
//                          ['request-user-info.md', 'Request user information'],
//                          ['token-validation-resource-server.md', 'Validate tokens'],
//                          ['revoke-tokens.md', 'Revoke tokens'],
//                          ['add-logout.md', 'Implement logout'],
//                      ]
//                  },
//                  {
//                      title: 'Configure SAML Flows',
//                      path: 'saml',
//                      prefix: 'saml/',
//                      sidebarDepth: 2,
//                      children: [
//                          ['discover-saml-configs.md', 'Discover SAML endpoints and settings'],
//                      ]
//                  },
//                      ['jit-user-provisioning.md', 'Configure JIT User Provisioning'],
//                  ]
//              },
//              {
//                  title: 'Branding',
//                  prefix: 'branding/',
//                  path: 'branding/',
//                  children: [
//                      ['configure-ui-branding.md', 'Configure UI branding'],
//                      ['configure-custom-domains.md', 'Configure custom domains'],
//                      ['configure-email-branding.md', 'Configure email branding']
//                  ]
//              },
//              {
//                  title: 'User Management',
//                  prefix: 'users/',
//                  path: 'users/',
//                  sidebarDepth: 2,
//                  children: [
//                      ['manage-collaborators.md', 'Manage administrators'],
//                      ['manage-customers.md', 'Manage users'],
//                      ['manage-groups.md', 'Manage groups'],
//                      ['manage-sessions.md', 'Manage active sessions'],
//                      ['migrate-users.md', 'Migrate users to APK'],
//                      {
//                          title: 'Manage Attributes and Mappings',
//                          prefix: 'attributes/',
//                          path: 'attributes/',
//                          children: [
//                              ['manage-attributes', 'User attributes'],
//                              ['manage-oidc-attribute-mappings', 'OIDC attribute mappings'],
//                              ['manage-scim2-attribute-mappings', 'SCIM2 attribute mappings'],
//                              ['manage-scopes', 'OIDC Scopes'],
//                          ]
//                      },
//                      {
//                          title: 'Manage user stores',
//                          prefix: 'user-stores/',
//                          path: 'user-stores/',
//                          children: [
//                              ['configure-a-user-store.md', 'Connect a remote user store'],
//                              ['configure-high-availability.md', 'Configure high availability'],
//                              ['update-user-stores.md', 'Manage remote user stores'],
//                          ]
//                      },
//                  ]
//              },
//              {
//                  title: 'Account Management',
//                  prefix: 'user-accounts/',
//                  path: 'user-accounts/',
//                  sidebarDepth: 2,
//                  children: [
//                      ['password-recovery', 'Configure password recovery'],
//                      ['configure-self-registration', 'Configure self-registration'],
//                      {
//                          title: 'Manage Account Security',
//                          sidebarDepth: 2,
//                          children: [
//                              ['account-security/login-attempts-security', 'Configure login-attempts security'],
//                              ['account-security/bot-detection', 'Configure bot detection'],
//                              ['account-security/password-validation', 'Configure password validation'],
//                          ]
//                      },
//                  ]
//              },
//              {
//                  title: 'User Self-Service',
//                  prefix: 'user-self-service/',
//                  path: 'user-self-service/',
//                  children: [
//                      {
//                          title: 'Self-service portal',
//                          path: 'customer-self-service-portal/',
//                          sidebarDepth: 2,
//                          children: [
//                              ['update-profile-info.md', 'Update profile information'],
//                              ['change-password.md', 'Change password'],
//                              ['manage-linked-accounts.md', 'Manage linked social accounts'],
//                              ['manage-consents.md', 'Manage consents'],
//                              ['manage-login-sessions.md', 'Manage login sessions'],
//                              ['self-register.md', 'Self-register'],
//                              ['register-security-key.md', 'Register FIDO2 security key/biometrics'],
//                              ['customer-password-recovery.md', 'Password recovery'],
//                              ['enable-totp.md', 'Enroll TOTP'],
//                              ['discover-applications.md', 'Discover applications'],
//                          ]
//                      },
//                      ['build-self-service-capabilities.md', 'Build self-service capabilities'],
//                  ]
//              },
//              {
//                  title: 'Organization Management',
//                  prefix: 'organization-management/',
//                  path: 'organization-management/',
//                  children: [
//                      ['manage-organizations.md', 'Manage organizations'],
//                      ['manage-environments.md', 'Manage environments'],
//                      ['manage-suborganizations.md', 'Manage suborganizations'],
//                  ]
//              },
//              {
//                  title: 'Your APK',
//                  prefix: 'your-apk/',
//                  path: 'your-apk/',
//                  sidebarDepth: 2,
//                  children: [
//                      ['apk-self-service.md', 'Self-service'],
//                      ['recover-password.md', 'Recover your password'],
//                      ['delete-your-user-account.md', 'Delete your user account'],
//                  ]
//              },
//              ['/guides/apk-events.md', 'APK events']
//          ],
//          '/integrations/' : [
//              ['', ''],
//          ],
//          '/apis/' :[
//              ['','APIs - Overview'],
//              ['/apis/authentication.md','Authentication'],
//              ['/apis/email-template.md','Email templates API'],
//              ['/apis/application-management.md','Application management API'],
//              ['/apis/idp.md','Identity provider API'],
//              ['/apis/scim2.md','User management (SCIM 2.0) API'],
//              ['/apis/identity-governance.md','Identity governance API'],
//              ['/apis/session.md','Session management API'],
//              ['/apis/oauth-dcr.md','OAuth2 dynamic client registration API'],
//              {
//                  title: 'Self-service',
//                  sidebarDepth: 2,
//                  children: [
//                      ['/apis/register-mfa/totp.md','TOTP API'],
//                      ['/apis/register-mfa/backup-code.md','Backup codes API'],
//                  ]
//              },
//
//              ['/apis/consent-management.md','Consent management API'],
//              ['/apis/event-configuration.md','Event configuration API'],
//              ['/apis/validation.md', 'Validation API']
//          ],
//          '/references/' : [
//              ['/references/user-management/user-roles.md', 'APK user roles'],
//              {
//                  title: 'App Configurations',
//                  path: 'app-settings/',
//                  children: [
//                      ['/references/app-settings/oidc-settings-for-app.md', 'OIDC configurations'],
//                      ['/references/app-settings/saml-settings-for-app.md', 'SAML configurations'],
//                  ]
//              },
//              {
//                  title: 'IdP Configurations',
//                  path: 'idp-settings/',
//                  children: [
//                      ['/references/idp-settings/oidc-settings-for-idp.md', 'OIDC configurations'],
//                      ['/references/idp-settings/saml-settings-for-idp.md', 'SAML configurations']
//                  ]
//              },
//              ['/references/conditional-auth/api-reference.md', 'Conditional auth - API'],
//              ['/references/remote-user-store/remote-user-store-properties.md', 'Remote user store properties'],
//              ['/references/application-logs.md', 'Application logs'],
//              ['/references/accessibility.md', 'Accessibility compliance'],        
//              ['/references/data-residency-in-apk.md', 'Data residency in APK']
//          ]
//
//            '/concepts/' : [
//            '',
//            {
//                title: 'Users, groups, and roles',
//                children: [
//                    ['/concepts/user-mgt/users-groups-roles', 'Users, groups, and roles'],
//                    ['/concepts/user-mgt/user-types', 'Types of user accounts'],
//                ]
//            },
//            {
//                title: 'Authentication',
//                children: [
//                    ['/concepts/authentication/authentication-protocols', 'Overview of authentication protocols'],
//                    ['/concepts/authentication/saml', 'SAML'],
//                    ['/concepts/authentication/oidc', 'OpenID Connect'],
//                ]
//            },
//            {
//                title: 'Authorization',
//                children: [
//                    ['/concepts/authentication/authentication-protocols', 'Overview of authentication protocols'],
//                    ['/concepts/authentication/oidc', 'OpenID Connect'],
//                ]
//            },
//            ]
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
