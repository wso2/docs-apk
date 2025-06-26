
#### Create Kubernetes namespace

In this guide, the APIM Control Plane and the Kubernetes Gateway are installed in the same namespace. If you prefer, you can use any standalone Kubernetes Gateway pattern to deploy the Kubernetes Gateway.

``` 
kubectl create ns apk
```
#### Set Up WSO2 Kubernetes Gateway 1.3.0

1. Create a new Helm repository with the latest Kubernetes Gateway release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.3.0
    ```

2. Execute the following command to update the Helm repositories.

    ```console
    helm repo update
    ```

3. Download `values.yaml` File

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-APK>` with the desired version of the Kubernetes Gateway. Run the following command:

    === "Command"
        ```
        helm show values wso2apk/apk-helm --version 1.3.0  > kg-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-values.yaml
        ```

4. Configuration required to add the Kubernetes Gateway as a gateway in `kg-values.yaml`

    - Add the following configuration under `wso2.apk` section

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
      <td>This field is requires to be `true` for getting subscription details to the gateway</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>host</code></td>
      <td>Agent hostname which is defined as `{agentService}.{namespace}.svc.cluster.local`
      <p>
      You can get the agentService name by using `kubectl get svc -n <namespace>`
      </p>
      <p>
      At this point you do not have an agent configured, so you can keep the default value as it is. Once you configure it make sure to change it here and perform a Helm upgrade.
      </p>
      </td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>skipSSLVerification</code></td>
      <td>Skip SSL verification between Agent and Gateway</td>
    </tr>
  </tbody>
</table>

    - (Optional) Change the default listener hostnames

        By default the Kubernetes Gateway has two listeners

        - System APIs Listener - `api.am.wso2.com`
        - Gateway Listener - `gw.wso2.com`

        If you wish to change the default hostname and vhost, modify the following `values.yaml` configurations. For example, if you want to deploy a production environment with the domain name `example.com`, and you want to expose your APIs through `prod.gw.example.com` and expose APK system APIs through `prod.apk.example.com`, then configure as follows:

       
            wso2.apk.listener.hostname: 'prod.apk.example.com'
            wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
            wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]

    - Configure API Key Issuer

        If you want to use API Key Authentication, you can enable it by changing the following configuration in `kg-values.yaml`
        under the `wso2.apk.dp.gatewayRuntime.deployment.enforcer.configs` section.

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

5. Install Helm Chart
    
    To begin the installation, run the following command. 

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.3.0 -f kg-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file> -n <namespace>
        ```



#### Set Up WSO2 API Manager Control Plane 4.5.0

Set up WSO2 API Manager 4.5.0 in a VM.

Refer to the APIM Deployment Guide to deploy APIM 4.5.0 in a VM.
Change the configurations in the `deployment.toml` file as below.

1. Configure supported gateway types in API Manager.

    Add the following configuration to the `deployment.toml` file to provide supported gateway types to API Manager. Here, you need to provide the supported gateway types as `APK`.

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

2. Add the following configuration to the `deployment.toml` file to provide the Kubernetes Gateway to API Manager.

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
      <td>Gateway Name. This name is required during the Kubernetes Gateway Agent configuration.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>type</code></td>
      <td>To handle both production and sandbox token traffic, keep it as `hybrid`.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>gateway_type</code></td>
      <td>To identify it as a Kubernetes Gateway, the type is required to be `APK`.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>provider</code></td>
      <td>Gateway Provider.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>https_endpoint</code></td>
      <td>
        <p>This setting is critical for the Control Plane to locate the Gateway listener. **If you change the Gateway listener in the Kubernetes Gateway configuration, that should be added here.**</p>
        <p>The Gateway listener hostname must be configured as `default.{gateway.listener.hostname}:9095`, where `default` and `9095` are fixed values.</p>
      </td>
    </tr>
  </tbody>
</table>

#### Set Up WSO2 Kubernetes Gateway Agent 1.3.0

!!!Note
    The Kubernetes Gateway Agent provides a connection between the APIM Control Plane and the Kubernetes Gateway.

1. Create a new Helm repository with the latest Kubernetes Gateway Agent release using the following command. Let’s consider `<repository-name>` as `wso2apkagent` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.0
    ```

