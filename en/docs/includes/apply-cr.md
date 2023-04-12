
Apply CRs to the Kubernetes API server using the kubectl.

=== "Format"
    ```command
    kubectl apply -f <path-to-crs>
    ```

=== "Command"
    ```command
    kubectl apply -f developer/tryout/samples/
    ```

!!! Note
    - The services should be created in a different namespace than the APK or Kubernetes System namespaces. 
    -  The APIs should be created in the APK deployment namespace.
