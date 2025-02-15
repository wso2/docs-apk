1. Login to the Publisher Console ([https://am.wso2.com/publisher](https://am.wso2.com/publisher)) of the WSO2 API Manager.
2. Click on the `AI API` button and then use `Create AI API` option.
3. Select AI Provider and AI Provider API Version and click Next.
4. Edit the information as given below.

   | Field    | Sample value                        |
      |----------|-------------------------------------|
   | Name     | MistralAIAPI                  |
   | Context  | /mistralaiapi                           |
   | Version  | 0.0.2                               |
   | Endpoint | https://api.mistral.ai |

5. Select the Kubernetes Gateway and click Create. 
6. Go to API Configurations, and click Endpoints. 
7. Fill API Key for Production and Sandbox Endpoints and click save. 
8. Navigate to the Deploy section and click Deployments. 
9. Click Deploy New Revision. 
10. Optionally, provide a description for the revision. 
11. Select the Kubernetes Gateways in which you want to deploy the API and click Deploy. 
12. Navigate to **Life Cycle** tab. Then click **Publish** to publish the API. 
13. To verify the API deployment in the APK Gateway, execute the following command. You will see the status of the deployed apis as follows once completed.

```bash
   kubectl get apis -n apk
```
