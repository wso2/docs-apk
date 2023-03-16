# Using a Non-production IdP

Follow the instructions below to use the inbuilt Non-production Identity Provider(IdP)/token service to authenticate the APIs that belong to a specific Organization:

!!! note
    - Use the non-production IdP only for testing purposes.
    - The non-production IdP is defined in the `<APK-HOME>/helm-charts/templates/idp/idp-ds/idp-ds-configmap.yaml` file.

## Step 1 - Create an Organization

Let's add the organization CR for `org1` to the namespace to create a new organization.
For more information, see [Create an organization in APK](../../../../administration/organizations).

After adding the organization named `org1` it will be added to the system (Data Plane).

## Step 2 - Create an API with an Organization

[Create an API](../../../../administration/organizations#create-an-api-with-an-organization) that is associated to an organization.

## Step 3 - Get an access token

!!! note
    Make sure that the Helm charts are installed.

1. Use [Postman](../../administration/postman-tests) to get the access token using the Non-production IdP.

    Use the following details before running the `POST` `Generate Auth code token` REST API.

     - Grant Type - `authorization_code`
     - Callback URL- `http://httpbin.org`
     - Auth URL - `https://idp.am.wso2.com:9095/oauth2/authorize`
     - Access Token URL - `https://idp.am.wso2.com:9095/oauth2/token`
     - Client ID - `45f1c5c8-a92e-11ed-afa1-0242ac120002`
     - Client Secret - `4fbd62ec-a92e-11ed-afa1-0242ac120002`

    !!! note
        Add `idp.am.wso2.com` to your `/etc/hosts` file.

    After you generate the token you will be redirected to non-production IdP login UI.

2. Login using the following details.

     - **userName** - `org1user`
     - **Password** - `org1user`
     - **Organization** - `org1` (The name of the organization that you created before in Step 1).

     You will receive the JWT access token.

## Step 4 - Invoke the System API

Use the JWT token that you received in the previous step to invoke the System API.
