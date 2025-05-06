# Quick Start Guide
This section is a step-by-step guide to creating, deploying, and invoking an API using the WSO2 APK with APIM Control Plane.

### Create Kubernetes namespace

``` 
kubectl create ns apk
```

### Configure the hosts file

Add a hostname mapping to the ```/etc/hosts``` file as follows.

   | IP        | Domain name         |
   | --------- | ------------------- |
   | 127.0.0.1 | api.am.wso2.com     |
   | 127.0.0.1 | am.wso2.com         |
   | 127.0.0.1 | idp.am.wso2.com     |
   | 127.0.0.1 | default.gw.wso2.com |

## Step 1 - Setup APIM Control Plane with APK

There are 3 components which you need to setup to get the APK working with APIM. They are,

### Setup WSO2 API Manager Control Plane 4.4.0

Setup WSO2 API Manager 4.4.0 in K8s cluster using Helm Charts.

1. Create a new helm repository with the latest apim release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2apim https://github.com/wso2/helm-apim/releases/download/cp-4.4.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Consider ```apim``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim wso2apim/wso2am-cp --version 4.4.0-1 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/4.4.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller. Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information. (Ensure that `Traefik` is disabled if it is currently enabled)


!!! Note
    Please refer to the <a href="../../../control-plane/apim-deploy/" target="_blank">Advanced Configuration for APIM</a> for more information.

### Setup WSO2 APK Dataplane 1.2.0

