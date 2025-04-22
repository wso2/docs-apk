You can deploy the API directly into Kubernetes Gateway using API Schema definition and Kubernetes Gateway configuration file using the command below.

```
curl --location 'https://api.am.wso2.com:9095/api/deployer/1.3.0/apis/deploy' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/yaml' \
--header 'Authorization: Bearer <Access Token From IDP>' \
--form 'apkConfiguration=@"/Users/user/SampleService.apk-conf"' \
--form 'definitionFile=@"/Users/user/SampleAPIDefinition.json"'
```

Once we invoke the above API, the response body would look like below.

```yaml
 id: "2d43a29159fbc77652b687243d545a7038c3abd6"
 name: "Sample API"
 basePath: "/sample-api"
 version: "0.1.0"
 type: "REST"
 defaultVersion: false
 endpointConfigurations:
     production:
     - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
 operations:
 - target: "/ai/spelling"
   verb: "POST"
   secured: true
   scopes: []
 - target: "/base64/decode/{value}"
   verb: "POST"
   secured: true
   scopes: []
 - target: "/base64/encode/{value}"
   verb: "POST"
   secured: true
   scopes: []
 - target: "/ip"
   verb: "GET"
   secured: true
   scopes: []
 - target: "/user-agent"
   verb: "GET"
   secured: true
   scopes: []
 - target: "/uuid"
   verb: "GET"
   secured: true
   scopes: []
```