## Before you begin

- You can use the below sample `apk-conf` file to create an API. For reference, follow the <a href="../../../../get-started/quick-start-guide" target="_blank">Quick Start Guide</a> documentation.

```yaml
name: "Interceptor API"
basePath: "/interceptor-api"
version: "1.0.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
 production:
   - endpoint: "http://backend-svc.ns:9082"
operations:
- target: "/books"
  verb: "POST"
  secured: true
  scopes: []
- target: "/offers"
  verb: "POST"
  secured: true
  scopes: []
```

- If your `Backend` is secured with a certificate, Apply a `ConfigMap` with the certificate content in the field `ca.crt`. You can use the below sample for reference.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: interceptor-cert
  namespace: apk
data:
  ca.crt: |
    -----BEGIN CERTIFICATE-----
    MIIC/TCCAeWgAwIBAgIUd4njv8ySPgo7t0F1e2aJEo9TpQ4wDQYJKoZIhvcNAQEL
    BQAwDjEMMAoGA1UEAwwDYXBrMB4XDTIzMDMwOTA4MTYzNFoXDTMzMDMwNjA4MTYz
    NFowDjEMMAoGA1UEAwwDYXBrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
    AQEA1G9BAcVa3aMemxERY+J8UmH/W8JpcEOtdeNX5YNihnNOXtlvhSzFzOPaK97P
    r4IqGASbVNiR+1J6WEoi/b6ZJTx0q3YUn0YlQJrz7g20TdoGJjxGVWzn0EW4beHX
    Gq60vXLf4t3mlLCLGIK3kJTWAoRzd74djV7+5v0Bm/6KBBAWcu5UbOD9KRpOsxGM
    n3Z0103oAGViyq84QtFvhXVNWttDLe2jU/7o42ddaJozRL9z+1AepdoWPyJZIZqU
    bXcGAk7idk7c/8dKMxwAm3CV/WvgWrVK5R+YTiGqRf5pd9WWCydEVQkNqCZgTPNy
    BTRvHo52onPnT6ALtMI0mnWLtQIDAQABo1MwUTAdBgNVHQ4EFgQUzxcA8ceCF5t+
    vPeOpYbi11CWjwcwHwYDVR0jBBgwFoAUzxcA8ceCF5t+vPeOpYbi11CWjwcwDwYD
    VR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAFCKd5x8z64p1j9BnoSAl
    JJuNz4uWjv/YK94B3s3KUkXOXjHuLuazkSss2UHFb+KeLd6vhimM5QqkFsUEMsnC
    8RyBZP58kghcLzJld5Uiwlnr/RuOANvcv4eKSavwu5/ABXuMUQb/GvKtWPrr2VbJ
    ULg3p7NGigXHHg84eVMA7oNX1Z5R2cS4ISklWXm5SpMPh+SNCgqwqhxRNYJ2J0EZ
    qlp4ofQG3GJ72J+DRHlNujWEskP5IJjw6w8Q0zjXx26yelGe2+TM6BB7PpCN6kNU
    zHo2k/575bu2iZztnYVmE74H1W3cXJ7c0q82uUFvdW+FlRtm+OPIiIGK74lFiZNB
    OQ==
    -----END CERTIFICATE-----
```

## Adding API-level interceptors

**Sample code snippets**

The following is a sample code snippet that defines how you can attach Interceptor API Policies at the API-level within an API APK configuration file.

```yaml
name: "Interceptor API"
basePath: "/interceptor-api"
version: "1.0.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
 production:
   - endpoint: "http://backend-svc.ns:9082"
operations:
- target: "/books"
  verb: "POST"
  secured: true
  scopes: []
- target: "/offers"
  verb: "POST"
  secured: true
  scopes: []
apiPolicies:
  request:
    - policyName: "Interceptor"
      policyVersion: v1
      parameters:
        backendUrl: "https://interceptor-svc.ns:9081"
        headersEnabled: true
        bodyEnabled: true
        trailersEnabled: true
        contextEnabled: true
        tlsSecretName: "interceptor-cert"
        tlsSecretKey: "ca.crt"
  response:
    - policyName: "Interceptor"
      policyVersion: v1
      parameters:
        backendUrl: "https://interceptor-svc.ns:9081"       
        headersEnabled: true       
        bodyEnabled: true      
        trailersEnabled: true      
        contextEnabled: true
        tlsSecretName: "interceptor-cert"
        tlsSecretKey: "ca.crt"
