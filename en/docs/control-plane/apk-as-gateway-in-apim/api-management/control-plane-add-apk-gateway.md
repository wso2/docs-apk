# Add Kubernetes Gateway to API Manager

This guide provides instructions on how to add an Kubernetes Gateway dynamically to WSO2 API Manager using Admin Portal. 
Follow the instructions below to add an Kubernetes Gateway to API Manager.

1. Log in to the API Manager Admin Portal using the following URL and admin credentials.

=== "Command"
     ```
      https://am.wso2.com/admin
     ```
=== "Format"
     ```
      https://<APIM_HOST>:<APIM_PORT>/admin
     ```

2. Click on the **Gateways** menu and then click on **Add Gateway Environment**.
3. Provide the following details and click **Save**.
    - **Name**: Enter a name for the gateway environment.
    - **Display Name**: Enter a display name for the gateway environment.
    - **Description**: Enter a description for the gateway environment.
    - **Gateway Type**: Select the type of the gateway environment as **APK**.
    - **Type**: Select the type of the gateway environment as **Production** or **Sandbox** or **hybrid**.
    - **Host**: Enter the service URL hostname of the gateway environment.

