# Configure Analytics for ELK Stack

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
          logFileName: "logs/elk_analytics.log"
          logLevel: "DEBUG"
        ```

## Step 2 - Setup Filebeat

1. Follow [Filebeat Documentation - Running on Kubernetes](https://www.elastic.co/guide/en/beats/filebeat/current/running-on-kubernetes.html) to setup Filebeat in Kubernetes.

2. Modify `filebeat-kubernetes.yaml` manifest file as follows to enable Filebeat to read the analytics logs.

    1. ConfigMap

        ```yaml
        ...
        data:
          filebeat.yml: |-
            filebeat.inputs:
            - type: log
              paths:
                - /var/log/apk/elk_analytics.log

            output.console:
              pretty: true
        ```

        !!! Note
            You can change the output to Elasticsearch, Logstash, or other output option according to your preference. For more information, see [Filebeat Documentation - Configuring Output](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-output.html).
  
    2. DaemonSet

        ```yaml
        ...
        containers:
          volumeMounts:
          - name: enforcer-analytics-logs-volume
            mountPath: /var/log/apk
        ...
        volumes:
        - name: enforcer-analytics-logs-volume
          persistentVolumeClaim:
            claimName: enforcer-analytics-logs-volume-pvc
        ```

3. Deploy Filebeat using the modified manifest file.

4. Monitor the logs of Filebeat pod to verify that the analytics logs are being read correctly.

## Step 3 - View Analytics Data

1. Configure Elasticsearch, Logstash, and Kibana to process the analytics logs.

2. Generate Kibana Dashboards according to your preference.

3. After setting up the ELK stack, invoke a few requests (success and failure) for a deployed API.

4. Go to Kibana and view the dashboards.
