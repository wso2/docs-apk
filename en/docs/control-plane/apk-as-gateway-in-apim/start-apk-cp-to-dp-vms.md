
#### Create Kubernetes namespace

In this guide, the APIM Control Plane and the Kubernetes Gateway are installed in the same namespace. If you prefer, you can use any standalone Kubernetes Gateway pattern to deploy the Kubernetes Gateway.

``` 
kubectl create ns apk
```
#### Set up WSO2 Kubernetes Gateway 1.3.0

1. Create a new Helm repository with the latest Kubernetes Gateway release using the following command. Let's consider the `<repository-name>` as `wso2apk`.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.3.0-1
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Download the `values.yaml` file

    To obtain the `values.yaml` file, use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-APK>` with the desired version of the Kubernetes Gateway. Run the following command:

    === "Command"
        ```
        helm show values wso2apk/apk-helm --version 1.3.0-1  > kg-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-values.yaml
        ```

4. To add Kubernetes Gateway as a gateway, add the following configurations to `kg-values.yaml`.

    - Add the following configuration under the `wso2.apk` section

        ``` yaml
        cp:
            enabledSubscription: true
            host: "apim-apk-agent-service.apk.svc.cluster.local"
            skipSSLVerification: true
        ```

        <table>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>enabledSubscription</code></td>
      <td>This field must be set to true to retrieve subscription details at the gateway level.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>host</code></td>
      <td>Agent hostname.
      <p>
      {agentService}.{namespace}.svc.cluster.local
      </p>
      <p>
      You can retrieve the agentService name using `kubectl get svc -n <namespace>`
      </p>
      <p>
      At this point, the agent is not configured, so you can keep the default value as is. Once configured, ensure you update this value and perform a Helm upgrade.
      </p>
      </td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>skipSSLVerification</code></td>
      <td>Skip SSL verification between the Agent and Gateway.</td>
    </tr>
  </tbody>
</table>

    - (Optional) Change the default listener hostnames

        By default, the Kubernetes Gateway has 2 listeners:

        - System APIs Listener - api.am.wso2.com
        - Gateway Listener - gw.wso2.com

        If you wish to change the default hostname and vhost, modify the following values.yaml configurations. For example, if you want to deploy a production environment with the domain name example.com, expose your APIs through prod.gw.example.com, and expose APK system APIs through prod.apk.example.com, configure as follows:
       
            wso2.apk.listener.hostname: 'prod.apk.example.com'
            wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
            wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]

    - Configure API Key Issuer

        If you want to use API Key Authentication, you can enable it by changing the following configuration in `kg-values.yaml`
        under `wso2.apk.dp.gatewayRuntime.deployment.enforcer.configs` section.

        ``` yaml
        apiKey:
            enabled: true
            issuer: "https://am.wso2.com:443/oauth2/token"
        ```

        <table>
            <tbody>
                <tr>
                    <td style="white-space: nowrap;"><code>enabled</code></td>
                    <td>Enable API Key Authentication</td>
                </tr>
                <tr>
                    <td style="white-space: nowrap;"><code>issuer</code></td>
                    <td>API Key Issuer URL. This is used to issue API Keys for the APIs.</td>
                </tr>
            </tbody>
        </table>

5. Install the Helm chart
    
    To begin the installation, run the following command. 

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.3.0 -f kg-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file> -n <namespace>
        ```



#### Set up WSO2 API Manager Control Plane 4.5.0

Set up WSO2 API Manager 4.5.0 in a VM.

Refer to the APIM Deployment Guide to deploy the APIM 4.5.0 in a VM.
Change the configurations in the deployment.toml file as below.
    
1. Configure supported gateway types in API Manager.

    Add the following configuration to the deployment.toml file to provide supported gateway types to API Manager. Here, need to provide the supported gateway types as `APK`.

    === "Both"
        ``` toml
            [apim]
            gateway_type = "Regular,APK"
        ```
    === "APK Only"
        ``` toml
            [apim]
            gateway_type = "APK"
        ```

2. Add the following configuration to the deployment.toml file to provide Kubernetes gateway to API Manager. 

    ``` toml
    [[apim.gateway.environment]]
    name = "Default_APK"
    type = "hybrid"
    gateway_type = "APK"
    provider = "wso2"
    display_in_api_console = true
    description = "This is a hybrid gateway that handles both production and sandbox token traffic."
    show_as_token_endpoint_url = true
    http_endpoint = "http://default.gw.wso2.com:9090"
    https_endpoint = "https://default.gw.wso2.com:9095"
    ```

    <table>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>name</code></td>
      <td>Gateway Name. This name is required during Kubernetes gateway agent configuration</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>type</code></td>
      <td>To handle both production and sandbox token traffic, set this to hybrid.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>gateway_type</code></td>
      <td>To identify the gateway as the Kubernetes Gateway, this type is required to be set as APK.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>provider</code></td>
      <td>Gateway provider.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>https_endpoint</code></td>
      <td><p>
  This setting is critical for the Control Plane to locate the Gateway listener. <b>If you change the Gateway listener in the Kubernetes Gateway configuration, that change should be reflected here.</b>
  The Gateway listener hostname must be configured as 
  <code>default.{gateway.listener.hostname}:9095</code>, 
  where <code>default</code> and <code>9095</code> are fixed values.
