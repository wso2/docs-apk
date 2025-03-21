## Step 6. Deploy the API to a Kubernetes cluster.

Once you have crafted your APK Configuration File, you have two convenient options for deploying them. Choose the deployment option that best suits your development workflow. Whether you prefer the customization capabilities of the Config Generator and CI/CD pipeline or the simplicity and speed of the Config Deployer, APK empowers you with flexible and efficient API deployment methods in the Kubernetes ecosystem.


### Option 1 - Deploy API using APK Config Deployer tool

{!includes/direct-deploy.md!}

### Option 2 - Generate K8s CRs using config generator tool and Deploy the API using Kubernetes Client

{!includes/apk-conf-cr-deploy.md!}


## Step 7. Invoke the API.

Now the API is ready to be invoked. Let’s get a random UUID by invoking the `/uuid` resource in the `SampleServiceAPI` by invoking the API.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.example.com:9095/sample-api/0.1.0/uuid' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

=== "Sample Response"
    ```
    {
        "uuid":"f4a38d31-21e8-4b5d-9c26-792e6805dd54"
    }
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/0.1.0/uuid' \
    --header 'Host: <host>' \
    --header 'Authorization: Bearer <access-token>'
    ```
