# API Custom Resource

A single API in the APK project is defined using a set of combined Kubernetes resources.

This is the root level resource for an API. API related metadata are also defined in this CR.

In the following CR, we have defined a REST API by giving the name, context, and version information for the API. We have also referred to the HTTPRoute resource in spec.production.httpRouteRefs[0] path.

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: http-bin-api
spec:
  apiDisplayName: HTTP Bin API
  apiType: REST
  apiVersion: 1.0.0
  context: /http-bin-api/1.0.0
  isDefaultVersion: true
  production:
  - httpRouteRefs:
    - prod-http-route-http-bin-api
  sandbox:
  - httpRouteRefs:
    - sand-http-route-http-bin-api
  organization: apk-org
```

## Configuration Definitions

<table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><code>apiDisplayName</code></td>
        <td>The unique name of the API in the defined namespace.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>apiType</code></td>
        <td>Denotes the type of the API.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>apiVersion</code></td>
        <td>Denotes the version number of this API.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>context</code></td>
        <td>Defines the context of this API.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>isDefaultVersion</code></td>
        <td>Indicates whether this version of the API should be used as the default version. </td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>production</code></td>
        <td>Contains a list of references to HTTPRoute resources for the production environment.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>sandbox</code></td>
        <td>Contains a list of references to HTTPRoute resources for the sandbox environment.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>httpRouteRefs</code></td>
        <td>Contains the HTTPRoute resources belonging to the production/sandbox environment of the API.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>organization</code></td>
        <td>Denotes the organization of this API.</td>
      </tr>
    </tbody>
</table>


Refer [Manage API](../../create-api/create-api-overview/) for more information on how to configure API.