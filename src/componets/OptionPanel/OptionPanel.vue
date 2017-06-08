<template>
	<section class="option-panel">
		<keep-alive>
			<component :is="currentTool.optionPanleName"></component>
		</keep-alive>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex';
	import MapArea from './MapArea/MapArea.vue';
	import SelectPanel from './SelectPanel/SelectPanel.vue';
	import ScalePanel from './ScalePanel/ScalePanel.vue';
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
			MapArea,
			SelectPanel,
			ScalePanel,
			ModulesPanel
		},
		mounted() {
			_this = this;
		}
	};
</script>

<style lang="scss">
	.option-panel{
		height: 32px;
		background-color: #535353;
		border-top: 1px solid #6a6a6a;
		border-bottom: 1px solid #282828;
		position: relative;
	}
</style>