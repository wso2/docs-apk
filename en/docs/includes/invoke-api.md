
1. List the created API and retrieve the `API_ID`.

     ```
     curl --location --request GET '{router_service}:9095/api/am/runtime/apis' \
     --header 'Host: api.am.wso2.com' \
     --header 'Authorization: Bearer <access-token>'
     ```

2. Obtain a token to invoke the created REST API.
     
      Provide the router service external IP in the following command.

      ```
      INTERNAL_KEY=$(curl --location --request POST '{router_service}:9095/api/am/runtime/apis/<$API_ID>/generate-key' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Host: api.am.wso2.com' \
      --header 'Authorization: Bearer <access-token>')
      ```

3. Invoke the REST API.
   
      ```
      curl --location --request GET '{router_service}:9095/pizza/1.0.0/menu' \
      --header 'HOST: gw.wso2.com' \
      --header 'Internal-Key: $INTERNAL_KEY'  
      ```
