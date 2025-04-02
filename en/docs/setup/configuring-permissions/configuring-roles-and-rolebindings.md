# Configuring Roles and RoleBindings

Upon installation, APK creates various Roles and ClusterRoles to manage permissions. While most APK functionalities can be configured using a Role, certain cluster-scoped resources require ClusterRole permissions. This document outlines the required permissions and configuration steps.

## 1. Roles and ClusterRoles for APK specific functionalities

APK-specific functionalities are managed using a ClusterRole bound to a ServiceAccount. Both are created automatically during the APK Helm installation. These settings can be configured in the `values.yaml` file:

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
      enableClusterRoleCreation: true  # Creates the required ClusterRole and ClusterRoleBinding
      serviceAccountName: wso2apk-platform  # Configures the ServiceAccount name
      roleName: wso2apk-role  # Configures the ClusterRole name
```

To further refine access control, you can split the default ClusterRole into a Role and ClusterRole and then create the necessary RoleBinding and ClusterRoleBinding. The steps to achieve this are outlined below.

### Customizing the ClusterRole for APK Functionalities

1. Download the Helm chart and extract the templates:
```
helm pull wso2apk/apk-helm --version 1.2.0 --untar
```

2. Navigate to the `apk-helm/templates/serviceAccount` folder and delete the following files:
      - apk-cluster-role-binding.yaml
      - apk-cluster-role.yaml

3. In the same folder, create a yaml file and add the following content. Alternatively, you can download the templated file from [this link](../../assets/files/configure-permissions/apk-specific-permission.yaml).

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
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
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis"]
    verbs: ["get", "list", "watch", "update", "delete", "create", "patch"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["ratelimitpolicies"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["ratelimitpolicies/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["ratelimitpolicies/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["airatelimitpolicies"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["airatelimitpolicies/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["airatelimitpolicies/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["coordination.k8s.io"]
    resources: ["leases"]
    verbs: ["get", "list", "watch", "update", "patch", "create", "delete"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions/status"]
    verbs: ["get", "patch", "update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings/status"]
    verbs: ["get", "patch", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: apk-wso2-apk-role-binding
  namespace: apk
roleRef:
  kind: Role
  name: wso2apk-role
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name: wso2apk-platform
    namespace: apk
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: apk-wso2-apk-gw-cluser-role
  namespace: apk
rules:
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["gateways", "gatewayclasses"]
    verbs: ["get", "list", "watch", "update", "delete", "create"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["gateways/status", "gatewayclasses/status"]
    verbs: ["get", "patch", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: apk-wso2-apk-cluster-role-binding
  namespace: apk
roleRef:
  kind: ClusterRole
  name: apk-wso2-apk-gw-cluser-role
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name:  wso2apk-platform
    namespace: apk
```
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

```
helm install apk . -f values.yaml -n apk
```

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