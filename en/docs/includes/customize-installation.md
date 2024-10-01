To commence the installation while making use of the customization capabilities inherent in the `values.yaml` file, follow the subsequent command format. Instructions in [Customize Configurations](../setup/Customize-Configurations.md) will guide you through the process of acquiring the `values.yaml` file.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.2.0-alpha -f values.yaml
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
        ```

    If you want to update the values of an existing APK installation, please execute the following `helm upgrade` command. Use the `--no-hooks` flag to disable the hooks available in the APK helm chart.

    === "Command"
        ```
        helm upgrade apk wso2apk/apk-helm --version 1.2.0-alpha -f values.yaml --no-hooks
        ```
    === "Format"
        ```
        helm upgrade <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file> --no-hooks
        ```