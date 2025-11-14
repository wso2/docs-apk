
#### Create Kubernetes namespace

In this guide, the APIM Control Plane and the Kubernetes Gateway are installed in the same namespace. If you prefer, you can use any standalone Kubernetes Gateway pattern to deploy the Kubernetes Gateway.

``` 
kubectl create ns apk
```
#### Setup WSO2 Kubernetes Gateway 1.3.0

1. Create a new helm repository with the latest Kubernetes Gateway release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.3.0-1
    ```

2. Execute the following command to update the helm repositories.

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

4. Configuration Require to add Kubernetes Gateway As a gateway in `kg-values.yaml`

    - Add following configuration under `wso2.apk` section

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
      <td>This field require to be true for getting subscription details to the gateway level</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>host</code></td>
      <td>Agent hostname.
      <p>
      {agentService}.{namespace}.svc.cluster.local
      </p>
      <p>
      You can get the agentService name by using `kubectl get svc -n <namespace>`
      </p>
      <p>
      At this point you dont have agent configured so you can keep default value as it is. Once you configure it make sure to change it here and do helm upgrade.
      </p>
      </td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>skipSSLVerification</code></td>
      <td>Skip SSL verification between Agent and Gateway</td>
    </tr>
  </tbody>
</table>

    - Change default Listner Host Names

        By default Kubernets Gateway have 2 listenrs

        - System APIs Listner - api.am.wso2.com
        - Gateway Listner - gw.wso2.com

        If you wish to change the default hostname and vhost, change the following values.yaml configurations. Lets say you want to deploy a production environment and you have a domain name example.com and you want to expose your API's through prod.gw.example.com and expose APK system APIs through prod.apk.example.com then
       
            wso2.apk.listener.hostname: 'prod.apk.example.com'
            wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
            wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]


5. Install Helm Chart
    To begin the installation, run the following command. 

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.3.0 -f kg-values.yaml
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file> 
        ```



#### Setup WSO2 API Manager Control Plane 4.5.0

Setup WSO2 API Manager 4.5.0 in K8s cluster using Helm Charts.

!!!Important
    If you need comprehensive documentation and configurations for API Manager Helm Chart Please refer <a href="https://apim.docs.wso2.com/en/latest/install-and-setup/setup/kubernetes-deployment/kubernetes/am-pattern-0-all-in-one/" target="_blank">APIM Helm</a> 
    Here we focus on single deployment with API Manager Control Plane

1. Create a new helm repository with the latest apim release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2 https://helm.wso2.com
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3.  <a href="https://raw.githubusercontent.com/wso2/helm-apim/main/docs/am-pattern-0-all-in-one/default_values.yaml"
   download="kg-values.yaml">
  Download `values.yaml`
</a>
 and Rename it to `apim-values.yaml`
    

4. Configuration Require to add Kubernetes Gateway As a gateway in `apim-values.yaml`
    
    Configure supported gateway types in API Manager.

    === "Both"
        ``` yaml
            Configurations:
                gatewayType: "Regular,APK"
        ```
    === "APK Only"
        ``` yaml
            Configurations:
                gatewayType: "APK"
        ```

    Add kubernetes gateway environment to the Environment list.

    === "4.5.0"
        ``` yaml
        gateway:
        # -- Kubernetes Gateway environments
            environments:
            - name: "Default_APK"
              type: "hybrid"
              gatewayType: "APK"
              provider: "wso2"
              displayInApiConsole: true
              description: "This is a kubernetes gateway that handles both production and sandbox token traffic."
              showAsTokenEndpointUrl: true
              httpHostname: "default.gw.wso2.com:9095"
        ```

    === "4.6.0"
        ``` yaml
        gateway:
        # -- Kubernetes Gateway environments
            environments:
            - name: "Default_APK"
              type: "hybrid"
              provider: "wso2"
              gatewayType: "APK"
              displayInApiConsole: true
              description: "This is a hybrid gateway that handles both production and sandbox token traffic."
              showAsTokenEndpointUrl: true
              serviceName: "wso2am-gateway-service"
              servicePort: 9443
              wsHostname: "websocket.wso2.com"
              httpHostname: "default.gw.wso2.com:9095"
              websubHostname: "websub.wso2.com"
        ```
    <table>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>name</code></td>
      <td>Gateway Name. This name is require to later part to configre Kubernetes gateway agent</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>type</code></td>
      <td>To handles both production and sandbox token traffic keep it as hybrid</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>gatewayType</code></td>
      <td>To identify as Kubernetes gateway. Type require to keep as APK</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>provider</code></td>
      <td>Gateway Provider</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>httpHostname</code></td>
      <td><p>
  This setting is critical. In the Control Plane to locate the Gateway listener. <b>If you change the Gateway listener in Kubernetes Gateway configuration that should be added to here.</b>
  The Gateway listener hostname must be configured as 
  <code>default.{gateway.listener.hostname}:9095</code>, 
  where <code>default</code> and <code>9095</code> are fixed values.
