### Configuring APK

1. Configure Control Plane related configuration in Common Controller.

    Add following configuration to common-log-conf file to provide control plane related configs to common-controller. Here, need to provide the host of the APIM-APK Agent.

    ``` yaml
        [commoncontroller.controlplane]
            enabled = true
            host = "apim-apk-agent-service.apk.svc.cluster.local"
            skipSSLVerification = true
    ```

2. Disable Hostname Verification for JWKS endpoint in APK Gateway.(Optional)

    Add following configuration to disable SSL/hostname verification to JWKS validation call in enforcer in log-conf.yaml.
    
    ``` yaml
        [enforcer.client]
            skipSSL = false
            hostnameVerifier = "AllowAll"
    ```