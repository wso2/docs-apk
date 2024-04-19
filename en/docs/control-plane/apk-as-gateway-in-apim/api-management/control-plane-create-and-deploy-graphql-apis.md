1. Save and download the sample [StarWarsAPI.graphql](../../../assets/files/get-started/StarWarsAPI.graphql) file. This is the GraphQL SDL of the API that we will be using.
2. Login to the Publisher Console [API Publisher](https://am.wso2.com/publisher) of the WSO2 API Manager.
3. Under the GraphQL option, use `Import GraphQL SDL` option.
4. Provide the GraphQL definition of the API that was downloaded in step 1 and click `Next`. 
5. Provide the following information.

   | Field    | Sample value                                |
   |----------|---------------------------------------------|
   | Name     | StarWarsAPI                                 |
   | Context  | /starwars                                   |
   | Version  | 1.0.0                                       |
   | Endpoint | http://graphql-faker-service:9002/graphql   |

6. Select the APK Gateway and click Create.
7. Navigate to the Deploy section and click Deployments.
8. Click Deploy New Revision.
9. Optionally, provide a description for the revision.
10. Select the APK Gateways in which you want to deploy the API and click Deploy.
11. Navigate to **Life Cycle** tab. Then click **Publish** to publish the API.
12. To verify the API deployment in the APK Gateway, execute the following command. You will see the status of the deployed apis as follows once completed.

   ```bash
   kubectl get apis -n <namespace>
   ```