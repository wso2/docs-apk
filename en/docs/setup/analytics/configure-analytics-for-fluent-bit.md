# Configure Analytics for Fluent Bit

## Step 1 - Setup Enforcer

1. Open `<APK_HOME>/helm-charts/values.yaml` file.

2. Set following config under `wso2.apk.dp.gatewayRuntime` section to enable analytics.

    ```yaml
    analytics:
      enabled: true
      type: "File"
    ```

    !!! Note
        Optionally, you can set the `logFileName` and `logLevel`. By default, these configs are set to `logs/enforcer_analytics.log` and `INFO` respectively.

        ```yaml
        analytics:
          enabled: true
          type: "File"
          logFileName: "logs/fluentbit_input.log"
          logLevel: "DEBUG"
        ```

## Step 2 - Setup Fluent Bit

1. Run `helm repo add fluent https://fluent.github.io/helm-charts` to add the Fluent Bit Helm repository.

2. Run `helm fetch fluent/fluent-bit --untar` to download and untar the Fluent Bit Helm chart.

3. Go to the `fluent-bit` directory and open the `values.yaml` file.

4. Modify the `values.yaml` with following changes.

    ```yaml
    ...
    extraVolumes:
        - name: enforcer-analytics-logs-volume
          persistentVolumeClaim:
            claimName: enforcer-analytics-logs-volume-pvc

    extraVolumeMounts:
        - name: enforcer-analytics-logs-volume
          mountPath: /var/log/apk
    ...
    config:
        inputs: |
        [INPUT]
            Name tail
            Path /var/log/apk/enforcer_analytics.log
        outputs: |
        [OUTPUT]
            Name stdout
            Match *
    ```

5. Run `helm install fluent-bit fluent/fluent-bit --values values.yaml` to deploy Fluent Bit.

6. Monitor the logs of Fluent Bit pod to verify that the analytics logs are being read correctly.

You can configure parsers, filters, buffers, and outputs according to your preference. For more information, see [Fluent Bit Documentation](https://docs.fluentbit.io/manual/).
