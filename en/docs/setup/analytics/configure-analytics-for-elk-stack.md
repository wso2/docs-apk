# Configure Analytics for ELK Stack

## Step 1 - Setup Enforcer

1. Open `values.yaml` file.

2. Set following config under `wso2.apk.dp.gatewayRuntime` section to enable analytics.

    ```yaml
    analytics:
      enabled: true
      type: "ELK"
    ```

    !!! Note
        Optionally, `logLevel`. By default, this config is set to `INFO`.

        ```yaml
        analytics:
          enabled: true
          type: "ELK"
          logLevel: "INFO"
        ```

3. Redeploy the enforcer with the changes in `values.yaml`.

## Step 2 - Setup Elasticsearch and Kibana

You can setup Elasticsearch and kibana anywhere you like.

!!! Tip
      Do you need a quick guide to setup Elasticsearch and Kibana to see how APK logs look like? Follow the below steps.

      1. Add elastic to your helm repo using: `helm repo add elastic https://helm.elastic.co`
      2. Install Elasticsearch helm chart using: `helm install my-elastic elastic/elasticsearch --version 8.5.1 -n <namespace>` 
      3. Install Kibana helm chart using: `helm install my-kibana elastic/kibana --version 8.5.1 -n <namespace>` 
      4. Port forward the kibana UI port using: `kubectl port-forward svc/kibana-kibana -n <namespace> 5601:5601`
      5. Go to https://localhost:5601 and you should be able to see kibana UI




## Step 3 - Setup Logging agent 

   You can use any logging agent that support kubernetes log forwaring

=== "Filebeat"
    
    We can use Filebeat helm charts from [Elastic Inc](https://artifacthub.io/packages/helm/elastic/filebeat)

     1. Run `helm repo add elastic https://helm.elastic.co` to add elastic helm repository
     2. Run `helm fetch elastic/filebeat --untar`  to download and untar the Filebeat Helm chart.
     3. Go to the `filebeat` directory and open the `values.yaml` file.
     4. Modify the `filebeatConfig.filebeat.yml.output.elasticsearch` section of values.yaml file according to your Elasticsearch deployment
     5. Run `helm install filebeat . -n <namespace>` to install filebeat




=== "Fluent-bit"

    We can use Fluent-bit helm chart from [here](https://fluent.github.io/helm-charts)

      1. Run `helm repo add fluent https://fluent.github.io/helm-charts` to add the Fluent Bit Helm repository.
      2. Run `helm fetch fluent/fluent-bit --untar` to download and untar the Fluent Bit Helm chart.
      3. Go to the `fluent-bit` directory and open the `values.yaml` file.
      4. Modify the config section of values.yaml file using

         ```yaml
         inputs: |
            [INPUT]
               Name tail
               Path /var/log/containers/*.log
               multiline.parser docker, cri
               Tag kube.*
               Mem_Buf_Limit 5MB
               Skip_Long_Lines On
               Parser  docker
         filters: |
            [FILTER]
               Name                kubernetes
               Match               kube.*
               Kube_URL            https://kubernetes.default.svc:443
               Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
               Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token
               Kube_Tag_Prefix     kube.var.log.containers.
               Merge_Log           On
               Merge_Log_Key       log_processed
               K8S-Logging.Parser  On
               K8S-Logging.Exclude Off
               Annotations Off
         outputs: |
            [OUTPUT]
               Name es
               Match *
               Host elasticsearch-master
               Port 9200
               HTTP_User <usename>
               HTTP_Passwd <password>
               tls On
               tls.verify Off
               Suppress_Type_Name On
               Trace_Error       On
               Replace_Dots On
               Logstash_Format On
               Index my_index
         ```
      5. Run `helm install fluent-bit . -n <namespace>` to install fluent-bit.

## Step 4 - Invoke requests and view analytics logs in Kibana UI

1. Deploy some sample APIs to APK and invoke endpoints.
2. Go to Kibana UI and search for logs
3. Under Logs > Stream section you will be able to see a lot of logs from all the pods. To view the analytics logs search for 'apimatrics'

[![Kibana logs](../../assets/img/analytics/kibana-logs-view.png)](../../assets/img/analytics/kibana-logs-view.png)

