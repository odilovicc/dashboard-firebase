import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Users from "@/views/Users.vue";
import BaseLayout from "@/layouts/default.vue";
import AuthLayout from "@/layouts/auth.vue";
import Test from "@/views/test/Test.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Profile from "@/views/Profile.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

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
        meta: { role: "admin" }, // Доступ только для админа
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
        component: () => import("@/views/utils/todo/Todo.vue"),
      },
      {
        path: "expanses/",
        name: "expanses",
        component: () => import("@/layouts/expanses/layout.vue"),
        children: [
          {
            path: "today",
            name: "expanse-today",
            component: () =>
              import("@/views/utils/expanses/TodaysExpanses.vue"),
          },
          {
            path: "all",
            name: "expanse-all",
            component: () => import("@/views/utils/expanses/AllExpanses.vue"),
          },
          {
            path: "add",
            name: "expanse-add",
            component: () => import("@/views/utils/expanses/AddExpanse.vue"),
          },
        ],
      },
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

const getUserRole = async (user) => {
  if (!user) return null;
  const db = getDatabase();
  const userRef = ref(db, "users/" + user.uid);
  const userSnapshot = await get(userRef);
  return userSnapshot.exists() ? userSnapshot.val().role : null;
};

router.beforeEach(async (to, from, next) => {
  const user = await getUser();
  const userRole = await getUserRole(user);

  if (to.matched.some((record) => record.meta.auth)) {
    if (user) {
      if (to.meta.role && to.meta.role !== userRole) {
        next("/home");
      } else {
        next();
      }
    } else {
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
