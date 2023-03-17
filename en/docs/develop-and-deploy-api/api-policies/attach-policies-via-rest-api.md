# Attach API Policies via the REST API Interface

!!! Tip
    
    To get familiar with the concept of API Policies, see [API Policies Overview](../../../develop-and-deploy-api/api-policies-overview).

You need to define the API Policies in the API payload when creating an API using the REST API Interface. You can either attach API Policies at the API-level or at the Operation-level. Let's get familiar with the [API-level Policy](#api-level) and [Operational-level Policy](#operational-level) configurations and also the [configurations definitions](#configuration-definitions).

## API-level

**Sample code snippets**

The following is a sample code snippet that defines how you can attach API Policies at the API-level within an API definition.

```
  "apiPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ],
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
  }
```

??? note "Attach API Policies to the Request Flow Only"

    ```tab="Remove Request Header"

    # Attach an API Policy to Remove a Single Request Header
    --------------------------------------------------------

    "apiPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach an API Policy to Remove Multiple Request Headers
    ----------------------------------------------------------
    
    "apiPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```
    
    ```tab="Update Request Header"

    # Attach an API Policy to Update a Single Request Header
    --------------------------------------------------------

    "apiPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------
    
    # Attach Policies to Update Multiple Request Headers
    ------------------------------------------------------

    "apiPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

    ```tab="Remove and Update Request Headers"

    # Attach API Policies to Remove a Request Header and to Update Another Request Header
    ---------------------------------------------------------------------------------------
    
    "apiPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach Policies to Remove and Update Multiple Request Headers
    ----------------------------------------------------------------

    "apiPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

??? note "Attach API Policies to the Response Flow Only"

    ```tab="Remove Response Header"

    # Attach an API Policy to Remove a Single Response Header
    --------------------------------------------------------

    "apiPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach an API Policy to Remove Multiple Response Headers
    ----------------------------------------------------------
    
    "apiPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```
    
    ```tab="Update Response Header"

    # Attach an API Policy to Update a Single Response Header
    --------------------------------------------------------

    "apiPolicies": {
      "response": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------
    
    # Attach Policies to Update Multiple Response Headers
    ------------------------------------------------------

    "apiPolicies": {
      "response": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

    ```tab="Remove and Update Response Headers"

    # Attach API Policies to Remove a Response Header and to Update Another Response Header
    ---------------------------------------------------------------------------------------
    
    "apiPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach Policies to Remove and Update Multiple Response Headers
    ----------------------------------------------------------------

    "apiPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

??? note "Attach API Policies to Request and Response Flows"

    ```
    "apiPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ],
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```

## Operational-level

**Sample code snippets**

The following is a sample code snippet that defines how you can attach API Policies at the Operation-level within an API definition.

```
"operationPolicies": {
    "request": [
        {
            "policyName": "addHeader",
            "parameters": [{
                "headerName": "customadd1",
                "headerValue": "customvalue1"
            }]
        },
        {
            "policyName": "addHeader",
            "parameters": [{
                "headerName": "customadd2",
                "headerValue": "customvalue2"
            }]
        }
    ],
    "response": [
        {
            "policyName": "removeHeader",
            "parameters": [{
                "headerName": "content-length"
            }]
        },
        {
            "policyName": "removeHeader",
            "parameters": [{
                "headerName": "content-length2"
            }]
        }
    ]
}
```

