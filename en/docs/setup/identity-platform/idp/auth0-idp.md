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

       - Define the type of users that will log in to this application - `Individuals`

## Step 6 - Update the Helm Chart

1. [Access the endpoints that correspond to the application](https://auth0.com/docs/get-started/applications/application-settings#endpoints), which is available in the **Advanced Settings** section.
2. Follow the instructions outlined in [Customize Configurations](../../Customize-Configurations.md). These instructions will guide you through the process of acquiring the `values.yaml` file. Open the `values.yaml` file.
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
	helm install <helm-chart-name> . -n <namespace>
	```

=== "Example"
	```
	helm install apk-test . -n apk
	```


## Step 8 - Generate an Access Token

1. Open [Postman](../../../../administration/postman-tests).
2. Navigate to the `POST` `Generate Auth code token` REST API.
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
