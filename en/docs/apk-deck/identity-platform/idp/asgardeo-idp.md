# Using Asgardeo as an IdP

Follow the instructions below to use Asgardeo as the Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

## Step 1 - Create an Organization

[Create an organization in Asgardeo](https://wso2.com/asgardeo/docs/guides/organization-management/manage-organizations/#create-a-new-organization).

## Step 2 - Create a Sub-Organization

[Create a sub-organization in Asgardeo](https://wso2.com/asgardeo/docs/guides/organization-management/manage-organizations/#create-a-suborganization) within the organization that you created.

## Step 3 - Create a user

[Create a user within the sub-organization](https://wso2.com/asgardeo/docs/guides/users/manage-customers/#onboard-a-user) that you created.

## Step 4 - Create an application

1. [Create an application](https://wso2.com/asgardeo/docs/guides/applications/register-oidc-web-app/#register-the-app) within the main organization that you created in Step 1.
2. Click on the newly created application.
3. Click on the **Info** tab to view the IDP related configurations.

    All the IDP related configurations are listed under **Service Endpoints**.

4. [Share application with sub-organizations](https://wso2.com/asgardeo/docs/guides/organization-management/manage-suborganizations/#share-applications-with-suborganizations).

## Step 5 - Update the Helm Chart

1. Navigate to the `<APK-HOME>/helm-charts/` directory and open the `values.yaml` file.
2. Update the IDP related configurations in the `ipd` section.

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
          clientId: ""
          clientSecret: ""
      ```
      
       - `organizationClaim` - This should always be `user_organization`.
       - Update all other values based on the Service Endpoint details that you came across in Step 4.

## Step 6 - Restart WSO2 APK

```tab="Format"
helm install <helm-chart-name> . -n <namespace>
```

```tab="Example"
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

4. Click **Get New Access Token**.
     
     This redirects you to the Asgardeo Sign in page.

5. Click **Sign in with Organization Login**.
6. Enter the name of the organization that you created in Step 1.
7. Click **Submit**.
8. Enter the user credentials (email and password) of the user that you created in the sub-organization.

     You will receive an access token when the token call is successful.

9. Copy the access token that you see listed as the `id_token`.

## Step 8 - Add the organization to the Data Plane
     
1. Decode the access token using a JWT decoder (e.g., [https://jwt.io/](https://jwt.io/)).
2. Copy the value listed for `user_organization`, which is in the Payload data section.
3. [Create an organization in APK](../../../../administration/organizations/#create-an-organization).
      
      Enter the `user_organization` value that you copied above as the `organizationClaimValue:` value when defining the Custom Resource (CR) for the organization.

## Step 9 - Invoke the System API

 Use the JWT token that you received in the previous step to invoke the System APIs.