2. Execute the following command to update the Helm repositories.

    ```console
    helm repo update
    ```

3. Download the `values.yaml` file

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-Agent>` with the desired version of the Kubernetes Gateway Agent. Run the following command:

    === "Command"
        ```
        helm show values wso2apkagent/apim-apk-agent --version 1.3.0  > kg-agent-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-agent-values.yaml
        ```

4. Configuration Required to connect the Kubernetes Gateway Agent in `kg-agent-values.yaml`

    -   Configure Control Plane (APIM) related configurations in the Kubernetes Gateway Agent.

        ``` yaml
        controlPlane:
            enabled: true
            serviceURL: https://apim-wso2am-cp-1-service.apk.svc.cluster.local:9443/
            username: admin
            password: admin
            environmentLabels: Default_APK
            skipSSLVerification: true
            eventListeningEndpoints: amqp://admin:admin@apim-wso2am-cp-1-service.apk.svc.cluster.local:5672?retries='10'&connectdelay='30'
            internalKeyIssuer: https://am.wso2.com:443/oauth2/token
        ```
        <table>
    <tbody>
        <tr>
        <td style="white-space: nowrap;"><code>serviceURL</code></td>
        <td>Service URL of the API Manager Control Plane which is defined as `{apimService}.{namespace}.svc.cluster.local`
      <p>
      You can get the `apimService` name by using `kubectl get svc -n <namespace>`.
      </p></td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>environmentLabels</code></td>
        <td>Gateway environment labels refer to the Environment Name that you define under the `environments` section in the API Manager `values.yaml`, which sets up the Kubernetes Gateway. In this scenario, it's `Default_APK`.</td>
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
        <td style="white-space: nowrap;"><code>internalKeyIssuer</code></td>
        <td>Internal Key Issuer URL of the API Manager. This is used to issue internal keys for the APIs.</td>
        </tr>
    </tbody>
    </table>

    -   Configure the Data Plane (APK Gateway) related configurations in the Kubernetes Gateway Agent.


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
        <td>Config deployer service endpoint which is defined as `{configDeployerService}.{namespace}.svc.cluster.local:{port}/api/configurator/apis/`
        <p>
        You can get the `configDeployerService` name by using `kubectl get svc -n <namespace>`.
        </p></td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>namespace</code></td>
        <td>Namespace where the **Kubernetes Gateway** is deployed.</td>
        </tr>
    </tbody>
    </table>

    -   Change the mode of the agent configuration as shown below.

        ``` yaml
        agent:
            mode: CPtoDP
        ```

5. Install the Kubernetes Gateway Agent components and start the WSO2 API Platform For Kubernetes. Consider `apim-apk-agent` as the `<chart-name>` for this guide. For the `--version` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0 -f kg-agent-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file> -n namespace
        ```

#### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
```
kubectl get pods -n apk
```

[![Pod Status](../../assets/img/deployment-patterns/cp-pod.png)](../../assets/img/deployment-patterns/cp-pod.png)


#### Configure the hosts file

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

Add a hostname mapping to the ```/etc/hosts``` file as follows:

| Domain name                                                 | IP (As per the above image)                                                    |
| :---------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `am.wso2.com` (APIM Control Plane ingress hostname)         | `135.171.24.117` You can find it by using `kubectl get ing -n <namespace>`. |
| `default.gw.wso2.com` (Value changed in Gateway listener should be added here) | `135.171.24.26` You can find it by using `kubectl get svc -n <namespace>`.   |
| `api.am.wso2.com` (Value changed in System APIs listener should be added here) | `135.171.24.26` You can find it by using `kubectl get svc -n <namespace>`.   |
| `idp.am.wso2.com` (You do not need to change this)         | `135.171.24.26` You can find it by using `kubectl get svc -n <namespace>`.   |