## Configuring APK Data Plane

The agent can be configured in the following ways.

  1. API Manager as the control plane for APK
  2. APK as a gateway to API Manager 

### API Manager as the control plane for APK

1. APK related configurations

    Add the following configuration to the values.yaml file.

    ``` yaml
       cp:
                enableApiPropagation: true
                enabledSubscription: true
                host: "apim-apk-agent-service.apk.svc.cluster.local"
                skipSSLVerification: true

            dp:
                gatewayRuntime:
                    enforcer:
                        JWKSClient:
                            skipSSLVerification: false
                            hostnameVerifier: "AllowAll"
    ```

### APK as a gateway to API Manager

1. Configure Control Plane related configuration in Common Controller

    Add the following configuration to the common-log-conf file to provide control plane related configs to common-controller. Here, the host of the APIM-APK Agent should be provided.

    ``` yaml
        [commoncontroller.controlplane]
            enabled = true
            host = "apim-apk-agent-service.apk.svc.cluster.local"
            skipSSLVerification = true
    ```

2. Disable Hostname Verification for JWKS endpoint in APK Gateway.(Optional)

    Add the following configuration to disable SSL/hostname verification to JWKS validation call in enforcer in log-conf.yaml.
    
    ``` yaml
        [enforcer.client]
            skipSSL = false
            hostnameVerifier = "AllowAll"
    ```