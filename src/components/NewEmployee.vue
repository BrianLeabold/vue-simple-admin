<script>
import db from "./firebaseInit";
export default {
  name: "new-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  methods: {
    saveEmployee() {
      db.collection("employees")
        .add({
          employee_id: this.employee_id,
          name: this.name,
          dept: this.dept,
          position: this.position
        })
        .then(docRef => this.$router.push("/dashboard"))
        .catch(err =>
          alert(err, "Sorry, something went wrong. Please try again.")
        );
    }
  }
};
</script>
<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s6">
        <fieldset>
          <div class="row">
            <div class="col s1"></div>
            <div class="input-field col s10">
              <input
                type="text"
                v-model="employee_id"
                required
                aria-required="required"
                placeholder="Employee ID#"
                aria-placeholder="Employee ID#"
                class="green-text"
              />
            </div>
            <div class="col s1"></div>
          </div>
          <div class="row">
            <div class="col s1"></div>
            <div class="input-field col s10">
              <input
                type="text"
                v-model="name"
                required
                aria-required="required"
                placeholder="Name..."
                aria-placeholder="Name..."
              />
            </div>
            <div class="col s1"></div>
          </div>
          <div class="row">
            <div class="col s1"></div>
            <div class="input-field col s10">
              <input
                type="text"
                v-model="dept"
                required
                aria-required="required"
                placeholder="Department"
                aria-placeholder="Department"
              />
            </div>
            <div class="col s1"></div>
          </div>
          <div class="row">
            <div class="col s1"></div>
            <div class="input-field col s10">
              <input
                type="text"
                v-model="position"
                required
                aria-required="required"
                placeholder="Position"
                aria-placeholder="Position"
              />
            </div>
            <div class="col s1"></div>
          </div>
          <div class="row">
            <div class="col s12 center-align">
              <button type="submit" class="btn-floating btn-large green">
                <i class="fa fa-plus"></i>
              </button>
              <router-link to="/dashboard" class="btn-floating btn-large red">
                <i class="fas fa-times"></i>
              </router-link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<style scoped>
.input-field input[type="text"]:focus {
  color: #000;
  border-bottom: 1px solid green;
}
.btn-floating {
  margin-right: 10px;
}
</style>