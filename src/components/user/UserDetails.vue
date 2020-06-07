<template>
  <div v-if="user">
    <Slider v-bind:text='"Welcome "+ user.name' />
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Slider from "../Slider";

export default {
  name: "UserDetails",
  props: ["user"],
  components: {
    Slider
  },
  data() {
    return {
      
    };
  },
};
</script>
<style scoped></style>