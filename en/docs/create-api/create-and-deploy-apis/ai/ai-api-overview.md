# AI API Overview

The AI API is a REST API designed to facilitate seamless access to Large Language Model (LLM) services. 
Through a standardized interface, this API enables interaction with various LLM providers, offering flexibility and scalability for integrating powerful AI-driven solutions into your applications.

The AI API supports multiple LLM providers by default, making it easier for developers to leverage the most suitable models for their needs.
AI APIs can be created for the following popular LLM providers:

- <b>Azure OpenAI</b>: Access Microsoft's variant of OpenAI’s models with enterprise-grade security, reliability, and scalability.
- <b>Mistral AI</b>: Leverage Mistral’s high-performance open-source models for customized AI experiences.
- <b>OpenAI</b>: Directly integrate OpenAI's models, like GPT-4, with minimal configuration.

With the AI API, you can create and manage API instances using two primary methods:

- <a href="../../ai/create-ai-api-using-rest-api" target="_blank">Create AI API using REST API</a>: Allows programmatic access for seamless integration with existing workflows or CI/CD pipelines.
- <a href="../../ai/create-ai-api-using-crs" target="_blank">Create AI API using Custom Resources (CRs)</a>: Use Kubernetes Custom Resources to manage the lifecycle of your AI APIs in a declarative manner, ideal for Kubernetes-native environments.

For detailed instructions on onboarding additional LLM providers, including custom or specialized models, refer to the following section [LLM Providers](../../../administration/aiproviders/configure-ai-providers-overview.md). 
These will guide you through configurations, security settings, and best practices to enhance the integration of third-party or proprietary LLMs.