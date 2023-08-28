# Add Rate Limiting Policy via CRs

!!! Tip
    
    To get familiar with the concept of Rate Limiting, see [Rate Limiting Overview](./rate-limiting-policy-overview.md).

You need to define the API Policies as separate Custom Resources (CRs) when creating an API using the Kubernetes Command Line Interface (kubctl). Let's get familiar with the [API-level](#api-level) and [Operation-level](#operation-level) configurations that you will use to add Rate Limiting Policies and also the [configurations definitions](#configuration-definitions).

## API-level

**Sample code snippets**

The following is a sample code snippet that defines how you can define Rate Limiting Policies at the API-level via a Rate Limiting Policy Custom Resource (CR) definition.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: sand-http-bin-ratelimit
spec:
  default:
    api:
      requestsPerUnit: 5
      unit: Minute
  targetRef:
    kind: API
    name: http-bin-api
    group: gateway.networking.k8s.io
```

## Operation-level

**Sample code snippets**

The following is a sample code snippet that defines how you can define Rate Limiting Policies at the Operation-level via a Rate Limiting Policy Custom Resource (CR) definition.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: sand-http-bin-ratelimit
spec:
  override:
    api:
      rateLimit:
        requestsPerUnit: 5
        unit: Minute
  targetRef:
    kind: Resource
    name: sand-http-route-http-bin-api
    group: gateway.networking.k8s.io
```

## Configuration definitions

The following are the configurations that you need when defining Rate Limiting Policies to an API when working with CRs.

<table>
<thead>
  <tr>
    <th><b>Configuration</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="white-space: nowrap;"><code>apiVersion</code></td>
    <td>Version of the API.</td>
  </tr>
  <tr>
    <td><code>kind</code></td>
    <td>This determines the kind of Custom Resource (CR). As you are creating a CR to define a Rate Limiting Policy, this should be <code>RateLimitPolicy</code>.</td>
  </tr>
  <tr>
    <td><code>metadata</code></td>
    <td>This contains the metadata related to the Rate Limiting Policy.</br> 
        <table>
        <thead>
        <tr>
            <th><b>Configuration</b></th>
            <th><b>Description</b></th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>name</code></td>
            <td>This defines the UUID of the Rate Limiting Policy.</td>
          </tr>
        </tbody>
        </table>
  </tr>
  <tr>
    <td><code><a href="#spec">spec<a/></code></td>
    <td>This defines the configuration related to the Rate Limiting Policy. </br>The configuration will vary based on whether you are creating an API-Level or Operation-Level Rate Limiting Policy.</td>
  </tr>
</tbody>
</table>

- <a name="spec">The following are the configurations defined under the <code><b>spec</b></code> configuration</a>.  

      <table>
      <thead>
        <tr>
          <th><b>Configuration</b></th>
          <th><b>Description</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code><a href="#override-default">default</a></code></td>
          <td>Use this when defining an API-Level Rate Limiting Policy, which applies to all the resources of a specific API globally.</td>
        </tr>
        <tr>
          <td><code><a href="#override-default">override</a></code></td>
          <td>Use this when defining an Operation-Level Rate Limiting Policy, which applies to only a specific resource within an API.</td>
        </tr>
        <tr>
          <td><code><a href="#targetRef">targetRef</a></code></td>
          <td>Use this to define the API/Resource(HTTPRoute)/Gateway CR that the Rate Limiting Policy corresponds to. </td>
        </tr>
      </tbody>
      </table>

- <a name="override-default">The following are the configurations that are defined under the <b><code>override</code></b> and <b><code>default</code></b> configuration sections</a>.
     
     <table>
      <thead>
        <tr>
          <th><b>Configuration</b></th>
          <th><b>Description</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>type</code></td>
          <td>Define the Rate Limiting type.<br>
          <b>Default Value</b>: <code>Api</code> </td>
        </tr>
        <tr>
          <td><code>api</code></td>
          <td>Defines the specifications that correspond to the <code>api</code> Rate Limiting type.</br>
          <table>
            <thead>
              <tr>
                <th><b>Configuration</b></th>
                <th><b>Description</b></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="white-space: nowrap;"><code>requestsPerUnit</code></td>
                <td>This defines the number of API requests that are allowed per unit.<br><b>Example</b>:<br> If <code>unit</code> is Minutes and <code>requestsPerUnit</code> is 5, then only 5 API requests are allowed per Minute.</td>
              </tr>
              <tr>
                <td><code>unit</code></td>
                <td>Defines the measurement unit used to define Rate Limits.<br><b>Possible Values</b>: <code>Minutes</code>, <code>Hours</code>, <code>Days</code><br><b>Example</b>:<br> If <code>unit</code> is Minutes, then how many API requests are allowed per Minute.</td>
              </tr>
            </tbody>
          </table>
          </td>
        </tr>
      </tbody>
     </table>

- <a name="targetRef">The following are the configurations that are defined under the <b><code>targetRef</code></b> configuration</a>.  

    <table>
      <thead>
        <tr>
          <th><b>Configuration</b></th>
          <th><b>Description</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>kind</code></td>
          <td> This defines the kind of the target resource.
          <ul>
          <li>
          If the Rate Limiting Policy applies to a particular resource, this should be <code>Resource</code>.
          </li>
          <li>
          If the Rate Limiting Policy applies to all the resources in the HTTP Route, this should be <code><b>HTTPRoute</b></code>.
          </li>
          </ul></td>
        </tr>
        <tr>
          <td><code>name</code></td>
          <td>This defines the name of the target resource. Define the name of the HTTP route CR here.</td>
        </tr>
        <tr>
          <td><code>group</code></td>
          <td>Define the group as <code>gateway.networking.k8s.io</code></td>
        </tr>
      </tbody>
    </table>

## Create an API using CRs with API-level Rate Limiting Policies

Follow the instructions below to add an API-level Rate Limiting Policy to an API via CRs:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

**Step 1 - Define the CRs**

1. {!includes/crs-samples.md!}

2. Define the required API-level Rate Limiting Policy in your HTTPRoute CR.
   
    !!! note
        For more information, see the [configurations](#api-level) used to add an API-level Rate Limiting Policy via an HTTPRoute CR and also the [configurations definitions](#configuration-definitions).

     Let's add the Rate Limiting Policy as follows:
    
    ```
      apiVersion: dp.wso2.com/v1alpha1
      kind: RateLimitPolicy
      metadata:
        name: sand-http-bin-ratelimit
      spec:
        default:
          api:
            requestsPerUnit: 5
            unit: Minute
        targetRef:
          kind: API
          name: http-bin-api
          group: gateway.networking.k8s.io
    ```

**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}

## Create an API using CRs with Operation-level Rate Limiting Policies

Follow the instructions below to add an Operation-level Rate Limiting Policy to an API via CRs:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

**Step 1 - Define the CRs**

1. {!includes/crs-samples.md!}

2. Define the required Operation-level Rate Limiting Policy in a separate CR.
   
    !!! note
        For more information, see the [configurations](#operation-level) used to add an Operation-level Rate Limiting Policy via an HTTPRoute CR and also the [configurations definitions](#configuration-definitions).

     Let's add the Rate Limiting Policy as follows:
    
    ```
      apiVersion: dp.wso2.com/v1alpha1
      kind: RateLimitPolicy
      metadata:
        name: sand-http-bin-ratelimit
      spec:
        override:
          api:
            requestsPerUnit: 5
            unit: Minute
        targetRef:
          kind: Resource
          name: sand-http-route-http-bin-api
          group: gateway.networking.k8s.io
    ```

**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}
