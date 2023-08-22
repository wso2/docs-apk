# Prerequisites

1. [Install Helm](https://helm.sh/docs/intro/install/).
2. [Install the Kubernetes Client (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
3. [Setup a Kubernetes Cluster](https://kubernetes.io/docs/setup).
     
     If you want to run APK on your local machine, you need to install [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation), [minikube](https://minikube.sigs.k8s.io/), [kind](https://kind.sigs.k8s.io/docs/) or a similar software.

4. Setup a deployment namespace.
   
     `kubectl create namespace <namespace>`

# Requirements

<table>
        <tbody>
            <tr>
                <th colspan="2" >Requirement</th>
                <th>Version</th>
            </tr>
            <tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Kubernetes cluster(minukube)</pre></td>
                <td class="confluenceTd">1.26.3 - 1.27.4</td>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Kubernetes cluster(kind)</pre></td>
                <td class="confluenceTd">1.26.3</td>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Kubernetes cluster(Rancher)</pre></td>
                <td class="confluenceTd">1.27.2</td>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Kubernetes cluster(Openshift)</pre></td>
                <td class="confluenceTd">4.13.3</td>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Minikube</pre></td>
                <td class="confluenceTd">1.30.1 - 1.31.1</td> 
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Rancher</pre></td>
                <td class="confluenceTd">1.9.1</td>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Kind</pre></td>
                <td class="confluenceTd">1.25.3</td>  
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Openshift</pre></td>
                <td class="confluenceTd">2.23.0+ddcfe8</td> 
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Docker Engine</pre></td>
                <td class="confluenceTd">23.0.2 or above</td> 
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Redis</pre></td>
                <td class="confluenceTd">17.8.0</td> 
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Cert-manager</pre></td>
                <td class="confluenceTd">1.10.1</td> 
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>Postgresql</pre></td>
                <td class="confluenceTd">11.9.6</td> 
            </tr>
        </tbody>
</table>