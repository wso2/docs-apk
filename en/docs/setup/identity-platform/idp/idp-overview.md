# Identity Providers

Identity Providers, which are also referred to as IdPs, store and manage digital identities. By default, APK supports an inbuilt non-production identity provider/token service, which is only meant for testing purposes. APK also supports third party IdPs, namely Asgardeo and Auth0.

!!!NOTE
    You will have to create a TokenIssuer in APK with the user's organization represented by your IdP before using a External Identity Provider. You can use the <a href="../../../../develop-and-deploy-api/token-issuers/token-issuers" target="_blank">Add Token Issuer</a> to create a new token issuer.

WSO2 APK integrates with IdPs to obtain a token to use the System APIs and also to login to the portal.

- <a href="../non-production-idp" target="_blank">Using a Non-production IdP</a>
- <a href="../asgardeo-idp" target="_blank">Using Asgardeo as an IdP</a>
- <a href="../auth0-idp" target="_blank">Using Auth0 as an IdP</a>
- <a href="../third-party-idp" target="_blank">Using Any Third party IdP</a>

