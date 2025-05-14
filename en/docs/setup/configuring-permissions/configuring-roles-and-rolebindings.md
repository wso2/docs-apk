# Configuring Roles and RoleBindings

Upon installation, APK creates various Roles and ClusterRoles to manage permissions. While most APK functionalities can be configured using a Role, certain cluster-scoped resources require ClusterRole permissions. This document outlines the required permissions and configuration steps.

## 1. Roles and ClusterRoles for APK specific functionalities

APK-specific functionalities are by default managed using a ClusterRole bound to a ServiceAccount. Both are created automatically during the APK Helm installation. These settings can be configured in the `values.yaml` file:

```yaml
wso2:
    .
    .
  apk:
    .
    .
    auth:
      enabled: true 
      enableServiceAccountCreation: true  # Creates the ServiceAccount
      serviceAccountName: wso2apk-platform  # Configures the ServiceAccount name
      clusterRoleBindingsGateway:  
        enabled: true # This is always needed for the Gateway class
        roleName: wso2apk-gateway-cluster-role 
      namespaceRoleBindings:  # Creates the required Role and RoleBinding (only needed if clusterRoleBindings are not enabled)
        enabled: "false"
        roleName: wso2apk-role # Configures the Role name
      clusterRoleBindings:  # Creates the required ClusterRole and ClusterRoleBinding
        enabled: true 
        roleName: wso2apk-cluster-role # Configures the ClusterRole name
```
A ClusterRole and a ClusterRoleBinding are always created for the Gateway API functionalities. This is controlled by the `clusterRoleBindingsGateway` section and is necessary for the proper functioning of the Gateway class. The `clusterRoleBindingsGateway` section should always be enabled.

However, to refine access control, you can split the default ClusterRole into a Role and ClusterRole and then create the necessary RoleBinding and ClusterRoleBinding to minimize the granting of cluster level permissions. The steps to achieve this are outlined below.

### Customizing the ClusterRole for APK Functionalities

1. Download the Helm chart and extract the templates:
```
helm pull wso2apk/apk-helm --version 1.2.0 --untar
```

2. In the `helm-charts/values.yaml` file, update the following section as follows. Here we enable the `namespaceRoleBindings` and disable `clusterRoleBindings`. 
```
wso2:
  apk:
     .
     .
    auth:
      enabled: true
      enableServiceAccountCreation: true
      serviceAccountName: wso2apk-platform
      clusterRoleBindingsGateway:  
        enabled: true
        roleName: wso2apk-gateway-cluster-role 
      namespaceRoleBindings: 
        enabled: true
        roleName: wso2apk-role
      clusterRoleBindings: 
        enabled: "false" 
        roleName: wso2apk-cluster-role
```
3. Install APK with the following command using the local helm-chart and templates.

```
helm install apk . -f values.yaml -n apk
```
If further customization is necessary, you can manually modify the corresponding files in the `helm-charts/templates/serviceAccount` directory.

## 2. Roles and ClusterRoles for Gateway API functionalities

By default, the following Role, RoleBinding, and ClusterRoleBinding are created to support the Kubernetes Gateway API admission webhook server.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: apk-wso2-apk-gateway-api-admission
  annotations:
  labels:
    name: gateway-api-webhook
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: gateway-api-admission
subjects:
  - kind: ServiceAccount
    name: gateway-api-admission
    namespace: apk
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: gateway-api-admission
  annotations:
  labels:
    name: gateway-api-webhook
  namespace: apk
rules:
  - apiGroups:
      - ''
    resources:
      - secrets
    verbs:
      - get
      - create
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: gateway-api-admission
  annotations:
  labels:
    name: gateway-api-webhook
  namespace: apk
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: gateway-api-admission
subjects:
  - kind: ServiceAccount
    name: gateway-api-admission
    namespace: apk
```

The ClusterRole `gateway-api-admission` referred to in the ClusterRoleBinding above is also enabled by default, but can be disabled in the values.yaml file under the section

```yaml
gatewaySystem:
  enabled: true
  enableServiceAccountCreation: true  # Creates the ServiceAccount
  enableClusterRoleCreation: true  # Creates the ClusterRole
  serviceAccountName: gateway-api-admission # Configures the name of the ServiceAccount
  applyGatewayWehbhookJobs: true
```

If you wish to create the ClusterRole manually, you will need to create one similar to the following.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: gateway-api-admission
  labels:
    name: gateway-api
rules:
  - apiGroups:
      - admissionregistration.k8s.io
    resources:
      - validatingwebhookconfigurations
    verbs:
      - get
      - update
```