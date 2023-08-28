# Using A Third-Party IdP

Follow the instructions below to use any third-party Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

## Prerequisites
- IDP needs to be an OIDC compliance.
- Access Token needs to be JWT token.
- Access token able to validate from certificate (certificate file/jwks).
- Required Claims to be include in JWT token
     - username
     - users organization
     - scopes requested for token

## Step 1 - Set up an Identity Provider (IdP)

You need to set up an Identity Provider (IdP) with your preferred third-party provider, such as Asgardeo, Auth0, or any other provider. 
Follow the instructions provided by the respective IdP to create an account and configure the necessary settings.

## Step 2 - Create a user

Create a user within your chosen IdP. This user will be used to authenticate and authorize API requests.

## Step 3 - Add the user to the IdP group

If your chosen IdP supports groups, add the user to a group within the IdP.

## Step 4 - Create an application

Create an application within your chosen IdP. This application will represent the APIs that you want to protect with WSO2 API Platform for Kubernetes (WSO2 APK).

## Step 5 - Configure the application

Configure the application within your chosen IdP.
This includes setting the application's settings, such as the application name and endpoints.

## Step 6 - Update the Helm Chart

1. Navigate to the `<APK-HOME>/helm-charts/` directory and open the `values.yaml` file.
2. Update the IDP related configurations in the `idp` section.

     ```yaml
     idp:
          issuer: ""
          jwksEndpoint: ""      
          usernameClaim: ""
          organizationClaim: ""

     ```

      - `organizationClaim` - This needs to be configured based on organization claim in jwt.
      - Update all other values based on the Endpoint details that you came under the application settings.

The Idp section should include the following parameters:

| **Parameter** | **Description** |
|---------------|-----------------|
| `issuer:` | The IdP's issuer URL. |
| `jwksEndpoint:` |  The URL of the IdP's JSON Web Key Set (JWKS) endpoint.  |
| `usernameClaim:` |  The claim in the IdP's token that represents the user's username.  |
| `organizationClaim:` |  The claim in the IdP's token that represents the user's organization, if applicable.  |

## Step 7 - Start WSO2 APK

Start WSO2 APK using the following command:

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
3. Make sure that the Token generation call has the same information that was entered in the Helm Chart in Step 6.
     
     - `Auth URL`
     - `Access Token URL`
     - `Client ID`
     - `Client Secret`
     - `CallBack Url`
     - `Scopes - (rest API related scopes + openid)`

4. Click **Get New Access Token**.
     
      This redirects you to the IdP's sign-in page.

5. Enter the name of the organization that you created in Step 1.
6. Click **Continue**.
7. Enter the user credentials (email and password) of the user that you assigned to the organization.
     
     You will receive two tokens, namely the access token and ID token, when the token call is successful.

8.  Copy the Access token that you see listed as the `Access Token`.


## Step 9 - Invoke the System API

Use the JWT token that you received in the previous step to invoke the system APIs.
