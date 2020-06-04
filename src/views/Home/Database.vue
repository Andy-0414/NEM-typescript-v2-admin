<template>
	<div class="database">
		<ul class="database__schemalist">
			<li class="database__schemalist__item" v-for="schemaShape in schemaShapeList" :key="schemaShape.schemaName" @click="selectSchema(schemaShape.schemaName)">
				<i class="material-icons">layers</i>
				{{ schemaShape.schemaName }}
			</li>
		</ul>
		<div class="database__data">{{ getSelectedSchemaShape }}</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Database extends Vue {
	schemaShapeList: any[] = [];
	selectedSchemaName: string = "";
	async created() {
		this.schemaShapeList = await this.$store.dispatch("GET_SCHEMA_SHAPE");
	}
	get getSelectedSchemaShape(): any[] {
		if (this.selectedSchemaName) {
			let schemaShape = this.schemaShapeList.find((schemaShape) => schemaShape.schemaName == this.selectedSchemaName);
			if (schemaShape) return schemaShape.schemaShape;
		}
		return [];
	}
	selectSchema(name: string) {
		this.selectedSchemaName = name;
	}
}
</script>

<style lang="scss" scoped>
.database {
	display: flex;
	.database__schemalist {
		min-width: 300px;
		background-color: $block-color;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

		.database__schemalist__item {
			cursor: pointer;

			padding: 15px;

			display: flex;
			align-items: center;
		}
	}
	.database__data {
		flex: 1;
	}
}
</style>
