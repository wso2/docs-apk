# GQLRoute Sample

The following is a sample GQLRoute CR.

```
apiVersion: dp.wso2.com/v1alpha2
kind: GQLRoute
metadata:
  name: graphql-api-route
spec:
  hostnames:
  - graphql.backend.gw.wso2.com
  backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: gql-backend
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
  parentRefs:
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: wso2-apk-default
    namespace: apk
    sectionName: httpslistener
```