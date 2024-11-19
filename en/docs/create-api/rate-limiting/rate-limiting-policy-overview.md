# Rate Limiting Overview

Rate limiting is an essential mechanism in API management that restricts the number of requests a client can send to an API within a given time frame. The primary purpose of Rate Limiting is to prevent clients from overloading the API and causing system downtime, poor performance, or even complete failure.

Thousands of clients can simultaneously access APIs, and some of these clients may send numerous requests within a short period. However, if you do not use Rate Limiting, these requests can quickly consume server resources and lead to an overburdened API. As a result, other clients may experience slower response times, timeouts, and errors.

By enforcing rate limits, API management platforms can ensure that clients use the API responsibly and do not exceed a predefined threshold of requests. As a result, this helps to prevent overload and ensures that all clients have equal access to the API's resources, maintaining the API's reliability and performance. Thereby, Rate Limiting will help to protect your APIs from common types of security attacks, such as certain types of denial of service (DOS) attacks.

In addition to protecting the API, Rate Limiting can also help organizations manage their costs by limiting the number of requests clients can make in a given time frame. As a result, this can prevent clients from consuming too many resources and running up costs associated with the API. Thereby, Rate Limiting helps regulate the API traffic based on the infrastructure availability.

Overall, Rate Limiting is a crucial feature in API management that helps to ensure the availability, reliability, and security of APIs while also managing costs and maintaining fair access for all clients.

## What's Next?
- <a href="../../../create-api/rate-limiting/add-new-rate-limiting-policies-via-rest-api" target="_blank">Learn to add Rate Limiting Policies using the REST API Interface</a>
- <a href="../../../create-api/rate-limiting/add-new-rate-limiting-policies-via-crs" target="_blank">Learn to add Rate Limiting Policies using a Custom Resource (CR)</a>