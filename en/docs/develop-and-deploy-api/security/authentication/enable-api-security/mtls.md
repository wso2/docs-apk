# mTLS Authentication

In contrast to the usual one-way SSL authentication where a client verifies the identity of the server, in mutual SSL the server validates the identity of the client so that both parties trust each other. This builds a system that has very tight security and avoids any requests made to the client with regard to providing its username/password, as long as the server is aware of the certificates that belong to the client.

The following section explains as to how the APIs in WSO2 APK can be secured using mutual SSL in addition to OAuth2.

## Before you begin

- [Create an API](../../../../get-started/quick-start-guide.md)

You can use the apk-conf file which is created in [Create an API](../../../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceAPI.apk-conf`.

Sample content before the modification is shown below.

```yaml
name: "EmployeeServiceAPI"
basePath: "/employee"
version: "3.14"
type: "REST"
defaultVersion: false
id: "mtls-api"
endpointConfigurations:
    production:
        - endpoint: "http://employee-service:8080"
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

In order to enable mTLS for the API, you must first have the certificate that will be used for the mTLS for that particular API. Connecting that certificate to the API can be done in one of three ways.
1. Using a ConfigMap 
2. Using a Secret
3. Using inline certificates

NOTE: You can associate multiple certificates to a single API for mTLS. 
## Create an API secured with Mutual SSL

### 1. Applying mTLS using apk-conf file

When adding mTLS for an API deployed via the apk-conf file, only ConfigMaps can be used to provide the mTLS certificate.  Here's how to do it:

For this walkthrough, consider the following ConfigMap.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mtls-configmap      # Provide this name to the apk-conf file.
  namespace: apk
data:
  tls.crt: |                # Provide this key to the apk-conf file.
    -----BEGIN CERTIFICATE-----
    MIIDkTCCAnmgAwIBAgIUJitjysknJ0nHeLH/mjT1JIpOz4cwDQYJKoZIhvcNAQEL
    BQAwYDELMAkGA1UEBhMCVVMxEjAQBgNVBAgMCVlvdXJTdGF0ZTERMA8GA1UEBwwI
    Z3MlFlw4U8CdO90L0nB1KFhz1Et0Sl9u/LDsUYq6mE+XhTngPs8qwR/o43s1DUID
    y5Oi4A4+id+xO0XnHIkkqCfPtFzxl3hwytcy8EqISynzzHWNJ8bFZIYX4tgX+PLq
    u0/ITEw=
    -----END CERTIFICATE-----
```

1. Apply the ConfigMap using 
```
kubectl apply -f . -n <namespace>
```

2. Add the following content to your apk-conf file.
```yaml
authentication:
  - authType: OAuth2
    required: optional
  - authType: mTLS
    required: mandatory
    certificates:
      - name: mtls-configmap    # Name of the ConfigMap containing your mTLS certificate
        key: tls.crt            # Key of the ConfigMap containing your mTLS certificate
```

Your final file would look like this.

```yaml
name: "EmployeeServiceAPI"
basePath: "/employee"
version: "3.14"
type: "REST"
defaultVersion: false
id: "mtls-api"
endpointConfigurations:
    production:
        - endpoint: "http://employee-service:8080"
operations:
  - target: "/employee"
    verb: "GET"
    secured: true
    scopes: []
  - target: "/employee"
    verb: "POST"
    secured: true
    scopes: []
authentication:
  - authType: mTLS
    required: mandatory   # Indicates whether mTLS is mandatory or optional
    certificates:
      - name: mtls-configmap
        key: tls.crt
```

!!! Note
    The required field specifies whether mTLS is mandatory or optional for this API.
    * mandatory - Authentication fails if a correct certificate is not sent.
    * optional - If a certificate is sent, authentication will fail if the certificate is not valid. 
    By default, mTLS is mandatory.

3. Deploy the API.

### 2. Applying mTLS using CRs

For CRs, the certificate can be provided as a ConfigMap, Secret or inline certificate. A CR configured with mTLS as shown below.

```yaml
apiVersion: "dp.wso2.com/v1alpha2"
kind: "Authentication"
metadata:
  name: "mtls-authentication"
spec:
  default:
    mtls:
      required: mandatory   
      configMapRefs:    # List of ConfigMaps
        - name: mtls-configmap
          key: tls.crt
      secretRefs:       # List of Secrets
        - name: mtls-secret
          key: tls.crt
      certificatesInline:   # List of inline certificates
      - |
        -----BEGIN CERTIFICATE-----
        MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
        -----END CERTIFICATE-----
      - |
        -----BEGIN CERTIFICATE-----
        MIIEqDCCA5CgAwIBAgIQbY5v4BD43ZodTGF1Lg4qLzANBgkqhkiG9w0BAQsFADA/
        -----END CERTIFICATE-----
  targetRef:
    group: "gateway.networking.k8s.io"
    kind: "API"
    name: "mtls-api"  # API to apply mTLS for
```

Then apply the Authentication CR using the command:
```
kubectl apply -f . -n <namespace>
```

## Invoking an API secured with mTLS

By default, the WSO2 APK retrieves the client certificate from the X-WSO2-CLIENT-CERTIFICATE HTTP header.

To invoke the API, you may use the following curl command structure.

  ```
  curl --location 'https://<host>:9095/test/3.14/employee' \
  --header 'Host: <host>' \
  --header 'Authorization: Bearer <access-token>'
  --header 'X-WSO2-CLIENT-CERTIFICATE: <certificate-content>'
  ```