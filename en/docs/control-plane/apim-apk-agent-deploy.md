## Configuring APIM-APK Agent

The agent can be configured in the following ways.

  1. API Manager as the control plane for APK
  2. APK as a gateway to API Manager 

### Common Configurations

1. Configure Control Plane(APIM) related configuration in APIM-APK Agent

    Add the following configuration to the values.yaml file to provide control plane related configs to APIM-APK Agent. Here, the host of the APIM-APK Agent should be provided.

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

   2. Configure Dataplane (APK Gateway) related configuration in APIM-APK Agent

       Add the following configuration to the values.yaml file to provide dataplane related configs to APIM-APK Agent. Here, the host of the APK Gateway should be provided.

       ``` yaml
       dataPlane:
         enabled: true
         k8ResourceEndpoint: https://apk-wso2-apk-config-ds-service.apk.svc.cluster.local:9443/api/configurator/apis/generate-k8s-resources
         namespace: apk
       ```

### API Manager as the control plane for APK

1. Change the mode of the agent configuration as shown below.

    ``` yaml
       agent:
          mode: DPtoCP
    ```


### APK as a gateway to API Manager

1. Change the mode of the agent configuration as shown below.

    ``` yaml
       agent:
          mode: CPtoDP
    ```

<table>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>serviceURL</code></td>
      <td>Service URL of the API Manager Control Plane</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>environmentLabels</code></td>
      <td>Gateway environment labels can be found under the environments section
      in the API Manager deployment TOML which sets up the APK gateway.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>eventListeningEndpoints</code></td>
      <td>Event Listening Endpoint in the API Manager</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>Username and Password</code></td>
      <td>Admin credentials of the API Manager</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>k8ResourceEndpoint</code></td>
      <td>Config deployer service endpoint</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>namespace</code></td>
      <td>Namespace where APK is deployed</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>mode</code></td>
      <td>Mode to set up the agent</td>
    </tr>
  </tbody>
</table>
