<template>
	<div class="login">
		<form action="javascript:void(0)" class="login__box">
			<h1>NEM-TYPESCRIPT-V2</h1>
			<p>Admin Console</p>
			<input class="id" type="text" autocomplete="email" placeholder="ID" />
			<input class="password" type="password" autocomplete="current-password" placeholder="PASSWORD" />
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	.login__box {
		display: flex;
		flex-direction: column;

        background-color: $block-color;
        padding: 50px;
        border-radius: 10px;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.1);

		h1 {
			font-size: 2em;
            text-align: center;
		}
		p {
			font-size: 1.5em;
            text-align: center;
            margin-bottom: 50px;
            color: $primary-color;
        }
        input.id{
            margin-bottom: 20px;
        }
	}
}
</style>
