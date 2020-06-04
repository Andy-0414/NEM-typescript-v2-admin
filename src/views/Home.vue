<template>
	<div class="home">
		<div class="home__menu">
			<router-link :to="{name:menu.name}" v-for="menu in menuList" :key="menu.name">
				<i class="material-icons">{{menu.icon}}</i>
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
			icon: "home"
		},
		{
			name: "Home.Database",
			icon: "dns"
		}
	];
}
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	.home__menu {
		background-color: #333333;
		color: white;

		display: flex;
		flex-direction: column;
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