</p>
      </p>
      </td>
    </tr>
  </tbody>
</table>


4. Consider ```apim``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim wso2/wso2am-all-in-one --version 4.5.0-1 -f https://raw.githubusercontent.com/wso2/helm-apim/main/docs/am-pattern-0-all-in-one/default_values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller. Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.


#### Setup WSO2 Kubernetes Gateway Agent 1.3.0

!!!Note
    Kubernetes Gateway Agent Provide a connection between APIM Control Plane and Kubernetes Gateway.

1. Create a new helm repository with the latest kubernetes gateway agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

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

4. Configuration Require to Connect Kubernetes Gateway Agent in `kg-agent-values.yaml`

    -   Configure Control Plane(APIM) related configuration in Kubernetes Gateway Agent

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
        <table>
    <tbody>
        <tr>
        <td style="white-space: nowrap;"><code>serviceURL</code></td>
        <td>Service URL of the API Manager Control Plane
        <p>
      {apimService}.{namespace}.svc.cluster.local
      </p>
      <p>
      You can get the apimService name by using `kubectl get svc -n <namespace>`
      </p></td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>environmentLabels</code></td>
        <td>Gateway environment labels is Environment Name that you define under the environments section
        in the API Manager values yaml which sets up the Kubernetes gateway. In this scenario its `Default_APK`</td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>eventListeningEndpoints</code></td>
        <td>Event Listening Endpoint in the API Manager</td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>Username and Password</code></td>
        <td>Admin credentials of the API Manager</td>
        </tr>
    </tbody>
    </table>

    -   Configure Dataplane (APK Gateway) related configuration in Kubernetes Gateway Agent


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
        <td>Config deployer service endpoint
        <p>
        {configDepolyService}.{namespace}.svc.cluster.local:{port}/api/configurator/apis/
        </p>
        <p>
        You can get the configDepolyService name by using `kubectl get svc -n <namespace>`
        </p></td>
        </tr>
        <tr>
        <td style="white-space: nowrap;"><code>namespace</code></td>
        <td>Namespace where <b>Kubernetes Gateway</b> is deployed</td>
        </tr>
    </tbody>
    </table>

    -   Change the mode of the agent configuration as shown below.

        ``` yaml
        agent:
            mode: CPtoDP
        ```

3. Install the Kubernetes Gateway Agent components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0 -f kg-agent-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
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

Add a hostname mapping to the ```/etc/hosts``` file as follows.

| Domain name        | IP         |
| --------- | ------------------- |
| am.wso2.com (APIM Control Plane ingress host name) | 135.171.24.117 (As per above image). You can find it by using   `kubectl get ing -n <namespace>`       |
| default.gw.wso2.com(Value you change in Gateway listner should be added here) | 135.171.24.26(As per above image). You can find it by using   `kubectl get svc -n <namespace>`  |
| api.am.wso2.com (Value you change in System APIs Listner should be added here) | 135.171.24.26(As per above image). You can find it by using   `kubectl get svc -n <namespace>`     |
| idp.am.wso2.com(You dont need to change this) |   135.171.24.26(As per above image). You can find it by using   `kubectl get svc -n <namespace>`   |
