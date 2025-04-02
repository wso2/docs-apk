# Configuring Webhooks

The WSO2 Kubernetes Gateway installs three types of webhooks by default. 

- **Validation Webhooks**: Ensure CRDs meet specific rules before being accepted.
- **Mutation Webhooks**: Modify or add default values to CRDs before they are stored.
- **Conversion Webhooks**: Convert CRD objects between different API versions for backward compatibility.

## Enabling/Disabling webhooks

There are two sections in which webhooks are configured in the values.yaml file.

1. **wso2.apk.webhooks section**

This section handles the custom validation, mutation and conversion webhooks developed for WSO2 Kubernetes Gateway specific CRDs. These can be individually enabled/disabled from the below configuration in the values.yaml file.

```
wso2:
    .
  apk:
    .
    webhooks:
      validatingwebhookconfigurations: true
      mutatingwebhookconfigurations: true
      conversionwebhookconfigurations: true
```
2. **gatewaySystem section**

This section enables the installation of gateway system components. This can be enabled/disabled using the below configuration in the values.yaml file.

```
gatewaySystem:
    enabled: true
```

After doing changes to the values.yaml file, you can redeploy the WSO2 Kubernetes Gateway installation with

=== "Command"
    ```
    helm upgrade apk wso2apk/apk-helm --version 1.3.0 -f values.yaml --no-hooks
    ```
=== "Format"
    ```
    helm upgrade <chart-name> <repository-name>/apk-helm --version <version-of-WSO2-Kubernetes-Gateway> -f <path-to-values.yaml-file> --no-hooks
    ```