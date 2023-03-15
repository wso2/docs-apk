# Add Custom Filters to Execute at the Global Level

Filters is a set of execution points in the request flow that intercept the request before it goes to the backend service. They are engaged while the request is processed within the Enforcer. The defined set of filters are applied to all the APIs deployed in the Gateway. These filters are engaged inline and if the request fails at a certain filter, the request will not be forwarded to the next filter and the backend. The inbuilt set of filters are the authentication filter and the throttling filter.

Custom filters can be added to the existing filters within the Enforcer, and they can be positioned based on the end user's preference.
These filters are engaged for all the APIs deployed within the Gateway.

The Gateway provides a Java interface to implement custom filters. Then the developer needs to compile the filter implementation as a JAR file and mount it to the `/home/wso2/lib/dropins` directory within the Enforcer. When the Enforcer starts, the JAR files in that directory are added to the classpath. Using Java Service Provider Interface, the classloading happens in the Enforcer. See the following sections for further details on how to implement this.
 
## Add a custom filter

Follow the instructions below to add a custom filter in the Enforcer:

1. Create a Java project with `org.wso2.apk.enforcer.commons` dependency.
   
     - For Gradle or Apache Maven, use the following configurations.


        ```tab="Gradle"
            repositories {
                mavenLocal()
                maven {
                    url = 'https://maven.wso2.org/nexus/content/groups/wso2-public/'
                }
            }

            dependencies {
                implementation "org.wso2.apk:org.wso2.apk.enforcer.commons:0.0.1-m7"
            }
        ```

        ```xml tab="Maven"
           <dependency>
               <groupId>org.wso2.apk</groupId>
               <artifactId>org.wso2.apk.enforcer.commons</artifactId>
               <version>0.0.1-m7</version>
           </dependency>
        ```

2. Implement the custom filter.

     You can use the following sample interface to implement the custom filter.

    ```java
     package org.wso2.choreo.connect.enforcer.commons;
     
     import org.wso2.choreo.connect.enforcer.commons.model.APIConfig;
     import org.wso2.choreo.connect.enforcer.commons.model.RequestContext;
     
     import java.util.Map;
     
     /**
         * Filters are the request interceptors that applies API Management capabilities at the gateway layer. This is the
         * Interface to implement chain of filters at the gateway.
         */
     public interface Filter {
     
         default void init(APIConfig apiConfig, Map<String, String> configProperties){};
     
         boolean handleRequest(RequestContext requestContext);
     }
    ```

    Here is the sample filter implementation that reads the property called `CustomProperty` from Filter Configuration and adds it as a header to the request.

    ```java
    package org.example.tests;
    
    import org.wso2.choreo.connect.enforcer.commons.model.APIConfig;
    import org.wso2.choreo.connect.enforcer.commons.model.RequestContext;
    import org.wso2.choreo.connect.enforcer.commons.Filter;
    
    import java.util.Map;
    
    public class CustomFilter implements Filter {
        private static final Logger log = LoggerFactory.getLogger(CustomFilter.class);
        private Map<String, String> configProperties;
    
        @Override
        public void init(APIConfig apiConfig, Map<String, String> configProperties) {
            this.configProperties = configProperties;
        }
    
        @Override
        public boolean handleRequest(RequestContext requestContext) {
            String headerValue = configProperties.get("CustomProperty");
            requestContext.addOrModifyHeaders("Custom-header-1", headerValue);
            return true;
        }
    }
    ```

3. Add the provider configuration file.

     The content of the file needs to be the qualified class name of the filter implementation.

     Note that the Java SPI (Service Provider Interface) is used in this example.

     ```
     org.example.tests.CustomFilter
     ```
 
     If you are using -
      
      - Java SPI (Service Provider Interface) - Provide the provider configuration file in the `META-INF/services/org.wso2.choreo.connect.enforcer.commons.Filter`
      - Apache Maven - Create the file inside the `<PROJECT>/src/main/resources` directory.

4. Build the project and create the JAR file.
     
     For Gradle or Apache Maven, use the following.

     ```tab="Gradle"
        /.gradlew build
     ```

     ```tab="Maven"
        mvn clean install
     ```

     Let's assume that the output JAR is named - `sample-custom-filter-1.0-SNAPSHOT.jar`.

5. Add the custom filter to the Enforcer.

     1. Open the values.yaml.
     2. Include the custom filter related configurations.

         - The `className` needs to be the fully qualified `className`.
         - The position denotes the final filter position in the chain, when all the filters are added.
         - By default, the first position is taken by the Authentication Filter and the Throttle Filter is placed as the second filter.
         - As the following example configuration contains `1` as the `position`, it would be executed prior to the Authentication Filter.

    ```yaml
    enforcer:
        configs:
            filters:
            - className: org.example.tests.CustomFilter
                position: 1
                properties:
                - name: CustomProperty
                    value: foo
    ```
  
6. Create a Docker image.
   
     Use the APK Enforcer image as the base image and include the JAR into the `/home/wso2/lib/dropins` directory.
     You can build the new image with the following sample Docker file named - `Dockerfile`

    ```
    FROM wso2/enforcer:0.0.1-m6 
    COPY sample-custom-filter-1.0-SNAPSHOT.jar /home/wso2/lib/dropins/sample-custom-filter-1.0-SNAPSHOT.jar
    ```

7.  Build the new Enforcer image.
    
    `docker build -t wso2/enforcer-new:latest . `

8.  Start WSO2 APK.

     1. Update the `values.yaml` file of the APK Helm chart.
         - `dp.gatewayRuntime.deployment.enforcer.image` - Use this image (`wso2/enforcer-new:latest`) as the value.
     2. Start APK.

        ```tab="Format"
        helm install <helm-chart-name> . -n <namespace>
        ```

        ```tab="Example"
        helm install apk-test . -n apk
        ```
As a reference, you can use the sample custom filter implementation [here](https://github.com/wso2/apk/tree/main/developer/tryout/samples/filters/sample-custom-filter) .
