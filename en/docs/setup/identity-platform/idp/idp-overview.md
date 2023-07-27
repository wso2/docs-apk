# Identity Providers

Identity Providers, which are also referred to as IdPs, store and manage digital identities. By default, APK supports an inbuilt non-production identity provider/token service, which is only meant for testing purposes. APK also supports third party IdPs, namely Asgardeo and Auth0.

!!!NOTE
    You will have to create a JWTIssuer in APK with the user's organization represented by your IdP before using a External Identity Provider. You can use the [Add JWT Issuer](../../../develop-and-deploy-api/jwt-issuers/jwt-issuers.md) to create a new jwt issuer.

WSO2 APK integrates with IdPs to obtain a token to use the System APIs and also to login to the portal.

- [Using a Non-production IdP](../non-production-idp)

- [Using Asgardeo as an IdP](../asgardeo-idp)

- [Using Auth0 as an IdP](../auth0-idp)

- [Using Any Third party IdP](../third-party-idp)
