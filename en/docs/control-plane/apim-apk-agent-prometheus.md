## Configuring Prometheus for APIM-APK Agent

This document contains the steps to configure Prometheus for the APIM APK Agent. 

To enable metrics, simply make the metrics.enabled field true under the helm-charts/values.yaml file as shown.

```yaml
metrics:
  enabled: true
```

### Configuring Prometheus Server

1. Incorporate a configuration similar to the following in your prometheus.yml file. Based on your method of deploying Prometheus, the following can be added as a ConfigMap.
   
```yaml
prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'apim-apk-agent'
        kubernetes_sd_configs:
          - role: pod
            namespaces: # if you wish to filter your components by namespace as well
              names:
                - 'apk'
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_name]
            regex: '.*apim-apk-agent.*'
            action: keep
          - source_labels: [__meta_kubernetes_pod_container_port_number]
            regex: '18006' # Replace with the appropriate port number
            action: keep
          - target_label: __metrics_path__
            replacement: /metrics   # the metrics path.
          - source_labels: [__meta_kubernetes_pod_container_id, __meta_kubernetes_pod_container_port_number]
            replacement: '$1/$2'
            target_label: instance
```

!!! Note
    Configure the prometheus service with the required level of permissions on Kubernetes.

### Using the APIM APK Grafana Dashboard

* The Grafana dashboard for the APIM APK Agent can be downloaded from [here.](../assets/files/prometheus/APIMAPKAgentGrafana.json)
* Import the dashboards to Grafana.
* Change the Prometheus data source, job name and other dashboard variables as required.
* The following is a preview of the APIM APK Agent Grafana dashboard.

[![APIM APK Agent Grafana Dashboard](../assets/img/prometheus/grafana-dashboards/APIM%20APK%20Agent.png)](../assets/img/prometheus/grafana-dashboards/APIM%20APK%20Agent.png)

### Exposed Metrics

| Prometheus Metric               | Description                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| go_info                         | Metadata about the Go runtime version and environment.                                                               |
| process_start_time_seconds      | Timestamp when the process started, in seconds since the epoch.                                                      |
| os_available_cpu_total          | The number of CPUs available to the operating system.                                                                |
| os_free_physical_memory_bytes   | The amount of free physical memory in bytes.                                                                         |
| os_total_virtual_memory_bytes   | Amount of total virtual memory in bytes.                                                                             |
| os_used_virtual_memory_bytes    | Amount of used virtual memory in bytes.                                                                              |
| os_system_load_average          | Represents the average number of processes in the system's execution queue over the last minute/5 minutes/15 minutes |
| os_system_cpu_load_percentage   | The percentage of CPU usage by the entire system.                                                                    |
| go_memstats_sys_bytes           | Total memory obtained from the OS by the Go runtime.                                                                 |
| go_memstats_mspan_inuse_bytes   | Memory used by mspan structures.                                                                                     |
| go_memstats_mspan_sys_bytes     | Memory obtained from the OS for mspan structures.                                                                    |
| go_memstats_mcache_inuse_bytes  | Memory used by mcache structures.                                                                                    |
| go_memstats_mcache_sys_bytes    | Memory obtained from the OS for mcache structures.                                                                   |
| go_memstats_buck_hash_sys_bytes | Memory used by profiling bucket hash table.                                                                          |
| go_memstats_gc_sys_bytes        | Memory used for garbage collection system metadata.                                                                  |
| go_memstats_other_sys_bytes     | Memory used for other system allocations.                                                                            |
| go_memstats_heap_alloc_bytes    | Bytes allocated and still in use.                                                                                    |
| go_memstats_heap_sys_bytes      | Total bytes obtained from the OS for the heap.                                                                       |
| go_memstats_heap_idle_bytes     | Bytes in the heap that are idle.                                                                                     |
| go_memstats_heap_inuse_bytes    | Bytes in the heap that are in use.                                                                                   |
| go_memstats_heap_released_bytes | Bytes released to the OS.                                                                                            |
| go_memstats_stack_inuse_bytes   | Bytes used by the stack.                                                                                             |
| go_memstats_stack_sys_bytes     | Total bytes obtained from the OS for stack.                                                                          |
| go_memstats_alloc_bytes_total   | Total bytes allocated, even if freed.                                                                                |
| go_memstats_mallocs_total       | Total number of allocations.                                                                                         |
| go_memstats_frees_total         | Total number of deallocations.                                                                                       |
| go_goroutines                   | Number of currently running goroutines.                                                                              |
| go_gc_duration_seconds          | Duration of the last garbage collection in seconds.                                                                  |
| process_open_fds                | Number of open file descriptors by the process.                                                                      |
