//Libraries
import Vue from "vue";
import App from "./App.vue";
import VueMeta from "vue-meta"
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

//Libraries + Configurations
import router from "./router";
import store from "./store";
import "./registerServiceWorker.ts";

//Styles
import "./assets/styles/base/base.sass"
import "./assets/styles/base/reset.sass"
import "./assets/styles/theme/material-icons.sass"
import "./assets/styles/theme/days-one-regular.sass"

Vue.config.productionTip = false;
Vue.use(VueMeta, VueAwesomeSwiper)

const firebaseConfig = {
	apiKey: "AIzaSyD2Q4AAfZcG9elxTPTPmzADyY00YDiQpLw",
	authDomain: "anime-library-72ebd.firebaseapp.com",
	databaseURL: "https://anime-library-72ebd.firebaseio.com",
	projectId: "anime-library-72ebd",
	storageBucket: "anime-library-72ebd.appspot.com",
	messagingSenderId: "107283771690",
	appId: "1:107283771690:web:ccad8edf8dcdbc158dae53",
	measurementId: "G-02RXVDVNL3"
};

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(()=> {
	if(!app) {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	}
})
