# Using Auth0 as an IdP

Follow the instructions below to use Auth0 as the Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

## Step 1 - Create an Organization

<a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/create-organizations" target="_blank">Create an organization in Auth0</a>.

For testing purposes let's create an organization named `org1`.

## Step 2 - Create a user

If you have not created the user already, <a href="https://auth0.com/docs/manage-users/user-accounts/create-users" target="_blank">create a user</a>.

## Step 3 - Assign the user to the organization

<a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/assign-members" target="_blank">Assign the member to the Organization</a>, which you created in Step 1.

## Step 4 - Enable a connection

<a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections" target="_blank">Add a connection for your organization</a> as Username-Password-Authentication.

## Step 5 - Create an application

1. <a href="https://auth0.com/docs/get-started/auth0-overview/create-applications" target="_blank">Create an application</a>.

       Let's create an application as `My App`.

2. Configure the application.

       Configure the organization settings that correspond to the application.

       - Define the type of users that will log in to this application - `Individuals`

## Step 6 - Add a custom claim for the organization

You need to add a <a href="https://auth0.com/docs/secure/tokens/json-web-tokens/create-custom-claims" target="_blank">custom claim</a> to the tokens to identify the organization.

1. Create a custom action for the login flow.

    - Go to **Actions > Flows > Login > Custom** and click the + button in the top-right corner, then select **Build custom**.
    - Create an action named `addOrgclaim`.
    - Add the follwing code to the editor and Deploy the action. You should add a proper organization identfier as the `orgId` claim value.

        ```
        exports.onExecutePostLogin = async (event, api) => {
          api.idToken.setCustomClaim('orgId', 'org1');
        };
        ```

        | **Field**            | **Description**                                                                                               |
        | -------------------- | ------------------------------------------------------------------------------------------------------------- |
        | `orgId (claim name)` | Custom claim name to identify the organization. This should be `orgId`                                        |
        | `org1 (claim value)` | A value to identify the organization. You can add any identifier for the organization like organization name. |


2. Apply the custom action to the Post Login flow.
    - Go to **Actions > Flows > Login > Custom** and select the created action `addOrgclaim` and drop that to the flow.

## Step 6 - Add a new token issuer for the IDP

1. <a href="https://auth0.com/docs/get-started/applications/application-settings#endpoints" target="_blank">Access the endpoints that correspond to the application</a>, which is available in the **Advanced Settings** section.

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
            remoteClaim: orgId
          consumerKeyClaim: azp
          issuer: https://<auth0domain>.auth0.com/
          name: new-service-provider
          organization: apk-system
          scopesClaim: scope
          signatureValidation:
            jwks:
              url: "https://<auth0domain>.auth0.com/.well-known/jwks.json"
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
            remoteClaim: orgId
          consumerKeyClaim: azp
          issuer: https://<auth0domain>.auth0.com/
          name: new-service-provider
          organization: default
          scopesClaim: scope
          signatureValidation:
            jwks:
              url: "https://<auth0domain>.auth0.com/.well-known/jwks.json"
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
    
        If you need to configure the IdP as the primary IdP instead of adding multiple IdPs, execute the following steps as the 6th step.

        ## Step 6 - Update the Helm Chart
        
        1. Follow the instructions outlined in the <a href="../../../../setup/Customize-Configurations" target="_blank">customize configurations section</a>. These instructions will guide you through the process of acquiring the `values.yaml` file. Open the `values.yaml` file.
        2. Update the IDP related configurations in the `idp` section.
        3. Create a K8s Secret with retrieved `clientId` and `clientSecret` from Step 4 with name `apk-idp-secret`.

              ```
              idp:
                issuer: ""
                jwksEndpoint: ""      
                usernameClaim: ""
                organizationClaim: ""
              ```

              - `organizationClaim` - This should be the custom organization claim(`orgId`) which configured in Step 5.1.
              - Update all other values based on the Endpoint details that you came across in Step 6.1.
        
        ## Step 6.1 - Install WSO2 APK

        === "Format"
          ```console
          helm install <helm-chart-name> .
          ```

        === "Example"
          ```console
          helm install apk-test .
          ```


## Step 7 - Generate an Access Token

1. Open Postman and create a new request to generate the auth code token.
2. Navigate to the Authorization tab of the request.
3. Make sure that the token generation call has the same information that was entered in the Helm Chart in Step 6.

     - `Auth URL`
     - `Access Token URL`
     - `Client ID`
     - `Client Secret`
     - `Username`
     - `Password`
     - `CallBack Url`
     - `Scopes - (rest API related scopes + openid)`

4. Click **Get New Access Token**.
5. You will receive two tokens, namely the access token and ID token, when the token call is successful.
8. Copy the ID token that you see listed as the `id_token`.


## Step 8 - Invoke the APIs

 Use the JWT token that you received in the previous step to invoke the System APIs and other APIs.
