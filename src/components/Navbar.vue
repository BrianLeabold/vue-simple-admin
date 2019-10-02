<script>
export default {
  name: "navbar"
};
</script>
<template>
  <nav id="navbar">
    <div class="nav-wrapper green">
      <!-- <div class="container"> -->
      <router-link class="brand-logo" to="/">Home</router-link>
      <ul class="right">
        <li>
          <router-link class="nav-item" to="/about">About</router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" class="nav-item" to="/dashboard">Admin</router-link>
        </li>
        <li>
          <router-link v-if="!isLoggedIn" class="nav-item" to="/register">Register</router-link>
        </li>
        <li>
          <router-link v-if="!isLoggedIn" class="nav-item" to="/login">Login</router-link>
        </li>
        <li>
          <span v-if="isLoggedIn" v-on:click="logout" class="nav-item">LogOut</span>
        </li>
        <li v-if="isLoggedIn">
          <span class="email black-text">Welcome {{currentUser}}</span>
        </li>
      </ul>
    </div>
    <!-- </div> -->
  </nav>
</template>
<script>
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout(e) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
.nav-wrapper {
  padding-left: 50px;
  padding-right: 50px;
}
.brand-logo:hover {
  color: black;
  text-decoration: underline;
}
.nav-item {
  color: whitesmoke;
  font-size: 1.1rem;
  padding-right: 10px;
}
.nav-item:hover {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}
.nav-item:active {
  color: gray;
  text-decoration: underline;
}
.email {
  padding-left: 10px;
}
</style>