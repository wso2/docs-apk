## RouteMetadata

<p>
<p>RouteMetadata is the Schema for the routemetadata API</p>
</p>
<table>
	<thead>
		<tr>
			<th>Field</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>metadata</code></br>
				<em>
					<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#objectmeta-v1-meta">
						Kubernetes meta/v1.ObjectMeta
					</a>
				</em>
			</td>
			<td>
				Refer to the Kubernetes API documentation for the fields of the
				<code>metadata</code> field.
			</td>
		</tr>
		<tr>
			<td>
				<code>spec</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.RouteMetadataSpec">
						RouteMetadataSpec
					</a>
				</em>
			</td>
			<td>
				<br />
				<br />
				<table>
					<tr>
						<td>
							<code>api</code></br>
							<em>
								<a href="#dp.wso2.com/v2alpha1.API">API</a>
							</em>
						</td>
						<td>
							<em>(Optional)</em>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<code>status</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.PolicyStatus">
						PolicyStatus
					</a>
				</em>
			</td>
			<td>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.RouteMetadataSpec">RouteMetadataSpec
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.RouteMetadataSpec" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.RouteMetadata">RouteMetadata</a>)
</p>
<p>
<p>RouteMetadataSpec defines the desired state of RouteMetadata</p>
</p>
<table>
	<thead>
		<tr>
			<th>Field</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>api</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.API">API</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.API">API
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.API" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.RouteMetadataSpec">RouteMetadataSpec</a>)
</p>
<p>
<p>API represents the API metadata for the RoutePolicy</p>
</p>
<table>
	<thead>
		<tr>
			<th>Field</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>apiCreator</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>apiCreatorTenantDomain</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>apiProperties</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.Property">[]Property</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>context</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>definition</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>definitionFileRef</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.ValueRef">ValueRef</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>definitionPath</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				Default: <code>/api-definition</code>
			</td>
		</tr>
		<tr>
			<td>
				<code>envType</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				Allowed values: <code>production</code>, <code>staging</code>, <code>development</code>. Default: <code>production</code>
			</td>
		</tr>
		<tr>
			<td>
				<code>environment</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>name</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>organization</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>type</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>uuid</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>version</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
	</tbody>
	</table>

<h3 id="dp.wso2.com/v2alpha1.Property">Property
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.Property" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.API">API</a>)
</p>
<p>
<p>Property holds key value pair of APIProperties</p>
</p>
<table>
	<thead>
		<tr>
			<th>Field</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>name</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>value</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.ValueRef">ValueRef
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.ValueRef" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.API">API</a>)
</p>
<p>
<p>ValueRef contains the definition of the API in a referent (e.g., a ConfigMap).</p>
</p>
<table>
	<thead>
		<tr>
			<th>Field</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<code>group</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
			</td>
		</tr>
		<tr>
			<td>
				<code>kind</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
			</td>
		</tr>
		<tr>
			<td>
				<code>name</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.PolicyStatus">PolicyStatus
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.PolicyStatus" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.RouteMetadata">RouteMetadata</a>)
</p>
<p>
<p>PolicyStatus defines the common attributes that all Policies should include within their status.</p>
</p>

<hr />
<p><em>
		Generated with <code>gen-crd-api-reference-docs</code>.
</em></p>
