## Configuring the API Manager Control Plane with a Database

###  Building an APIM Docker Image with the Database Connector JAR

#### **Download the connector JAR**  
   Download the database connector JAR for your database. For example, to use MySQL, download the MySQL Connector/J from the [MySQL website](https://dev.mysql.com/downloads/connector/j/).

#### **Build the Docker image**  
   Refer to the sample Dockerfile below to build an APIM Docker image that includes the connector JAR.

=== "Configuration"
      ``` toml
      FROM wso2/wso2am-acp:4.5.0
      ARG WSO2_SERVER_HOME=/home/wso2carbon/wso2am-acp-4.5.0
      # Copy MySQL connector to the WSO2 server lib directory
      COPY --chown=wso2carbon:wso2 component/mysql-connector-j-8.0.33.jar ${WSO2_SERVER_HOME}/repository/components/lib/
      ```
=== "Generic Format"
      ``` toml
      FROM wso2/wso2am-acp:<version>
      ARG WSO2_SERVER_HOME=/home/wso2carbon/wso2am-acp-<version>
      # Copy <db-type> connector to the WSO2 server lib directory
      COPY --chown=wso2carbon:wso2 component/<db-type>-connector-j-<version>.jar ${WSO2_SERVER_HOME}/repository/components/lib/
      ```

#### **Build the image**  
   Run the following command:

=== "Command"
       ```bash
       docker build -t <your-repo-name>/wso2am-acp-db .
       ```
=== "Generic Format"
       ```bash
       docker build -t <your-repo-name>/<image-name>:<tag> .
       ```

#### **Push the image**  
   Push to your registry:

=== "Command"
       ```bash
       docker push <your-repo-name>/wso2am-acp-db
       ```
=== "Generic Format"
       ```bash
       docker push <your-repo-name>/<image-name>:<tag>
       ```

### Deploying the Database

Deploy your database in Kubernetes. For MySQL, follow these steps:

1. **Add the Bitnami chart repository** (if not already added):

   ```
      helm repo add bitnami https://charts.bitnami.com/bitnami
   ```
2. Deploy MySQL in your Kubernetes cluster using the following command.

=== "Command"
      ```yaml
      helm install apimdb bitnami/mysql \
        --namespace mysql --create-namespace \
        -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/with-db/mysql-values.yaml
      ```
=== "Format"
      ```yaml
      helm install <release-name> bitnami/mysql \
        --namespace <namespace> --create-namespace \
        -f <path-to-mysql-values.yaml>
      ```

### Change the database configurations in the APIM values.yaml file

Open the `values.yaml` file and change the database configurations as follows.
=== "Configuration"
      ```yaml
      databases:
              # -- Database type. eg: mysql, oracle, mssql, postgres
              type: "mysql"
              jdbc:
                # -- JDBC driver class name
                driver: "com.mysql.cj.jdbc.Driver"
              # -- APIM AM_DB configurations.
              apim_db:
                # -- APIM AM_DB URL
                url: "jdbc:mysql://apimdb-mysql.mysql.svc.cluster.local:3306/apim_db?useSSL=false&amp;allowPublicKeyRetrieval=true&amp;serverTimezone=UTC"
                # -- APIM AM_DB username
                username: "apimadmin"
                # -- APIM AM_DB password
                password: "apimadmin"
                # -- APIM database JDBC pool parameters
                poolParameters:
                  defaultAutoCommit: false
                  testOnBorrow: true
                  testWhileIdle: true
                  validationInterval: 30000
                  maxActive: 100
                  maxWait: 60000
                  minIdle: 5
              # -- APIM SharedDB configurations.
              shared_db:
                # -- APIM SharedDB URL
                url: "jdbc:mysql://apimdb-mysql.mysql.svc.cluster.local:3306/shared_db?useSSL=false&amp;allowPublicKeyRetrieval=true&amp;serverTimezone=UTC"
                # -- APIM SharedDB username
                username: "sharedadmin"
                # -- APIM SharedDB password
                password: "sharedadmin"
                # -- APIM shared database JDBC pool parameters
                poolParameters:
                  defaultAutoCommit: false
                  testOnBorrow: true
                  testWhileIdle: true
                  validationInterval: 30000
                  maxActive: 100
                  maxWait: 60000
                  minIdle: 5
      ```
=== "Format"
      ```yaml
      databases:
              # -- Database type. eg: mysql, oracle, mssql, postgres
              type: "<db-type>"
              jdbc:
                # -- JDBC driver class name
                driver: "<jdbc-driver-class-name>"
              # -- APIM AM_DB configurations.
              apim_db:
                # -- APIM AM_DB URL
                url: "<jdbc-url>"
                # -- APIM AM_DB username
                username: "<username>"
                # -- APIM AM_DB password
                password: "<password>"
                # -- APIM database JDBC pool parameters
                poolParameters:
                  defaultAutoCommit: false
                  testOnBorrow: true
                  testWhileIdle: true
                  validationInterval: 30000
                  maxActive: 100
                  maxWait: 60000
                  minIdle: 5
              # -- APIM SharedDB configurations.
              shared_db:
                # -- APIM SharedDB URL
                url: "<jdbc-url>"
                # -- APIM SharedDB username
                username: "<username>"
                # -- APIM SharedDB password
                password: "<password>"
                # -- APIM shared database JDBC pool parameters
                poolParameters:
                  defaultAutoCommit: false
                  testOnBorrow: true
                  testWhileIdle: true
                  validationInterval: 30000
                  maxActive: 100
                  maxWait: 60000
                  minIdle: 5
      ```

### Change the Docker image in the APIM values.yaml file

Open the `values.yaml` file and change the Docker image as follows.
=== "Configuration"
      ```yaml
        deployment:
          # Container image configurations
          image:
            # -- Container registry hostname
            registry: "docker.io"
            # -- Azure ACR repository name consisting the image
            repository: "sampathrajapakse/wso2am-acp-db:latest"
            # -- Docker image digest
            digest: "sha256:6d4e879121ef0e0a736b64f132c7fc1cf66bfbcf8c79993ca7fad302d6adc197"
            # -- Refer to the Kubernetes documentation on updating images (https://kubernetes.io/docs/concepts/containers/images/#updating-images)
            imagePullPolicy: IfNotPresent
      ```
=== "Format"
      ```yaml
        deployment:
          # Container image configurations
          image:
            # -- Container registry hostname
            registry: "docker.io"
            # -- Azure ACR repository name consisting the image
            repository: "<your repo name>/<docker image name>:<tag>"
            # -- Docker image digest
            digest: "<sha value of the image>"
            # -- Refer to the Kubernetes documentation on updating images (https://kubernetes.io/docs/concepts/containers/images/#updating-images)
            imagePullPolicy: IfNotPresent
      ```

### Deploy WSO2 API Manager with database


1. Create a new helm repository with the latest apim release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2apim https://github.com/wso2/helm-apim/releases/download/acp-4.5.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Consider ```apim``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

=== "Command"
    ```
     helm install apim wso2apim/wso2am-acp --version 4.5.0-1 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/with-db/4.5.0-values.yaml -n apk
    ```
=== "Format"
    ```
    helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
    ```

### Install NGINX Ingress Controller. 
Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.

!!! Note
    Please refer to the <a href="../../control-plane/apim-deploy/" target="_blank">Advanced Configuration for APIM</a> for more information.


