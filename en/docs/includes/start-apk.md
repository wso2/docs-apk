
Follow the instructions below to deploy APK Data Service (DS) servers and the Cloud Native Postgres(CloudNativePG) in the Kubernetes cluster.

1. ``` helm repo add <repository-name> https://github.com/wso2/apk/releases/download/0.0.1-m8 ```

2. ``` helm dependency update ```

3.  Install the APK components and start WSO2 API Platform For Kubernetes.

	=== "Format"
		```
		helm install <chart-name> <repository-name>/apk-helm -n <namespace>
		```
		
		
	=== "Command"
		```
		helm install apk_test wso2apk/apk-helm -n apk
		```

	!!! info "Optional"

			If required, use one of the following parameters when starting WSO2 API Platform For Kubernetes.

			- To deploy Control Plane components only use `--set wso2.apk.dp.enabled=false`
			- To deploy Data Plane components only use `--set wso2.apk.cp.enabled=false`

5.  Verify the deployment.

      ```console
      kubectl get pods -n apk
      ```

    !!! info "(Optional) To access the deployment through your local machine"

        1. Identify the `router-service` external IP address.
           ```console
           kubectl get svc -n apk | grep router-service
           ```
        2. Port forward router service to localhost.
           ```console
           kubectl port-forward svc/apk-test-wso2-apk-router-service -n apk 9095:9095
           ```