# Attach API Policies

To get familiar with the concept of API Policies, see [API Policies Overview]({{base_path}}/develop-and-deploy-api/api-policies-overview). The subsequent sections provide instructions on how you can add an API Policy.

## REST API Flow

You need to define the API Polices within the API definition when creating and an API using the REST API Interface. Let's get familiar with the [Configurations definitions](#configurations-definitions---rest-api-flow)

### Config definitions - REST API flow

The REST API flow related configurations definitions are as follows:

| **Configuration**       | **Description**                                 |
|-------------------------|-------------------------------------------------|
|                         |                                                 |
|                         |                                                 |

### Add a request policy

```tab="Single Policy"
<Add code>
```

```tab="Multiple Policies"
<Add code>
```

### Add a response policy

```tab="Single Policy"
<Add code>
```

```tab="Multiple Policies"
<Add code>
```

??? note "Sample REST API Definition"

    <Add code>

## CR Flow

You need to define the API Polices within the API Custom Resource (CR) when creating and an API using the Kubernetes Command Line Interface (kubctl). Let's get familiar with the [Configurations definitions](#configurations-definitions---cr-flow).

### Config definitions - CR flow

The REST API flow related configurations definitions are as follows:

#### Type

`Type` defines the type of HTTPHeaderFilter that is defined under the `Filter` section.

| **Possible Value**                | **Description**                                                                                                      |
|------------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ResponseHeaderModifier` | You can use value to add or remove an HTTP header from an HTTP response before it is sent to the client.             |
| `RequestHeaderModifier`  | You can use this value to add or remove an HTTP header from an HTTP request before it is sent to the upstream target.             |

#### RequestHeaderModifier

| **Possible Value**                | **Required** | **Description**                                                                                                      |
|------------------------- |-----------------| -----------------|
| `Remove` | Optional | You can use this configuration to remove the provided header(s) from the HTTP request before the action. You can enter either one or a list of HTTP header names. <br/> **Note:** The header names are case-insensitive. |
| `Set`  | Optional | You can use this configuration to overwrite the request with the given header (name, value) before the action. If an API Policy is not already attached, this will attach a new API policy. |

#### ResponseHeaderModifier

| **Possible Value**                | **Required** | **Description**                                                                                                      |
|------------------------- |-----------------| -----------------|
| `Remove` | Optional | You can use this configuration to remove the provided header(s) from the HTTP request before the action. You can enter either one or a list of HTTP header names. <br/> **Note:** The header names are case-insensitive. |
| `Set`  | Optional | You can use this configuration to overwrite the request with the given header (name, value) before the action. If an API Policy is not already attached, this will attach a new API policy. |

### Add a request policy

```tab="Single Policy"
<Add code>
```

```tab="Multiple Policies"
<Add code>
```

### Add a response policy

```tab="Single Policy"
<Add code>
```

```tab="Multiple Policies"
<Add code>
```

??? note "Sample API CR Definition"

    <Add code>
