// Composables
import { createRouter, createWebHashHistory } from "vue-router";
import localStorageEnums from "@/enums/localStorageEnums";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Splash.vue"),
    children: [
      {
        path: "",
        name: "Splash",
        component: () => import("@/views/Splash.vue"),
      },
    ],
  },
  {
    path: "/home",
    component: () => import("@/layouts/default/Main.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/:token(access_token.*)",
    redirect: (to: any) => ({
      path: "/home",
      query: { tokenString: to.params.token },
    }),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  console.log(to);

  if (
    Object.keys(to.query).includes("accessToken") &&
    Object.keys(to.query).includes("refreshToken")
  ) {
    if (typeof to.query["accessToken"] === "string")
      localStorage.setItem(
        localStorageEnums.ACCESS_TOKEN,
        to.query["accessToken"]
      );

    if (typeof to.query["refreshToken"] === "string")
      localStorage.setItem(
        localStorageEnums.REFRESH_TOKEN,
        to.query["refreshToken"]
      );

    router.push("home");
  }

  return true;
});

export default router;
