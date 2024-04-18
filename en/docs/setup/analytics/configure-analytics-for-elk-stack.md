# Configure Analytics for ELK Stack

## Step 1 - Setup APK

1. Start by following the instructions outlined in [Customize Configurations](../Customize-Configurations.md). These instructions will guide you through the process of acquiring the `values.yaml` file.
2. Open the `values.yaml` file, and add the above configuration to the gatewayRuntime section under dp.

```yaml
gatewayRuntime:
  analytics:
    enabled: true
    publishers:
    - enabled: true
      type: "elk"
```

!!! Note
    Optionally, `logLevel` can be configured for ELK. By default, this config is set to `INFO`.

    ```yaml
    gatewayRuntime:
      analytics:
        enabled: true
        publishers:
        - enabled: true
          type: "elk"
          logLevel: "INFO"
    ```

Your values.yaml file will have a structure as follows.

```yaml
wso2:
  ...
  apk:
    ...
    dp:
      ...
      gatewayRuntime:
        analytics:
          enabled: true
          publishers:
          - enabled: true
            type: "elk"
```

Then redeploy the helm chart with the changes in `values.yaml`.

### Optional - Adding Multiple Publishers

You can also set multiple publishers for analytics as follows. Replace ```choreo-secret-name``` and ```moesif-secret-name``` with the appropriate values.

```yaml
 gatewayRuntime:
   analytics:
     enabled: true
     publishers:
       - enabled: true
         type: "default"
         secretName: <choreo-secret-name>
       - enabled: true
         type: "elk"
       - enabled: true
         type: "moesif"
         secretName: <moesif-secret-name>
```


## Step 2 - Setup Elasticsearch and Kibana

To configure Elasticsearch and Kibana on your Kubernetes cluster, you can refer to the [official guide](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-stack-helm-chart.html) provided by Elastic. The guide includes instructions on deploying the necessary Helm charts for Elasticsearch and Kibana.


## Step 3 - Setup Logging agent 

For forwarding Kubernetes logs to Elasticsearch, you have the option to use any logging agent that supports this functionality. Two commonly used options are Filebeat and FluentBit.

   - Filebeat: If you choose Filebeat, you can set it up in your Kubernetes environment by following the [official guide](https://www.elastic.co/guide/en/beats/filebeat/current/running-on-kubernetes.html) provided by Elastic. Filebeat is a lightweight log shipper that is part of the Elastic Stack. It can be configured to collect logs from your Kubernetes pods and forward them to Elasticsearch.

   - FluentBit: Alternatively, you can opt for FluentBit as your logging agent. FluentBit is an open-source and efficient log processor and forwarder. It is designed to work well with Kubernetes environments and can be used to collect and send logs to Elasticsearch. You can follow the [official guide](https://docs.fluentbit.io/manual/installation/kubernetes) to install FluentBit.


## Step 4 - Invoke requests and view analytics logs in Kibana UI

1. Deploy some sample APIs to APK and invoke endpoints.
2. Go to Kibana UI and search for logs
3. Under Logs > Stream section you will be able to see a lot of logs from all the pods. To view the analytics logs search for 'apimMetrics'

[![Kibana logs](../../assets/img/analytics/kibana-logs-view.png)](../../assets/img/analytics/kibana-logs-view.png)

