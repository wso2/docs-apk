
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

3. Download `values.yaml` File

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-APK>` with the desired version of the Kubernetes Gateway. Run the following command:

    === "Command"
        ```
        helm show values wso2apk/apk-helm --version 1.3.0-1  > kg-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-values.yaml
        ```

4. To add Kubernetes Gateway as a gateway, add the following configurations to the `kg-values.yaml` file downloaded in the previous step.

    - Add the following configuration under the `wso2.apk` section

        ``` yaml
        cp:
            enabledSubscription: true
            host: "apim-apk-agent-service.apk.svc.cluster.local"
            skipSSLVerification: true
        ```

        | Parameter             | Description                                                                                                                                                                                                                                                                                                                           |
        | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `enabledSubscription` | This field must be set to true to retrieve subscription details at the gateway level.                                                                                                                                                                                                                                                 |
        | `host`                | Agent hostname.<br><br>Format: `{agentService}.{namespace}.svc.cluster.local`<br><br>You can get the agentService name by using `kubectl get svc -n <namespace>`<br><br>At this point, the agent is not configured so you do not need to change the default values. Once configured, make sure to change it here and do helm upgrade. |
        | `skipSSLVerification` | Skip SSL verification between the Agent and Gateway.                                                                                                                                                                                                                                                                                  |

    - Change the default listener hostnames.

        By default, the Kubernetes Gateway has two listeners:

        - System APIs Listener - api.am.wso2.com
        - Gateway Listener - gw.wso2.com

        If you wish to change the default hostname and vhost, modify the following values.yaml configurations. For example, if you want to deploy a production environment with the domain name example.com, expose your APIs through prod.gw.example.com, and expose system APIs through prod.apk.example.com, use the following:
       
            wso2.apk.listener.hostname: 'prod.apk.example.com'
            wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
            wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]


1. Install the Helm chart.
    
    To begin the installation, run the following command.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.3.0-1 -f kg-values.yaml
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file> 
        ```



#### Set up WSO2 API Manager Control Plane

Follow the steps given below to set up WSO2 API Manager 4.5.0/4.6.0 in a Kubernetes cluster using Helm charts.

