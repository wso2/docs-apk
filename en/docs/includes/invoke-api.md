
1. Obtain a token to invoke the System API.

      Provide the router service external IP in the following command.

      ```
      TOKEN=$(curl --location --request POST '{router_service}:9095/oauth2/token' \
      --header 'Host: idp.am.wso2.com' \
      --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
      --header 'Content-Type: application/x-www-form-urlencoded' \
      --data-urlencode 'grant_type=client_credentials')
      ```

2. List the created API and retrieve the `API_ID`.

     ```
     curl --location --request GET '{router_service}:9095/api/am/runtime/apis' \
     --header 'Host: api.am.wso2.com' \
     --header 'Authorization: Bearer $TOKEN'
     ```

3. Obtain a token to invoke the created REST API.
     
      Provide the router service external IP in the following command.

      ```
      INTERNAL_KEY=$(curl --location --request POST '{router_service}:9095/api/am/runtime/apis/<$API_ID>/generate-key' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Host: api.am.wso2.com' \
      --header 'Authorization: Bearer $TOKEN')
      ```

4. Invoke the REST API.
   
      ```
      curl --location --request GET '{router_service}:9095/http-bin-api/1.0.8/get' \
      --header 'HOST: gw.wso2.com' \
      --header 'Internal-Key: $INTERNAL_KEY'  
      ```
