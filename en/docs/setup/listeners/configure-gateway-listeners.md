# Configure Gateway Listeners(VHOSTs)

This section is a step-by-step guide to add or configure existing listeners the WSO2 API Platform For Kubernetes. All the existing gateway listeners are configured in the `<APK-HELM>/helm-charts/templates/data-plane/gateway-components/adapter/gateway.yaml` file which is located in the APK Helm Charts. By default the following listeners are configured in the gateway.yaml file.

- API Listener (*.api.am.wso2.com)
- IDP Listener (*.idp.am.wso2.com
- Default Gateway Listener(*.gw.wso2.com)

!!! Note
    If you are using a custom domain name for your API, you need to add a new listener for that domain name.

## Before you begin...

Install the [prerequisites](../../setup/prerequisites) that are required to run WSO2 API Platform For Kubernetes.

## Step 1 - Start WSO2 API Platform For Kubernetes

Start the APK deployment [start-apk](../../includes/start-apk.md).

## Step 2 - Adding a new listener

1. Configure the `<APK-HELM>/helm-charts/templates/data-plane/gateway-components/adapter/gateway.yaml` file which is located in the APK Helm Charts with following content.

=== "Configuration"

    ```
    - name: <new_listener_name>
      hostname: <domain_name>
      port: <port_number>
      protocol: <protocol>
      tls:  
        mode: Terminate
        certificateRefs:
          - kind: Secret
            group: ""
            name: <secret_name>
            namespace: <namespace>
    ```
=== "Sample Configuration"

    ```
    - name: mylistener
      hostname: *.mydomain.com
      port: 9095
      protocol: HTTPS
      tls:  
        mode: Terminate
        certificateRefs:
          - kind: Secret
            group: ""
            name: mycert-secret
            namespace: apk
    ```

You can configure the public certificate of that particular domain as a k8s secret and refer it in the gateway.yaml file under added listener. For more information on how to create a k8s secret, see [Creating a k8s secret](https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret).

## Step 3 - Apply the changes

Execute the command below to apply the new changes to the gateway.

   ```
   kubectl apply -f <path_to_gateway.yaml>/gateway.yaml
   ```

Now, you will be able to deploy APIs with a VHOST matching the new listener.

