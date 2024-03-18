### Configuring APIM-APK Agent

1. Configure Control Plane(APIM) related configuration in APIM-APK Agent.

    Add following configuration to values.yaml file to provide control plane related configs to APIM-APK Agent. Here, need to provide the host of the APIM-APK Agent.

    ``` yaml
       controlPlane:
         enabled: true
         serviceURL: https://apim-wso2am-cp-1-service.apk.svc.cluster.local:9443/
         username: admin
         password: admin
         environmentLabels: Default
         skipSSLVerification: true
         eventListeningEndpoints: amqp://admin:admin@apim-wso2am-cp-1-service.apk.svc.cluster.local:5672?retries='10'&connectdelay='30'
    ```

   2. Configure Dataplane(APK Gateway) related configuration in APIM-APK Agent.

       Add following configuration to values.yaml file to provide dataplane related configs to APIM-APK Agent. Here, need to provide the host of the APK Gateway.

       ``` yaml
       dataPlane:
         enabled: true
         k8ResourceEndpoint: https://apk-wso2-apk-config-ds-service.apk.svc.cluster.local:9443/api/configurator/apis/generate-k8s-resources
         namespace: apk
       ```