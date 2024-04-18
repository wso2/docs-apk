The Config Generator simplifies the process of generating the required Custom Resources (CRs) for your APIs. You can use this tool to automatically create CRs based on your API specifications or APK Configuration file. Once the CRs are generated, you have the flexibility to:

1. Feed them into your CI/CD pipeline for automated and controlled deployment.
2. Apply them directly to your Kubernetes cluster using the standard "kubectl apply" command for a manual deployment approach.

By invoking the Configuration Service, you can generate Kubernetes artifacts specifically tailored for APIs. These artifacts can be applied to a Kubernetes cluster using standard command-line tools like kubectl. However, in production scenarios, direct execution of kubectl commands on the runtime may not be feasible. In such cases, pipeline jobs play a vital role, where the generated artifacts are applied to the runtime through automated processes.

You can generate K8s resources as a zip file from config-deployer service and apply it to the deployment through a CI/CD pipeline using kubectl.

```
curl --location 'https://api.am.wso2.com:9095/api/configurator/1.1.0/apis/generate-k8s-resources' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/zip' \
--form 'apkConfiguration=@"/Users/user/EmployeeService.apk-conf"' \
--form 'definitionFile=@"/Users/user/EmployeeServiceDefinition.json"' \
-k --output ./api-crds.zip
```

The sample output of the generated zip file looks as follows.

```
├── production-httproute-uuid.yaml
├── sandbox-httproute-uuid.yaml
├── backend-production-api-uuid-resource.yaml
├── backend-sandbox-api-uuid-resource.yaml
├── uuid-production-authentication.yaml
├── uuid-sandbox-authentication.yaml
├── uuid-backend-jwt-policy.yaml
├── uuid-definition.yaml
└── api-uuid.yaml
```
Once you have generated your K8s artifacts, the next step is to apply them to the Kubernetes API server. 

```
kubectl apply -f <path_to_extracted_zip_file>
```