# Create an API From a Service

## Create an API

You can create an API using one of the following flows:

::: details UI Flow
    ### Create an API using the UI flow

    Follow the instructions below to create a REST API using the basic flow:

    1. Sign in to the WSO2 API Publisher.

        ```
        https://<hostname>:9443/publisher
        ``` 
    
        Example: 
        
        ```
        https://localhost:9443/publisher
        ```

        ::: info
        The **Create API** button will only appear for a user who has the `creator` role permission.
        :::

    2. Select **REST API** from the options available.

    3.  Click **Start from Scratch**.

    4.  Enter API details. 

:::

::: details CRD Flow

    ### Create an API using a CRD

    When you create a new CustomResourceDefinition (CRD), the Kubernetes API Server creates a new RESTful resource path for each version you specify. The custom resource created from a CRD object can be either namespaced or cluster-scoped, as specified in the CRD's spec.scope field. As with existing built-in objects, deleting a namespace deletes all custom objects in that namespace. CustomResourceDefinitions themselves are non-namespaced and are available to all namespaces.

    For example, if you save the following CustomResourceDefinition to resourcedefinition.yaml:

:::

## Attach an interface to the API
