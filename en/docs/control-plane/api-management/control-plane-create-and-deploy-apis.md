
1. Login to the Publisher Console [API Publisher](https://am.wso2.com/publisher) of the WSO2 API Manager.
2. Click on the `REST API` button and then use `Import Open API` option.
3. Provide the OpenAPI definition of the API and click `Next`. Select OpenAPI URL and provide `https://petstore3.swagger.io/api/v3/openapi.json` as the URL. Click Next.
4. Edit the information as given below and click Create.

   | Field    | Sample value                        |
      |----------|-------------------------------------|
   | Name     | SwaggerPetstore                     |
   | Context  | /petstore                           |
   | Version  | 1.0.0                               |
   | Endpoint | https://petstore3.swagger.io/api/v3 |

5. Click **Portal Configurations** and click **Subscriptions** to navigate to the Business Plans page.
6. Select **Gold** and **Silver** as the Business Plans and click **Save**.
7. Navigate to the Deploy section and click Deployments.
8. Click Deploy New Revision.
9. Optionally, provide a description for the revision.
10. Select the APK Gateways in which you want to deploy the API and click Deploy.
11. Navigate to **Life Cycle** tab. Then click **Publish** to publish the API.
12. To verify the API deployment in the APK Gateway, execute the following command. You will see the status of the deployed apis as follows once completed.

   ```bash
   kubectl get apis
   ```