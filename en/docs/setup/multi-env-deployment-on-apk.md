
APK allows users to configure multiple environments on a single gateway, in addition to the per-environment gateway setup. This flexibility enables a single runtime to support multiple environments. With APK, APIs from different environments can be deployed on a shared gateway runtime.

### API Creation

The `environment` field in the API CR can be used to specify the API environment, such as Development, QA, etc. When this is specified within the API configuration, it is considered in Analytics, Rate Limiting, Security, and other functionalities.

```
kind: "API"
apiVersion: "dp.wso2.com/v1alpha2"
metadata:
    name: "order-api"
spec:
    apiName: "Order API"
    apiType: "REST"
    apiVersion: "3.14"
    environment: "Development"
    basePath: "/order/v1"
    organization: "default"
    definitionFileRef: "order-api-definition"
    production:
    - routeRefs:
        - "order-api-httproutes"
```

Additionally, you can specify the API access endpoints (hostnames) to indicate the environment of the API. For example, in the following access URL, `org1-dev.gw.wso2.com`, the environment is indicated as `dev`.

```
apiVersion: "gateway.networking.k8s.io/v1beta1"
kind: "HTTPRoute"
metadata:
    name: "order-api-httproutes"
spec:
    hostnames:
    - "org1-dev.gw.wso2.com"
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
        backendRefs:
        - group: "dp.wso2.com"
        kind: "Backend"
        name: "backend-949e1e5f96ebe38-api"
    parentRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: wso2-apk-default
      sectionName: "httpslistener"
```

### Assign Token Issuers for the environment

A token issuer can be associated with specific environments using the environments configuration. The possible values are as follows:

- Allow all environments

    ```
    environments:
    - “*”
    ```

- Allow for Dev and QA Environments

    ```
    environments:
    - “Dev”
    - “QA”
    ```

- If the environments field is not defined in the token issuer custom resource, it will apply to all environments by default.


    ```
    apiVersion: dp.wso2.com/v1alpha2
    kind: TokenIssuer
    metadata:
        name: dev-apk-idp-jwt-issuer
    spec:
        claimMappings:
        - localClaim: x-wso2-organization
            remoteClaim: organization
        - localClaim: x-wso2-groups
            remoteClaim: groups
        consumerKeyClaim: clientId
        environments:
        - “Development”
        - “QA”
        issuer: https://idp.am.wso2.com/token
        name: Domain-service-idp
        organization: apk-system
        scopesClaim: scope
        signatureValidation:
            certificate:
                secretRef:
                    key: wso2carbon.pem
                    name: apk-test-setup-wso2-apk-enforcer-truststore-secret
        targetRef:
            group: gateway.networking.k8s.io
            kind: Gateway
            name: wso2-apk-default
    ```