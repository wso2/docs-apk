# gRPC

gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It was initially developed by Google and is now a part of the Cloud Native Computing Foundation (CNCF) as an incubating project.

You can use a proto file to design a gRPC API in WSO2 APK, similar to developing REST APIs using OpenAPI Specifications (a.k.a. Swagger Definitions).

This guide will walk you through the process of creating and deploying a gRPC API using the WSO2 APK REST API. We will use the Student service API as an example in this guide.

## Sample Backend for gRPC

A sample gRPC backend for the Student service gRPC API can be created using the following command. You may have to replace the namespace value in the above CRs to match your namespace.

```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/grpc-sample-backend.yaml -n <namespace>
```

You can check the status of the pods by using 
```
kubectl get pods -n <namespace>
```

## Creating and deploying a gRPC API

Follow the instructions below to design a gRPC API.

1. Save and download the sample [Student.proto](../../../assets/files/get-started/Student.proto) file. This is the proto file of the API that we are going to deploy in APK.

2. Execute the following request to generate the APK configuration. Use the values provided in the table below in the body of your request. 

    | Field      | Value                                                                      |
    | ---------- | -------------------------------------------------------------------------- |
    | definition | `Student.proto` file that was downloaded at the beginning of Step 1. |
    
    === "Request Format"
        ```
        curl --location 'https://<host>:9095/api/configurator/1.1.0/apis/generate-configuration' \
        --header 'Host: <host>' \
        --form 'definition=@"<path/to/Student.proto>"'
        ```
    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.1.0/apis/generate-configuration' \
        --header 'Host: api.am.wso2.com' \
        --form 'definition=@"/Users/user/Student.proto"'
        ```
    === "Sample Response"
        ```yaml
        name: ""
        basePath: "/grpc.base.path"
        version: "v1"
        type: "GRPC"
        defaultVersion: false
        subscriptionValidation: false
        operations:
        - target: "student.StudentService"
          verb: "GetStudent"
          secured: true
          scopes: []
        - target: "student.StudentService"
          verb: "GetStudentStream"
          secured: true
          scopes: []
        - target: "student.StudentService"
          verb: "SendStudentStream"
          secured: true
          scopes: []
        - target: "student.StudentService"
          verb: "SendAndGetStudentStream"
          secured: true
          scopes: []
        ```
        
3. You will get the apk-conf file content as the response, as seen in the above sample response. Save this content into a file named `StudentService.apk-conf`. You will need to fill in the name and endpoint configuration fields before deploying the API. 

    Please note that the preferred basepath and version must be appended to the package name in the proto file. For example, the initial package name in the proto file is `student`, and the basepath is `/grpc.base.path` and the version is `v1`. Therefore, the package name in the proto file should be changed to `grpc.base.path.v1.student`. This will enable easy generation of code that can be used to invoke the grpc service via the apk gateway

4. To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

5. After generating the token, you can deploy the gRPC API with the command

    === "Request Format"
        ```
        curl --location 'https://<host>:9095/api/deployer/1.1.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/StudentService.apk-conf"' \
        --form 'definitionFile=@"path/to/Student.proto"'
        ```
    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.1.0/apis/deploy' \
        --header 'Host: api.am.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
        --form 'apkConfiguration=@"path/to/StudentService.apk-conf"' \
        --form 'definitionFile=@"path/to/Student.proto"'
        ```
    === "Sample Response"
        ```
        ---
        id: "1516b9a7b06640877bdf9b8c7bde3f4c4d33d5d3"
        name: "demo-grpc-api"
        basePath: "/grpc.base.path"
        version: "v1"
        type: "GRPC"
        defaultVersion: false
        subscriptionValidation: false
        endpointConfigurations:
          production:
            endpoint: "http://grpc-backend:6565"
        operations:
        - target: "student.StudentService"
          verb: "GetStudent"
          secured: true
          scopes: []
        - target: "student.StudentService"
          verb: "GetStudentStream"
          secured: true
          scopes: []
        - target: "student.StudentService"
          verb: "SendStudentStream"
          secured: true
          scopes: []
        - target: "student.StudentService"
          verb: "SendAndGetStudentStream"
          secured: true
          scopes: []

        ```

7. Execute the command below. You will be able to see that the `StudentService` API is successfully deployed.
    
    === "Command"
        ```
        kubectl get apis
        ```


## Invoking a gRPC API

You will need a gRPC backend in order to invoke the API and get a correct response. A sample backend for the gRPC StudentService API has been provided under [this section.](#sample-backend-for-grpc)

Once your gRPC API has been deployed, you can invoke it either via Postman, a custom client, or the `grpcurl` command-line tool. You can download the grpcurl tool from [here](https://github.com/fullstorydev/grpcurl). Code for custom clients can be [generated](https://grpc.io/docs/) by providing the modified proto file to the Protocol buffer Compiler.

A sample gRPC call is provided below.

=== "Sample Request"
```
grpcurl -insecure -proto /Users/user/Student.proto -d '{"id": 1}' default.gw.wso2.com:9095 grpc.base.path.v1.student.StudentService/GetStudent

```

