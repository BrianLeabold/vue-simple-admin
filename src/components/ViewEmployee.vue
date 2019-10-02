<script>
import db from "./firebaseInit";
export default {
  name: "view-employee",
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
    deleteEmployee() {
      if (confirm("Are you sure you want to delete this employee?")) {
        db.collection("employees")
          .where("employee_id", "==", this.$route.params.employee_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/dashboard");
            });
          });
      }
    }
  }
};
</script>
<template>
  <div id="view-employee">
    <h3>Employee View</h3>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Id# : {{employee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <div class="row">
      <div class="col s12 center-align">
        <router-link class="btn-floating btn-large green" to="/dashboard">
          <i class="fas fa-arrow-left"></i>
        </router-link>
        <button class="btn-floating btn-large red" @click="deleteEmployee">
          <i class="fas fa-times"></i>
        </button>
        <router-link
          v-bind:to="{name:'edit-employee', params:{employee_id: employee_id}}"
          class="btn-floating btn-large green"
        >
          <i class="fas fa-pen"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-floating {
  margin-right: 10px;
}
</style>