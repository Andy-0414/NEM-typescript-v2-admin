import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: "",
		loginType: "",
		task: [] as string[],
	},
	mutations: {
		addTask(state, data: string) {
			let idx = state.task.indexOf(data);
			if (idx == -1) state.task.push(data);
		},
		clearTask(state, data: string) {
			let idx = state.task.indexOf(data);
			if (idx != -1) state.task.splice(idx, 1);
		},
	},
	actions: {
		async GET_LOGIN_TYPE({ commit, state }, data) {
			let response = await (await axios.get(`/admin/get-login-type`, data)).data;
			let loginType = response.data;
			if (response.result) {
				state.loginType = loginType;
			} else {
				throw new Error("서버 에러");
			}
		},
		async LOGIN({ commit, state }, data): Promise<boolean> {
			let response = await (await axios.post(`/auth/login`, data)).data;
			let user = response.data;
			if (response.result) {
				if (state.loginType == "TOKEN") {
					state.token = user;
				}
				return true;
			} else {
				throw new Error("로그인 실패");
			}
		},
	},
	modules: {},
});

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.common["Authorization"] = store.state.token;

export default store;
