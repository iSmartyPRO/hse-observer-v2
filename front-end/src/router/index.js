import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from "vue-toastification"
import { authService } from '../components/auth'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Logout from '../views/Logout.vue'

import { Role } from "../_helpers"

import VueJwtDecode from 'vue-jwt-decode'

// Users
import Users from '../views/Users/index.vue'
import UserCreate from '../views/Users/create.vue'
import UserEdit from '../views/Users/edit.vue'
import UserProfile from '../views/Users/profile.vue'

// Bracnhes
import Branches from '../views/Branches/index.vue'
import BranchCreate from '../views/Branches/create.vue'
import BranchEdit from '../views/Branches/edit.vue'

// Departments
import Departments from '../views/Departments/index.vue'
import DepartmentCreate from '../views/Departments/create.vue'
import DepartmentEdit from '../views/Departments/edit.vue'

// Observes
import Observes from '../views/Observes/index.vue'
import ObserveCreate from '../views/Observes/create.vue'

// Roles
import Roles from '../views/Roles/index.vue'
import RoleEdit from '../views/Roles/edit.vue'

// Others
import pageNotFound from '../views/PageNotFound.vue'

const toast = useToast();

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authorize: [Role.Admin, Role.Standard, Role.Observer, Role.Manager],
      menu: 'Dashboard'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      authorize: [Role.Admin, Role.Manager],
      menu: 'Users'
    }
  },
  {
    path: '/user/create',
    name: 'UserCreate',
    component: UserCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Users'
    }
  },
  {
    path: '/user/:userId',
    name: 'UserEdit',
    component: UserEdit,
    props: true,
    meta: {
      authorize: [Role.Admin],
      menu: 'Users'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    meta: {
      authorize: [Role.Admin, Role.Standard, Role.Observer, Role.Manager],
      menu: 'Profile'
    }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
    meta: {
      authorize: [Role.Admin, Role.Manager],
      menu: 'Departments'
    }
  },
  {
    path: '/department/create',
    name: 'DepartmentCreate',
    component: DepartmentCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Departments'
    }
  },
  {
    path: '/department/:departmentId',
    name: 'DepartmentEdit',
    component: DepartmentEdit,
    props: true,
    meta: {
      authorize: [Role.Admin],
      menu: 'Departments'
    }
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Branches,
    meta: {
      authorize: [Role.Admin, Role.Manager],
      menu: 'Branches'
    }
  },
  {
    path: '/branch/create',
    name: 'BranchCreate',
    component: BranchCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Branches'
    }
  },
  {
    path: '/branch/:branchId',
    name: 'BranchEdit',
    component: BranchEdit,
    props: true,
    meta: {
      authorize: [Role.Admin],
      menu: 'Branches'
    }
  },
  {
    path: '/observes',
    name: "Observes",
    component: Observes,
    meta: {
      authorize: [Role.Observer, Role.Manager],
      menu: 'Observes'
    }
  },
  {
    path: '/observe/create',
    name: "ObserveCreate",
    component: ObserveCreate,
    meta: {
      authorize: [Role.Observer],
      menu: 'Observes'
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Roles,
    meta: {
      authorize: [Role.Admin, Role.Manager],
      menu: 'Roles'
    }
  },
  {
    path: '/role/:roleId',
    name: 'RoleEdit',
    component: RoleEdit,
    props: true,
    meta: {
      authorize: [Role.Admin],
      menu: 'Roles'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: pageNotFound
  },
  {
    path: "/:catchAll(.*)",
    name: '404',
    component: pageNotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const {authorize, title} = to.meta
  if(typeof(authorize) !== 'undefined'){
    // check if route is restricted by role
    const roles = VueJwtDecode.decode(authService.currentUserValue.token).roles
    if( authorize.length && !roles.find(item => { return (authorize.map(item => item.toLowerCase())).includes(item.toLowerCase())}) ? true : false ) {
      toast.error("Запрещенный маршрут")
      return next({ path: from.path })
    }
  }
  next()
})

export default router
