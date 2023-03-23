# Organizations

Organizations in WSO2 APK are similar to the concept of tenants in [WSO2 API Manager's Multi-tenancy architecture](https://apim.docs.wso2.com/en/latest/administer/multitenancy/introduction-to-multitenancy/). WSO2 APK supports organization/tenant isolation, data isolation, execution isolation, and performance isolation to enable multiple organizations to use the platform independently.

Organizations can be managed in the Control Plane, and data can be isolated in the Data Plane. The Control Plane (CP) of APK employs a single database with an organization in each column, while the Data Plane (DP) is deployed separately for each organization in a dedicated Kubernetes (k8s) cluster or namespace. This separation ensures that each organization has its own isolated environment and is only allowed to access resources and data associated with its own business or department. Furthermore, Organizations are used in APK to map the organizations created in Identity Providers (IdPs) to APK. Overall, organizations provide a secure and scalable way to manage multiple organizations in a single APK deployment.

For example if an API named `sample-api` was created in organization `org1`. Users who have a default token will not be allowed to access details of `sample-api` API and invoke it. Instead, users will be able to retrieve API details of `sample-api` and invoke it only if they have a token that was generated based on the `org1` organization.

## Create an Organization

1. Define the organization payload JSON.

     Create a JSON file and define the organization payload in it.
     
     As an example, let's create a JSON file named `organization.json` with the following definition.

     ```tab="Format"
     {
      "name": "",
      "displayName": "",
      "organizationClaimValue": "",
      "enabled": ,
      "serviceNamespaces": [
      "string"
      ]
     }
     ```

     ```tab="Example"
     {
      "name": "org1",
      "displayName": "org1",
      "organizationClaimValue": "01234567-0123-0123-0123",
      "enabled": true,
      "serviceNamespaces": [
      "string"
      ]
     }
     ```

     The following table describes the elements that you need to define in the payload when creating an organization.
     
     <table>
      <thead>
        <tr>
          <th>Elements</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>name</td>
          <td>Name of the organization created in the Identity Provider (IdP). </td>
        </tr>
        <tr>
          <td>displayName</td>
          <td>Display name of the organization.</td>
        </tr>
        <tr>
          <td>organizationClaimValue</td>
          <td>UUID of the organization that you created in the IdP.</td>
        </tr>
        <tr>
          <td>enabled</td>
          <td>The organization can be enable or disable using this option. The Admin can disable the organizations if required so that no one can use it.</br>Possible Values: <code>true</code>, <code>false</code></td>
        </tr>
      </tbody>
     </table>  

2. Execute the [`POST /organizations` Admin REST API](https://apk.docs.wso2.com/en/latest/catalogs/api-reference-admin/#tag/Organization-(Individual)/operation/addOrganization) to create an organization in WSO2 APK.
    
     Execute the following cURL command.

     ```tab="Format"
     curl -k -X POST -H "Authorization: Bearer <access-token>" -H "Content-Type: application/json" -d <organization-JSON-payload> "https://127.0.0.1:9443/api/am/admin/POST"
     ```

     ```tab="Example"
     curl -k -X POST -H "Authorization: Bearer ae4eae22-3f65-387b-a171-d37eaa366fa8" -H "Content-Type: application/json" -d organization.json "https://127.0.0.1:9443/api/am/admin/organizations"
     ```

     - `<access-token>` - Use the access token that you generated when creating an IdP.
     - `<organization-JSON-payload>` - Define the path to the organization payload, which you created in the previous step.

## Create an API with an Organization

!!! info "Before you beign"
    [Create an organization](#create-an-organization).

Follow the instructios below to create an API that is associated to an organization.

1. Define the CR for your API in a YAML file.
   
    !!! info
        You can view a sample CR definition for an API, namely `sample-api.yaml`, in the `<APK_HOME>/developer/tryout/samples/` directory. `<APK_HOME>` defines the unzipped APK distribution.

     Let's navigate to the `samples` directory, which has the CR for the API named `sample-api`.

    ```
     cd developer/tryout/samples
    ```

2. Add the UUID of your organization in the API CR.
    
     1. Copy the `uuid` value of the organization from the organization CR (e.g., `sample-organization.yaml`).
     2. Add it as the value for `organization` in your API CR (e.g., `sample-api.yaml`).

    **Snippet of a sample CR for an API**

    ```
      spec:
       apiDisplayName: http-bin-api
       apiType: REST
       apiVersion: 1.0.8
       context: /http-bin-api/1.0.8
       definitionFileRef: swagger-definition-http-bin-api
       prodHTTPRouteRef: prod-http-route-http-bin-api
       sandHTTPRouteRef: sand-http-route-http-bin-api
       organization: 01edb285-6304-1b20-a090-4d02067ed56e
    ```
