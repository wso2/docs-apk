# GraphQL

GraphQL, which has been developed by Facebook, is a data query language for APIs. When using GraphQL, users can explicitly specify as to what data they need from an API. GraphQL APIs are an alternative to REST-based APIs.

You can use a Schema Definition Language (SDL) schema to design a GraphQL API in WSO2 APK, similar to developing REST APIs using OpenAPI Specifications (a.k.a. Swagger Definitions).

This guide will walk you through the process of creating and deploying a GraphQL API using the WSO2 APK REST API. We will use the Star Wars API as an example in this guide.

## Sample Backend for GraphQL

A sample GraphQL backend for the Star Wars GraphQL API can be created using the following command. You may have to replace the namespace value in the above CRs to match your namespace.

```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/gql-sample-backend.yaml -n <namespace>
```

You can check the status of the pods by using 
```
kubectl get pods -n <namespace>
```

## Creating and deploying a GraphQL API

Follow the instructions below to design a GraphQL API.

1. Download and save the sample [StarWarsAPI.graphql](../../../assets/files/get-started/StarWarsAPI.graphql) file. This is the GraphQL SDL of the API that we are going to deploy in APK.

2. Execute the following request to generate the APK configuration. Use the values provided in the table below in the body of your request. 

    | Field      | Value                                                                      |
    | ---------- | -------------------------------------------------------------------------- |
    | definition | `StarWarsAPI.graphql` file that was downloaded at the beginning of Step 1. |

    === "Request Format"
        ```
        curl --location 'https://<host>:9095/api/configurator/1.2.0/apis/generate-configuration' \
        --header 'Host: <host>' \
        --form 'apiType="GRAPHQL"' \
        --form 'definition=@"<path/to/StarWarsAPI.graphql>"'
        ```
    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.2.0/apis/generate-configuration' \
        --header 'Host: api.am.wso2.com' \
        --form 'definition=@"/Users/user/StarWarsAPI.graphql"' \
        --form 'apiType="GRAPHQL"' 
        ```
    === "Sample Response"
        ```yaml
        name: ""
        basePath: "/"
        version: ""
        type: "GRAPHQL"
        defaultVersion: false
        subscriptionValidation: false
        operations:
        - target: "hero"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "reviews"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "search"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "character"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "droid"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "human"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "allHumans"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "allDroids"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "allCharacters"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "starship"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "createReview"
          verb: "MUTATION"
          secured: true
          scopes: []
        - target: "reviewAdded"
          verb: "SUBSCRIPTION"
          secured: true
          scopes: []
        ```

3. You will get the apk-conf file content as the response, as seen in the above sample response. Save this content into a file named `StarWars.apk-conf`. You will need to fill in the name, basePath, version and endpoint configuration fields before deploying the API.

    === "Sample APK Configuration"
    ```yaml
    name: "Starwars API"
    basePath: "/starwars"
    version: "1.0.0"
    type: "GRAPHQL"
    defaultVersion: false
    subscriptionValidation: false
    endpointConfigurations:
      production:
        endpoint: "http://graphql-faker-service:9002/graphql"
    operations:
    - target: "hero"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "reviews"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "search"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "character"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "droid"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "human"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "allHumans"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "allDroids"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "allCharacters"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "starship"
      verb: "QUERY"
      secured: true
      scopes: []
    - target: "createReview"
      verb: "MUTATION"
      secured: true
      scopes: []
    - target: "reviewAdded"
      verb: "SUBSCRIPTION"
      secured: true
      scopes: []
    ```

4. To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

5. After generating the token, you can deploy the GraphQL API with the command

    === "Request Format"
        ```
        curl --location 'https://<host>:9095/api/deployer/1.2.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/StarWars.apk-conf"' \
        --form 'definitionFile=@"path/to/StarWarsAPI.graphql"'
        ```
    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.2.0/apis/deploy' \
        --header 'Host: api.am.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
        --form 'apkConfiguration=@"/Users/user/StarWars.apk-conf"' \
        --form 'definitionFile=@"/Users/user/StarWarsAPI.graphql"'
        ```
    === "Sample Response"
        ```
        ---
        name: "StarWarsAPI"
        basePath: "/starwars"
        version: "1.0.0"
        type: "GRAPHQL"
        defaultVersion: false
        subscriptionValidation: false
        endpointConfigurations:
          production:
            endpoint: "http://graphql-faker-service:9002/graphql"
        operations:
        - target: "hero"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "reviews"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "search"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "character"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "droid"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "human"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "allHumans"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "allDroids"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "allCharacters"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "starship"
          verb: "QUERY"
          secured: true
          scopes: []
        - target: "createReview"
          verb: "MUTATION"
          secured: true
          scopes: []
        - target: "reviewAdded"
          verb: "SUBSCRIPTION"
          secured: true
          scopes: []
        ```

6. Execute the command below. You will be able to see that the `StarWars` API is successfully deployed.
    
    === "Command"
        ```
        kubectl get apis
        ```


## Invoking a GraphQL API

You will need a GraphQL backend in order to invoke the API and get a correct response. A sample backend for the GraphQL Star Wars API has been provided under [this section.](#sample-backend-for-graphql)

Once your GraphQL API has been deployed, you can invoke it. The endpoint of the API would be <apk-gateway-url>/<api-basepath>. 

For the above API, the base path is "/starwars/1.0.0", so the API URL would be <apk-gateway-url>/starwars/1.0.0.

A sample GraphQL call is provided below.

=== "Sample Request"
```
curl --location 'https://default.gw.wso2.com:9095/starwars/1.0.0' \
--header 'Host: default.gw.wso2.com' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access-token>' \
--data '{"query":"query hero ($episode: Episode) {\n    hero (episode: $episode) {\n        id\n        name\n        appearsIn\n    }\n}","variables":{"episode":"NEWHOPE"}}' -k
```

!!! note
    As of now, WSO2 APK only supports QUERY and MUTATION operations for GraphQL.
