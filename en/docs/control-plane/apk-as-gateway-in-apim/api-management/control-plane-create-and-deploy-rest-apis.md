1. Login to the Publisher Console ([https://am.wso2.com/publisher](https://am.wso2.com/publisher)) of the WSO2 API Manager.
2. Click on the `REST API` button and then use `Import Open API` option.
3. Provide the OpenAPI definition of the API and click `Next`. Select OpenAPI URL and provide the below link as the `URL`. Click `Next`.
   ```http
   https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/SampleAPIDefinition.json
   ```
4. Edit the information as given below and click Create.

   | Field    | Sample value                               |
   | -------- | ------------------------------------------ |
   | Name     | SampleService                              |
   | Context  | /sample-api                                |
   | Version  | 0.1.0                                      |
   | Endpoint | https://dev-tools.wso2.com/gs/helpers/v1.0 |

5. Navigate to the Deploy section and click Deployments. 
6. Click Deploy New Revision. 
7. Optionally, provide a description for the revision. 
8. Select the Kubernetes Gateways in which you want to deploy the API and click Deploy. 
9.  Navigate to **Life Cycle** tab. Then click **Publish** to publish the API. 
10. To verify the API deployment in the Kubernetes Gateway, execute the following command. You will see the status of the deployed apis as follows once completed.

```bash
   kubectl get apis -n apk
```
