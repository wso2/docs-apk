# Configuring the Kubernetes Gateway per Namespace 

The Kubernetes Gateway can be configured to be deployed at the Namespace level using Roles and RoleBindings, instead of providing cluster level permissions. This is useful if you want to limit the permissions of the Kubernetes Gateway components to a specific namespace.

!!! note
    Deploying the Kubernetes Gateway at the Namespace level must be done using the updated 1.3.0-1 helm-chart which can be obtained from [this link](https://artifacthub.io/packages/helm/wso2/apk-helm/1.3.0-1). Additionally, the relevant enterprise images must be used for the installation as shown in the following link for [Enterprise Installation Instructions](https://apk.docs.wso2.com/en/latest/setup/enterprise-apk-install/).

You can do so by following the steps below. 

1. Create a namespace for your Kubernetes Gateway installation.
```bash
kubectl create namespace apk
```

2. Download the Custom Resource Definitions (CRDs) file from [this link](../../assets/files/configure-permissions/crds.yaml) and install it in your Kubernetes cluster using the following command:
```bash
kubectl apply -f crds.yaml
```

2. Add the following key to the `values.yaml` file to skip the default installation of CRDs.
```yaml
skipCrds: true
```

3. Change the `values.yaml` file by adding the following configurations for `resourceLevelPermissions` and disabling ClusterRole creation.
```yaml
wso2:
  apk:
    auth:
      enabled: true
      enableServiceAccountCreation: true
      enableClusterRoleCreation: false
      serviceAccountName: wso2apk-platform
      resourceLevelPermissions: 
        scope: Namespaced
        roleName: wso2apk-role
```

4. By default, the helm installation creates a Service Account, Role, and RoleBinding for the Kubernetes Gateway components only within the namespace in which you install it. Optionally you may add other namespaces as desired to the `apiNamespaces` in the `values.yaml` file under the `adapter` and `commonController` sections. This will allow the Kubernetes Gateway to manage APIs in those namespaces as well. However, you will need to create additional Roles and RoleBindings for those namespaces as well.
```yaml
adapter:
  deployment:
    configs: 
      apiNamespaces:
        - "apk-v12"
---          
commonController:
  deployment:
    configs:
      apiNamespaces:
        - "apk-v12"
```

5. Disable the ClusterRole and ClusterRoleBinding that are created by default to support the Kubernetes Gateway API admission webhook server. This can be done by modifying the `values.yaml` file as follows: 
```yaml
gatewaySystem:
  enabled: false # Disables the Gateway API admission webhook server 
```
6. Install the Kubernetes Gateway with the following command using the local helm-chart and templates.
```bash
helm install apk . -f values.yaml -n apk --skip-crds
```
7. If you wish to deploy the Kubernetes Gateway in another namespace, you can follow the same steps starting from step 2.