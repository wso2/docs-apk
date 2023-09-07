# Frequently Asked Questions (FAQs)

## Q1: Why am I encountering 'Unknown field' errors during the installation process?

**A:** If you are seeing errors similar to the ones below:

```plaintext
W0907 12:33:54.079420 1181879 warnings.go:70] unknown field "spec.someName"
...
Error: INSTALLATION FAILED: 7 errors occurred:
   * API.dp.wso2.com "apk-wso2-apk-oauth-api" is invalid: [spec.apiDisplayName: Required value, spec.context: Required value]
   ...
```

It is likely due to a limitation in Helm when updating Custom Resource Definitions (CRDs). Helm does not automatically redeploy existing CRDs, which can lead to conflicts. Downloading the chart and applying the CRDs manually will resolve the issue. Here are the steps to follow

1.  Download chart to local

    === "Command"

        ```
        helm fetch <chart_name> --version <version> --untar
        ```

    === "Sample command"

        ```
        helm fetch wso2apk/apk-helm --version 1.0.0-rc --untar
        ```

2.  Go to the apk-helm/crd folder and apply the CRDs manually

    === "Command"

        ```
          cd apk-helm/crd
          kubectl apply -f .
        ```

3. Now uninstall the previous faulty deployment and reinstall the APK using helm.



---

These FAQs should guide you through resolving the installation errors. If you still encounter difficulties, please feel free to contact our support team for further assistance.