<template>
	<div class="login">
		<form action="javascript:void(0);" @submit="login" class="login__box">
			<h1>NEM-TYPESCRIPT-V2</h1>
			<p>Admin Console</p>
			<input
				v-model="userID"
				class="id"
				type="text"
				name="userID"
				autocomplete="email"
				placeholder="ID"
			/>
			<input
				v-model="password"
				class="password"
				type="password"
				name="password"
				autocomplete="current-password"
				placeholder="PASSWORD"
			/>
			<button type="submit">LOGIN</button>
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
	userID: string = "";
	password: string = "";
	async created() {
		try {
			this.$store.commit("addTask", "LOGIN_DATA");
			let user = await this.$store.dispatch("LOGIN_DATA");
			this.$store.commit("clearTask", "LOGIN_DATA");
			if (user) {
				this.$router.replace("/");
			}
		} catch (err) {}
	}
	async login() {
		if (this.$store.state.loginType) {
			try {
				this.$store.commit("addTask", "LOGIN");
				let result = await this.$store.dispatch("LOGIN", {
					userID: this.userID,
					password: this.password
				});
				this.$store.commit("clearTask", "LOGIN");

				if (result) {
					this.$store.commit("addTask", "LOGIN_DATA");
					let user = await this.$store.dispatch("LOGIN_DATA");
					this.$store.commit("clearTask", "LOGIN_DATA");

					if (user.isAdmin) {
						this.$router.replace("/");
					} else {
						alert("관리자 계정이 아닙니다.");
					}
				}
			} catch (err) {
				alert(err.message);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	.login__box {
		display: flex;
		flex-direction: column;

		background-color: $block-color;
		padding: 50px;
		border-radius: 10px;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

		h1 {
			font-size: 2em;
			text-align: center;
		}
		p {
			font-size: 1.5em;
			text-align: center;
			margin-bottom: 50px;
			color: $primary-color;
		}
		input {
			margin-bottom: 20px;
		}
	}
}
</style>
