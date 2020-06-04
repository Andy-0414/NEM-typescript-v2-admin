<template>
	<div class="home">
		<div class="home__menu">
			<router-link :to="{ name: menu.name }" v-for="menu in menuList" :key="menu.name">
				<i class="material-icons">{{ menu.icon }}</i>
			</router-link>
		</div>
		<div class="home__content">
			<router-view class="home__content__router"></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface Menu {
	name: string;
	icon: string;
}

@Component
export default class Home extends Vue {
	menuList: Menu[] = [
		{
			name: "Home.Main",
			icon: "home",
		},
		{
			name: "Home.Database",
			icon: "dns",
		},
	];
	async created() {
		try {
			this.$store.commit("addTask", "LOGIN_DATA");
			let user = await this.$store.dispatch("LOGIN_DATA");
			this.$store.commit("clearTask", "LOGIN_DATA");
			if (!user) {
				this.$router.replace("/login");
			}
		} catch (err) {
			this.$router.replace("/login");
		}
	}
}
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	.home__menu {
		background-color: #333333;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
		user-select: none;
		
		color: white;

		display: flex;
		flex-direction: column;

		z-index: 500;
		i {
			width: 60px;
			height: 60px;

			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
		}
	}
	.home__content {
		flex: 1;
		.home__content__router {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
