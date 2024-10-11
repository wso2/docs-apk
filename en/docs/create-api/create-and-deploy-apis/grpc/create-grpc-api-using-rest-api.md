# gRPC APIs

gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It was initially developed by Google and is now a part of the Cloud Native Computing Foundation (CNCF) as an incubating project.

You can use proto files to design a gRPC API in WSO2 APK, similar to developing REST APIs using OpenAPI Specifications (a.k.a. Swagger Definitions).

This guide will walk you through the process of creating and deploying a gRPC API using the WSO2 APK REST API. We will use the Student Service API as an example in this guide.

## Sample Backend for gRPC

We will go through two scenarios in the following steps. One scenario corresponds to an API with a single proto file as its definition, and the other scenario is for an API with multiple proto files.

There are two sample backends for this - the Student Service for the API with a single proto file, and the Order Service for an API with multiple proto files. The commands to deploy these backends in your Kubernetes cluster are given below. You may have to replace the namespace value in the given commands to match your namespace.

Student Service backend:
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/student-sample-backend.yaml -n <namespace>
```

Order Service backend:
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/order-sample-backend.yaml -n <namespace>
```

You can check the status of the pods by using 
```
kubectl get pods -n <namespace>
```

## Creating and deploying a gRPC API

### Step 1 - Obtain the proto files for the given API

