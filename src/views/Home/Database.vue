<template>
	<div class="database">
		<ul class="database__schemalist">
			<li class="database__schemalist__item" v-for="schemaShape in schemaShapeList" :key="schemaShape.schemaName" @click="selectSchema(schemaShape.schemaName)">
				<i class="material-icons">layers</i>
				{{ schemaShape.schemaName }}
			</li>
		</ul>
		<div class="database__data">
			<div class="database__data__actions">
				<button @click="createData">CREATE</button>
				<button @click="refreshData">REFRESH</button>
			</div>
			<ul class="database__data__list">
				<li class="database__data__list__item" :class="{ created: !data._id }" v-for="data in selectedDataset" :key="data._id">
					<p v-for="key in getSelectedSchemaShape" :key="key.name">
						<span class="keyname">{{ key.name }} :</span>
						<input class="value" v-model="data[key.name]" />
					</p>
					<div class="database__data__list__item__actions">
						<button @click="deleteData(data)" v-if="data._id">DELETE</button>
						<button @click="updateData(data)" v-if="data._id">UPDATE</button>
						<button @click="saveData(data)" v-if="!data._id">CREATE</button>
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
	isCreateAble: boolean = true;

	async created() {
		this.$store.commit("addTask", "GET_SCHEMA_SHAPE");
		this.schemaShapeList = await this.$store.dispatch("GET_SCHEMA_SHAPE");
		this.$store.commit("clearTask", "GET_SCHEMA_SHAPE");
		this.selectSchema(this.schemaShapeList[0].schemaName);
	}
	get getSelectedSchemaShape(): any[] {
		if (this.selectedSchemaName) {
			let schemaShape = this.schemaShapeList.find((schemaShape) => schemaShape.schemaName == this.selectedSchemaName);
			if (schemaShape) return schemaShape.schemaShape;
		}
		return [];
	}
	async selectSchema(name: string) {
		this.selectedSchemaName = name;
		try {
			this.$store.commit("addTask", "GET_SCHEMA_DATASET");
			this.selectedDataset = await this.$store.dispatch("GET_SCHEMA_DATASET", {
				schemaName: name,
			});
		} catch (err) {
			alert(err.message);
		}
		this.$store.commit("clearTask", "GET_SCHEMA_DATASET");
	}

	createData() {
		if (this.isCreateAble) {
			let data: any = {};
			this.schemaShapeList
				.map((x) => x.name)
				.forEach((key) => {
					data[key] = null;
				});
			this.selectedDataset.unshift(data);
			this.isCreateAble = false;
		}
	}
	async saveData(data: any) {
		await this.$store.dispatch("CREATE_SCHEMA_DATASET", { schemaName: this.selectedSchemaName, data });
	}
	refreshData() {
		this.selectSchema(this.selectedSchemaName);
	}
	async updateData(data: any) {
		await this.$store.dispatch("UPDATE_SCHEMA_DATASET", { schemaName: this.selectedSchemaName, data });
	}
	async deleteData(data: any) {
		await this.$store.dispatch("DELETE_SCHEMA_DATASET", { schemaName: this.selectedSchemaName, data });
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
		height: 100%;
		overflow-y: auto;
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
				p {
					display: flex;
					align-items: center;
					padding: 5px 0;
					.keyname {
						user-select: none;
						display: inline-block;
						font-size: 1.2em;
						font-weight: bold;
					}
					.value {
						flex: 1;
						display: inline-block;
						font-size: 1.2em;
						margin-left: 10px;

						padding: 5px;
						border: none;

						background: none;

						&:focus {
							box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
						}
					}
				}
				.database__data__list__item__actions {
					display: flex;
					justify-content: flex-end;
					button {
						margin-left: 10px;
					}
				}
				&.created {
					background-color: #eeffee;
				}
			}
		}
	}
}
</style>
