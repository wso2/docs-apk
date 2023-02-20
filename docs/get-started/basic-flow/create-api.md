# Create an API From a Service

## Create an API

You can create an API using one of the following flows:

::: details UI Flow

### Create an API using the UI flow

Follow the instructions below to create a REST API using the basic flow:

1. Sign in to the WSO2 API Publisher.

    ` no-line-numbers
    https://<hostname>:9443/publisher
    `

    Example:
    
    ` no-line-numbers
    https://localhost:9443/publisher
    `

    ::: info
    The **Create API** button will only appear for a user who has the `creator` role permission.
    :::

2. Select **REST API** from the options available.

3. Click **Start from Scratch**.

4. Enter API details.

:::

::: details CRD Flow

### Create an API using a CRD

Sample Content.. When you create a new CustomResourceDefinition (CRD), the Kubernetes API Server creates a new RESTful resource path for each version you specify. The custom resource created from a CRD object can be either namespaced or cluster-scoped, as specified in the CRD's spec.scope field. As with existing built-in objects, deleting a namespace deletes all custom objects in that namespace. `CustomResourceDefinitions` themselves are non-namespaced and are available to all namespaces.

For example, if you save the following `CustomResourceDefinition` to `resourcedefinition.yaml`:

``` no-line-numbers
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  # name must match the spec fields below, and be in the form: <plural>.<group>
  name: crontabs.stable.example.com
spec:
  # group name to use for REST API: /apis/<group>/<version>
  group: stable.example.com
  # list of versions supported by this CustomResourceDefinition
  versions:
    - name: v1
      # Each version can be enabled/disabled by Served flag.
      served: true
      # One and only one version must be marked as the storage version.
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
  # either Namespaced or Cluster
  scope: Namespaced
  names:
    # plural name to be used in the URL: /apis/<group>/<version>/<plural>
    plural: crontabs
    # singular name to be used as an alias on the CLI and for display
    singular: crontab
    # kind is normally the CamelCased singular type. Your resource manifests use this.
    kind: CronTab
    # shortNames allow shorter string to match your resource on the CLI
    shortNames:
    - ct
```

:::

## Attach an interface to the API
