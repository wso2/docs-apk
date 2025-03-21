You can generate K8s resources as a zip file from config-deployer service.

```
curl --location 'https://api.example.com:9095/api/configurator/1.3.0/apis/generate-k8s-resources' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/zip' \
--form 'apkConfiguration=@"/Users/user/SampleService.apk-conf"' \
--form 'definitionFile=@"/Users/user/SampleAPIDefinition.json"' \
-k --output ./api-crds.zip
```

Once you have generated your K8s artifacts, the next step is to apply them to the Kubernetes API server. 

```
kubectl apply -f <path_to_extracted_zip_file>
```