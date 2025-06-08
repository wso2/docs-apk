# Prerequisites

To successfully deploy WSO2 Kubernetes Gateway in your environment, you’ll need a Kubernetes cluster, a Kubernetes client (`kubectl`), and Helm for package management. Additionally, your environment must meet specific requirements across managed Kubernetes services, resource allocations, and supported Kubernetes distributions. 

### Steps to Follow

#### 1. Set up a Kubernetes Cluster

WSO2 Kubernetes Gateway is compatible with a variety of Kubernetes distributions and managed services. You can either use a managed Kubernetes offering or install a kubernetes distribution on your own machine — just be sure to choose a supported version

#### Managed Kubernetes Services

WSO2 Kubernetes Gateway supports several managed Kubernetes services. To ensure compatibility, verify that your service’s Kubernetes version falls within the specified range.

| Platform | Cluster Version |
| -------- | --------------- |
| EKS      | 1.27 - 1.32.2   |
| GKE      | 1.27.3 - 1.32.2 |
| AKS      | 1.27 - 1.32.2   |

#### Kubernetes Distributions

WSO2 Kubernetes Gateway is compatible with a variety of Kubernetes distributions. Check the compatible versions for each distribution below to ensure proper functionality.

| Software Application | Cluster Version | Software Version |
|----------------------| --------------- |------------------|
| Minikube             | 1.26.3 - 1.32.2 | 1.30.1 - 1.35.0  |
| Rancher Desktop      | 1.27.2 - 1.32.2 | 1.9.1 - 1.18.0   |
| Rancher Enterprise   | 1.32.3 (RKE2)   | 2.11.1           |
| Kind                 | 1.26.3 - 1.32.2 | 0.24.0           |
| OpenShift            | 1.28            | 4.15             |


!!!Important
    Install the Kubernetes Client (kubectl)

    Most managed Kubernetes services and distributions support this by default.
    After completing the first step, run the <b>kubectl --help</b> command to verify that it’s already installed. If it isn’t, use the following instructions to install it manually
    Install the Kubernetes Client (`kubectl`)

    Refer to the <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank">Kubernetes documentation</a> to install the `kubectl` client.

#### 2. Install Helm

Refer to the <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm documentation</a> to install Helm. 
#### Helm

Below is the version requirement for Helm to be compatible with WSO2 Kubernetes Gateway.

| Package Manager | Version         |
| --------------- | --------------- |
| Helm            | 3.10.0 - 3.17.1 |

Once you’ve completed both steps, you’re ready to install the Kubernetes Gateway.
<a href="../../setup/deployment/deployment-patterns-overview/" target="_blank">Kubernetes Gateway Installation Patterns</a> 

### Additional Dependencies

In addition to Kubernetes and Helm, WSO2 Kubernetes Gateway requires several other dependencies. You do not required to install these dpendencies manually. **Redis, Cert-manager, and PostgreSQL are automatically handled during Kubernetes Gateway installation**. 

| Dependency    | Version         | Notes                                                                                                           |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| Redis         | 20.10.0         | Automatically installed with Kubernetes Gateway; no manual configuration required.                              |
| Cert-manager  | v1.17.1         | Automatically installed with Kubernetes Gateway; no manual configuration required.                              |
| PostgreSQL    | 16.4.14         | Automatically installed with Kubernetes Gateway; required only for non-production IdP configurations.           |


!!!Note
    PostgreSQL is used in the Quick Start Guide for token generation from the non-production IdP.

!!!Note
    Kubernetes Gateway uses a built-in standalone Redis service which is not suitable for production usage. Please use a production grade Redis in production setup.


### Resource Requirements

We recommend the following minimum resource requirements for running WSO2 Kubernetes Gateway on a Kubernetes cluster. These requirements are based on whether you are deploying the Kubernetes Gateway Data Plane only or with the APIM Control Plane as well.

**Minimum requirements for Kubernetes Gateway Data Plane:**

| Resource | Minimum Requirement |
| -------- | ------------------- |
| CPU      | 4 Cores             |
| Memory   | 6 GB                |
| Storage  | 15 GB               |

**Minimum requirements per Component - Production Setup:**

| Component                                       | CPU Requests (m) | Memory Requests (Mi) |
| ----------------------------------------------- | ---------------- | -------------------- |
| **Adapter**                                     | 50m              | 64Mi                 |
| **Common Controller**                           | 50m              | 64Mi                 |
| **Config Deployer Service**                     | 200m             | 512Mi                |
| **Router**         | 200m            | 128Mi               |
| **Gateway Runtime (Enforcer + Router)**         | 200m            | 128Mi               |
| **Rate Limiter** (If rate limiting is required) | 50m              | 64Mi                 |

**Other Components (for non-production use):**

| Component              | CPU Requests (m) | Memory Requests (Mi) |
| ---------------------- | ---------------- | -------------------- |
| **IdP Domain Service** | 200m             | 512Mi                |
| **IdP UI**             | 50m              | 64Mi                 |


**Minimum requirements for Kubernetes Gateway Data Plane with APIM Control Plane:**

| Resource | Minimum Requirement |
| -------- | ------------------- |
| CPU      | 6 Cores             |
| Memory   | 8 GB                |
| Storage  | 15 GB               |



#### 2. Install the Kubernetes Client (`kubectl`)

Refer to the <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank">Kubernetes documentation</a> to install the `kubectl` client.

#### 3. Install Helm

Refer to the <a href="https://helm.sh/docs/intro/install/" target="_blank">Helm documentation</a> to install Helm. 

### Additional Dependencies

In addition to Kubernetes and Helm, WSO2 Kubernetes Gateway requires several other dependencies. **Redis, Cert-manager, and PostgreSQL are automatically handled during Kubernetes Gateway installation**. 

| Dependency    | Version         | Notes                                                                                                           |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| Docker Engine | 27.5.1 or above | Ensure compatibility with Kubernetes Gateway as Kubernetes clusters may have varying Docker versions installed. |
| Redis         | 20.10.0         | Automatically installed with Kubernetes Gateway; no manual configuration required.                              |
| Cert-manager  | v1.17.1         | Automatically installed with Kubernetes Gateway; no manual configuration required.                              |
| PostgreSQL    | 16.4.14         | Automatically installed with Kubernetes Gateway; required only for non-production IdP configurations.           |

**Note**: Docker version within the Kubernetes cluster may vary. To ensure compatibility with Kubernetes Gateway, confirm that your Docker version meets the minimum requirement listed above.

**Note**: PostgreSQL is used in the Quick Start Guide for token generation from the non-production IdP.

### ARM compatibility

WSO2 Kubernetes Gateway is compatible with ARM processors. It can run on ARM-based systems, such as those with Apple Silicon or ARM-based Linux distributions.

Note: Use a Redis Docker image that includes an ARM-compatible release.
