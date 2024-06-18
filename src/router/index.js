import Home from "@/views/home/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import Users from "@/views/Users.vue";
import BaseLayout from "@/layouts/default.vue";
import AuthLayout from "@/layouts/auth.vue";
import Test from "@/views/test/Test.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from "@/views/Profile.vue";


const routes = [
  {
    path: "/",
    redirect: "/home",
    component: BaseLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "users",
        name: "users",
        component: Users,
      },
      {
        path: "test",
        name: "test",
        component: Test,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "todo",
        name: "todo",
        component: () => import("@/views/utils/todo/Todo.vue")
      },
      {
        path: 'expanses',
        name: 'expanses',
        component: () => import('@/views/utils/expanses/Expanses.vue'),
      }
    ],
  },
  {
    path: "/auth/",
    name: "auth",
    component: AuthLayout,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const user = await getUser();

  if (to.matched.some((record) => record.meta.auth)) {
    if (user) {
      next();
    } else {
      alert("You don't have access");
      next("/auth/login");
    }
  } else {
    if ((user && to.name === "auth") || (!user && to.name === "auth")) {
      next("/auth/login");
    }
    if (user && (to.name === "login" || to.name === "register")) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
