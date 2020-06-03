<template>
	<div class="home">Home</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
	color: $primary-color;
}
</style>
