# Configure Analytics for ELK Stack

## Step 1 - Configure Enforcer

1. Open `<APK_HOME>/helm-charts/values.yaml` file.

2. Set following config under `wso2.apk.dp.gatewayRuntime` section to enable analytics.

    ```yaml
    analytics:
      enabled: true
      type: "ELK"
    ```

    !!! Note
        Optionally, you can set the following configs to customize the analytics data.

        ```yaml
        analytics:
          ...
          # File name of the log file. Default value is "enforcer_analytics.log".
          logFileName: "logs/analytics.log"
          # Log level of the analytics data. Default value is "INFO".
          logLevel: "DEBUG" 
        ```

## Step 2 - Set up the ELK Stack

1. Configure and setup the following elements in ELK Stack.
    - Elasticsearch
    - Kibana
    - Logstash
    - Filebeat

2. Configure Filebeat to read the log file as the input source.

    1. Open the `filebeat.yml` file.

    2. Configure the log file as the input source.

        ```yaml
        filebeat.inputs:
        - type: log
          enabled: true
          paths:
          - /logs/enforcer_analytics.log
          include_lines: ['(apimMetrics):']
        ```

3. Set up Kibana dashboards.

After setting up the enforcer and the ELK Stack, invoke a few requests (success and failure) for a deployed API. You will be able to view the analytics data in the Kibana dashboard.