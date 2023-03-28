// Composables
import { createRouter, createWebHashHistory } from "vue-router";
import localStorageEnums from "@/enums/LocalStorageEnums";

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
    path: "/playlist",
    component: () => import("@/layouts/default/PlaylistLayout.vue"),
    children: [
      {
        path: "",
        name: "Playlist",
        component: () => import("@/views/Playlist.vue"),
      },
    ],
  },
  {
    path: "/error",
    component: () => import("@/layouts/default/Error.vue"),
    children: [
      {
        path: "",
        name: "Error",
        component: () => import("@/views/Error.vue"),
      },
    ],
  },
  {
    path: "/requestAccess",
    component: () => import("@/layouts/default/Splash.vue"),
    children: [
      {
        path: "",
        name: "RequestAccess",
        component: () => import("@/views/RequestAccess.vue"),
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
  scrollBehavior(to, from, savedPosition) {
    if (to.path == "/home") {
      return new Promise((resolve, reject) => {
        if (savedPosition) {
          const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0].target.clientHeight >= savedPosition.top + screen.height) {
              resolve(savedPosition);
              resizeObserver.disconnect();
            }
          });

          resizeObserver.observe(document.body);
        } else {
          resolve({ top: 0 });
        }
      });
    } else return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  if (Object.keys(to.query).includes("accessToken") && Object.keys(to.query).includes("refreshToken")) {
    if (typeof to.query["accessToken"] === "string")
      localStorage.setItem(localStorageEnums.ACCESS_TOKEN, to.query["accessToken"]);

    if (typeof to.query["refreshToken"] === "string")
      localStorage.setItem(localStorageEnums.REFRESH_TOKEN, to.query["refreshToken"]);

    router.push("home?");
  }

  return true;
});

export default router;
