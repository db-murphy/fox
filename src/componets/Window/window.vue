<template>
	<div class="win-wrap">
		<!-- window面板tab标签开始 -->
		<win-tab></win-tab>
		<!-- window面板tab标签结束 -->

		<div v-if="getCurrentFileId" class="win-con">
			<!-- <map-area-win></map-area-win> -->
			<!-- <picture-win></picture-win> -->
			<component v-if="getCurrentModuleName" :is="winName[getCurrentModuleName]"></component>
			<stage-win v-if="!getCurrentModuleName"></stage-win>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import MapAreaWin from './MapAreaWin/MapAreaWin.vue';
	import PictureWin from './PictureWin/PictureWin.vue';
	import TickWin from './TickWin/TickWin.vue';
	import SkuWin from './skuWin/skuWin.vue';
	import StageWin from './StageWin/StageWin.vue';
	import WinTab from './WinTabs/WinTab';

	export default{
		data() {
			return {
				winName: {
					PictureCustom: 'PictureWin',
					MapArea: 'MapAreaWin',
					Tick: 'TickWin',
					Sku: 'SkuWin'
				},
				show: true
			}
		},

		computed: {
			...mapGetters(['getCurrentModuleName', 'getCurrentModuleId', 'getCurrentFileId'])
		},

		methods: {
			_clickHideBtn() {
				this.show = !this.show;
				this.$emit('winTaggle', this.show);
			}
		},

		components: {
			MapAreaWin,
			WinTab,
			PictureWin,
			StageWin,
			TickWin,
			SkuWin
	    },

	    created() {

	    }
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.win-wrap{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: #535353;
		z-index: 4;
	}

	.win-con{
		position: absolute;
		left: 0;
		top: 24px;
		right: 0;
		bottom: 0;
	}
</style>
