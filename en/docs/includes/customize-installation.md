To commence the installation while making use of the customization capabilities inherent in the `values.yaml` file, follow the subsequent command format. Instructions in <a href="../../setup/Customize-Configurations" target="_blank">Customize Configurations</a> will guide you through the process of acquiring the `values.yaml` file.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.3.0-rc -f values.yaml
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
        ```

    If you want to update the values of an existing Kubernetes Gateway installation, please execute the following `helm upgrade` command. Use the `--no-hooks` flag to disable the hooks available in the Kubernetes Gateway helm chart.

    === "Command"
        ```
        helm upgrade apk wso2apk/apk-helm --version 1.3.0-rc -f values.yaml --no-hooks
        ```
    === "Format"
        ```
        helm upgrade <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file> --no-hooks
        ```