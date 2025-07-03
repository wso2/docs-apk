
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

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Download the `values.yaml` file

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-APK>` with the desired version of the Kubernetes Gateway. Run the following command:

    === "Command"
        ```
        helm show values wso2apk/apk-helm --version 1.3.0  > kg-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-values.yaml
        ```

4. Configure as required to add the Kubernetes Gateway as a gateway in `kg-values.yaml`

    - Add the following configuration under the `wso2.apk` section

        ``` yaml
        cp:
            enabledSubscription: true
            host: "apim-apk-agent-service.apk.svc.cluster.local"
            skipSSLVerification: true
        ```

        | Key                   | Description |
        |------------------------|-------------|
        | `enabledSubscription` | This field is required to be true for getting subscription details to the gateway level. |
        | `host` | Agent hostname, which is defined as `{agentService}.{namespace}.svc.cluster.local`.<br>Use `kubectl get svc -n <namespace>` to get the agent service name.<br>You can leave the default for now. Once an agent is configured, update this and perform a Helm upgrade. |
        | `skipSSLVerification` | Skip SSL verification between Agent and Gateway. |



    - Change default listener hostnames

        By default, the Kubernetes Gateway has two listeners:

        - System APIs Listener - `api.am.wso2.com`
        - Gateway Listener - `gw.wso2.com`

        If you wish to change the default hostname and vhost, modify the following `values.yaml` configurations. For example, if you want to deploy a production environment with the domain name `example.com`, and you want to expose your APIs through `prod.gw.example.com` and expose APK system APIs through `prod.apk.example.com`, then configure:

        ``` yaml
                wso2.apk.listener.hostname: 'prod.apk.example.com'
                wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
                wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]
        ```

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



#### Set Up WSO2 API Manager Control Plane 4.5.0

Set Up WSO2 API Manager 4.5.0 in K8s cluster using Helm Charts.

!!!Important
    If you need comprehensive documentation and configurations for the API Manager Helm Chart Please refer to <a href="https://apim.docs.wso2.com/en/latest/install-and-setup/setup/kubernetes-deployment/kubernetes/am-pattern-0-all-in-one/" target="_blank">APIM Helm</a>. 
    Here we focus on a single deployment with the API Manager Control Plane

1. Create a new helm repository with the latest APIM release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2 https://helm.wso2.com
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3.  <a href="https://raw.githubusercontent.com/wso2/helm-apim/main/docs/am-pattern-0-all-in-one/default_values.yaml"
   download="kg-values.yaml">
  Download  the `values.yaml` file
</a>
 and rename it to `apim-values.yaml`
    

4. Configure as required to add the Kubernetes Gateway as a gateway in `apim-values.yaml`
    
    - Configure supported gateway types in API Manager.

        === "Both"
            ``` yaml
                configurations:
                    gatewayType: "Regular,APK"
            ```
        === "APK Only"
            ``` yaml
                configurations:
                    gatewayType: "APK"
            ```

    - Add the Kubernetes Gateway environment to the Environment list.

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

        | Key                   | Description |
        |------------------------|-------------|
        | `name`         | Gateway name. This name is required later to configure the Kubernetes Gateway Agent. |
        | `type`         | To handle both production and sandbox token traffic, keep it as `hybrid`. |
        | `gatewayType`  | To identify it as a Kubernetes Gateway, the type must be `APK`. |
        | `provider`     | Gateway provider. |
        | `httpHostname` | This setting is critical in the Control Plane to locate the Gateway listener.<br>**If you change the Gateway listener in the Kubernetes Gateway configuration, that should be added here.**<br>The Gateway listener hostname must be configured as `default.{gateway.listener.hostname}:9095`, where `default` and `9095` are fixed values. |



4. Install Helm Chart

     Consider ```apim``` as the ```<chart-name>``` for this guide. For the ```--version``` of this command, use the version of the release you used in Step 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim wso2/wso2am-all-in-one --version 4.5.0-1 -f https://raw.githubusercontent.com/wso2/helm-apim/main/docs/am-pattern-0-all-in-one/default_values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller. Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.


#### Set Up the WSO2 Kubernetes Gateway Agent 1.3.0

!!!Note
    The Kubernetes Gateway Agent provides a connection between the APIM Control Plane and the Kubernetes Gateway.

1. Create a new helm repository with the latest Kubernetes Gateway Agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.0
    ```

2. Execute the following command to update the helm repositories.

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

4. Configure as required to connect the Kubernetes Gateway Agent in `kg-agent-values.yaml`

    -   Configure Control Plane (APIM) related configurations in the Kubernetes Gateway Agent

        ``` yaml
        controlPlane:
            enabled: true
            serviceURL: https://apim-wso2am-cp-1-service.apk.svc.cluster.local:9443/
            username: admin
            password: admin
            environmentLabels: Default_APK
            skipSSLVerification: true
            eventListeningEndpoints: amqp://admin:admin@apim-wso2am-cp-1-service.apk.svc.cluster.local:5672?retries='10'&connectdelay='30'
        ```

        | Key                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
        | :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `serviceURL`              | Service URL of the API Manager Control Plane, which is defined as `{apimService}.{namespace}.svc.cluster.local`. You can get the `apimService` name by using `kubectl get svc -n <namespace>`.                                                                                                                                                                                                                                                                         |
        | `environmentLabels`       | Gateway environment labels refer to the Environment Name that you define under the `environments` section in the API Manager `values.yaml` which sets up the Kubernetes gateway. In this scenario, it is `Default_APK`.                                                                                                                                                                                                                                               |
        | `eventListeningEndpoints` | Event listening endpoint in the API Manager.                                                                                                                                                                                                                                                                                                                                                                                                                      |
        | `Username and Password`   | Admin credentials of the API Manager.                                                                                                                                                                                                                                                                                                                                                                                                                             |

    -   Configure Data Plane (Kubernetes Gateway) related configurations in the Kubernetes Gateway Agent


        ``` yaml
        dataPlane:
            enabled: true
            k8ResourceEndpoint: https://apk-wso2-apk-config-ds-service.apk.svc.cluster.local:9443/api/configurator/apis/generate-k8s-resources
            namespace: apk
        ```

        | Key                  | Description                                                                                                                                                                                                                                                                          |
        | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `k8ResourceEndpoint` | Config deployer service endpoint, which is defined as `{configDeployerService}.{namespace}.svc.cluster.local:{port}/api/configurator/apis/`. You can get the Service name by using `kubectl get svc -n <namespace>`. |
        | `namespace`          | Namespace where the Kubernetes Gateway is deployed.                                                                                                                                                                                                                                  |

    -   Change the mode of the agent configuration as shown below.

        ``` yaml
        agent:
            mode: CPtoDP
        ```

3. Install Helm Chart 

    Install the Kubernetes Gateway Agent components and start the WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. For the ```--version``` of this command, use the version of the release you used in Step 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0 -f kg-agent-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

#### Verify the Deployment

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
