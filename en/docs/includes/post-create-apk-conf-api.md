## Step 7. Deploy the API to a Kubernetes cluster.

Once you have crafted your APK Configuration File, you have two convenient options for deploying them. Choose the deployment option that best suits your development workflow. Whether you prefer the customization capabilities of the Config Generator and CI/CD pipeline or the simplicity and speed of the Config Deployer, APK empowers you with flexible and efficient API deployment methods in the Kubernetes ecosystem.


### Option 1 - Deploy API using APK Config Deployer tool

{!includes/direct-deploy.md!}

### Option 2 - Generate K8s CRs using config generator tool and Deploy the API using Kubernetes Client

{!includes/apk-conf-cr-deploy.md!}
