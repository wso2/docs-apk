# Generate Access Token

To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). While APK supports third party IdPs such as Asgardeo and Auth0, it supports an inbuilt non-production identity provider as well, which is only meant for testing purposes. We are going to use the non-production inbuilt IdP for this guide.

Execute the following request to generate the access token. Use the base64 encoded value of the colon separated client Id and client secret provided in the table below in the Authorization header of the request. We will be using the client credentials grant type to generate the token.

|    Field        |                    Value                    |
       |-----------------|---------------------------------------------|
| Client ID       | 45f1c5c8-a92e-11ed-afa1-0242ac120002        |
| Client Secret   | 4fbd62ec-a92e-11ed-afa1-0242ac120002        |

=== "Request"

    ```
       curl --location 'https://<host>:9095/oauth2/token' \
       --header 'Host: <host>' \
       --header 'Authorization: Basic <Base64Encoded(clientId:clientSecret)>' \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials'
    ```

=== "Sample Request"

    ```
       curl -k --location 'https://idp.am.wso2.com:9095/oauth2/token' \
       --header 'Host: idp.am.wso2.com' \
       --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials'
    ```

=== "Sample Response"

    ```
       {"access_token":"eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ", "token_type":"Bearer", "expires_in":3600, "scope":"default"}
    ```

Now you can use this access token to invoke the Resources and APIs that follow.