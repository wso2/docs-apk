# Model Based Round Robin

The model-based round-robin policy routes requests to different LLM backends based on a specified AI model. 
It follows a round-robin approach to distribute requests evenly among available backends. 
Additionally, weighted values can be assigned to control the proportion of requests each backend receives.

Model Based Round Robin can be done in one of two ways.

1. [Via REST API (using the APK-Conf file)](./model-based-round-robin-via-rest-api){:target="_blank"}.
2. [Via CRs](./model-based-round-robin-via-crs){:target="_blank"}.
