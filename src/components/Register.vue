<template id="register">
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="register card-panel grey lighten-4 text-white center">
          <h3>Register</h3>
          <form>
            <div class="input-field">
              <i class="material-icons black-text prefix">email</i>
              <input type="text" name="email" id="email" aria-placeholder="email" v-model="email" />
              <label for="email" class="black-text">email</label>
            </div>
            <div class="input-field">
              <i class="material-icons black-text prefix">lock</i>
              <input
                type="password"
                name="password"
                id="password"
                aria-placeholder="password"
                v-model="password"
              />
              <label for="password" class="black-text">password</label>
            </div>
            <button
              v-on:click="register"
              class="btn btn-large green black-text btn-login"
              type="submit"
            >Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account created for ${user.user.email}`);
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
  border-bottom: 1px solid black;
}
.input-field input[type="password"]:focus {
  border-bottom: 1px solid black;
}
</style>