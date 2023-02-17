<template>
    <main class="apis-page">
        <iframe class = "api-container" name="stoplight-iframe" width="100%" :src="$frontmatter.url" frameborder="0" ></iframe>
    </main>
</template>

<script>
export default{
    name: 'APIStoplight',
    methods:{
        log(msg){console.log(msg);}
    },
    mounted (){
        // When a URL with a hash is loaded, take the hash and send to iframe
        window.addEventListener('load', function () {
            var stopLightIframe = document.getElementsByName("stoplight-iframe")[0]
            
            stopLightIframe.contentWindow.postMessage(JSON.stringify({
                type: "hashchange",
                hash: window.location.hash
            }), '*');
        });

        // Listening to URL hash changes in the iframe and changes the parent URL hash
        window.onmessage = function(e) {
            try {
                const { type, hash } = JSON.parse(e.data)
                if (type === "hashchange") {
                    window.location.hash = hash
                }
            } catch (err) {
                console.error(err)
            }
        };
    }
}
</script>

<style src="../theme/styles/components/apiOverview.styl" lang="stylus">
