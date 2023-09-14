# Prerequisites

1. [Setup a Kubernetes Cluster](https://kubernetes.io/docs/setup).
2. [Install the Kubernetes Client (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
3. [Install Helm](https://helm.sh/docs/intro/install/).


# Requirements
To successfully deploy WSO2 APK in your environment, it's essential to meet certain minimum requirements. These requirements ensure that the deployment process is smooth, and the platform operates efficiently.

### Package Manager Requirement

Here are the requirements for the package manager to be used with this project:

| Package Manager | Version        |
|-----------------|----------------|
| Helm            | 3.10.0 - 3.12.0|


### Kubernetes Resource Requirement

Here are the minimum resource requirements for the Kubernetes cluster to run this project:

| Resource  | Minimum Requirement |
|-----------|----------------------|
| CPU       | 4 Cores             |
| Memory    | 6 GB                |
| Storage   | 15 GB               |

### Manage kubernetes services

Here are the supported manage kubernetes services:

| Platform     | Cluster Version          |
|--------------|------------------|
| EKS          | 1.27             |
| GKE          | 1.27.3           |
| AKS          | 1.27             |


### Kubernetes distributions

Here are the supported Kubernetes distributions:

| Software Application | Cluster Version  |  Software Version |
|----------------------|------------------|-------------------|
| Minikube             |  1.26.3 - 1.27.4 | 1.30.1 - 1.31.1   |
| Rancher              |  1.27.2          |     1.9.1         |
| Kind                 |  1.26.3          |     1.25.3        |
| Openshift            |  4.13.3          |  2.23.0+ddcfe8    | 

### Other Dependencies

Here are the required dependencies and their versions:

| Dependency         | Version       |
|--------------------|---------------|
| Docker Engine      | 23.0.2 or above |
| Redis              | 17.8.0        |
| Cert-manager       | 1.10.1        |
| **Postgresql         | 11.9.6        |

These dependencies are automatically installed when you deploy the Helm chart using the helm install command and the chart provides the ability to integrate external services.

** Postgress is required only if you are using non-production idp configurations.