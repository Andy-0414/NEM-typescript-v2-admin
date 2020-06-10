<template>
	<div class="main">
		<div class="main__content">NEM TYPESCRIPT ADMIN CONSOLE</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Main extends Vue {}
</script>

<style lang="scss" scoped>
.main {
	padding: 20px;
	.main__content {
		padding: 30px;

		border-radius: 10px;
		background-color: $block-color;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
	}
}
</style>
