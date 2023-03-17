# Attach Operational-level API Policies to APIs via CRs

!!! Tip
    
    To get familiar with the concept of API Policies, see [API Policies Overview](../../../develop-and-deploy-api/api-policies-overview). 

You need to define the API Policies within the HTTPRoute Custom Resource (CR) when creating an API using the Kubernetes Command Line Interface (kubctl). Let's get familiar with the [configurations](#sample-code-snippet) that you will use to attach API policies via an HTTPRoute CR and also the [configurations definitions](#configuration-definitions).

## Sample code snippet

The following is a code snippet of sample HTTPRoute CR.

```
filters:
    - type: RequestHeaderModifier
      requestHeaderModifier:
        remove:
        - sampleRemove1
        set:
        - name: sampleAdd1
          value: sampleValue1
    - type: ResponseHeaderModifier
      responseHeaderModifier:
        remove:
        - sampleRemove1
        set:
        - name: sampleAdd2
          value: sampleValue2
```

??? note "Attach API Policies to the Request Flow Only"

    ```tab="Remove Request Header"
    
    # Attach an API Policy to Remove a Single Request Header
    --------------------------------------------------------
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            remove:
            - sampleRemove1
    
    ---------------------------------------------------------------------------------------------------

    # Attach an API Policy to Remove Multiple Request Headers
    ----------------------------------------------------------
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            remove:
            - sampleRemove1
            - sampleRemove3

    ```

    ```tab="Update Request Header"

    # Attach an API Policy to Update a Single Request Header
    --------------------------------------------------------
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            set:
            - name: sampleAdd1
              value: sampleValue1
    
    ---------------------------------------------------------------------------------------------------
    
    # Attach Policies to Update Multiple Request Headers
    ------------------------------------------------------
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            set:
            - name: sampleAdd1
              value: sampleValue1
            - name: sampleAdd4
              value: sampleValue4
    ```


    ```tab="Remove and Update Request Headers"

    # Attach API Policies to Remove a Request Header and to Update Another Request Header
    ---------------------------------------------------------------------------------------
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            remove:
            - sampleRemove1
            set:
            - name: sampleAdd1
              value: sampleValue1

    ---------------------------------------------------------------------------------------------------

    # Attach Policies to Remove and Update Multiple Request Headers
    ----------------------------------------------------------------
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            remove:
            - sampleRemove1
            - sampleRemove2
            set:
            - name: sampleAdd1
              value: sampleValue1
            - name: sampleAdd2
              value: sampleValue2
        
    ```

??? note "Attach API Policies to a Response Flow Only"

    ```tab="Remove Response Header"

    # Attach an API Policy to Remove a Single Response Header
    --------------------------------------------------------
    filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            remove:
            - sampleRemove1
    
    ---------------------------------------------------------------------------------------------------

    # Attach an API Policy to Remove Multiple Response Headers
    ----------------------------------------------------------
    filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            remove:
            - sampleRemove1
            - sampleRemove2
    ```

    ```tab="Update Response Header"
    
    # Attach an API Policy to Update a Single Response Header
    ----------------------------------------------------------
    filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            set:
            - name: sampleAdd2
              value: sampleValue2
    
    ---------------------------------------------------------------------------------------------------
    
    # Attach Policies to Update Multiple Response Headers
    ------------------------------------------------------
    filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            set:
            - name: sampleAdd2
              value: sampleValue2
            - name: sampleAdd4
              value: sampleValue4
    ```

    ```tab="Remove and Update Response Headers"

    # Attach API Policies to Remove a Response Header and to Update Another Response Header
    ---------------------------------------------------------------------------------------
    filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            remove:
            - sampleRemove1
            set:
            - name: sampleAdd2
              value: sampleValue2

    ---------------------------------------------------------------------------------------------------

    # Attach Policies to Remove and Update Multiple Response Headers
    ----------------------------------------------------------------
    filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            remove:
            - sampleRemove1
            - sampleRemove2
            set:
            - name: sampleAdd2
              value: sampleValue2
            - name: sampleAdd4
              value: sampleValue4
    ```

