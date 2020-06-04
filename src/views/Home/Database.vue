<template>
	<div class="database">{{this.schemaShape}}</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Database extends Vue {
	schemaShape: any[] = [];
	async created() {
		this.schemaShape = await this.$store.dispatch("GET_SCHEMA_SHAPE");
	}
}
</script>

<style lang="scss" scoped>
</style>
