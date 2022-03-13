import Vue from "vue";
import VueRouter from "vue-router";

import editTenant from "../components/editTenant.vue";
import contanier from "../components/Contanier.vue";
import codeConnect from "../components/codeConnect.vue";

Vue.use(VueRouter);

export const routes = [
  { path: "/", name: "home", component: contanier },
  { path: "/contanier", name: "contanier", component: contanier },
  { path: "/editTenant", name: "editTenant", component: editTenant },
  { path: "/codeConnect", name: "codeConnect", component: codeConnect },
];

const router = new VueRouter({
  routes,
});

export default router;