If you want to deploy an API with the API definition in multiple proto files, zip all of the proto files into a .zip folder and use it for [Step 2](./create-grpc-api-using-rest-api.md#step-2---generate-the-apk-configuration)

Save and download the following files.

Student API: [Student.proto](../../../assets/files/get-started/Student.proto)

Order API: [OrderDefinition.zip](../../../assets/files/get-started/OrderDefinition.zip)

### Step 2 - Generate the APK configuration

Execute the following request to generate the APK configuration. Use the values provided in the table below in the body of your request. 

| Field      | Value                                                                          |
| ---------- | ------------------------------------------------------------------------------ |
| definition | The proto file or the zip file that was downloaded at the beginning of Step 1. |

Student Service API:
=== "Sample Request"
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.2.0/apis/generate-configuration' \
    --header 'Host: api.am.wso2.com' \
    --form 'apiType="GRPC"' \
    --form 'definition=@"/Users/user/Student.proto"'
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/api/configurator/1.1.0/apis/generate-configuration' \
    --header 'Host: <host>' \
    --form 'apiType="GRPC"' \
    --form 'definition=@"<path/to/definition>"'
    ```
=== "Sample Response"
    ```yaml
    ---
    name: "6a254687f3229c35dd0189aac7f7fc4b6228e97a"
    basePath: "/org.apk"
    version: "v1"
    type: "GRPC"
    defaultVersion: false
    subscriptionValidation: false
    operations:
    - target: "student_service.StudentService"
      verb: "GetStudent"
      secured: true
      scopes: []
    - target: "student_service.StudentService"
      verb: "GetStudentStream"
      secured: true
      scopes: []
    - target: "student_service.StudentService"
      verb: "SendStudentStream"
      secured: true
      scopes: []
    - target: "student_service.StudentService"
      verb: "SendAndGetStudentStream"
      secured: true
      scopes: []
    ```

Order Service API:
=== "Sample Request"
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.2.0/apis/generate-configuration' \
    --header 'Host: api.am.wso2.com' \
    --form 'apiType="GRPC"' \
    --form 'definition=@"/Users/user/OrderDefinition.zip"'
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/api/configurator/1.1.0/apis/generate-configuration' \
    --header 'Host: <host>' \
    --form 'apiType="GRPC"' \
    --form 'definition=@"<path/to/zip-file-containing-proto-definitions.zip>"'
    ```
=== "Sample Response"
    ```yaml
    name: "32398767b3b64a7ba1c6aabcd042df4fbd42502a"
    basePath: "/grpcapi"
    version: "v1"
    type: "GRPC"
    defaultVersion: false
    subscriptionValidation: false
    operations:
    - target: "order.OrderService"
      verb: "CreateOrder"
      secured: true
      scopes: []
    - target: "order.OrderService"
      verb: "ServeOrder"
      secured: true
      scopes: []
    - target: "payment.PaymentService"
      verb: "ProcessPayment"
      secured: true
      scopes: []
    - target: "user.UserService"
      verb: "GetUser"
      secured: true
      scopes: []
    ```

You will get the apk-conf file content as the response, as seen in the above sample response. Save this content into a file with the `.apk-conf` file extension. **You will need to fill in the name and endpoint configuration fields before deploying the API.**

!!! note
    - The .proto file has the `package` string, which is used to get the basepath and version of the API.
    - The structure of the package string should be `package <basepath>.<version>.<service-name>`
    - The basepath and version are autogenerated from the contents of the proto file. If you modify it in the API, ensure that you also **modify it in the .proto file prior to generating any code from it**. 
    - For example, in the Student Service API,
        - Package name: `student_service`
        - Basepath: `/org.apk`
        - Version: `v1`
        - Therefore, the package name in the proto file should `org.apk.v1.student_service`.
    - For an API that has multiple proto files for its definition, each proto file must have **the same basepath and version in each proto file.** The service name can vary.
    - For example, in the Order Service API,
        - Package names: `order`, `payment` and `user` 
        - Basepath: `/grpcapi`
        - Version: `v1`. 
        - Therefore, the package string in the proto files should be `grpcapi.v1.<package_name>`.

### Step 3 - Deploy the API

To deploy the API, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

After generating the token, you can deploy the gRPC API with the command

=== "Sample Request"
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.1.0/apis/deploy' \
    --header 'Host: api.am.wso2.com' \
    --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
    --form 'apkConfiguration=@"path/to/apk-conf-file"' \
    --form 'definitionFile=@"path/to/proto-definition"'
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/api/deployer/1.1.0/apis/deploy' \
    --header 'Host: <host>' \
    --header 'Authorization: bearer <access-token>' \
    --form 'apkConfiguration=@"path/to/apk-conf-file"' \
    --form 'definitionFile=@"path/to/proto-definition"'
    ```
=== "Sample Response"
    ```
    ---
    name: "StudentAPI"
    basePath: "/org.apk"
    version: "v1"
    type: "GRPC"
    id: "student-api"
    endpointConfigurations:
        production:
            endpoint: "http://student-backend:6565"
    defaultVersion: false
    subscriptionValidation: false
    operations:
    - target: "student_service.StudentService"
      verb: "GetStudent"
      secured: true
      scopes: []
    - target: "student_service.StudentService"
      verb: "GetStudentStream"
      secured: true
      scopes: []
    - target: "student_service.StudentService"
      verb: "SendStudentStream"
      secured: true
      scopes: []
    - target: "student_service.StudentService"
      verb: "SendAndGetStudentStream"
      secured: true
      scopes: []
    ```

Execute the command below. You will be able to see that the API is successfully deployed.

```
kubectl get apis -n <namespace>
```

## Invoking a gRPC API

You will need a gRPC backend in order to invoke the API and get a correct response. A sample backend for both the Student Service and Order Service APIs have been provided under [this section.](#sample-backend-for-grpc)

Once your gRPC API has been deployed, you can invoke it either via Postman, a custom client, or the `grpcurl` command-line tool. You can download the grpcurl tool from [here](https://github.com/fullstorydev/grpcurl). Code for custom clients can be [generated](https://grpc.io/docs/) by providing the modified proto file to the Protocol buffer Compiler.

If you are using grpcurl, you can view the various flags needed for sending requests [here](https://github.com/fullstorydev/grpcurl)

A sample gRPC call is provided below.

Student Service API:
=== "Sample Request"
    ```
    grpcurl -insecure \
    -import-path /Users/User/proto-files\
    -proto student.proto \
    -d '{"id": 1}' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWI' \
    default.gw.wso2.com:9095 org.apk.v1.student_service.StudentService/GetStudent
    ```
=== "Request Format"
    ```
    grpcurl -insecure \
    -import-path <path-to-folder-containing-proto-file> \
    -proto <proto-file-name> \
    -d '{"argument": value}' \
    -H 'Authorization: Bearer <Access-Token>' \
    default.gw.wso2.com:9095 <complete-service-and-method-name>
    ```

Order Service API:
=== "Request Format"
    ```
    grpcurl -insecure -proto <path to proto files> -d '{"argument": value}' default.gw.wso2.com:9095 <complete-service-and-method-name>
    ```
=== "Sample Request"
    ```
    grpcurl -insecure \
    -import-path /Users/User/proto-files\
    -proto common.proto \
    -proto user.proto \
    -proto payment.proto \
    -proto order.proto \
    -d '{"id": 1}' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWI' \
    default.gw.wso2.com:9095 grpcapi.v1.order.OrderService/CreateOrder
    ```
=== "Request Format"
    ```
    grpcurl -insecure \
    -import-path <path-to-folder-containing-proto-file> \
    -proto <proto-file-name> \
    -proto <proto-file-name> \
    -d '{"argument": value}' \
    -H 'Authorization: Bearer <Access-Token>' \
    default.gw.wso2.com:9095 <complete-service-and-method-name>
    ```