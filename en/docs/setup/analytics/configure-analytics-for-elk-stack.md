# Configure Analytics for ELK Stack

## Step 1 - Setup Enforcer

1. Open `values.yaml` file.

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
          logFileName: "logs/enforcer_analytics.log"
          logLevel: "INFO"
        ```

3. Redeploy the enforcer with the changes in `values.yaml`.

## Step 2 - Setup Filebeat or Fluent Bit

=== "Filebeat"

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
                    - /var/log/apk/enforcer_analytics.log

                # output.console:
                #   pretty: true
                
                output.elasticsearch:
                  hosts: ["https://hostname:9200"]
                  username: "elastic"
                  password: "password"
                  ssl:
                    enabled: true
                    ca_trusted_fingerprint: "SHA256 Fingerprint"
            ```

            !!! Note
                You can change the output to Elasticsearch Service, Logstash, or other output options according to your preference. For more information, see [Filebeat Documentation - Configuring Output](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-output.html).
  
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

    3. Run `kubectl create -f filebeat-kubernetes.yaml` to deploy Filebeat.

    4. Monitor Elasticsearch index to verify that the analytics logs are being published correctly.

=== "Fluent Bit"

    1. Follow [Fluent Bit Documentation - Kubernetes](https://docs.fluentbit.io/manual/installation/kubernetes) to setup Fluent Bit in Kubernetes.

    2. Open Fluent Bit `values.yaml` and modify with the following changes.

        !!! Tip
            Follow the steps below to get Fluent Bit `values.yaml`.

            1. Run `helm repo add fluent https://fluent.github.io/helm-charts` to add the Fluent Bit Helm repository.

            2. Run `helm fetch fluent/fluent-bit --untar` to download and untar the Fluent Bit Helm chart.

            3. Go to the `fluent-bit` directory and open the `values.yaml` file.

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
            # [OUTPUT]
            #     Name stdout
            #     Match *
            [OUTPUT]
                Name es
                Match *
                Host hostname
                Port 9200
                HTTP_User elastic
                HTTP_Passwd password
                tls On
                tls.verify Off
                Suppress_Type_Name On
        ```

        !!! Note
            You can configure parsers, filters, buffers, and outputs according to your preference. For more information, see [Fluent Bit Documentation - Data Pipeline](https://docs.fluentbit.io/manual/concepts/data-pipeline).

    2. Run `helm install fluent-bit fluent/fluent-bit --values values.yaml` to deploy Fluent Bit.

    3. Monitor Elasticsearch index to verify that the analytics logs are being published correctly.

## Step 3 - View Analytics Data

1. Configure Elasticsearch and Kibana to process the analytics logs. Note that you can configure the logs to be published to Logstash instead of Elasticsearch using both Filebeat and Fluent Bit.

2. Generate Kibana Dashboards according to your preference.

3. After setting up the ELK stack, invoke a few requests (success and failure) for a deployed API.

4. Go to Kibana and view the dashboards.
