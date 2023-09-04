# Prerequisites

1. [Install Helm](https://helm.sh/docs/intro/install/). (use helm version 3.10.0 and onwards)
2. [Install the Kubernetes Client (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
3. [Setup a Kubernetes Cluster](https://kubernetes.io/docs/setup).
     
     If you want to run APK on your local machine, you need to install [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation), [minikube](https://minikube.sigs.k8s.io/), [kind](https://kind.sigs.k8s.io/docs/) or a similar software.

4. Setup a deployment namespace.
   
     `kubectl create namespace <namespace>`

# Requirements
You can install APK for production use, or you can install the OpenSource APK for get a quick feel of APK. You can refer the requirements for each in the following table:

|                                                                                                                                                                                    | Production APK             | OpenSource APK              |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|-----------------------------|
| **Kubernetes Cluster Version:** <br/> EKS Pending <br/> GKE Pending <br/> AKS Pending <br/> OpenShift 4.13.3 <br/> Minikube 1.26.3 - 1.27.4 <br/> Rancher 1.27.2 <br/> Kind 1.26.3 | :material-check-all:       | :material-check-all:        |
| **Kubernetes Cluster Resources:** <br/> CPU 4 Cores    <br/>    RAM 6GB    <br/> Storage 15 GB                                                                                     | :material-check:           | :material-check:            |
| **Minikube**  1.30.1 - 1.31.1                                                                                                                                                      | :material-check:           | :material-check:            |
| **Rancher**  1.9.1                                                                                                                                                                 | :material-check:           | :material-check:            |
| **Kind**  1.25.3                                                                                                                                                                   | :material-check:           | :material-check:            |
| **Openshift**  2.23.0+ddcfe8                                                                                                                                                       | :material-check:           | :material-check:            |
| **Docker Engine**  23.0.2 or above                                                                                                                                                 | :material-check:           | :material-check:            |
| **Redis**  17.8.0                                                                                                                                                                  | :material-check:           | :material-check: (Packaged) |
| **Cert-manager**  1.10.1                                                                                                                                                           | :material-check:           | :material-check: (Packaged) |
| **Postgresql**  11.9.6                                                                                                                                                             | :material-close: (No need) | :material-check: (Packaged) |
