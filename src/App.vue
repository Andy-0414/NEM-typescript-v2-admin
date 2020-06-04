<template>
	<div id="app">
		<router-view class="router" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
	async created() {
        this.$store.commit("addTask","GET_LOGIN_TYPE")
        await this.$store.dispatch("GET_LOGIN_TYPE");
        this.$store.commit("clearTask","GET_LOGIN_TYPE")
	}
}
</script>

<style lang="scss">
@import "@/main.scss";
#app {
	width: 100%;
	height: 100%;
	.router {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
}
</style>
