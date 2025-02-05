Similar to the approach for <a href="../../rest/create-rest-api-using-crs" target="_blank">REST APIs</a>, this approach requires three CRs.

- API CR
- GQLRoute CR
- Backend CR

For this guide, you can create a sample backend for the GraphQL API using the following command.
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/gql-sample-backend.yaml -n <namespace>
```

The GraphQL definition file used for this guide is available at <a href="https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/StarWars.graphql" target="_blank">https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/StarWars.graphql</a>.

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
  organization: default
  production:
  - routeRefs:
    - "production-gqlroute-1"
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