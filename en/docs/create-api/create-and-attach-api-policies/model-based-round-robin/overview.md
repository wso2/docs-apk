# Model-Based Round Robin

The model-based round-robin policy routes requests to multiple LLM backends based on a specified AI model. 
It distributes requests in a round-robin fashion or according to assigned weights, controlling how many requests each backend receives.

You can configure model-based round-robin in either of the following ways:

1. [Via REST API (using the APK-Conf file)](./model-based-round-robin-via-rest-api){:target="_blank"}.
2. [Via CRs](./model-based-round-robin-via-crs){:target="_blank"}.
