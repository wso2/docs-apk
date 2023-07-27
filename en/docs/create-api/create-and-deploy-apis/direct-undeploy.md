You can undeploy the API by using the command below.

```
curl -L -X POST 'https://api.am.wso2.com:9095/api/deployer/1.0.0/apis/undeploy?apiId=<API_ID>' \
--header 'Authorization: Bearer <Access Token From IDP>'
```

Once we invoke the above API, API will be deleted and undeployed from the APK.
