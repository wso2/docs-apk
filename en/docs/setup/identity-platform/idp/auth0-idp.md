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

## Step 6 - Update the Helm Chart

1. <a href="https://auth0.com/docs/get-started/applications/application-settings#endpoints" target="_blank">Access the endpoints that correspond to the application</a>, which is available in the **Advanced Settings** section.
2. Follow the instructions outlined in <a href="../../../Customize-Configurations" target="_blank">Customize Configurations</a>. These instructions will guide you through the process of acquiring the `values.yaml` file. Open the `values.yaml` file.
3. Update the IDP related configurations in the `idp` section.
4. Create a K8s Secret with retrieved `clientId` and `clientSecret` from Step 4 with name `apk-idp-secret`.

      ```
       idp:
         issuer: ""
         jwksEndpoint: ""      
         usernameClaim: ""
         organizationClaim: ""
      ```

      - `organizationClaim` - This should always be `org_id`.
      - Update all other values based on the Endpoint details that you came across in Step 6.1.

## Step 7 - Restart WSO2 APK

=== "Format"
	```
	helm install <helm-chart-name> .
	```

=== "Example"
	```
	helm install apk-test .
	```


## Step 8 - Generate an Access Token

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


## Step 9 - Invoke the System API

 Use the JWT token that you received in the previous step to invoke the system APIs.
