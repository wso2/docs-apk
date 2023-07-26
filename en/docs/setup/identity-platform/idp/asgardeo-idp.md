# Using Asgardeo as an IdP

Follow the instructions below to use Asgardeo as the Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

## Step 1 - Create root Organization

[Create an organization in Asgardeo](https://wso2.com/asgardeo/docs/guides/organization-management/manage-organizations/#create-a-new-organization).

## Step 2 - Create a Sub-Organization.

[Create a sub-organization in Asgardeo](https://wso2.com/asgardeo/docs/guides/organization-management/manage-b2b-organizations/manage-suborganizations/) within the organization that you created.

## Step 3 - Create a user

[Create a user within the sub-organization](https://wso2.com/asgardeo/docs/guides/users/manage-customers/#onboard-a-user) that you created.

## Step 4 - Create an application

1. [Create an application](https://wso2.com/asgardeo/docs/guides/applications/register-oidc-web-app/#register-the-app) within the main organization that you created in Step 1.
2. Click on the newly created application.
3. Click on the **Info** tab to view the IDP related configurations.

    All the IDP related configurations are listed under **Service Endpoints**.

4. [Share application with sub-organizations](https://wso2.com/asgardeo/docs/guides/organization-management/manage-b2b-organizations/share-applications/).

## Step 5 - Update the Helm Chart

1. Navigate to the `<APK-HOME>/helm-charts/` directory and open the `values.yaml` file.
2. Update the IDP related configurations in the `ipd` section.
3. Create a K8s Secret with retrieved `clientId` and `clientSecret` from Step 4 with name `apk-idp-secret`.
      ```
        idp:
          issuer: ""
          authorizeEndpoint: ""
          tokenEndpoint: ""
          revokeEndpoint: ""
          jwksEndpoint: ""      
          usernameClaim: ""
          groupClaim: ""
          organizationClaim: ""
          credentials:
             secretName: "apk-idp-secret"
      ```
      
       - `organizationClaim` - This should always be `user_organization`.
       - Update all other values based on the Service Endpoint details that you came across in Step 4.

## Step 6 - Install WSO2 APK

=== "Format"
	```console
	helm install <helm-chart-name> . -n <namespace>
	```

=== "Example"
	```console
	helm install apk-test . -n apk
	```

## Step 7 - Generate an Access Token

1. Open [Postman](../../../../administration/postman-tests).
2. Navigate to the `POST` `Generate Auth code token` REST API.
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

## Step 8 - Invoke the System API

 Use the JWT token that you received in the previous step to invoke the System APIs.
