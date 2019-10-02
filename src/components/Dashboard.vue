<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      employees: []
    };
  },
  created() {
    db.collection("employees")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
        });
      });
  }
};
</script>
<template>
  <div id="dashboard">
    <h3>Dashboard</h3>
    <div class="row">
      <ul class="collection with-header col s8">
        <li class="collection-header row">
          <h4 class="col s12 left-align">
            Employees
            <router-link
              to="/new"
              title="Add a New employee"
              aria-label="Add a New employee"
              class="add-btn btn-floating btn-large green"
            >
              <i class="fa fa-plus"></i>
            </router-link>
          </h4>
        </li>
        <li v-for="employee in employees" :key="employee.id" class="collection-item">
          {{employee.employee_id}} | {{employee.name}} |
          <span class="chip">{{employee.dept}}</span>
          | {{employee.position}}
          <router-link
            class="secondary-content"
            v-bind:to="{name:'view-employee', params: {employee_id: employee.employee_id}}"
          >
            <i class="fa fax5 fa-eye"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.add-btn {
  margin-left: 15px;
  margin-bottom: 15px;
}
</style>