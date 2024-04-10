1. Login to the Developer Portal ([https://am.wso2.com/devportal](https://am.wso2.com/devportal)) of the WSO2 API Manager.
2. Click on the `Applications` tab and then use `ADD NEW APPLICATION` option.
3. Provide the information as given below and click `Save`.

     <html>
        <table>
        <th>Field</th><th>Value</th>
        <tr><td>Application Name</td><td>SwaggerPetstoreApp</td></tr>
        <tr><td>Per Token Quota</td><td>10PerMin</td></tr>
        <tr><td>Description</td><td>Petstore Application</td></tr>
        </table>
     </html>

4. Click **Subscriptions** to subscribe to the created SwaggerPetstore API.
5. Click **Production Keys** or **Sandbox Keys** based on the environment for which you need to generate keys.
   Let's assume that you are working in a production environment. Therefore, click **Production Keys**.
5. Click **Generate Keys** to create an application Access Token with relevant scopes.
6. To verify the Application and Subscription creation in the APK Gateway, execute the following command. You will see the status of the deployed application as follows once completed.

    ```bash
    kubectl get subscriptions -n apk
    kubectl get applications -n apk
    ```
