# Request Redirection via REST API

Request redirection allows you to send clients to a different URL. This can be useful for changing old URLs to new ones or directing traffic based on specific conditions. Request redirection can be configured via Kubernetes CRs as follows.

### Step 1 - Get the CRs for the relevant API configuration

Here, you can follow the steps in <a href="../../../../create-api/create-and-deploy-apis/rest/create-rest-api-using-crs" target="_blank">Develop and Deploy a REST API via CRs</a> documentation and create the CRs to deploy an API from scratch. 

Alternatively, you can generate the CRs for a given apk-conf file using the steps as detailed in <a href="../../../../api-management-overview/tools-for-api-development#option-2-generate-k8s-custom-resources-using-config-generator-tool-and-deploy-the-api-using-kubernetes-client" target="_blank">this section</a>.

### Step 2 - Add the request redirection filters to the HTTPRoute CR

A sample request redirection configuration for an HTTPRoute is given below.

```
filters:
- type: "RequestRedirect"
    requestRedirect:
    scheme: "https"
    hostname: "httpbin.org"
    path:
        type: "ReplaceFullPath"
        replaceFullPath: "/anything"
    statusCode: 301
```

This policy will redirect an incoming request to the GET /employee route with a 301 status code.

The complete HTTPRoute with this configuration is given below.

```
apiVersion: "gateway.networking.k8s.io/v1beta1"
kind: "HTTPRoute"
metadata:
  name: "production-httproute"
spec:
  hostnames:
  - "default.gw.wso2.com"
  rules:
  - matches:
    - path:
        type: "RegularExpression"
        value: "/employee"
      method: "GET"
    filters:
    - type: "RequestRedirect"
      requestRedirect:
        scheme: "https"
        hostname: "httpbin.org"
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/anything"
        statusCode: 301
  parentRefs:
  - group: "gateway.networking.k8s.io"
    kind: "Gateway"
    name: "wso2-apk-default"
    sectionName: "httpslistener"
```

!!! Note
    An HTTPRoute rule that has a RequestRedirect filter cannot have a backendRef or a URLRewrite filter attached.

### Step 3 - Deploy the API in APK

You can deploy the API using the following command. Replace <namespace> with the correct namespace.
```
kubectl apply -f . -n <namespace>
```

### Step 4 - Generate an access token

Follow the [Generate Access Token](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

### Step 5 - Invoke the API

You can invoke the API using the following command.

```
curl --location 'https://default.gw.wso2.com:9095/employee/1.0/employee' \
--header 'Host: default.gw.wso2.com' \
--header 'Authorization: Bearer <accessToken> -I
```

Once you have invoked the above, you will see the 301 status code and the `Location` header containing the new URL.

```
HTTP/2 301
location: https://httpbin.org/anything?id=1
vary: Accept-Encoding
server: envoy
```