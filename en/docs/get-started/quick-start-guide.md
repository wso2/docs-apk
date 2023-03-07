# Quick Start Guide

## Before you beign

1. If you want to run APK on your local machine, you need to install [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation), [minikube](https://minikube.sigs.k8s.io/), [kind](https://kind.sigs.k8s.io/docs/) or a similar software.

    !!! note
        It is recommended to use [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation) if you are using macOS Apple Silicon (M1).

2. Install [Helm](https://helm.sh/docs/intro/install/).

3. Install [kubctl](https://kubernetes.io/docs/tasks/tools/#kubectl).

4. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/).

    !!! note
        When using Rancher Desktop for local deployment clusters, [disable Traefik, which is the default Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#rancher-desktop).

## Step 1 - Install the APK components

Deploy APK DS servers and CloudNativePG in the Kubernetes clutser.

1. Download the latest [WSO2 APK release](https://github.com/wso2/apk/releases) and unzip it.

     Let's refer to the unziped folder as `<HELM-HOME>`.

2. Navigate to the `<HELM-HOME>` directory.

      `cd <HELM-HOME>`

3. Define the path of the Bitnami Library for Kubernetes, which is a dependency in Helm.

     ```
     helm repo add bitnami https://charts.bitnami.com/bitnami
     ```

4. Define the path of the Jetstack Library for Kubernetes, which is a dependency in Helm.

     ```
     helm repo add jetstack https://charts.jetstack.io
     ```

5.  Download the dependent charts.
    
     ```
     helm dependency build
     ```

6.  Install the APK components.

     ```
     helm install apk-test . -n apk
     ```

7.  Verify the deployment

     ```
     kubectl get pods -n apk
     ```

## Step 2 - Access Deployment

To Access Deployment through your local machine.

```
<ADD COMMAND>
```
