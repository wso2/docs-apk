
1. List the created API and retrieve the `API_ID`.

     ```
     curl --location --request GET 'https://{router_service}:9095/api/am/runtime/apis' \
     --header 'Host: prod.api.am.wso2.com' \
     --header 'Authorization: Bearer <access-token>'
     ```

2. Obtain a token to invoke the created REST API.
     
      Provide the router service external IP in the following command.

      ```
      curl --location --request POST 'https://{router_service}:9095/api/am/runtime/apis/<$API_ID>/generate-key' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Host: prod.api.am.wso2.com' \
      --header 'Authorization: Bearer <access-token>'
      ```

3. Invoke the REST API.
   
      ```
      curl --location --request GET 'https://{router_service}:9095/pizza/1.0.0/menu' \
      --header 'HOST: a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com' \
      --header 'Internal-Key: <Internal-Key>'  
      ```
