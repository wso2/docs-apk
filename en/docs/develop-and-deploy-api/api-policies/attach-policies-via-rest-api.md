# Attach API Policies via the REST API Interface

!!! Tip
    
    To get familiar with the concept of API Policies, see [API Policies Overview](../../../develop-and-deploy-api/api-policies-overview).

You need to define the API Policies within the API definition when creating an API using the REST API Interface. Let's get familiar with the configurations that you will use to attach API policies via an HTTPRoute CR and also the [configurations definitions](#configuration-definitions).

## Attaching API-level Policies

### Sample code snippet - API-level

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

## Attaching Operational-level Policies

### Sample code snippet - Operational-level

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

## Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with the REST API interface.

| **Configuration**       | **Description**                                 |
|-------------------------|-------------------------------------------------|
| `operationPolicies`     | This defines that the API Policy will be applied as an operation Policy, which will be only applicable to the specific operation within the API.   |
|  `apiPolicies`          | This defines that the API Policy will be applied as an API-level Policy, which will be global to all the operations within the specific API. |
| `request` | Defines that the API Policies should be attached to the Request Flow. |
| `response` | Defines that the API Policies need to be attached to the Response Flow. |
| `policyName` | Defines the default policy names. Possible values are `removeHeader`and `addHeader` |
| `parameters` | This defines the HTTP Header related parameters. |
| `headerName`| This is the name of the HTTP Header to be matched in order to update the respective HTTP header. Name matching MUST be case insensitive. <br/>If multiple entries specify equivalent header names, the first entry with an equivalent name will be considered for a match. <br/>Note that subsequent entries with an equivalent header name will be ignored. As the header names are case-insensitivity, “new” and “New” are considered equivalent entries. |
| `headerValue` | This value is used to update or add the HTTP Header of the request or response. |
