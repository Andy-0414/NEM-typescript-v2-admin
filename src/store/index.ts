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
		async GET_LOGIN_TYPE({ commit, state }) {
			let response = await (await axios.get(`/admin/get-login-type`)).data;
			let loginType = response.data;
			if (response.result) {
				state.loginType = loginType;
				return loginType;
			} else {
				throw new Error("서버 에러");
			}
		},
		async LOGIN({ commit, state }, data): Promise<boolean> {
			let response = await (await axios.post(`/auth/user/login`, data)).data;
			let user = response.data;
			if (response.result) {
				if (state.loginType == "TOKEN") {
					state.token = user;
					axios.defaults.headers.common["Authorization"] = user;
				}
				return true;
			} else {
				throw new Error("로그인 실패");
			}
		},
		async LOGIN_DATA({ commit, state }, data): Promise<any> {
			let response = await (await axios.get(`/auth/user/my`)).data;
			let user = response.data;
			if (response.result) {
				return user;
			} else {
				throw new Error("로그인 실패");
			}
		},
		async GET_SCHEMA_SHAPE({ commit, state }, data): Promise<any> {
			let response = await (await axios.get(`/admin/get-schema-shape`)).data;
			let shape = response.data;
			if (response.result) {
				console.log(shape);
				return shape;
			} else {
				throw new Error("DB 가져오기 실패");
			}
		},
	},
	modules: {},
});

axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.withCredentials = true;

export default store;
