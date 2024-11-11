# Using Asgardeo as an IdP

Follow the instructions below to use Asgardeo as the Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

## Step 1 - Create root Organization

[Create an organization in Asgardeo](https://wso2.com/asgardeo/docs/guides/organization-management/manage-organizations/#create-a-new-organization).

## Step 2 - Create a Sub-Organization.

[Create a sub-organization in Asgardeo](https://wso2.com/asgardeo/docs/guides/organization-management/manage-organizations/#build-an-organizational-hierarchy) within the organization that you created.

## Step 3 - Create a user

[Create a user within the sub-organization](https://wso2.com/asgardeo/docs/guides/users/manage-customers/#onboard-a-user) that you created.

## Step 4 - Create an application

1. [Create an application](https://wso2.com/asgardeo/docs/guides/applications/register-oidc-web-app/#register-the-app) within the main organization that you created in Step 1.
2. Click on the newly created application.
3. Click on the **Info** tab to view the IDP related configurations.

    All the IDP related configurations are listed under **Service Endpoints**.

4. [Share application with sub-organizations](https://wso2.com/asgardeo/docs/guides/organization-management/share-applications/).

## Step 5 - Add a new token issuer for the IDP

1. Access the endpoints that correspond to the application, which is available in the asgradeo portal.
    

2. Create two file named `idp-system-token-issuer.yaml` and `idp-org-token-issuer.yaml` add the following content to it.

    | **Parameter**        | **Description**                                                                                                                                                 |
    | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `issuer:`            | The IdP's issuer URL.                                                                                                                                           |
    | `jwksEndpoint:`      | The URL of the IdP's JSON Web Key Set (JWKS) endpoint.                                                                                                          |
    | `usernameClaim:`     | The claim in the IdP's token that represents the user's username.                                                                                               |
    | `organizationClaim:` | The claim in the IdP's token that represents the user's organization, This should always be `orgId`.                                                            |
    | `organization:`      | The organization of IDP. To invoke system APIs, this should be `apk-system`. To invoke particular organizaiton's APIs, this should be organization claim value. |


    === "For System APIs"
      ```
        apiVersion: dp.wso2.com/v1alpha1
        kind: TokenIssuer
        metadata:
          name: auth0-idp-issuer
        spec:
          claimMappings:
          - localClaim: x-wso2-organization
            remoteClaim: org_id
          consumerKeyClaim: azp
          issuer: https://<asgardeo.domain>/
          name: new-service-provider
          organization: apk-system
          scopesClaim: scope
          signatureValidation:
            jwks:
              url: "https://<asgardeo.domain>/.well-known/jwks"
          targetRef:
            group: gateway.networking.k8s.io
            kind: Gateway
            name: default
      ```

    === "For Organization APIs"
      ```
        apiVersion: dp.wso2.com/v1alpha1
        kind: TokenIssuer
        metadata:
          name: auth0-idp-issuer
        spec:
          claimMappings:
          - localClaim: x-wso2-organization
            remoteClaim: org_id
          consumerKeyClaim: azp
          issuer: https://<asgardeo.domain>/
          name: new-service-provider
          organization: default
          scopesClaim: scope
          signatureValidation:
            jwks:
              url: "https://<asgardeo.domain>/.well-known/jwks"
          targetRef:
            group: gateway.networking.k8s.io
            kind: Gateway
            name: default
      ```


3. Run the following commands to add the token Issuers to APK.


    ```
    kubectl apply -f idp-system-token-issuer.yaml
    ```

    ```
    kubectl apply -f idp-org-token-issuer.yaml
    ```


!!!Optional
    
        If you need to configure the IdP as the primary IdP instead of adding multiple IdPs, execute the following steps as the 5th step.

        ## Step 5 - Update the Helm Chart

        1. Follow the instructions outlined in [Customize Configurations](../../customize-configurations.md). These instructions will guide you through the process of acquiring the `values.yaml` file. Open the `values.yaml` file.
        2. Update the IDP related configurations in the `idp` section.
        3. Create a K8s Secret with retrieved `clientId` and `clientSecret` from Step 4 with name `apk-idp-secret`.
              ```
                idp:
                  issuer: ""
                  jwksEndpoint: ""      
                  usernameClaim: ""
                  organizationClaim: ""
              ```
              
              - `organizationClaim` - This should always be `org_id`.
              - Update all other values based on the Service Endpoint details that you came across in Step 4.3.

        ## Step 5.1 - Install WSO2 APK

        === "Format"
          ```console
          helm install <helm-chart-name> .
          ```

        === "Example"
          ```console
          helm install apk-test .
          ```

## Step 6 - Generate an Access Token

1. Open Postman and create a new request to generate the auth code token.
2. Navigate to the Authorization tab of the request.
3. Make sure that the Token generation call has the same information that was entered in the Helm Chart in Step 5.
     
     - `Auth URL`
     - `Access Token URL`
     - `Client ID`
     - `Client Secret`
     - `CallBack Url`
     - `Scopes - (rest API related scopes + openid)`

4. Click **Get New Access Token**.
     
     This redirects you to the Asgardeo Sign in page.

5. Click **Sign in with Organization Login**.
6. Enter the name of the organization that you created in Step 1.
7. Click **Submit**.
8. Enter the user credentials (email and password) of the user that you created in the sub-organization.

     You will receive an access token when the token call is successful.

## Step 7 - Invoke the APIs

 Use the JWT token that you received in the previous step to invoke the System APIs and other APIs.
