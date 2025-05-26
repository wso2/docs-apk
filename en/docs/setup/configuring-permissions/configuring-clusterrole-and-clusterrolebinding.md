# Configuring ClusterRoles and ClusterRoleBindings

The APK by default creates the following ClusterRole and ClusterRoleBinding and assigns permissions to the ServiceAccount as below.

**ClusterRole**
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: wso2apk-role
  namespace: apk
rules:
  - apiGroups: [""]
    resources: ["services", "configmaps", "secrets"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["httproutes", "grpcroutes"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["httproutes/status"]
    verbs: ["get", "patch", "update"]
.
.
.

```
**ClusterRoleBinding**
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: apk-wso2-apk-cluster-role-binding
  namespace: apk
roleRef:
  kind: ClusterRole
  name: wso2-apk-role
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name:  wso2apk-platform
    namespace: apk

```
If you wish to manually create the ClusterRole and ClusterRoleBinding and then deploy the APK, you can do so by following the steps below. 



1. Download the Helm chart and extract the templates:
```bash
helm pull wso2apk/apk-helm --version 1.2.0 --untar
```

2. Navigate to the `apk-helm/templates/serviceAccount` folder and delete the following files:
      - apk-cluster-role-binding.yaml
      - apk-cluster-role.yaml
      - apk-role-binding.yaml
      - apk-role.yaml

3. In the same folder, create a yaml file and add your own configurations for the ClusterRole and ClusterRoleBinding. If you want to minimize the ClusterRole permissions, you can also create a Role and RoleBinding and split up the permissions between them. You can use the templated file from [this link](../../assets/files/configure-permissions/apk-specific-permission.yaml) as a reference for creating the Role and RoleBindings.

4. In the `helm-charts/values.yaml` file, update the following section as follows.
```
wso2:
  apk:
     .
     .
    auth:
      enabled: true
      enableServiceAccountCreation: true
      enableClusterRoleCreation: false
      serviceAccountName: wso2apk-platform
      roleName: wso2apk-role
```
5. Install APK with the following command using the local helm-chart and templates.
```bash
helm install apk . -f values.yaml -n apk
```
6. Optionally you can also configure the ClusterRole and ClusterRoleBinding that are created by default to support the Kubernetes Gateway API admission webhook server. The default configuration is as follows:
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
This can be disabled in the values.yaml file under the section.
```yaml
gatewaySystem:
  enabled: true
  enableServiceAccountCreation: true  # Creates the ServiceAccount
  enableClusterRoleCreation: true  # Creates the ClusterRole
  serviceAccountName: gateway-api-admission # Configures the name of the ServiceAccount
  applyGatewayWehbhookJobs: true
```