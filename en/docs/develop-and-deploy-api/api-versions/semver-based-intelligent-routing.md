# Semantic Versioning Based Intelligent Routing

When working with APIs, it is important to have an effective API versioning mechanism. APK follows a versioning mechanism based on Semantic Versioning (SemVer) but only includes the major version and minor version with the prefix v. For example, v1.2.

You can follow the approach given below when you version APIs:
- Increment the major version when you make incompatible API changes.
- Increment the minor version when you add functionality in a backward-compatible manner.

!!! info "What is Semantic Versioning?"
    Semantic Versioning (SemVer) is a specification that defines how to assign and increment version numbers for software products, including APIs. For more information, see [Semantic Versioning specification](https://semver.org/#semantic-versioning-specification-semver).

In compliance with SemVer, changes that don't introduce breaking or additive modifications to the API are categorized as patch updates. However, from the perspective of API consumers, these changes should ideally not disrupt their API clients. Typically, API consumers are most concerned with major API version alterations, but there might be instances where minor version changes are communicated to them. Hence, API versions are only required to specify major and minor versions.

When the Intelligent Routing feature is enabled in APK:

- Under this setting, API versions are represented solely by the major and minor version numbers, prefixed with 'v', for example: v1.0, v1.1. 
- Access to the API is granted either through the major version alone or via the major.minor version format. Requests are directed to the most recent version within the specific group being accessed.

Consider a scenario where the following APIs are deployed with varying versions:

| API Name              | API Version | API Context    |
| --------------------- | ----------- |----------------|
| Employee Service v1   | v1.0        | /emp-info/v1.0 | 
| Employee Service v1.1 | v1.1        | /emp-info/v1.1 | 

The API invocations yield the subsequent responses:

- https://default.gw.wso2.com:9095/emp-info/v1.0/employee   → Routed to Employee Service 1
- https://default.gw.wso2.com:9095/emp-info/v1.1/employee   → Routed to Employee Service 2
- https://default.gw.wso2.com:9095/emp-info/v1/employee     → Routed to the latest version of the  Employee Service, v1.1


## Try Intelligent Routing in APK

1. Configure APK

    Open the values.yaml file in your Helm installation and set `enableIntelligentRouting` to `true` under wso2.apk.dp.gatewayRuntime.deployment.router.configs. Your values.yaml file should follow this structure.

    ```
    wso2:
    ...
    apk:
        ...
        dp:
        ...
        gatewayRuntime:
           deployment:
              router:
                configs: 
                  enableIntelligentRouting: true
    ```

2. Deploy a sample Backend

    Use the following command to deploy the sample employee service backend. This backend supports both version v1 and v1.1 of the employee service. The employee service v1.1 includes an additional field called "gender" in the response message. The respective URLs for the backend services are:

    - http://employee-service-semver:80/employee
    - http://employee-service-semver:8080/employee


    ```
    kubectl apply -f https://raw.githubusercontent.com/pubudu538/EmployeeServiceBackend/main/k8s/backend.yaml
    ```
    
3. Create Employee Service v1 API

    - Execute the following command to create the API in APK using the K8s CRs.

        ```
        kubectl apply -f https://raw.githubusercontent.com/pubudu538/EmployeeServiceBackend/main/services/v1/api.yaml
        ```

    - Generate an access token for API invocation.

        ```
        curl -k --location 'https://idp.am.wso2.com:9095/oauth2/token' \
                --header 'Host: idp.am.wso2.com' \
                --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
                --header 'Content-Type: application/x-www-form-urlencoded' \
                --data-urlencode 'grant_type=client_credentials' \
                --data-urlencode 'scope=apk:api_create'
        ```

    - You can invoke the API as shown below.

        ```
        curl -k --location 'https://default.gw.wso2.com:9095/emp-info/v1.0/employee' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer <REPLACE-ME(TOKEN)>'
        ```

    - Apart from the invocation URL mentioned above, you can also use the API context `/emp-info/v1` instead of `/emp-info/v1.0` to invoke the same API.

        ```
        curl -k --location 'https://default.gw.wso2.com:9095/emp-info/v1/employee' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer <REPLACE-ME(TOKEN)>'
        ```

4. Create Employee Service v1.1 API

    - Execute the following command to create the API in APK using the K8s CRs.

        ```
        kubectl apply -f https://raw.githubusercontent.com/pubudu538/EmployeeServiceBackend/main/services/v1.1/api.yaml
        ```

    - You can invoke the API as shown below. 

        ```
        curl -k --location 'https://default.gw.wso2.com:9095/emp-info/v1.1/employee' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer <REPLACE-ME(TOKEN)>'
        ```

    - Apart from the invocation URL mentioned above, you can also use the API context `/emp-info/v1` instead of `/emp-info/v1.1` to invoke the same API. In this scenario, /emp-info/v1 returns the latest changes from the Employee Service v1.1.

        ```
        curl -k --location 'https://default.gw.wso2.com:9095/emp-info/v1/employee' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer <REPLACE-ME(TOKEN)>'
        ```