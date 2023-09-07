# Prerequisites

1. [Install Helm](https://helm.sh/docs/intro/install/). (use helm version 3.10.0 and onwards)
2. [Install the Kubernetes Client (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
3. [Setup a Kubernetes Cluster](https://kubernetes.io/docs/setup).
     
     If you want to run APK on your local machine, you need to install [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation), [minikube](https://minikube.sigs.k8s.io/), [kind](https://kind.sigs.k8s.io/docs/) or a similar software.


# Requirements
To successfully deploy WSO2 APK in your environment, it's essential to meet certain minimum requirements. These requirements ensure that the deployment process is smooth, and the platform operates efficiently.

### Package Manager Requirement

Here are the requirements for the package manager to be used with this project:

| Package Manager | Version        |
|-----------------|----------------|
| Helm            | 3.10.0 or above|


### Kubernetes Resource Requirement

Here are the minimum resource requirements for the Kubernetes cluster to run this project:

| Resource  | Minimum Requirement |
|-----------|----------------------|
| CPU       | 4 Cores             |
| Memory    | 6 GB                |
| Storage   | 15 GB               |

### Kubernetes Cluster Versions

Here are the supported Kubernetes cluster versions for different platforms:

| Platform     | Version          |
|--------------|------------------|
| EKS          | 1.27             |
| GKE          | 1.27.3           |
| AKS          | 1.27             |
| OpenShift    | 4.13.3           |
| Minikube     | 1.26.3 - 1.27.4  |
| Rancher      | 1.27.2           |
| Kind         | 1.26.3           |

### Demo/Quick Start Setup - Software Versions

Here are the supported versions for the software applications:

| Software Application | Version          |
|----------------------|------------------|
| Minikube             | 1.30.1 - 1.31.1  |
| Rancher              | 1.9.1            |
| Kind                 | 1.25.3           |
| Openshift            | 2.23.0+ddcfe8    |

### Other Dependencies

Here are the required dependencies and their versions:

| Dependency         | Version       |
|--------------------|---------------|
| Docker Engine      | 23.0.2 or above |
| Redis              | 17.8.0        |
| Cert-manager       | 1.10.1        |
| Postgresql         | 11.9.6        |