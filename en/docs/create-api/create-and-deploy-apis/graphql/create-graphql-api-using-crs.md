Similar to the approach for [REST APIs](../rest/create-rest-api-using-crs.md), this approach requires three CRs.

- API CR
- GQLRoute CR
- Backend CR

For this guide, you can create a sample backend for the GraphQL API using the following command.
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/gql-sample-backend.yaml -n <namespace>
```

The GraphQL definition file used for this guide is available at https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/StarWars.graphql.

#### API CR 

In the following CR, we have defined the GraphQL API giving the name, context, and version information for the API. We have also referred to `GQLRoute` resource in `spec.production.routeRefs[0]` path which we create in the next step.

```yaml
kind: "API"
apiVersion: "dp.wso2.com/v1alpha2"
metadata:
  name: "starwars-api"
spec:
  apiName: "Star Wars API"
  apiType: "GraphQL"
  apiVersion: "1.0.0"
  basePath: "/starwars/1.0.0"
  isDefaultVersion: false
  definitionFileRef: "gql-sdl"
  organization: default
  production:
  - routeRefs:
    - "production-gqlroute-1"
```

You have to provide the GraphQL SDL file as a ConfigMap and refer to it in the `definitionFileRef` field. Your sdl content should be gzipped before mapping it to definition key in a config file. The following is a sample ConfigMap that you can use to create the SDL ConfigMap of the sample graphQL backend used in this guide.

```yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: gql-sdl
binaryData:
  definition: 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
```
#### GQLRoute CR 

This is the resource where you define resources of your API. This `GQLRoute` is linked to the API by referring to this resource name from the `API` resource. This example only exposes some of the operations defined in the Star Wars SDL provided earlier.

```yaml
apiVersion: "dp.wso2.com/v1alpha2"
kind: "GQLRoute"
metadata:
  name: "production-gqlroute-1"
spec:
  hostnames:
  - "wso2-apk-default.gw.wso2.com"
  rules:
  - matches:
    - path: hero
      type: QUERY
    - path: droid
      type: QUERY
    - path: reviews
      type: QUERY
    - path: search
      type: QUERY
    - path: character
      type: QUERY
    - path: allHumans
      type: QUERY
    - path: allDroids
      type: QUERY
    - path: allCharacters
      type: QUERY
    - path: starship
      type: QUERY
    - path: createReview
      type: MUTATION
    - path: human
      type: QUERY
  backendRefs:
  - group: "dp.wso2.com"
    kind: "Backend"
    name: "star-wars-api-backend"
  parentRefs:
  - group: "gateway.networking.k8s.io"
    kind: "Gateway"
    name: "wso2-apk-default"
    sectionName: "httpslistener"
```

#### Backend CR 

In the above created GQLRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```yaml
apiVersion: "dp.wso2.com/v1alpha1"
kind: "Backend"
metadata:
  name: "star-wars-api-backend"
spec:
  services:
  - host: "graphql-faker-service"
    port: 9002
  basePath: "/graphql"
  protocol: "http"
```

This Backend CR points to the backend that can be created using the following command. Replace <namespace> with the relevant name of the namespace.

```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/gql-sample-backend.yaml -n <namespace>
```

The `host`, `port`, `basepath` fields should point to your GraphQL backend.
If your backend is a Kubernetes-native `Service`, then derive the following value according to your `Service` and use it as the `host`. 

```
<spec.metadata.name>.<spec.metadata.namespace>
```

Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files> -n <namespace>
```