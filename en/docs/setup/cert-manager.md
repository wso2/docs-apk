# Configuring Cert-Manager in Custom Scenarios  

In certain scenarios, you may already have **cert-manager** installed or need to install it in a different namespace. This guide outlines the steps to configure the WSO2 Kubernetes Gateway's **cert-manager** in such cases.  


## 1. Ensure Cert-Manager is Installed  

Before proceeding, ensure that your **cert-manager** is installed and running in its own namespace. You can refer to the <a href="https://cert-manager.io/docs/installation/" target="_blank">official cert-manager documentation </a> for this.


## 2. Create the Namespace for WSO2 Kubernetes Gateway

We will use this namespace to install WSO2 Kubernetes Gateway. For this guide, we will create a namespace named `wso2-kg`. Run the following command:  

```sh
kubectl create ns wso2-kg
```

## 3. Create an Issuer for Cert-Manager in the WSO2 Kubernetes Gateway namespace


Create an Issuer required for cert-manager by applying the following configuration:
```
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: custom-issuer  
  namespace: wso2-kg 
spec:
  ca:
    secretName: apk-root-certificate
```

You can obtain the <a href="../../assets/files/cert-manager/issuer.yaml" target="_blank" download>issuer.yaml</a> file here.

!!! note
    ### Why Use an Issuer Instead of a ClusterIssuer?


    By default, WSO2 Kubernetes Gateway installation comes with a ClusterIssuer, which operates cluster-wide. However, the ClusterIssuer looks for the secret named `apk-root-certificate` in the namespace where the cert-manager is installed, whereas WSO2 Kubernetes Gateway creates the secret in its own namespace.

    There are two ways to fix this.

    1. Modify the cert-manager installation by forcing the ClusterIssuer to check the WSO2 Kubernetes Gateway namespace, as in the <a href="https://cert-manager.io/docs/configuration/#cluster-resource-namespace" target="_blank">official cert-manager documentation</a>.

   
    2. To avoid modifying cert-manager’s installation, **create an Issuer instead**, which will look for secrets in its own namespace. Then it can correctly reference the secret containing the root certificate.

    We will proceed with the **second method** in this guide.

## 4. Apply the Issuer


Run the following command to apply the issuer in the wso2-kg namespace:

=== "Command"
    ```
    kubectl apply -f issuer.yaml -n wso2-kg
    ```
=== "Format"
    ```
    kubectl apply -f <path-to-issuer.yaml-file> -n <namespace>
    ```

At this stage, if you run 
=== "Command"
    ```
    kubectl describe issuer custom-issuer -n wso2-kg
    ```
=== "Format"
    ```
    kubectl describe <issuer-name> -n <namespace>
    ```

it may show a "False" Ready status. This is expected, as the root certificate secret is not created yet. The secret will be generated when WSO2 Kubernetes Gateway is installed.


## 5. Update `values.yaml`

Modify the values.yaml file with the following configuration:
```
certmanager:
  enabled: false
  enableClusterIssuer: false
  enableRootCa: true
  rootCaSecretName: "apk-root-certificate"
  issuerKind: "Issuer"
  listeners:
    issuerName: "custom-issuer"
    issuerKind: "Issuer"
  servers:
    issuerName: "custom-issuer"
    issuerKind: "Issuer"
```

This configuration 


- disables the cert-manager included with WSO2 Kubernetes Gateway
- creates the root certificate for the Issuer
- refers to an Issuer for the certificate management instead of a ClusterIssuer

## 5. Install APK

Now, install WSO2 Kubernetes Gateway using Helm with the modified values.yaml file.

=== "Command"
    ```
    helm install apk wso2apk/apk-helm --version 1.3.0 -f values.yaml -n wso2-kg
    ```
=== "Format"
    ```
    helm install <chart-name> <repository-name>/apk-helm --version <version-of-WSO2-Kubernetes-Gateway> -f <path-to-values.yaml-file> -n <namespace>
    ```

## 5. Verify the Certificate Status

Once WSO2 Kubernetes Gateway is installed, check the certificates by running:
=== "Command"
    ```
    kubectl get certificates -n wso2-kg
    ```
=== "Format"
    ```
    kubectl get certificates -n <namespace>
    ```

You should be able to see them having transitioned to the Ready status as follows.

[![Certificates](../../assets/img/cert-manager/certificates.png)](../../assets/img/cert-manager/certificates.png)
