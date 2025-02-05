The model-based round-robin policy routes requests to different LLM backends based on a specified AI model. 
It follows a round-robin approach to distribute requests evenly among available backends. 
Additionally, weighted values can be assigned to control the proportion of requests each backend receives.

[![Model Based Round Robin](../../../assets/img/api-policies/model-based-round-robin.png)](../../../assets/img/api-policies/model-based-round-robin.png)

This policy is only applicable to the AI APIs.