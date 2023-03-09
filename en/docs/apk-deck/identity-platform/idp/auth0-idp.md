# Using Auth0 as an IdP

Follow the instructions below to use Auth0 as the Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

## Step 1 - Create an Organization

[Create an organization in Auth0](https://auth0.com/docs/manage-users/organizations/configure-organizations/create-organizations).

For testing purposes let's create an organization named `org1`.

## Step 2 - Create a user

If you have not created the user already, [create a user](https://auth0.com/docs/manage-users/user-accounts/create-users).

## Step 3 - Assign the user to the organization

[Assign the member to the Organization](https://auth0.com/docs/manage-users/organizations/configure-organizations/assign-members), which you created in Step 1.

## Step 4 - Enable a connection

[Add a connection for your organization](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections) as Username-Password-Authentication.

## Step 5 - Create an application

1. [Create an application](https://auth0.com/docs/get-started/auth0-overview/create-applications). 
     
      Let's create an application as `My App`.

2. Configure the application.

      Configure the organization settings that correspond to the application.

      - What type of end users will use this documentation - `Team members of organizations`
      - Display organization prompt - Enable this option.

## Step 6 - Update the Helm Chart

1. [Access the endpoints that correspond to the application](https://auth0.com/docs/get-started/applications/application-settings#endpoints), which is available in the **Advanced Settings** section.
2. Navigate to the `<APK-HOME>/helm-charts/` directory and open the `values.yaml` file.
3. Update the IDP related configurations in the `ipd` section.

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
      - Update all other values based on the Endpoint details that you came across in Step 6.1.

## Step 7 - Generate an Access Token

1. Open [Postman](../../../administration/postman-tests).
2. Navigate to the `POST` `Generate Auth code token` REST API.
3. Make sure that the Token generation call has the same information that was entered in the Helm Chart in Step 6.
     
     - `Auth URL`
     - `Access Token URL`
     - `Client ID`
     - `Client Secret`

4. Click **Get New Access Token**.
     
      This redirects you to the Auth0 Sign in page.

5. Enter the name of the organization that you created in Step 1.
6. Click **Continue**.
7. Enter the user credentials (email and password) of the user that you assigned to the organization.
     
     You will receive two tokens, namely the access token and ID token, when the token call is successful.

8.  Copy the ID token that you see listed as the `id_token`.

## Step 8 - Add the organization to the Data Plane
     
1. Decode the access token using a JWT decoder (e.g., [https://jwt.io/](https://jwt.io/)).
2. Copy the value listed for `user_organization`, which is in the Payload data section.
3. Define the CR for an organization.

      Enter the `user_organization` value that you copied above as the `organizationClaimValue:` value.

4. [Create an organization in APK](https://github.com/wso2/apk/wiki/Organizations#create-an-organization) using the organization CR, which you created in the previous step.

## Step 9 - Invoke the System API

 Use the JWT token that you received in the previous step to invoke the system APIs.
