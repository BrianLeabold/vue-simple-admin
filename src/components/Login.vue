<template id="login">
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green text-white center">
          <h3>Login</h3>
          <form action>
            <div class="input-field">
              <i class="material-icons white-text prefix">email</i>
              <input type="text" name="email" id="email" aria-placeholder="email" v-model="email" />
              <label for="email" class="white-text">email</label>
            </div>
            <div class="input-field">
              <i class="material-icons white-text prefix">lock</i>
              <input
                type="password"
                name="password"
                id="password"
                aria-placeholder="password"
                v-model="password"
              />
              <label for="password" class="white-text">password</label>
            </div>
            <button
              v-on:click="login"
              class="btn btn-large grey lighten-4 black-text btn-login"
              type="submit"
            >Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You logged in with ${user.user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
.btn-login {
  font-size: 1.1rem;
  font-weight: bold;
}
.input-field input[type="text"]:focus {
  border-bottom: 1px solid whitesmoke;
}
.input-field input[type="password"]:focus {
  border-bottom: 1px solid whitesmoke;
}
</style>