</p>
      </td>
    </tr>
  </tbody>
</table>



#### Set up WSO2 Kubernetes Gateway Agent 1.3.0

!!!Note
    The Kubernetes Gateway Agent provides a connection between the APIM Control Plane and the Kubernetes Gateway.

1. Create a new Helm repository with the latest Kubernetes Gateway Agent release using the following command. Let's consider the `<repository-name>` as `wso2apkagent` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Download `values.yaml` File

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-Agent>` with the desired version of the Kubernetes Gateway Agent. Run the following command:

    === "Command"
        ```
        helm show values wso2apkagent/apim-apk-agent --version 1.3.0  > kg-agent-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-agent-values.yaml
        ```

4. Configuration required to connect the Kubernetes Gateway Agent in `kg-agent-values.yaml`

    -   Configure Control Plane (APIM) related configuration in the Kubernetes Gateway Agent

        ``` yaml
        controlPlane:
            enabled: true
            serviceURL: https://apim-wso2am-cp-1-service.apk.svc.cluster.local:9443/
            username: admin
            password: admin
            environmentLabels: Default
            skipSSLVerification: true
            eventListeningEndpoints: amqp://admin:admin@apim-wso2am-cp-1-service.apk.svc.cluster.local:5672?retries='10'&connectdelay='30'
            internalKeyIssuer: https://am.wso2.com:443/oauth2/token
        ```
        <table>
    <tbody>
        <tr>
        <td style="white-space: nowrap;"><code>serviceURL</code></td>
        <td>Service URL of the API Manager Control Plane.
        <p>
      Format: {apimService}.{namespace}.svc.cluster.local
      </p>
      <p>
      You can retrieve the apimService name using `kubectl get svc -n <namespace>`
      </p></td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>environmentLabels</code></td>
        <td>Gateway environment label is the environment name that you define under the environments section
        in the API Manager values.yaml file, which sets up the Kubernetes Gateway. In this scenario, it's `Default_APK`.</td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>eventListeningEndpoints</code></td>
        <td>Event listening endpoint in the API Manager.</td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>Username and Password</code></td>
        <td>Admin credentials of the API Manager.</td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>internalKeyIssuer</code></td>
        <td>Internal Key Issuer URL of the API Manager. This is used to issue internal keys for the APIs.</td>
        </tr>
    </tbody>
    </table>

    -   Configure data plane (APK Gateway) related configuration in the Kubernetes Gateway Agent


        ``` yaml
        dataPlane:
            enabled: true
            k8ResourceEndpoint: https://apk-wso2-apk-config-ds-service.apk.svc.cluster.local:9443/api/configurator/apis/generate-k8s-resources
            namespace: apk
        ```

        <table>
    <tbody>
        <tr>
        <td style="white-space: nowrap;"><code>k8ResourceEndpoint</code></td>
        <td>Config deployer service endpoint.
        <p>
        Format: {configDeployService}.{namespace}.svc.cluster.local:{port}/api/configurator/apis/
        </p>
        <p>
        You can retrieve the configDeployService name using `kubectl get svc -n <namespace>`
        </p></td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>namespace</code></td>
        <td>Namespace where the <b>Kubernetes Gateway</b> is deployed.</td>
        </tr>
    </tbody>
    </table>

    -   Change the mode of the agent configuration as shown below.

        ``` yaml
        agent:
            mode: CPtoDP
        ```

5. Install the Kubernetes Gateway Agent

    Install the Kubernetes Gateway Agent components and start WSO2 API Platform For Kubernetes. Consider `apk` as the `<chart-name>` for this guide. For the `--version` parameter, use the version corresponding to the release from step 1. The deployment will take a few minutes to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0 -f kg-agent-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file> -n namespace
        ```

#### Verify the Deployment

You can verify the deployment by executing the following command. Once completed, you will see the status of the pods as shown below.

=== "Command"
```
kubectl get pods -n apk
```

[![Pod Status](../../assets/img/deployment-patterns/cp-pod.png)](../../assets/img/deployment-patterns/cp-pod.png)


#### Configure the Hosts File

=== "Command"
```
kubectl get svc -n apk
```
[![Pod Status](../../assets/img/deployment-patterns/cp-svc.png)](../../assets/img/deployment-patterns/cp-svc.png)

=== "Command"
```
kubectl get ing -n apk
```

[![Pod Status](../../assets/img/deployment-patterns/cp-ing.png)](../../assets/img/deployment-patterns/cp-ing.png)

Add hostname mappings to the `/etc/hosts` file as follows:

| Domain name                                                                                   | IP                                                                                          |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| am.wso2.com (APIM Control Plane ingress hostname)                                             | 135.171.24.117 (As per above image). You can find it using `kubectl get ing -n <namespace>` |
| default.gw.wso2.com (This should be the same as the value you added for the Gateway Listener) | 135.171.24.26 (As per above image). You can find it using `kubectl get svc -n <namespace>`  |
| api.am.wso2.com (This should be the same as the value you added for the System APIs Listener) | 135.171.24.26 (As per above image). You can find it using `kubectl get svc -n <namespace>`  |
| idp.am.wso2.com (You don't need to change this)                                               | 135.171.24.26 (As per above image). You can find it using `kubectl get svc -n <namespace>`  |
