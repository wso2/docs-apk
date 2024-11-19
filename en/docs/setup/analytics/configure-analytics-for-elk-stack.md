# Configure Analytics for ELK Stack

## Step 1 - Setup APK

1. Start by following the instructions outlined in <a href="../../Customize-Configurations" target="_blank">Customize Configurations</a>. These instructions will guide you through the process of acquiring the `values.yaml` file.
2. Open the `values.yaml` file and set the following configuration under the `wso2.apk.dp.gatewayRuntime` section.

```yaml
analytics:
  enabled: true
  publishers:
  - enabled: true
    type: "elk"
```

!!! Note
    Optionally, `logLevel` can be configured for ELK. By default, this config is set to `INFO`.

    ```yaml
      analytics:
        enabled: true
        publishers:
        - enabled: true
          type: "elk"
          logLevel: "INFO"
    ```

Now the structure of your values.yaml file will be as follows:

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

3. Redeploy the helm chart with the changes in `values.yaml`.

### Optional - Adding Multiple Publishers

You can also set multiple publishers for analytics as follows.
```yaml
analytics:
  enabled: true
  publishers:
    - enabled: true
      configProperties:
        auth.api.token: <on-prem-key>
        auth.api.url: "https://analytics-event-auth.choreo.dev/auth/v1"
      type: "default"
    - enabled: true
      type: "elk"
    - enabled: true
      type: "moesif"
      configProperties:
        moesifToken: <collector-application-id>
```


## Step 2 - Setup Elasticsearch and Kibana

To configure Elasticsearch and Kibana on your Kubernetes cluster, you can refer to the <a href="https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-stack-helm-chart.html" target="_blank">official guide</a> provided by Elastic. The guide includes instructions on deploying the necessary Helm charts for Elasticsearch and Kibana.

You can also install Elasticsearch and Kibana using the direct helm charts for each. The following is a sample setup that can be used to set up both. However, note that these are only for testing, and must be configured as necessary for a production environment.

### Installing Elasticsearch

1. Apply the following commands to install Elasticsearch.

```bash
helm repo add elastic https://helm.elastic.co
helm repo update
helm install elasticsearch elastic/elasticsearch
```
2. Wait for the pods to spin up. You can view them using the following command.
```bash
kubectl get pods
```
3. Once the pods all have spun up, you can get the elasticsearch credentials using the following command.
```bash
kubectl get secrets --namespace=default elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d
```
4. Port-forward the Elasticsearch service using the following command.
```bash
kubectl port-forward svc/elasticsearch-master 9200
```

### Installing Kibana

1. Apply the following commands to install Kibana.

```bash
helm install kibana elastic/kibana 
```
2. Wait for the pods to spin up. You can view them using the following command.
```bash
kubectl get pods
```
3. Port-forward the Kibana service using the following command.
```bash
kubectl port-forward svc/kibana-kibana 5601
```

## Step 3 - Setup Logging Agent 

For forwarding Kubernetes logs to Elasticsearch, you have the option to use any logging agent that supports this functionality. Two commonly used options are Filebeat and FluentBit.

   - Filebeat: If you choose Filebeat, you can set it up in your Kubernetes environment by following the <a href="https://www.elastic.co/guide/en/beats/filebeat/current/running-on-kubernetes.html" target="_blank">official guide</a> provided by Elastic. Filebeat is a lightweight log shipper that is part of the Elastic Stack. It can be configured to collect logs from your Kubernetes pods and forward them to Elasticsearch.

   - FluentBit: Alternatively, you can opt for FluentBit as your logging agent. FluentBit is an open-source and efficient log processor and forwarder. It is designed to work well with Kubernetes environments and can be used to collect and send logs to Elasticsearch. You can follow the <a href="https://docs.fluentbit.io/manual/installation/kubernetes" target="_blank">official guide</a> to install FluentBit.


## Step 4 - Invoke requests and view analytics logs in Kibana UI

1. Deploy some sample APIs to APK and invoke endpoints.
2. Go to Kibana UI and search for logs. The UI can be accessed at `http://localhost:5601`. The password to log in can be obtained using the following command.
```bash
kubectl get secrets --namespace=default elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d
```
The default username is `elastic`.

3. Under Logs > Stream section you will be able to see a lot of logs from all the pods. To view the analytics logs search for 'apimMetrics'

[![Kibana logs](../../assets/img/analytics/kibana-logs-view.png)](../../assets/img/analytics/kibana-logs-view.png)

