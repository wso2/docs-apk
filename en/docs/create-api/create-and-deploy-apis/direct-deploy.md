The Config Deployer streamlines the API deployment process by generating and applying CRs in a single step. With this option, you can use the Config Deployer to automatically generate the necessary CR configurations for your APIs and apply the generated CRs directly to your Kubernetes API server for rapid deployment.

You can deploy the API directly into APK using API Schema definition and APK configuration file using the command below.

```
curl --location 'https://api.am.wso2.com:9095/api/deployer/1.1.0/apis/deploy' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/yaml' \
--header 'Authorization: Bearer <Access Token From IDP>' \
--form 'apkConfiguration=@"/Users/user/EmployeeService.apk-conf"' \
--form 'definitionFile=@"/Users/user/EmployeeServiceDefinition.json"'
```

Once we invoke the above API, the output looks like below.

```
---
id: "048f821480bb19de6b64973a4b69109af286cfef"
name: "EmployeeServiceAPI"
basePath: "/test"
version: "3.14"
type: "REST"
defaultVersion: false
endpointConfigurations:
    production:
        endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
operations:
- target: "/employee"
    verb: "GET"
    secured: true
    scopes: []
- target: "/employee"
    verb: "POST"
    secured: true
    scopes: []
```