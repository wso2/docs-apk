# Using a Non-production IdP

Follow the instructions below to use the inbuilt Non-production Identity Provider(IdP)/token service to authenticate the APIs that belong to a specific Organization:

!!! note
    - Use the non-production IdP only for testing purposes.


## Step 1 - Get an access token

!!! note
    Make sure that the Helm charts are installed.

1. Open Postman and create a new request to get the access token using the non-production IdP.
2. Navigate to the Authorization tab of the request.

     - Grant Type - `authorization_code`
     - Callback URL- `http://httpbin.org`
     - Auth URL - `https://idp.am.wso2.com:9095/oauth2/authorize`
     - Access Token URL - `https://idp.am.wso2.com:9095/oauth2/token`
     - Client ID - `45f1c5c8-a92e-11ed-afa1-0242ac120002`
     - Client Secret - `4fbd62ec-a92e-11ed-afa1-0242ac120002`

    !!! note
        Add `idp.am.wso2.com` to your `/etc/hosts` file.

    After you generate the token you will be redirected to non-production IdP login UI.

3. Login using the following details.

     - **userName** - `org1user`
     - **Password** - `org1user`
     - **Organization** - `org1`

     You will receive the JWT access token.

## Step 2 - Invoke the System API

Use the JWT token that you received in the previous step to invoke the System API.
