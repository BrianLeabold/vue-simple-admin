<template>
  <div id="edit-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s6">
        <fieldset>
          <div class="row">
            <div class="col s1"></div>
            <div class="input-field col s10">
              <input
                disabled
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
                <i class="far fa-save" title="Save"></i>
              </button>
              <router-link
                v-bind:to="{name:'view-employee', params: {employee_id: this.employee_id}}"
                class="btn-floating btn-large red"
              >
                <i class="fas fa-times" title="cancel"></i>
              </router-link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "edit-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id;
            vm.name = doc.data().name;
            vm.dept = doc.data().dept;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updateEmployee() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                employee_id: this.employee_id,
                name: this.name,
                dept: this.dept,
                position: this.position
              })
              .then(() => {
                this.$router.push({
                  name: "view-employee",
                  params: {
                    employee_id: this.employee_id
                  }
                });
              });
          });
        });
    }
  }
};
</script>
<style scoped>
.input-field input[type="text"]:focus {
  color: #000;
  border-bottom: 1px solid green;
}
.btn-floating {
  margin-right: 10px;
}
</style>