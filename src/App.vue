<template>
	<div id="app">
		<div class="loading" v-if="isTask">
			<div class="loading__bar"></div>
		</div>
		<router-view class="router" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
	async created() {
		this.$router.beforeEach((to, from, next) => {
			this.$store.state.task = [];
			next();
		});

		this.$store.commit("addTask", "GET_LOGIN_TYPE");
		await this.$store.dispatch("GET_LOGIN_TYPE");
		this.$store.commit("clearTask", "GET_LOGIN_TYPE");
	}
	get isTask(): boolean {
		return this.$store.state.task.length > 0;
	}
}
</script>

<style lang="scss">
@import "@/main.scss";
#app {
	width: 100%;
	height: 100%;
	.loading {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.2);
		.loading__bar {
			position: absolute;
			background-color: rgba(0, 0, 0, 0.2);
			top: 0;
			left: 0;

			width: 100%;
			height: 5px;
			&::after {
				content: "";
				position: absolute;
				background-color: $primary-color;

				width: 40%;
				height: 100%;
				animation: move 1s infinite;
			}
		}
	}
	.router {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
}
@keyframes move {
	0% {
		left: -40%;
	}
	100% {
		left: 100%;
	}
}
</style>