```

??? note "Attach an Interceptor API Policy to the Request Flow Only"

    ```
    apiPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
    ```

??? note "Attach an Interceptor API Policy to the Response Flow Only"

    ```
    apiPolicies:
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
    ```

??? note "Attach an Interceptor API Policy to Request and Response Flows"

    ```
    apiPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
    ```

## Adding operation-level interceptors

**Sample code snippets**

The following is a sample code snippet that defines how you can attach Interceptor API Policies at the Operation-level within an API APK configuration file.

```yaml
name: "Interceptor API"
basePath: "/interceptor-api"
version: "1.0.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
 production:
   - endpoint: "http://backend-svc.interceptor:9082"
operations:
- target: "/books"
  verb: "POST"
  secured: true
  scopes: []
  operationPolicies:
    request:
      - policyName: "Interceptor"
        policyVersion: v1
        parameters:
          backendUrl: "https://interceptor-svc.ns:9081"
          headersEnabled: true
          bodyEnabled: true
          trailersEnabled: true
          contextEnabled: true
          tlsSecretName: "interceptor-cert"
          tlsSecretKey: "ca.crt"
    response:
      - policyName: "Interceptor"
        policyVersion: v1
        parameters:
          backendUrl: "https://interceptor-svc.ns:9081"
          headersEnabled: true
          bodyEnabled: true
          trailersEnabled: true
          contextEnabled: true
          tlsSecretName: "interceptor-cert"
          tlsSecretKey: "ca.crt"
- target: "/offers"
  verb: "POST"
  secured: true
  scopes: []
```

??? note "Attach an Interceptor API Policy to the Request Flow Only"

    ```
    operationPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
    ```

??? note "Attach an Interceptor API Policy to the Response Flow Only"

    ```
    operationPolicies:
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
    ```

??? note "Attach an Interceptor API Policy to Request and Response Flows"

    ```
    operationPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "https://interceptor-svc.ns:9081"
            headersEnabled: true
            bodyEnabled: true
            trailersEnabled: true
            contextEnabled: true
            tlsSecretName: "interceptor-cert"
            tlsSecretKey: "ca.crt"
    ```

## Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with the REST API interface.

<table>
<thead>
  <tr>
    <th><b>Configuration</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="white-space: nowrap;"><code>operationPolicies</code></td>
    <td>This defines that the API Policy will be applied as an operation Policy, which will be only applicable to the specific operation within the API.</td>
  </tr>
  <tr>
    <td><code>apiPolicies</code></td>
    <td>This defines that the API Policy will be applied as an API-level Policy, which will be global to all the operations within the specific API.</td>
  </tr>
  <tr>
    <td><code>request</code></td>
    <td>Defines that the API Policies should be attached to the Request Flow.</td>
  </tr>
  <tr>
    <td><code>response</code></td>
    <td>Defines that the API Policies need to be attached to the Response Flow</td>
  </tr>
  <tr>
    <td><code>policyName</code></td>
    <td>Defines the default policy names. For interceptor API policies this should equal to <code>Interceptor</code>.</td>
  </tr>
  <tr>
    <td><code>policyVersion</code></td>
    <td>Defines the version of the API policy.</td>
  </tr>
  <tr>
    <td><code>parameters</code></td>
    <td>This defines the request/response interceptor parameters</td>
  </tr>
  <tr>
    <td><code>headersEnabled</code></td>
    <td>Indicates whether request/response header details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>bodyEnabled</code></td>
    <td>Indicates whether request/response body details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>contextEnabled</code></td>
    <td>Indicates whether context details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>trailersEnabled</code></td>
    <td>Indicates whether request/response trailer details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>backendUrl</code></td>
    <td>Backend URL of the interceptor service</td>
  </tr>
  <tr>
    <td><code>tlsSecretName</code></td>
    <td>Optional parameter which indicates the reference name for Kubernetes <code>ConfigMap</code> resource which contains the tls information</td>
  </tr>
  <tr>
    <td><code>tlsSecretKey</code></td>
    <td>Optional parameter which Indicates the tls key name</td>
  </tr>
</tbody>
</table>

## Deploy APK configuration

Refer [Quick Start Guide](../../../get-started/quick-start-guide.md)  to deploy the API using APK configuration.