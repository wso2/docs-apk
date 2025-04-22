
1. Follow the same guide to create a REST API as in the <a href="../../../create-api/create-and-deploy-apis/rest/create-rest-api-using-rest-api" target="_blank">REST API Creation Guide</a>.
2. Update the organization of the generated CRs to match the super tenant organization name in the WSO2 API Manager or You can generate K8s resources by setting the organization as a zip file from config-deployer service using below command.

=== "Sample Request"
   ```
   curl --location 'https://api.am.wso2.com:9095/api/configurator/1.3.0/apis/generate-k8s-resources?organization=carbon.super' \
   --header 'Content-Type: multipart/form-data' \
   --header 'Accept: application/zip' \
   --form 'apkConfiguration=@"/Users/user/SampleService.apk-conf"' \
   --form 'definitionFile=@"/Users/user/SampleAPIDefinition.json"' \
   -k --output ./api-crds.zip
   ```
3. Deploy the generated K8s artifacts to the Kubernetes API server.

   ```
   kubectl apply -n apk -f <path_to_extracted_zip_file>
   ```
