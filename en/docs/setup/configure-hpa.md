# Configure Horizontal Pod Autoscaling(HPA) for gateway

When the traffic to your pods increase, the deployment may need to scale horizontally. Kubernetes allows you to define the resource limits and policy in a way that the deployment can auto scale based on resource usage. You can check the <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/" target="_blank">Kubernetes documentation</a> for more information on HPA.

To configure HPA for gateway, follow these steps.

1. Obtain the `values.yaml` file for your deployment by following the instructions in the <a href="../../setup/Customize-Configurations" target="_blank">customize configurations section</a>.
2. Update the following configuration with your required values.
```
autoscaling:
  enabled: true # Enables autoscaling for Gateway
  minReplicas: 1 # Minimum number of replicas for Gateway
  maxReplicas: 5 # Maximum number of replicas for Gateway
  targetMemory: 80 # Target memory utilization percentage for Gateway
  targetCPU: 80 # Target CPU utilization percentage for Gateway
```

1. Place the modified configuration in your `values.yaml` file under `autoscaling` in the `dp` section, as shown below.

```yaml
  wso2:
    ...
    apk:
      ...
      dp:
        ...
        autoscaling:
          enabled: true
          minReplicas: 1
          maxReplicas: 5
          targetMemory: 80
          targetCPU: 80
``` 

This will enable the HPA for gateway and set the minimum and maximum number of replicas to 1 and 5 respectively. The target memory and CPU usage are set to 80% each.

Sample Kubernetes Gateway deployment with HPA enabled for gateway-runtime-deployment will be as follows.

[![HPA](../assets/img/setup/hpa-deployment.png)](../assets/img/setup/hpa-deployment.png)