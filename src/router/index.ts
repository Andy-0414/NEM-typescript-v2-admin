import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Main from "@/views/Home/Main.vue";
import Database from "@/views/Home/Database.vue";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home,
		children: [
			{ path: "/", name: "Home.Main", component: Main },
			{ path: "/database", name: "Home.Database", component: Database },
		],
	},
	{ path: "/login", name: "Login", component: Login },
];
const router = new VueRouter({ mode: "history", base: process.env.BASE_URL, routes });
export default router;
