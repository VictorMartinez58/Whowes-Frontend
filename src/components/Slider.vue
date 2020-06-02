<template>
  <div id="slider" :class="{
    'slider-big': home,
    'slider-small': !home,
  }">
    <h1>{{text}}</h1>
    <router-link to="/Home" class="btn-white" v-if="btn">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: ['text', 'subtext', 'home', 'btn']
};
</script>