??? note "Attach API Policies to the Request Flow Only"

    ```tab="Remove Request Header"

    # Attach an API Policy to Remove a Single Request Header
    --------------------------------------------------------

    "operationPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach an API Policy to Remove Multiple Request Headers
    ----------------------------------------------------------
    
    "operationPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```
    
    ```tab="Update Request Header"

    # Attach an API Policy to Update a Single Request Header
    --------------------------------------------------------

    "operationPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------
    
    # Attach Policies to Update Multiple Request Headers
    ------------------------------------------------------

    "operationPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

    ```tab="Remove and Update Request Headers"

    # Attach API Policies to Remove a Request Header and to Update Another Request Header
    ---------------------------------------------------------------------------------------
    
    "operationPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach Policies to Remove and Update Multiple Request Headers
    ----------------------------------------------------------------

    "operationPolicies": {
      "request": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

??? note "Attach API Policies to the Response Flow Only"

    ```tab="Remove Response Header"

    # Attach an API Policy to Remove a Single Response Header
    --------------------------------------------------------

    "operationPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach an API Policy to Remove Multiple Response Headers
    ----------------------------------------------------------
    
    "operationPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```
    
    ```tab="Update Response Header"

    # Attach an API Policy to Update a Single Response Header
    --------------------------------------------------------

    "operationPolicies": {
      "response": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------
    
    # Attach Policies to Update Multiple Response Headers
    ------------------------------------------------------

    "operationPolicies": {
      "response": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

    ```tab="Remove and Update Response Headers"

    # Attach API Policies to Remove a Response Header and to Update Another Response Header
    ---------------------------------------------------------------------------------------
    
    "operationPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          }
      ]
    }

    ---------------------------------------------------------------------------------------------------

    # Attach Policies to Remove and Update Multiple Response Headers
    ----------------------------------------------------------------

    "operationPolicies": {
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ]
    }

    ```

??? note "Attach API Policies to Request and Response Flows"

    ```
    "operationPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ],
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```

## Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with the REST API interface.

<table>
<thead>
  <tr>
    <th>Configuration</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="white-space: nowrap;"><code>operationPolicies</code></td>
    <td>This defines that the API Policy will be applied as an operation Policy, which will be only applicable to the specific operation within the API.</td>
  </tr>
  <tr>
    <td><code>apiPolicies</code></td>
    <td>This defines that the API Policy will be applied as an API-level Policy, which will be global to all the operations within the specific API.</td>
  </tr>
  <tr>
    <td><code>request</code></td>
    <td>Defines that the API Policies should be attached to the Request Flow.</td>
  </tr>
  <tr>
    <td><code>response</code></td>
    <td>Defines that the API Policies need to be attached to the Response Flow.</td>
  </tr>
  <tr>
    <td><code>policyName</code></td>
    <td>Defines the default policy names. Possible values are <code>removeHeader</code> and <code>addHeader</code>.</td>
  </tr>
  <tr>
    <td><code>parameters</code></td>
    <td>This defines the HTTP Header related parameters.</td>
  </tr>
  <tr>
    <td><code>headerName</code></td>
    <td>This is the name of the HTTP Header to be matched in order to update the respective HTTP header. Name matching MUST be case insensitive.<br><br>If multiple entries specify equivalent header names, the first entry with an equivalent name will be considered for a match.<br><br>Note that subsequent entries with an equivalent header name will be ignored. As the header names are case-insensitivity, “new” and “New” are considered equivalent entries.</td>
  </tr>
  <tr>
    <td><code>headerValue</code></td>
    <td>This value is used to update or add the HTTP Header of the request or response.</td>
  </tr>
</tbody>
</table>

## Create an API with API Policies

Follow the instructions below to attach API Policies to an API when creating it:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

1. Define the required API policies in your API Payload.
   
    !!! note
        For more information, see the [API-level Policy](#api-level) and [Operational-level Policy](#operational-level) configurations used to attach API policies and also the [configurations definitions](#configuration-definitions).

     Let's attach API policies as follows:
    
    ```
    "operationPolicies": {
      "request": [
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd1",
                  "headerValue": "customvalue1"
              }]
          },
          {
              "policyName": "addHeader",
              "parameters": [{
                  "headerName": "customadd2",
                  "headerValue": "customvalue2"
              }]
          }
      ],
      "response": [
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length"
              }]
          },
          {
              "policyName": "removeHeader",
              "parameters": [{
                  "headerName": "content-length2"
              }]
          }
      ]
    }
    ```

2. Create your REST API by invoking the [`POST /apis`](https://apk.docs.wso2.com/en/latest/catalogs/api-reference-runtime/#tag/APIs/operation/createAPI) operation.
