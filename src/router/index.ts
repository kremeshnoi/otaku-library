//Libraries
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		meta: { layout: "unauthorized" },
		component: () => import("../views/Home.vue")
	},
	{
		path: "/search",
		name: "Search",
		meta: { layout: "unauthorized" },
		component: () => import("../views/Search.vue")
	},
	{
		path: "/library",
		name: "Library",
		meta: { layout: "unauthorized" },
		component: () => import("../views/Library.vue")
	},
	{
		path: "/sign-up",
		name: "SignUp",
		meta: { layout: "authentication" },
		component: () => import("../views/SignUp.vue")
	},
	{
		path: "/sign-in",
		name: "SignIn",
		meta: { layout: "authentication" },
		component: () => import("../views/SignIn.vue")
	},
	{
		path: "/recovery",
		name: "Recovery",
		meta: { layout: "authentication" },
		component: () => import("../views/Recovery.vue")
	}

];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
