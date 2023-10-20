<template>
	<v-header />
	<div class="main-bot">
		<div class="main-content-box">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts" name="index">
import vHeader from '@c/header/';

</script>
<style lang="less" scoped>
.main-bot {
	flex: 1;
	display: flex;
	height: 100%;
}

.main-content-box {
	flex: 1;
	height: 100%;
	overflow: hidden;
}
</style>