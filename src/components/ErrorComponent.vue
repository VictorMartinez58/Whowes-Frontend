<template>
    <section id="content" >
        <Slider text="404 Page not found" subtext="" home="true" />
        <h1></h1>
        <h2></h2>
    </section>
</template>

<script>
import Slider from "./Slider";

export default {
    name: 'ErrorComponent',
    components:{
        Slider
    }
}
</script>
