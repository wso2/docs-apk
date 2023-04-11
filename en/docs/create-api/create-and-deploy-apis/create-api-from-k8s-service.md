Follow these two steps to create an API by using an exising `Service` resoruce for your backend:

- [Retrieve/search services](../../../catalogs/api-reference-runtime/#tag/Import-Export/operation/importAPI) to see backend services avilable as Kubernetes `Service` resources

- [Create a new API](../../../catalogs/api-reference-runtime/#tag/APIs/operation/getAllAPIs) by providing `id` property of selected `Service` in the above response (This is the `spec.metadata.uid` of `Service` resoruce)

