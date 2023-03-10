# Organizations

APK supports organization/tenant isolation to enable multiple organizations to use the platform independently. Organizations can be managed in the Control Plane, and data can be isolated in the Data Plane. Organizations are used in APK to map the organizations created in Identity Providers (IdPs) to APK.

For example if an API named `sample-api` was created in organization `org1`. Users who have a default token will not be allowed to access details of `sample-api` API and invoke it. Instead, users will be able to retrieve API details of `sample-api` and invoke it only if they have a token that was generated based on the `org1` organization.

## Create an Organization

Follow the instructions below to create a new organization.

Let's create an organization using the sample Custom Resource (CR) that is available in APK.

1. Define the CR for your organization in a YAML file.
   
    !!! note
        You can view a sample CR definition for an organization, namely `sample-organization.yaml`, in the `<APK_HOME>/developer/tryout/samples/` directory. `<APK_HOME>` defines the unzipped APK distribution.

     Let's navigate to the `samples` directory, which has the CR for the `org1` organization.

      ```
      cd developer/tryout/samples
      ```

2. Create an organization.
    
     Add the organization CR for `org1` to the namespace to create a new organization.

    **Format**
      ``` bash
      Kubectl apply -f <organization-cr-file-name> -n apk
      ```

    **Example**

      ``` bash
      Kubectl apply -f sample-organization.yaml -n apk
      ```

     After adding the organization named `org1` it will be added to the system (Data Plane).

    **Sample CR for an organization**

      ``` 
      apiVersion: cp.wso2.com/v1alpha1
      kind: Organization
      metadata:
       name: org1
      spec:
       displayName: org1
       enabled: true
       name: org1
       organizationClaimValue: org1
       serviceListingNamespaces:
         - '*'
       uuid: 01edb285-6304-1b20-a090-4d02067ed56e
      ```

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
