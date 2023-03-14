
Apply CRs to the Kubernetes API server using the kubectl.

```tab="Format"
kubectl apply -f <path-to-crs>
```

```tab="Command"
kubectl apply -f developer/tryout/samples/
```

!!! Note
    - The services should be created in a different namespace than the APK or Kubernetes System namespaces. 
    -  The APIs should be created in the APK deployment namespace.
