<template>
	<section class="option-panel">
		<keep-alive>
			<component :is="currentTool.optionPanleName"></component>
		</keep-alive>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex';
	import ModulesPanel from './ModulesPanel/ModulesPanel.vue';

	let _this;

	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['currentTool'])
		},
		components: {
			ModulesPanel
		},
		mounted() {
			_this = this;
		}
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.option-panel{
		@include box-sizing(border-box);
		height: 34px;
		background-color: #535353;
		border-top: 1px solid #6a6a6a;
		border-bottom: 1px solid #282828;
		position: relative;
	}
</style>