??? note "Attach API Policies to Request and Response Flows"

    ```
    filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            remove:
            - sampleRemove1
            set:
            - name: sampleAdd1
              value: sampleValue1
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            remove:
            - sampleRemove1
            set:
            - name: sampleAdd2
              value: sampleValue2
    ```

## Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with CRs:

- **`type`**

     `type` defines the type of HTTPHeaderFilter that is defined under the `Filter` section, which defines whether you need to attach an API policy to the request or response flow.

    <table>
    <thead>
      <tr>
        <th>Possible Value</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><a href="#responseHeaderModifier"><code>ResponseHeaderModifier</code></a></td>
        <td>You can use value to add or remove an HTTP header from an HTTP response before it is sent to the client.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#requestHeaderModifier"><code>RequestHeaderModifier</code></a></td>
        <td>You can use this value to add or remove an HTTP header from an HTTP request before it is sent to the upstream target.</td>
      </tr>
    </tbody>
    </table>

- <b><a id="requestHeaderModifier"><code>requestHeaderModifier</code></a></b>

    If **`type: RequestHeaderModifier`**, you need to define the `requestHeaderModifier` section with the API policies that you need to update/add and/or remove.

    | **Possible Value**                | **Required** | **Description**                                                                                                      |
    |------------------------- |-----------------| -----------------|
    | `remove` | Optional | You can use this configuration to remove the provided header(s) from the HTTP request before the action. You can enter either one or a list of HTTP header names. <br/> **Note:** The header names are case-insensitive. |
    | <a href="#set"><code>set</code></a>  | Optional | You can use this configuration to overwrite the request with the given header (name, value) before the action. If an API Policy is not already attached, this will attach a new API policy. |

- <b><a id="responseHeaderModifier"><code>responseHeaderModifier</code></a></b>

    If **`type: ResponseHeaderModifier`**, you need to define the `responseHeaderModifier` section with the API policies that you need to update/add and/or remove.

    | **Possible Value**                | **Required** | **Description**                                                                                                      |
    |------------------------- |-----------------| -----------------|
    | `remove` | Optional | You can use this configuration to remove the provided header(s) from the HTTP request before the action. You can enter either one or a list of HTTP header names. <br/> **Note:** The header names are case-insensitive. |
    | <a href="#set"><code>set</code></a>  | Optional | You can use this configuration to overwrite the request with the given header (name, value) before the action. If an API Policy is not already attached, this will attach a new API policy. |

- <b><a id="set"><code>set</code></a></b>
  
    If `set` is defined after `requestHeaderModifier` or `responseHeaderModifier`, you need to define the details that will be used to update the API policy.

    | **Possible Value**       | **Description**                                                                                               |
    |------------------------- |---------------------------------------------------------------------------------------------------------------|
    | `name`                   | This is the name of the HTTP Header to be matched in order to update the respective HTTP header. Name matching MUST be case insensitive. <br/>If multiple entries specify equivalent header names, the first entry with an equivalent name will be considered for a match. <br/>Note that subsequent entries with an equivalent header name will be ignored. As the header names are case-insensitivity, “new” and “New” are considered as equivalent entries.  |
    | `value`                  | This value is used to update or add the HTTP Header of the request or response.  |

## Create an API using CRs with Operation-level API Policies

Follow the instructions below to attach operation-level API Policies to an API via CRs:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

**Step 1 - Define the CRs**

1. {!includes/crs-samples.md!}

2. Define the required operation-level API policy in your HTTPRoute CR.
   
    !!! note
        For more information, see the [configurations](#code-snippet-of-sample-api-cr) used to attach API policies via an HTTPRoute CR and also the [configurations definitions](#configuration-definitions-cr).

     Let's attach API policies as follows:
    
     ```
      filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            set:
              - name: custom-response-header
                value: myvalue
            remove:
              - access-control-allow-credentials
        - type: RequestHeaderModifier
          requestHeaderModifier:
            set:
              - name: custom-request-header
                value: myvalue
            set:
              - name: custom-override-header
                value: myvalue
     ```

**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}
