# Frequently Asked Questions (FAQs)

## About WSO2 APK
### 1. What is WSO2 APK?

WSO2 API Platform for Kubernetes (APK) is WSO2's cloud native API management platform to help you build, deploy, and manage APIs in a cloud environment. It is designed to be highly available and able to handle large numbers of API requests without performance degradation, with features like rate limiting, automatic failover and load balancing. For more information, refer the [What is APK?](./what-is-apk.md) section. 

### 2. What is the open source license of the APK?

[Apache Software License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

### 3. What are the technologies used in WSO2 APK?

APK natively uses several Kubernetes features. Envoy is used for the API gateway implementation and Helm is used as a package manager. For more details, refer to the [Technologies Used](./architecture.md#technologies-used) section.

### 4. What are the advantages of APK over APIM?

APK is primarily meant for anyone who wants API management in the Kubernetes domain. Since APK leverages native Kubernetes features, it can easily scale and perform optimally in a Kubernetes environment. The WSO2 APK also has a microservice architecture, which enables higher flexibility and scalability across all of its components.

## Installation and Deployment

### 1. What are the minimum requirements needed to run WSO2 APK?

Refer to the <a href="../../setup/prerequisites#prerequisites" target="_blank">prerequisites</a> section for this information.

### 2. I want to customize some configurations in my Helm deployment. How can I do this?

Refer to the <a href="../../setup/Customize-Configurations" target="_blank">customize configurations</a> section for this information.

### 3. What are the Kubernetes distributions supported by WSO2 APK?

Minikube, Rancher, Kind and Openshift are supported. For more information about the supported versions, please refer to the <a href="../../setup/prerequisites#kubernetes-distributions" target="_blank">supported Kubernetes distributions</a> section.

### 4. Why are pods not transitioning to the running state for a long time?

If pods are taking an extended amount of time to transition to the running state, it is likely due to slow image pulling. This can occur when there are network connectivity issues, or if the image repository is experiencing a high load.

You can troubleshoot the problem by running the following command
```
kubectl describe pods <pod-name>
```

If you see `ImagePullBackOff` error or the image is still in the pulling stage, it is most likely due to a network problem. 

### 5. How can I uninstall APK from my cluster?

1.  List down the Helm installation in your cluster using the following command, and copy the APK release name and the namespace.
    ``` 
    helm list -A
    ```

2.  Uninstall the APK 

    === "Sample command"

        ```
        helm uninstall apk
        ```

    === "Command template"

        ```
        helm uninstall <apk-name> -n <namespace>
        ```

3.  Cleanup the CRs that were created for the APK. You can use the commands given below to delete all the CRs created for APK.

    ```
    kubectl delete apipolicies.dp.wso2.com --all --all-namespaces
    kubectl delete apis.dp.wso2.com --all --all-namespaces
    kubectl delete authentications.dp.wso2.com --all --all-namespaces
    kubectl delete backendjwts.dp.wso2.com --all --all-namespaces
    kubectl delete backends.dp.wso2.com --all --all-namespaces
    kubectl delete certificaterequests.cert-manager.io --all --all-namespaces
    kubectl delete certificates.cert-manager.io --all --all-namespaces
    kubectl delete challenges.acme.cert-manager.io --all --all-namespaces
    kubectl delete clusterissuers.cert-manager.io --all --all-namespaces
    kubectl delete gatewayclasses.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete gateways.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete grpcroutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete httproutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete interceptorservices.dp.wso2.com --all --all-namespaces
    kubectl delete issuers.cert-manager.io --all --all-namespaces
    kubectl delete orders.acme.cert-manager.io --all --all-namespaces
    kubectl delete ratelimitpolicies.dp.wso2.com --all --all-namespaces
    kubectl delete referencegrants.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete scopes.dp.wso2.com --all --all-namespaces
    kubectl delete tcproutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete tlsroutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete tokenissuers.dp.wso2.com --all --all-namespaces
    kubectl delete udproutes.gateway.networking.k8s.io --all --all-namespaces
    ```

4. Delete all the APK related CRDs.
   ```
   curl -L -o apk.tar.gz "https://github.com/wso2/apk/archive/refs/tags/1.2.0.tar.gz" && tar -zxvf apk.tar.gz
   cd apk-1.2.0/helm-charts/crds
   kubectl delete -f .
   ```

5. Verify that you do not have any CRs in the cluster using this command.
   ```
    kubectl get apipolicies.dp.wso2.com -A
    kubectl get apis.dp.wso2.com -A
    kubectl get authentications.dp.wso2.com -A
    kubectl get backendjwts.dp.wso2.com -A
    kubectl get backends.dp.wso2.com -A
    kubectl get certificaterequests.cert-manager.io -A
    kubectl get certificates.cert-manager.io -A
    kubectl get challenges.acme.cert-manager.io -A
    kubectl get clusterissuers.cert-manager.io -A
    kubectl get gatewayclasses.gateway.networking.k8s.io -A
    kubectl get gateways.gateway.networking.k8s.io -A
    kubectl get grpcroutes.gateway.networking.k8s.io -A
    kubectl get httproutes.gateway.networking.k8s.io -A
    kubectl get interceptorservices.dp.wso2.com -A
    kubectl get issuers.cert-manager.io -A
    kubectl get orders.acme.cert-manager.io -A
    kubectl get ratelimitpolicies.dp.wso2.com -A
    kubectl get referencegrants.gateway.networking.k8s.io -A
    kubectl get scopes.dp.wso2.com -A
    kubectl get tcproutes.gateway.networking.k8s.io -A
    kubectl get tlsroutes.gateway.networking.k8s.io -A
    kubectl get tokenissuers.dp.wso2.com -A
    kubectl get udproutes.gateway.networking.k8s.io -A
   ```

    You should not see any resources. If there are any undeleted resources, use the command given below to delete them.

    ```
    kubectl delete <kind> <name> -n <namespace>
    ```

### 6. Why is my installation failing with an "ensure CRDs are installed first" error?

If you are seeing errors similar to the ones below:

```plaintext
ensure CRDs are installed first, resource mapping not found for name: "apk-wso2-apk-dcr-api" namespace: "default" from "": no matches for kind "API" in version "dp.wso2.com/v1alpha2"
```

It is likely due to a limitation in Helm when installing the Custom Resource Definitions (CRDs). To resolve this, follow the steps below.

Step 1: Obtain the CRDs from the chart

First, obtain the Custom Resource Definitions (CRDs) for the specific version of APK you want to install. Replace `<version>` with the actual version number of the APK you are installing.

```bash
helm show crds wso2apk/apk-helm --version 1.2.0 > apk-crds.yaml
```

Step 2: Apply the CRDs manually

Next, apply the CRDs using the following command.

```bash
kubectl apply -f apk-crds.yaml
```

Step 3: Reinstall APK

Finally, reinstall APK using the Helm installation command as provided in the relevant quick start guide.

```bash
helm install apk wso2apk/apk-helm --version 1.2.0
```

## Functionality

### 1. What are the API types supported by WSO2 APK?
Currently, WSO2 APK supports REST APIs, GraphQL APIs and gRPC APIs.

### 2. Can I perform API request/response transformations?

Yes, you can. 

Refer to the <a href="../../create-api/create-and-attach-api-policies/interceptors/interceptors-overview" target="_blank">Interceptors documentation</a> for information on how to configure an Interceptor service.

Alternatively, you can refer to <a href="../../create-api/create-and-attach-api-policies/header-modifier-filters/overview" target="_blank">Header modification filters</a> for header modification support.

### 3. What are the CRDs used in WSO2 APK?

Refer to the <a href="../../catalogs/kubernetes-crds" target="_blank">CRD catalog</a> for details on the CRDs used in the APK, including examples and the configuration definitions.

## Security

### 1. What are the different methods available for API authentication?
Currently, APK supports OAuth 2.0 and mutualSSL for API authentication.

### 2. Can I use a custom authorization header?
Yes, a custom authorization header can be used. Refer to the <a href="../../develop-and-deploy-api/security/authentication/enable-api-security/oauth2" target="_blank">Use custom bearer header name</a> for instructions to configure this.

## Troubleshooting

### 1. Why am I encountering 'Unknown field' errors during the installation process?

If you are seeing errors similar to the ones below:

```plaintext
W0907 12:33:54.079420 1181879 warnings.go:70 unknown field "spec.someName"
...
Error: INSTALLATION FAILED: 7 errors occurred:
   * API.dp.wso2.com "apk-wso2-apk-oauth-api" is invalid: [spec.apiDisplayName: Required value, spec.context: Required value]
   ...
```

It is likely due to a limitation in Helm when updating Custom Resource Definitions (CRDs). Helm does not automatically redeploy existing CRDs, which can lead to conflicts. Downloading the chart and applying the CRDs manually will resolve the issue. Here are the steps to follow to achieve this.

1.  Download the chart to your local environment.

    === "Command"

        ```
        curl -L -o apk.tar.gz "https://github.com/wso2/apk/archive/refs/tags/1.2.0.tar.gz" && tar -zxvf apk.tar.gz
        ```

2.  Go to the apk-1.2.0/helm-charts/crds folder and apply the CRDs manually.

    === "Command"

        ```
        cd apk-1.2.0/helm-charts/crds
        kubectl apply -f .
        ```

3. Now uninstall the previous faulty deployment and reinstall the APK using Helm.

---

These FAQs should guide you through resolving any issues or queries you face while using WSO2 APK. If you still encounter difficulties, please feel free to contact our support team for further assistance.