import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Home from './views/Home.vue';
import Dashboard from './components/Dashboard.vue';
import NewEmployee from './components/NewEmployee.vue';
import EditEmployee from './components/EditEmployee.vue';
import ViewEmployee from './components/ViewEmployee.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// RouteGuards
router.beforeEach((to, from, next) => {
  // check for requiersAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT loggedin
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to Route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if loggedin
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to Route
      next();
    }
  } else {
    //Proceed to Route
    next();
  }
});

export default router;
