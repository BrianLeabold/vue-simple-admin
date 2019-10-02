<template>
  <div id="app">
    <div class="center-align">
      <h1>Consult Brian &copy; 2019</h1>
    </div>
    <Navbar :key="$route.fullPath" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: { Navbar }
};
</script>

<style>
.nav-link {
  font-size: 1.1rem;
  color: whitesmoke;
  cursor: pointer;
}
</style>
