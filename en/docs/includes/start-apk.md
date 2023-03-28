
Follow the instructions below to deploy APK Data Service (DS) servers and the Cloud Native Postgres(CloudNativePG) in the Kubernetes cluster.

1. Download the latest [WSO2 APK release](https://github.com/wso2/apk/releases) and unzip it.

      Let's refer to the unzipped folder as `<APK-HOME>`.

2. Navigate to the `<APK-HOME>/<helm-charts>/` directory.

      `cd <APK-HOME>/<helm-charts>/`

3. Download the dependent charts.
    
     ```
     helm dependency build
     ```

3. Install the APK components and start WSO2 APK.
   
	=== "Format"

		```console
		helm install <helm-chart> . -n <namespace>
		```
	=== "Command"

		```console
		helm install apk-test . -n apk
		```

	!!! info "Optional"

		If required, use one of the following parameters when starting WSO2 APK.

		- To deploy Control Plane components only use `--set wso2.apk.dp.enabled=false`
		- To deploy Data Plane components only use `--set wso2.apk.cp.enabled=false`

1.  Verify the deployment.

      ```
      kubectl get pods -n apk
      ```

    !!! info "(Optional) To access the deployment through your local machine"

        1. Identify the `router-service` external IP address.
           ```
           kubectl get svc -n apk | grep router-service
           ```
        2. Invoke the API through the APK Gateway.
           ```
           kubectl port-forward svc/apk-test-wso2-apk-router-service -n apk 9095:9095
           ```