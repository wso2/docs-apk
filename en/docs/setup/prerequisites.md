# Prerequisites

1. [Setup a Kubernetes Cluster](https://kubernetes.io/docs/setup).
2. [Install the Kubernetes Client (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
3. [Install Helm](https://helm.sh/docs/intro/install/).


## Requirements
To successfully deploy WSO2 APK in your environment, it's essential to meet certain minimum requirements. These requirements ensure that the deployment process is smooth, and the platform operates efficiently.

### Package Manager Requirement

Here are the requirements for the package manager to be used with this project:

| Package Manager | Version         |
|-----------------|-----------------|
| Helm            | 3.10.0 - 3.16.1 |


### Kubernetes Resource Requirements

Here are the minimum resource requirements for the Kubernetes cluster to run APK Data Plane:

| Resource  | Minimum Requirement |
|-----------|----------------------|
| CPU       | 4 Cores             |
| Memory    | 6 GB                |
| Storage   | 15 GB               |

Here are the minimum resource requirements for the Kubernetes cluster to run APK Data Plane with APIM Control Plane:

| Resource  | Minimum Requirement |
|-----------|---------------------|
| CPU       | 6 Cores             |
| Memory    | 8 GB                |
| Storage   | 15 GB               |

### Manage Kubernetes Services

Here are the supported manage Kubernetes services:

| Platform     | Cluster Version |
|--------------|-----------------|
| EKS          | 1.27 - 1.30.3   |
| GKE          | 1.27.3 - 1.30.3 |
| AKS          | 1.27   - 1.30.3 |


### Kubernetes Distributions

Here are the supported Kubernetes distributions:

| Software Application | Cluster Version | Software Version |
|----------------------|-----------------|------------------|
| Minikube             | 1.26.3 - 1.30.3 | 1.30.1 - 1.34.0  |
| Rancher              | 1.27.2 - 1.30.3 | 1.9.1 - 1.30.3   |
| Kind                 | 1.26.3 - 1.30.3 | 0.24.0           |
| Openshift            | 1.28            | 4.15             | 

### Other Dependencies

Here are the required dependencies and their versions:

| Dependency    | Version         |
|---------------|-----------------|
| Docker Engine | 26.1.5 or above |
| Redis         | 20.1.7          |
| Cert-manager  | v1.16.0         |
| **PostgreSQL  | 15.5.24         |

These dependencies are automatically installed when you deploy the Helm chart using the `helm install` command and the chart provides the ability to integrate external services.

** PostgreSQL is required only if you are using non-production IdP configurations.