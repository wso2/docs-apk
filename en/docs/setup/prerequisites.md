# Prerequisites

To successfully deploy WSO2 APK in your environment, you’ll need a Kubernetes cluster, a Kubernetes client (`kubectl`), and Helm for package management. Additionally, your environment must meet specific requirements across managed Kubernetes services, resource allocations, and supported Kubernetes distributions. Each section below outlines these requirements for a successful deployment.

### Supported Versions
#### Managed Kubernetes Services

WSO2 APK supports several managed Kubernetes services. To ensure compatibility, verify that your service’s Kubernetes version falls within the specified range.

| Platform | Cluster Version |
| -------- | --------------- |
| EKS      | 1.27 - 1.30.3   |
| GKE      | 1.27.3 - 1.30.3 |
| AKS      | 1.27 - 1.30.3   |

#### Kubernetes Distributions

WSO2 APK is compatible with a variety of Kubernetes distributions. Check the compatible versions for each distribution below to ensure proper functionality.

| Software Application | Cluster Version | Software Version |
| -------------------- | --------------- | ---------------- |
| Minikube             | 1.26.3 - 1.30.3 | 1.30.1 - 1.34.0  |
| Rancher              | 1.27.2 - 1.30.3 | 1.9.1 - 1.16.0   |
| Kind                 | 1.26.3 - 1.30.3 | 0.24.0           |
| OpenShift            | 1.28            | 4.15             |

#### Helm

Below is the version requirement for Helm to be compatible with WSO2 APK.

| Package Manager | Version         |
| --------------- | --------------- |
| Helm            | 3.10.0 - 3.16.1 |

### Resource Requirements

We recommend the following minimum resource requirements for running WSO2 APK on a Kubernetes cluster. These requirements are based on whether you are deploying the APK Data Plane only or with the APIM Control Plane as well.

**Minimum requirements for APK Data Plane:**

| Resource | Minimum Requirement |
| -------- | ------------------- |
| CPU      | 4 Cores             |
| Memory   | 6 GB                |
| Storage  | 15 GB               |

**Minimum requirements for APK Data Plane with APIM Control Plane:**

| Resource | Minimum Requirement |
| -------- | ------------------- |
| CPU      | 6 Cores             |
| Memory   | 8 GB                |
| Storage  | 15 GB               |

### Steps to Follow
#### 1. Set up a Kubernetes Cluster

Refer to the <a href="https://kubernetes.io/docs/setup" target="_blank">Kubernetes documentation</a> to set up a Kubernetes cluster.

#### 2. Install the Kubernetes Client (`kubectl`)

Refer to the <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank">Kubernetes documentation</a> to install the `kubectl` client.

#### 3. Install Helm

Refer to the <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm documentation</a> to install Helm. 

### Additional Dependencies

In addition to Kubernetes and Helm, WSO2 APK requires several other dependencies. **Redis, Cert-manager, and PostgreSQL are automatically handled during APK installation**. 

| Dependency    | Version         | Notes                                                                                            |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| Docker Engine | 26.1.5 or above | Ensure compatibility with APK as Kubernetes clusters may have varying Docker versions installed. |
| Redis         | 20.1.7          | Automatically installed with APK; no manual configuration required.                              |
| Cert-manager  | v1.16.0         | Automatically installed with APK; no manual configuration required.                              |
| PostgreSQL    | 15.5.24         | Automatically installed with APK; required only for non-production IdP configurations.           |

**Note**: Docker version within the Kubernetes cluster may vary. To ensure compatibility with APK, confirm that your Docker version meets the minimum requirement listed above.

**Note**: PostgreSQL is used in the Quick Start Guide for token generation from the non-production IdP.

### ARM compatibility

WSO2 Kubernetes Gateway is compatible with ARM processors. It can run on ARM-based systems, such as those with Apple Silicon or ARM-based Linux distributions.

Note: Use a Redis Docker image that includes an ARM-compatible release.
