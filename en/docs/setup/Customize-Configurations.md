To customize configurations in the Helm deployment, you need to create and modify the `values.yaml` file. Here's how you can do it:

1. **Download `values.yaml` File:**

    To obtain the `values.yaml` file, you can use the `helm show values` command. Replace `<repository-name>` with the actual repository name and `<version-of-APK>` with the desired version of the APK. Run the following command:

    === "Command"
        ```
        helm show values wso2apk/apk-helm --version 1.0.0-rc2  > values.yaml
        ```

    === "Format"
        ```
        helm show values <repository-name>/apk-helm --version <verison-of-APK> > values.yaml
        ```

2. **Modify the Configuration:**

    Once you have the `values.yaml` file, you can modify the configuration parameters according to your requirements.

3. **Deploy the APK with Customized Configuration:**

    To deploy the APK using the customized configuration, use the `helm install` command. Replace `<chart-name>`, `<repository-name>`, `<version-of-APK>`, `<path-to-values.yaml-file>`, and `<namespace>` with appropriate values. Run the following command:

	=== "Command"
		```
		helm install apk-test wso2apk/apk-helm --version 1.0.0-rc2 -f values.yaml -n apk
		```

    === "Format"
		```
		helm install <chart-name> <repository-name>/apk-helm --version <verison-of-APK> -f <path-to-values.yaml-file> -n <namespace>
		```
	