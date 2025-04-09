This approach requires four CRs.

- API CR
- GQLRoute CR
- ConfigMap CR
- Backend CR

For this guide, you can create a sample backend for the GraphQL API using the following command.
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/gql-sample-backend.yaml -n <namespace>
```

The GraphQL definition file used for this guide can be found here: <a href="https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/StarWars.graphql" target="_blank">StarWars.graphql</a>

### API CR 

In the following CR, we have defined the GraphQL API giving the name, context, and version information for the API. We have also referred to `GQLRoute` resource in `spec.production.routeRefs[0]` path as well as `ConfigMap` resource in `spec.definitionFileRef` which we create in the next steps.

```yaml
kind: "API"
apiVersion: "dp.wso2.com/v1alpha3"
metadata:
  name: "starwars-api"
spec:
  apiName: "Star Wars API"
  apiType: "GraphQL"
  apiVersion: "1.0.0"
  basePath: "/starwars/1.0.0"
  isDefaultVersion: false
  definitionFileRef: "gql-definition"
  organization: default
  production:
  - routeRefs:
    - "production-gqlroute-1"
```

### GQLRoute CR 

This is the resource where you define resources of your API. This `GQLRoute` is linked to the API by referring to this resource name from the `API` resource. This example only exposes some of the operations defined in the Star Wars SDL provided earlier.

```yaml
apiVersion: "dp.wso2.com/v1alpha2"
kind: "GQLRoute"
metadata:
  name: "production-gqlroute-1"
spec:
  hostnames:
  - "default.gw.example.com"
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

### ConfigMap CR

This resource contains the definition for the API found in <a href="https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/StarWars.graphql" target="_blank">StarWars.graphql</a> encoded in `Base64` format.

```yaml
kind: "ConfigMap"
apiVersion: "v1"
metadata:
  name: "gql-definition"
binaryData:
  definition: "H4sIAAAAAAAA/8VYWW/cNhB+318xRh7qApvAaRGkXaAPjr2GFdRHbbd5CIyClmZXrCVSpSivF0n/e2eG1LGHr4cgL16RHM75zUHXaY6lgi8jgH8bdMsJ/ME/tCwbr7y2ZgIn8Ys26+amTp2uwsHlYDX6bzR6BVc5Bj7glxWOwWHlsEbja1BFAXYGnihoTRSV1bxPfyzYxoG9+QdTD3OnqnzE14MqoluOzu5ipWub4QSm4ePHCRzkyqnUoyMah3caF/UG2Q7Rfb6Qw2s2AZVL812P954s8E6bORNcyvYF1k3hmSxtOe/qbALJ4c6atMxZnQ3ODnnNmjalMoP9Y17TPpkvn/XuTLuaRCfGs1zZvA4EwmOdQDYjQafAOlF3IBZ65epcVwMtLuNWH6U2vNsD1VSZ8ljDAiFVBkp1ixDDRAcqhKfFhUQodUg3gps3QjCOwZlAIEhM1XjWKyx7rYb42q7ZkOIJ/YbwFB2DEvtZhtk2MK0rE0kYogJbdiJ8IkcCoaaw8+UITVO2DETCqwFRu5/8NYF9OMUFHNtgUIGqxozZvv31/fs3dO90+un47Hw6eoAFcWCFpmWlHQpob0mtDyq9XWf3yx6zm56cJxcPc0vYVt840ybkR8z0BqefmdPH6WHyEJ8kEUZ3aObYcrrUPl/l9NPe3jticJlcHQfX7ve5BTNnyzXfNkbfEcBxRIUB3Uyl2Odd9DH7IjlsRaaDrIyIH3VkRpW4jZD32/QfkM+cRpPVGzfGYB0Q0LCs/BIKXXvQQrKEXN2RGGuQmMTrqwn5JHPA+8qytxRBHFJrDNVBxuyCnAmYzbHueR90x4MSMAY1I0ZsO+H4aJ1yYGBpCeME4FzXAwVUVSH7XkulCouECvznGOrrnRC6P432on+Oep77gP/fKf4+56NBeKgGmUy5jMPpQTnbmEysXlhXcJ08mV5NL4Je506XijJqCU3EDBMyQ1oRMLzYf3R2dtUCSIoslcVQdRqHjwJJioHUWdBlVWApxeRxUOWxbK8A6lOufHCdHFPpKQr2JZY1Fnei5QO4yi3BsCqUQb8iQXBlGqprBKfG3Bq7YKlMfi7ULa/A6ljc3nqI6uIMncPg5DFkOFPUvYD0K5GbhDROvrHLBJNhpH4LAWC0FFb5wP5E1VLsbrm6OVXWD6hXEt3KxavOJz/ULVC/RcoEt3+ndAnCn5Eqcns/mEyKt+04sqkoMKRsTtpX5GfC+HZPRf90t3lGid/XMQ9Im8ZbY0vbcMgpn40mTA4Se6NzrSaFzBbPT4oszjibSWHpmLhzQgQrW9Kt+dCef1uwiIjvBZYg/LlgWXFJJeVwCbPGpHHsjltHcacrCm0/7c2KQ/SM3dnjoHd0iPuGFYNwe+sJQlTYbwgF5Mr2IoSTA6rkwTG94eJGkYkqzTf6Wy+dJwohJhdEHaa0vF5PGd9Hc9xFjuYM2qFxYJGjiTKVY2x4MIg01L15FCKJIQ3LMLGyrpWaa0NLM4/tsPMGe1zNkS9M4Dx+7XRJx6Jf5mg2MrqYotVQAXCh1w31ELnhcG2I6fO5G4bp7s0y6B0FUl0QzTjpZLDtXyui+AvMF9Vbu0VvrkL+oNONw2iylTXVs1N6UvGtCXywlgZAE112MZjg4wwe/SYZE8SF4XuAw3AGsD6oD2a7DqNSJIMZkf+cqsYY3r5+15ZQgWz06YEtudyBurGNF7C1wtJwovghPMwxFqf50dLGnc0JQKypV1N14q4r0wg7VBEgF1GVUbg3ePhEI/devwuqvUBFqpPynFHFdmXl7pG6s46GJyIorFu5MotHf8sRYYR/RKkn7ayo6bNt1FJU4Bwt63nER1YWDQF6yyOabnVTNBgXJCw80WJH29pu2tb31Fw/oNvSbsLQs05LZaWwAn0E/kAqPOpecywKufCskSm11mWcRVLRPsv+zvWO9Ge6T5k2/LcCcQhT6NfYeL/27/L/AW5FtmOIEQAA"

```

### Backend CR 

In the above created GQLRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```yaml
apiVersion: "dp.wso2.com/v1alpha2"
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

## Invoking a GraphQL API

Once your GraphQL API has been deployed, you can invoke it. The endpoint of the API would be /`<apk-gateway-host>`/`<api-basepath>`. 

For the above API, the base path is `/starwars/1.0.0`, and if the gateway host is `default.gw.example.com` so the API URL would be 
`/default.gw.example.com/starwars/1.0.0`.

<a href="../../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate an access token</a> and invoke the API using the sample GraphQL call is provided below.

=== "Sample Request"
```
curl --location 'https://default.gw.example.com:9095/starwars/1.0.0' \
--header 'Host: default.gw.example.com' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access-token>' \
--data '{"query":"query hero ($episode: Episode) {\n    hero (episode: $episode) {\n        id\n        name\n        appearsIn\n    }\n}","variables":{"episode":"NEWHOPE"}}' -k
```