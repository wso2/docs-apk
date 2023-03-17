# Using A Third-Party IdP

Follow the instructions below to use any third-party Identity Provider (IdP) to authenticate the APIs that belong to a specific Organization:

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

      - `organizationClaim` - This should always be `org_id`.
      - Update all other values based on the Endpoint details that you came under the application settings.

The Idp section should include the following parameters:

| **Parameter** | **Description** |
|---------------|-----------------|
| `issuer:` | The IdP's issuer URL. |
| `authorizeEndpoint:` | The URL of the IdP's authorization endpoint. |
| `tokenEndpoint:` |  The URL of the IdP's token endpoint.  |
| `revokeEndpoint:` |  The URL of the IdP's revoke endpoint.  |
| `jwksEndpoint:` |  The URL of the IdP's JSON Web Key Set (JWKS) endpoint.  |
| `usernameClaim:` |  The claim in the IdP's token that represents the user's username.  |
| `groupClaim:` |  The claim in the IdP's token that represents the user's group membership, if applicable.  |
| `organizationClaim:` |  The claim in the IdP's token that represents the user's organization, if applicable.  |
| `clientId:` |  The client ID associated with the created application.  |
| `clientSecret:` |  The client secret associated with the created application.  |

## Step 7 - Restart WSO2 APK

Restart WSO2 APK using the following command:

```tab="Format"
helm install <helm-chart-name> . -n <namespace>
```

```tab="Example"
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

4. Click **Get New Access Token**.
     
      This redirects you to the IdP's sign-in page.

5. Enter the name of the organization that you created in Step 1.
6. Click **Continue**.
7. Enter the user credentials (email and password) of the user that you assigned to the organization.
     
     You will receive two tokens, namely the access token and ID token, when the token call is successful.

8.  Copy the ID token that you see listed as the `id_token`.

## Step 9 - Add the user's organization to the Data Plane

1. Decode the access token using a JWT decoder (e.g., [https://jwt.io/](https://jwt.io/)).
2. [Create an organization in APK](../../../../administration/organizations/#create-an-organization).
     
     Enter the `organizationClaimValue:` related value that corresponds to the IdP when creating the organization. Note that the `organizationClaimValue:` is unique to each IdP.

## Step 10 - Invoke the System API

Use the JWT token that you received in the previous step to invoke the system APIs.
