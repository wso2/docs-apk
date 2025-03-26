# Organizations

Organizations in WSO2 Kubernetes Gateway are similar to the concept of tenants in [WSO2 API Manager's Multi-tenancy architecture](https://apim.docs.wso2.com/en/latest/administer/multitenancy/introduction-to-multitenancy/). WSO2 Kubernetes Gateway supports organization/tenant isolation, data isolation, execution isolation, and performance isolation to enable multiple organizations to use the platform independently.

Organizations can be managed in the Control Plane, and data can be isolated in the Data Plane. The Control Plane (CP) of Kubernetes Gateway employs a single database with an organization in each column, while the Data Plane (DP) is deployed separately for each organization in a dedicated Kubernetes (k8s) cluster or namespace. This separation ensures that each organization has its own isolated environment and is only allowed to access resources and data associated with its own business or department. Furthermore, Organizations are used in Kubernetes Gateway to map the organizations created in Identity Providers (IdPs) to Kubernetes Gateway. Overall, organizations provide a secure and scalable way to manage multiple organizations in a single Kubernetes Gateway deployment.

For example if an API named `sample-api` was created in organization `org1`. Users who have a default token will not be allowed to access details of `sample-api` API and invoke it. Instead, users will be able to retrieve API details of `sample-api` and invoke it only if they have a token that was generated based on the `org1` organization.

## Create an Organization

1. Define the organization payload JSON.

     Create a JSON file and define the organization payload in it.
     
     As an example, let's create a JSON file named `organization.json` with the following definition.

	=== "Format"
		```
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

    === "Example"
		```
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

2. Execute the [`POST /organizations` Admin REST API](https://apk.docs.wso2.com/en/latest/catalogs/api-reference-admin/#tag/Organization-(Individual)/operation/addOrganization) to create an organization in WSO2 Kubernetes Gateway.
    
	Execute the following cURL command.

	=== "Format"
		```
		curl -k -X POST -H "Authorization: Bearer <access-token>" -H "Content-Type: application/json" -d <organization-JSON-payload> "https://127.0.0.1:9443/api/am/admin/POST"
		```

	=== "Example"
		```
		curl -k -X POST -H "Authorization: Bearer ae4eae22-3f65-387b-a171-d37eaa366fa8" -H "Content-Type: application/json" -d organization.json "https://127.0.0.1:9443/api/am/admin/organizations"
		```

	- `<access-token>` - Use the access token that you generated when creating an IdP.
	- `<organization-JSON-payload>` - Define the path to the organization payload, which you created in the previous step.


In this scenario use non-production IDP to obtain the access token. For more information, see [Obtain access token from Non-production IDP](../../setup/identity-platform/idp/non-production-idp/).