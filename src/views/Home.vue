<template>
	<div class="home">
        <div class="home__menu"></div>
        <div class="home__content"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    .home__menu{

    }
    .home__content{
        
    }
}
</style>
