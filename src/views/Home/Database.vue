<template>
	<div class="database">
		<ul class="database__schemalist">
			<li
				class="database__schemalist__item"
				v-for="schemaShape in schemaShapeList"
				:key="schemaShape.schemaName"
				@click="selectSchema(schemaShape.schemaName)"
			>
				<i class="material-icons">layers</i>
				{{ schemaShape.schemaName }}
			</li>
		</ul>
		<div class="database__data">
			<div class="database__data__actions">
				<button>CREATE</button>
				<button>REFRESH</button>
			</div>
			<ul class="database__data__list">
				<li class="database__data__list__item" v-for="data in selectedDataset" :key="data._id">
					<p v-for="key in getSelectedSchemaShape" :key="key.name">
						<span class="keyname">{{key.name}} :</span>
						<span class="valeue">{{data[key.name]}}</span>
					</p>
					<div class="database__data__list__item__actions">
						<button>DELETE</button>
						<button>UPDATE</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Database extends Vue {
	schemaShapeList: any[] = [];
	selectedSchemaName: string = "";
	selectedDataset: any[] = [];
	async created() {
		this.$store.commit("addTask", "GET_SCHEMA_SHAPE");
		this.schemaShapeList = await this.$store.dispatch("GET_SCHEMA_SHAPE");
		this.$store.commit("clearTask", "GET_SCHEMA_SHAPE");
	}
	get getSelectedSchemaShape(): any[] {
		if (this.selectedSchemaName) {
			let schemaShape = this.schemaShapeList.find(
				schemaShape => schemaShape.schemaName == this.selectedSchemaName
			);
			if (schemaShape) return schemaShape.schemaShape;
		}
		return [];
	}
	async selectSchema(name: string) {
		this.selectedSchemaName = name;
		try {
			this.$store.commit("addTask", "GET_SCHEMA_DATASET");
			this.selectedDataset = await this.$store.dispatch(
				"GET_SCHEMA_DATASET",
				{
					schemaName: name
				}
			);
		} catch (err) {
			alert(err.message);
		}
		this.$store.commit("clearTask", "GET_SCHEMA_DATASET");
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

		.database__data__actions {
			margin: 20px;
			display: flex;
			justify-content: flex-end;
			button {
				margin-left: 10px;
			}
		}
		.database__data__list {
			.database__data__list__item {
				background-color: $block-color;
				padding: 30px;
				margin: 20px;
				border-radius: 10px;
				box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

				.keyname {
					display: inline-block;
					font-size: 1.2em;
					font-weight: bold;
				}
				.value {
					display: inline-block;
					font-size: 1.2em;
					margin-left: 10px;
				}
				.database__data__list__item__actions {
					display: flex;
					justify-content: flex-end;
					button {
						margin-left: 10px;
					}
				}
			}
		}
	}
}
</style>