!!!Important
    If you need comprehensive documentation and configurations for the API Manager Helm chart, please refer to the APIM Helm documentation of the corresponding APIM version:

    - [APIM 4.6.0](https://apim.docs.wso2.com/en/4.6.0/install-and-setup/setup/kubernetes-deployment/kubernetes/am-pattern-0-all-in-one/)
    - [APIM 4.5.0 ](https://apim.docs.wso2.com/en/4.5.0/install-and-setup/setup/kubernetes-deployment/kubernetes/am-pattern-0-all-in-one/)
  
    This guide focuses on a single deployment with the API Manager Control Plane.

1. Create a new Helm repository with the latest APIM release using the following command. Let's consider the `<repository-name>` as `wso2apim`.

    ```console
    helm repo add wso2 https://helm.wso2.com
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Download the `values.yaml` file relevant to your APIM version using the relevant command:

    === "APIM 4.5.0"
        ```console
        curl -o apim-values.yaml https://raw.githubusercontent.com/wso2/helm-apim/refs/heads/4.5.x/all-in-one/default_values.yaml
        ```

    === "APIM 4.6.0"
        ```console
        curl -o apim-values.yaml https://raw.githubusercontent.com/wso2/helm-apim/refs/heads/4.6.x/all-in-one/default_values.yaml
        ```

4. To add Kubernetes Gateway as a gateway, add the following configurations to the `apim-values.yaml` downloaded from the above step.
    
    - Configure the supported gateway types in API Manager.

    === "Both Synapse and APK"
        ``` yaml
            Configurations:
                gatewayType: "Regular,APK"
        ```
    === "APK Only"
        ``` yaml
            Configurations:
                gatewayType: "APK"
        ```

    - Add the Kubernetes gateway environment to the environments list.

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

    | Parameter      | Description                                                                                                                                                                                                                                                                                                                                                 |
    | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `name`         | Gateway name. This name is required in a later step to configure the Kubernetes Gateway Agent.                                                                                                                                                                                                                                                              |
    | `type`         | To handle both production and sandbox token traffic, set this to hybrid.                                                                                                                                                                                                                                                                                    |
    | `gatewayType`  | To identify as a Kubernetes Gateway, this type is required to be set as APK.                                                                                                                                                                                                                                                                                |
    | `provider`     | Gateway provider.                                                                                                                                                                                                                                                                                                                                           |
    | `httpHostname` | This setting is critical for the control plane to locate the gateway listener. </br>**If you change the Gateway listener in the Kubernetes Gateway configuration, that change should be reflected here.** </br>The Gateway listener hostname must be configured as `default.{gateway.listener.hostname}:9095`, where `default` and `9095` are fixed values. |


5. Install the API Manager Control Plane.

    Consider `apim` as the `<chart-name>` for this guide. In the command,
    
    - For the `--version` parameter, use the version corresponding to the release from step 1.
    - Point to the relevant `apim-values.yaml` file you downloaded and edited in the previous steps.

    The deployment will take a few minutes to complete.

    === "4.5.0"
        ```
        helm install apim wso2/wso2am-all-in-one --version 4.5.0-1 -f apim-values.yaml -n apk
        ```

    === "4.6.0"
        ```
        helm install apim wso2/wso2am-all-in-one --version 4.6.0-1 -f apim-values.yaml -n apk
        ```

    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

1. Install the NGINX Ingress Controller. 

    Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.


#### Set up WSO2 Kubernetes Gateway Agent 1.3.0

!!!Note
    The Kubernetes Gateway Agent provides the connection between the APIM Control Plane and the Kubernetes Gateway.

1. Create a new Helm repository with the latest Kubernetes Gateway Agent release using the following command. Let's consider the `<repository-name>` as `wso2apkagent` for this guide.

    === "4.5.0"
        ```console
        helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.0
        ```

    === "4.6.0"
        ```console
        helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.1
        ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Download `values.yaml` File

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-agent>` with the desired version of the Kubernetes Gateway Agent. Run the following command:

    === "4.5.0"
        ```
        helm show values wso2apkagent/apim-apk-agent --version 1.3.0  > kg-agent-values.yaml
        ```

    === "4.6.0"
        ```
        helm show values wso2apkagent/apim-apk-agent --version 1.3.1  > kg-agent-values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <version-of-APK> > kg-agent-values.yaml
        ```

4. Configuration required to connect the Kubernetes Gateway Agent in `kg-agent-values.yaml`

    -   Configure Control Plane (APIM) related configuration in the Kubernetes Gateway Agent

        === "4.5.0"
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

        === "4.6.0"
            ``` yaml
            controlPlane:
                enabled: true
                serviceURL: https://apim-wso2am-all-in-one-am-service-1.apk.svc.cluster.local:9443/
                username: admin
                password: admin
                environmentLabels: Default
                skipSSLVerification: true
                eventListeningEndpoints: amqp://admin:admin@apim-wso2am-all-in-one-am-service-1.apk.svc.cluster.local:5672?retries='10'&connectdelay='30'
            ```

        | Parameter                 | Description                                                                                                                                                                                                       |
        | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `serviceURL`              | Service URL of the API Manager Control Plane.<br><br>Format: `{apimService}.{namespace}.svc.cluster.local`<br><br>You can retrieve the apimService name using `kubectl get svc -n <namespace>`                    |
        | `environmentLabels`       | Gateway environment label is the environment name that you define under the environments section in the API Manager values.yaml file, which sets up the Kubernetes Gateway. In this scenario, it's `Default_APK`. |
        | `eventListeningEndpoints` | Event listening endpoint in the API Manager.                                                                                                                                                                      |
        | `Username` and `Password` | Admin credentials of the API Manager.                                                                                                                                                                             |

    -   Configure data plane (Kubernetes Gateway) related configuration in the Kubernetes Gateway Agent

        ``` yaml
        dataPlane:
            enabled: true
            k8ResourceEndpoint: https://apk-wso2-apk-config-ds-service.apk.svc.cluster.local:9443/api/configurator/apis/generate-k8s-resources
            namespace: apk
        ```

        | Parameter            | Description                                                                                                                                                                                                                              |
        | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `k8ResourceEndpoint` | The service endpoint of the config deployer. </br>Format: `{configDeployService}.{namespace}.svc.cluster.local:{port}/api/configurator/apis/`. </br>You can retrieve the configDeployService name using `kubectl get svc -n <namespace>` |
        | `namespace`          | Namespace where the Kubernetes Gateway is deployed.                                                                                                                                                                                      |

    -   Change the mode of the agent configuration as shown below.

        ``` yaml
        agent:
            mode: CPtoDP
        ```

5. Install the Kubernetes Gateway Agent.

    Install the Kubernetes Gateway Agent components and start WSO2 API Platform For Kubernetes. Consider `apk` as the `<chart-name>` for this guide. 
    - For the `--version` parameter, use the version corresponding to the release from step 1.
    - Point to the relevant `kg-agent-values.yaml` file you downloaded and edited in the previous steps.

    The deployment will take a few minutes to complete.
    === "4.5.0"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0 -f kg-agent-values.yaml -n apk
        ```

    === "4.6.0"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.1 -f kg-agent-values.yaml -n apk
        ```

    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
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
