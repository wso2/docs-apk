For this guide, we will be using a backend deployed in a Kubernetes service. Prior to invoking the API, you will need to have this backend up and running.

You can create this sample backend with the following command.

``` bash
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/qsg-sample-backend.yaml
```

Wait for this pod to spin up. You can check its status using the following command.

``` bash
kubectl get pods
```