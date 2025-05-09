# Uninstall APK Components

!!! Note
    Uninstalling APK and any other components from the cluster involves deleting APK related data, configurations and CRDs from the cluster. Ensure that you back up any important data or configurations before proceeding with the rest of this guide.

## Uninstall APK

### Check Status of Current Installation

To view details about your existing APK installation, use the following command.

```
helm list -A
```

This will give you an output similar to the following.
[![Helm List Output](../assets/img/setup/apk-helm-list-output.png)](../assets/img/setup/apk-helm-list-output.png)

This will give you information regarding your existing APK helm installation. 
For this guide, `chart-name` is the `NAME` of the installation, and the `namespace` is the `NAMESPACE` of the installation
The version of your installation is the 3 digit suffix in the `CHART` field.

For example, in the above image, the values are as follows.

- chart-name: apk
- namespace: apk
- version: 1.2.0

### Instructions for Uninstalling APK

To completely remove APK from your Kubernetes cluster, follow the steps given below.

1. Apply the following command.
    
    === "Command"
        ```
        helm uninstall apk -n apk
        ```
    === "Format"
        ```
        helm uninstall <chart-name> -n <namespace>
        ```

2. You will have the APK specific related CRDs remaining in the cluster. You can delete the remaining CRDs using the command given below.

    === "Command"
         ```
         kubectl delete crds aiproviders.dp.wso2.com airatelimitpolicies.dp.wso2.com applicationmappings.cp.wso2.com applications.cp.wso2.com backendjwts.dp.wso2.com backends.dp.wso2.com gqlroutes.dp.wso2.com interceptorservices.dp.wso2.com ratelimitpolicies.dp.wso2.com scopes.dp.wso2.com subscriptions.cp.wso2.com
         ```
    === "Format"
         ```
         kubectl delete crds <crd-names> 
         ```

3. You will then have common CRDs, such as those from Cert-Manager and Gateway API specifications, remaining in the cluster. You can delete these remaining CRDs using the command below. Please note that this will affect other applications in your cluster that use these CRDs.

    === "Command Remove GatewaySpec CRDs"
         ```
         kubectl delete crds httproutes.gateway.networking.k8s.io tcproutes.gateway.networking.k8s.io tlsroutes.gateway.networking.k8s.io udproutes.gateway.networking.k8s.io grpcroutes.gateway.networking.k8s.io gateways.gateway.networking.k8s.io gatewayclasses.gateway.networking.k8s.io backendtlspolicies.gateway.networking.k8s.io backendlbpolicies.gateway.networking.k8s.io referencegrants.gateway.networking.k8s.io
         ```
    === "Command Remove Cert-Manager CRDs"
         ```
         kubectl delete crds kubectl delete crds certificaterequests.cert-manager.io challenges.acme.cert-manager.io challenges.acme.cert-manager.io clusterissuers.cert-manager.io issuers.cert-manager.io orders.acme.cert-manager.io certificates.cert-manager.io
         ```
    === "Format"
         ```
         kubectl delete crds <crd-names> 
         ```

This will clear the APK installation from your Kubernetes cluster.

## Uninstall APIM APK Agent

### Check Status of Current Installation

To view details about your APIM APK Agent installation, use the following command.

```
helm list -A
```

This will give you an output similar to the following.
[![Helm List Output](../assets/img/setup/apim-apk-agent-helm-list-output.png)](../assets/img/setup/apim-apk-agent-helm-list-output.png)

This will give you information regarding your Agent helm installation. 
For this guide, `chart-name` is the `NAME` of the installation, and the `namespace` is the `NAMESPACE` of the installation
The version of your installation is the 3 digit suffix in the `CHART` field.

For example, in the above image, the values are as follows.

- chart-name: apim-apk-agent
- namespace: apk
- version: 1.2.0

### Instructions for Uninstalling APIM APK Agent

To remove the APIM APK Agent from your Kubernetes cluster, apply the following command.

=== "Command"
     ```
     helm uninstall apim-apk-agent -n apk
     ```
=== "Format"
     ```
     helm uninstall <chart-name> -n <namespace>
     ```
