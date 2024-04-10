import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/TabsPage.vue";
import Status from "@/views/status.vue";
import Login from "@/views/login.vue";
import Stream from "@/views/stream.vue";
import Config from "@/views/config.vue";
import Logs from "@/views/logs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/stream",
  },
  {
    path: "/status",
    component: Status,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/stream",
      },
      {
        path: "stream",
        component: Stream,
      },
      {
        path: "config",
        component: Config,
      },
      {
        path: "logs",
        component: Logs,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
