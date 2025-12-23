# Configure Gateway Listeners(VHOSTs)

This section is a step-by-step guide to add or configure existing listeners for the WSO2 Kubernetes Gateway. In 2.x, listener hostnames are configured via Helm values rather than editing templates directly. By default, the following listeners are configured via values:

- API Listener (*.api.am.wso2.com)
- IDP Listener (*.idp.am.wso2.com)
- Default Gateway Listener(*.gw.wso2.com)

!!! Note
    If you are using a custom domain name for your API, you need to add a new listener for that domain name.

## Before you begin...

Install the <a href="../../../setup/prerequisites" target="_blank">prerequisites</a> that are required to run WSO2 APK.

## Step 1 - Start WSO2 API Platform For Kubernetes

<a href="../../../get-started/quick-start-guide" target="_blank">Start the APK deployment</a>.

## Step 2 - Adding a new listener

1. Update your Helm `values.yaml` to add a new listener hostname.

=== "Configuration"

    ```
    wso2:
      kgw:
        listener:
          hostname: <domain_name>
    ```
=== "Sample Configuration"

    ```
    wso2:
      kgw:
        listener:
          hostname: "*.mydomain.com"
    ```

You can configure the public certificate of that particular domain as a Kubernetes Secret and reference it via cert-manager Issuer/ClusterIssuer configured in values. For more information on how to create a k8s secret, see [Creating a k8s secret](https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret) and the cert-manager guide.

## Step 3 - Apply the changes

Apply the changes by upgrading your Helm release with the updated values file.

```
helm upgrade apk wso2apk/kubernetes-gateway-helm --version 2.0.0-alpha -f values.yaml --no-hooks
```

Now, you will be able to deploy APIs with a VHOST matching the new listener.

