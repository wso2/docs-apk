# Add Basic Auth Backend Security via CRs

### Overview

You can secure the access to your backend via Basic Authentication scheme. For that, you need to specify the Basic Auth credentials in the `Backend` resource. You have to have a K8s `Secret` resource containing `username` and `password` data.

Let's say you have the following `Secret` which contains the credentials:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backend-creds
data:
  usr: YWRtaW4K
  pwd: YWRtaW4K
type: Opaque
```
You can apply this CR using kubectl.
=== "Format"
    ```command
    kubectl apply -f <path-to-crs>
    ```

=== "Command"
    ```command
    kubectl apply -f .
    ```

You can refer to the above `Secret` data from your `Backend` as below:

```yaml
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: sample-backend
spec:
  protocol: https
  services:
  - host: backend-service
    port: 443
  security:
  - type: Basic
    basic:
      secretRef: 
        name: backend-creds
        usernameKey: usr
        passwordKey: pwd
```
Use the same kubectl command to apply this CR as well.

We use security with `spec.security[0].type` as `Basic`. Note that you have to refer the data names in the `Secret` resource in `spec.security[0].basic.secretRef.usernameKey` and `security[0].basic.secretRef.passwordKey` fields.

In the following section, we will discuss a sample scenario to try out backend security via CRs. You can use the same kubectl command to apply the CRs in below sample scenario.

### Step 1 : Create a  K8s Secret

```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: backend-creds
    data:
      usr: YWRtaW4K
      pwd: YWRtaW4K
    type: Opaque
```

### Step 2 : Create a  Backend

We will create a sample backend by referring to the above `Secret` data.

```yaml
    apiVersion: "dp.wso2.com/v1alpha1"
    kind: "Backend"
    metadata:
      name: "basic-auth-backend"
      labels:
        api-name: "basic-auth-api"
        api-version: "v1"
        organization: "default"
        managed-by: "apk"
    spec:
      services:
      - host: "httpbin.org"
        port: 443
      basePath: ""
      protocol: "https"
      security:
        basic:
          secretRef:
            name: "backend-creds"
            usernameKey: "usr"
            passwordKey: "pwd"
```

### Step 3 : Create an HTTPRoute

Create an `HTTPRoute` resource referring to the above `Backend`.

```yaml
    apiVersion: "gateway.networking.k8s.io/v1beta1"
    kind: "HTTPRoute"
    metadata:
      name: "custom-route"
      labels:
        api-name: "basic-auth-api"
        api-version: "v1"
        organization: "default"
        managed-by: "apk"
    spec:
      hostnames:
      - "default.gw.wso2.com"
      rules:
      - matches:
        - path:
            type: "RegularExpression"
            value: "/get"
          method: "GET"
        filters: []
        backendRefs:
        - group: "dp.wso2.com"
          kind: "Backend"
          name: "basic-auth-backend"
      - matches:
        - path:
            type: "RegularExpression"
            value: "/post"
          method: "POST"
        filters: []
        backendRefs:
        - group: "dp.wso2.com"
          kind: "Backend"
          name: "basic-auth-backend"
      parentRefs:
      - group: "gateway.networking.k8s.io"
        kind: "Gateway"
        name: "default"
        sectionName: "httpslistener"
```

### Step 4 : Create the API

```yaml
    kind: "API"
    apiVersion: "dp.wso2.com/v1alpha1"
    metadata:
      name: "basic-auth-api"
      labels:
        api-name: "basic-auth-api"
        api-version: "v1"
        organization: "default"
        managed-by: "apk"
    spec:
      apiName: "BasicAuthAPITest"
      apiType: "REST"
      apiVersion: "1.0"
      basePath: "/basic-auth-test/1.0"
      organization: "default"
      isDefaultVersion: false
      definitionFileRef: "basic-auth-api-definition"
      production:
      - httpRouteRefs:
        - "custom-route"
      sandbox: null
      apiProperties: []
    status: null
    ---
    kind: "ConfigMap"
    apiVersion: "v1"
    metadata:
      name: "basic-auth-api-definition"
      labels:
        api-name: "basic-auth-api"
        api-version: "v1"
        organization: "default"
        managed-by: "apk"
    binaryData:
      definition: "H4sIAAAAAAAAAIVRPU/DMBD9K9HNKEnLlq1sCKQiSifUwbiX5iTHtuxLUYny3/E5DVIX6uVZ9z7O8hvBebTKEzTwWNblCh4KINs6aEZgYoOJeFKR9GbgbvP2/IGRRXPGEMnZxJ5XMKVBxCAzaD5HGIJJRMfsY1NVgl9kSxdO4jxi1IE8z+5dthX791eYDjlGD4H4knOO2KrBcLofMukVd1FeVp2QBa8QMHpnI2ZuXdcCt2uuScWihGn6d1mmK+9izl/w/p7ty/1k4bXrUxJazlGLeqc77Of0P0+q4eKlBadSA2v5wda47yyi3hvSlFXCukA/Sl6yvymAU2dl2ijeqFPhYp7m8wvKfPC9AQIAAA=="
```

### Step 5 : Invoke the API

Refer [Step 3](https://apk.docs.wso2.com/en/latest/get-started/quick-start-guide/#step-3-invoke-the-api) in QSG to see how to invoke the API.

In this try out we will use [httpbin service's](https://httpbin.org/)  `/get` resource to test the backend security. It echoes back the request details including all the headers. Therefore if the backend security was correctly configured, you should see the header `"Authorization": "Basic YWRtaW4KOmFkbWluCg==",` in the received response. 

```json
    {
      "args": {}, 
      "headers": {
        "Accept": "*/*", 
        "Authorization": "Basic YWRtaW4KOmFkbWluCg==", 
        "Host": "httpbin.org", 
        "User-Agent": "curl/7.88.1"
      }, 
      "url": "https://httpbin.org/get"
    }

```