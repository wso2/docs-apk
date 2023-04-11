# Prerequisites

1. [Install Helm](https://helm.sh/docs/intro/install/).
2. [Install the Kubernetes Client (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
3. [Setup a Kubernetes Cluster](https://kubernetes.io/docs/setup).
     
     If you want to run APK on your local machine, you need to install [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation), [minikube](https://minikube.sigs.k8s.io/), [kind](https://kind.sigs.k8s.io/docs/) or a similar software.

4. Setup a deployment namespace.
   
     `kubectl create namespace <namespace>`

5. Add Helm chart dependencies.
     - Add Bitnami
    
         `helm repo add bitnami https://charts.bitnami.com/bitnami`

     - Add Jetstack
    
         `helm repo add jetstack https://charts.jetstack.io`

