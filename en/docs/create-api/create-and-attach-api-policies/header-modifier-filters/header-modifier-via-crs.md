# Header Modification via CRs

This functionality enables the addition, modification, and removal of request and response headers for APIs. By customizing headers, you can enhance the control and flexibility of API interactions, ensuring that both incoming requests and outgoing responses meet specific requirements.

### Step 1 - Get the CRs for the relevant API configuration

Here, you can follow the steps in <a href="../../../../create-api/create-and-deploy-apis/rest/create-rest-api-using-crs" target="_blank">Develop and Deploy a REST API via CRs</a> documentation and create the CRs to deploy an API from scratch. 

Alternatively, you can generate the CRs for a given apk-conf file using the steps as detailed in <a href="../../../../api-management-overview/tools-for-api-development#option-2-generate-k8s-custom-resources-using-config-generator-tool-and-deploy-the-api-using-kubernetes-client" target="_blank">this section</a>.

### Step 2 - Add the header modification filters to the HTTPRoute CR

Header modification can be done using an HTTPRoute filter as follows.

```
  - type: "RequestHeaderModifier"
    requestHeaderModifier:
    set:
        - name: "Set-Request-Header"
          value: "Set-Value"
    add:
        - name: "Add-Request-Header"
          value: "Added-Value"
    remove:
        - "Remove-Request-Header"
```

This filter does the following modifications to the request headers.

1. Update the header named "Set-Request-Header" with the value "Set-Value".
2. Adds a header named "Add-Request-Header" with the value "Added-Value".
3. Removes the header named "Remove-Request-Header".

!!! Note
    - By replacing the type with "ResponseHeaderModifier", the modifications can be done to the response. 
    - Both RequestHeaderModifier and ResponseHeaderModifier can be added to the same rule.

An HTTPRoute with the header modifiers is given below.

```
---
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
        - type: "URLRewrite"
          urlRewrite:
            path:
              type: "ReplaceFullPath"
              replaceFullPath: "/employee"
        - type: "RequestHeaderModifier"
          requestHeaderModifier:
            set:
              - name: "Set-Request-Header"
                value: "Test-Value"
            add:
              - name: "Test-Request-Header"
                value: "Test-Value"
            remove:
              - "Remove-Header"
      backendRefs:
        - group: "dp.wso2.com"
          kind: "Backend"
          name: "api-backend"
```

Sample configurations for each of them have been provided under the [Sample Configurations](#sample-configurations) section.

### Step 3 - Deploy the API in APK
You can deploy the API using the following command. Replace <namespace> with the correct namespace.
```
kubectl apply -f . -n <namespace>
```

### Sample Configurations

#### Request Header Modification

##### 1. Add Request Header

```
rules:
 - matches:
     - path:
         type: "RegularExpression"
         value: "/employee"
       method: "GET"
   filters:
     - type: "RequestHeaderModifier"
       requestHeaderModifier:
         add:
           - name: "Add-Request-Header"
             value: "Added-Value"
```

##### 2. Update Request Header

```
rules:
 - matches:
     - path:
         type: "RegularExpression"
         value: "/employee"
       method: "GET"
   filters:
     - type: "RequestHeaderModifier"
       requestHeaderModifier:
         set:
           - name: "Set-Request-Header"
             value: "Set-Value"
```

##### 3. Remove Request Header

```
rules:
 - matches:
     - path:
         type: "RegularExpression"
         value: "/employee"
       method: "GET"
   filters:
     - type: "RequestHeaderModifier"
       requestHeaderModifier:
         remove:
           - name: "Add-Request-Header"
             value: "Added-Value"
```

#### Response Header Modification

##### 1. Add Request Header

```
rules:
 - matches:
     - path:
         type: "RegularExpression"
         value: "/employee"
       method: "GET"
   filters:
     - type: "ResponseHeaderModifier"
       requestHeaderModifier:
         add:
           - name: "Add-Request-Header"
             value: "Added-Value"
```

##### 2. Update Request Header

```
rules:
 - matches:
     - path:
         type: "RegularExpression"
         value: "/employee"
       method: "GET"
   filters:
     - type: "ResponseHeaderModifier"
       requestHeaderModifier:
         set:
           - name: "Set-Request-Header"
             value: "Set-Value"
```

##### 3. Remove Response Header

```
rules:
 - matches:
     - path:
         type: "RegularExpression"
         value: "/employee"
       method: "GET"
   filters:
     - type: "ResponseHeaderModifier"
       requestHeaderModifier:
         remove:
           - name: "Add-Request-Header"
             value: "Added-Value"
```