1. Create a new helm repository with the latest apk release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.2.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```
   
3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

!!!NOTE
    If you already have an installation of the APK in your cluster, please remove the installation by following the steps specified in the [Uninstall APK](../../setup/uninstall.md) section.


=== "Command"
     ```
     helm install apk wso2apk/apk-helm --version 1.2.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apk/1.2.0-cp-enabled-values.yaml -n apk
     ``` 
=== "Format"
     ```
     helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
     ```

!!! Note
    Please refer to the <a href="../../../control-plane/apk-deploy" target="_blank">Advanced Configuration for APK</a> for more information.


### Setup WSO2 APIM-APK Agent 1.2.0

1. Create a new helm repository with the latest apim apk agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.2.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the APIM APK Agent components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.2.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim-apk-agent/1.2.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

!!! Note
    Please refer to the <a href="../../../control-plane/apim-apk-agent-deploy" target="_blank">Advanced Configuration for Agent</a> for more information. 

### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
    ```
    kubectl get pods -n apk
    ```

!!! Note
    Once the agent has been deployed successfully, you will need to update the secret named `apim-apk-issuer-cert` with the following secret.
    ```
    apiVersion: v1
    kind: Secret
    metadata:
        name: apim-apk-issuer-cert
    type: Opaque
    data:
        wso2.crt: |
            LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURxVENDQXBHZ0F3SUJBZ0lFWnQrOThqQU5CZ2txaGtpRzl3MEJBUXNGQURCa01Rc3dDUVlEVlFRR0V3SlYKVXpFTE1Ba0dBMVVFQ0F3Q1EwRXhGakFVQmdOVkJBY01EVTF2ZFc1MFlXbHVJRlpwWlhjeERUQUxCZ05WQkFvTQpCRmRUVHpJeERUQUxCZ05WQkFzTUJGZFRUekl4RWpBUUJnTlZCQU1NQ1d4dlkyRnNhRzl6ZERBZUZ3MHlOREE1Ck1UQXdNek16TURaYUZ3MHlOakV5TVRRd016TXpNRFphTUdReEN6QUpCZ05WQkFZVEFsVlRNUXN3Q1FZRFZRUUkKREFKRFFURVdNQlFHQTFVRUJ3d05UVzkxYm5SaGFXNGdWbWxsZHpFTk1Bc0dBMVVFQ2d3RVYxTlBNakVOTUFzRwpBMVVFQ3d3RVYxTlBNakVTTUJBR0ExVUVBd3dKYkc5allXeG9iM04wTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGCkFBT0NBUThBTUlJQkNnS0NBUUVBdUhzUGZMam1CWDJDS2hlMnhEUEZINWJsaXZhcG1PZUkrR2NEZUtKRE9TbmgKTnM1eG9lVStPUlFtVGlQMGdUQTNIYU9WM1prRHJyczZKbGhnMDJ6RmFzcnUwb1pXdExmcWpjTmVuK3c1cE9sVgpndmkyM1NwOUlRbTZsbmZWUGdJTzhwWmJqYStyVmRWNUpON1VYY3Vvb2RwbHlEYW5BT0o4WnNlOW5DK1A3SjlYClRpZmVTY3Jja3BtTmpvZ1BVZU1PYTIxZ2wrd25ZRE91b1ZBUEgrSWh4OS9KWnVFQlljT0FMVnI2azl3M0Z3dlMKOTJIWjhGc0xhUnZmNTI0eERnWDVsRHBnUmI2L3o4eHl1QmZTRHg3UEVXVUJ3N21tOTZSVGRzSlVnT1FKMFhiagpOR2Q5a0hhMzFWL0dSRjBqYVpGU0xmT1JEYWpVOGVOeE9XenY0MU1adXdJREFRQUJvMk13WVRBVUJnTlZIUkVFCkRUQUxnZ2xzYjJOaGJHaHZjM1F3SFFZRFZSME9CQllFRkNnSjNHSGtPdVdBL2YxcXFCcGlNNWgzWE9yc01CMEcKQTFVZEpRUVdNQlFHQ0NzR0FRVUZCd01CQmdnckJnRUZCUWNEQWpBTEJnTlZIUThFQkFNQ0JQQXdEUVlKS29aSQpodmNOQVFFTEJRQURnZ0VCQUJuaFhWYWJ2SmNQdXk1SWNiRzlqOS94d1pMNE1qNEt0NUtqeW5iMkNzWW9vMlhZCk1UNDdqS3VUZVAyQlBmT0twcTQrUllWUEUyQ1VPc3JRdkRqUUtzY2ZaNk5NbWtYL0x1aUlCTlFZdHhaRUJPbksKZVVrb2RINWlhY0ZXb1VYZ2RCU2lIbWloYzdNMWFBWDRhRDBBcWJLNjhidnpoQ2xkcXdCV0NlbUwrWmhxc0hjOQpmR3FqZW1HNC80bDdLUzVjb3I1aHcvbExIamd2bTZTQ1B4OVVSTFpvYVdTRFhBcWZtYVgrekZ3U1BHVi9IWG1yClhaSEpySDZPNUM2NUdGdzhxMnpuZUJwanJWOHM4MEQ0a3dZREhSbE1XVnFnV2NYZFg5bnhZaFV5UEVwQ2Y5THAKU3RhNWFRU04xbG9mVFpnRE1vdllIb1NnS09Xc1gyQnl4QWZSbndFPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    ```

    You can apply the secret with the following command. You can download the file <a href="../../../assets/files/secrets/secret.yaml" target="_blank" download>here</a>

    === "Example"
        ```
        kubectl apply -f secret.yaml -n apk
        ```
    === "Format"
        ```
        kubectl apply -f <filename.yaml> -n <namespace>
        ```

## Step 2 - Create and Deploy the API

### Create Deploy and Publish the API

{!control-plane/apk-as-gateway-in-apim/api-management/control-plane-create-and-deploy-rest-apis.md!}

### Create Application and Subscribe to the API

{!control-plane/apk-as-gateway-in-apim/api-management/control-plane-create-application-and-subscription.md!}


## Step 3 - Invoke the API

Use the following command to invoke the API using the access token generated in the previous step.

```bash
    curl -X GET "https://default.gw.wso2.com:9095/petstore/1.0.0/pet/findByStatus?status=available" -H "Authorization: Bearer <access-token>" -k
```
