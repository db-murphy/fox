<template>
	<div class="stage-content" :style="{cursor: 'default'}" :class="classObj" @mousedown="_clickStage" @scroll="_scroll">
		<StageCanvas></StageCanvas>
		<TipLine v-for="(line, index) in getLineListData" :lineData="line" :key="index"/>
		<!-- <div style="position: absolute; z-index: 100; width: 400px; height: 200px; background-color: #ccc; top: 0; left: 0;">
			{{getLineListData}}
		</div>-->
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import StageCanvas from './Canvas/Canvas.vue';
	import TipLine from '../../TipLine/TipLine.vue';

	export default {
	    data() {
	        return {

	        }
	    },

	    computed: {
			...mapGetters(['getCurrentFileIsOverflow', 'getCurrentFileById', 'getLineListData']),
			classObj() {
				return {
					overhidden: !this.getCurrentFileIsOverflow,
					overauto: this.getCurrentFileIsOverflow
				}
			}
		},

		methods: {
			_reSize() {
				let _this = this;
				if(!_this.getCurrentFileById) return;

	    		let stageHeight = $(_this.$el).height();
	    		let stageWidth = $(_this.$el).width();

	    		if(_this.getCurrentFileById.height > stageHeight || _this.getCurrentFileById.width > stageWidth) {
	    			_this.$store.dispatch('updateFileIsOverflow', true);
	    		}else{
	    			_this.$store.dispatch('updateFileIsOverflow', false);
	    		}

	    		if(_this.getCurrentFileById.height > stageHeight) {
	    			_this.$store.dispatch('updateFileIsOverflowY', true);
	    		}else{
	    			_this.$store.dispatch('updateFileIsOverflowY', false);
	    		}

	    		if(_this.getCurrentFileById.width > stageWidth) {
	    			_this.$store.dispatch('updateFileIsOverflowX', true);
	    		}else{
	    			_this.$store.dispatch('updateFileIsOverflowX', false);
	    		}
			},

			_scroll(ev) {

			},

			_clickStage(ev) {
				let target = $(ev.target);

				if(!target.closest('.zf-module').length) {
					$('input').trigger('blur');
					setTimeout(()=>{
						this.$store.dispatch('setCurrentModuleId', '');
					}, 20);
				}
			}
		},

	    components: {
	        StageCanvas,
	        TipLine
	    },

	    mounted() {
	    	let _this = this;
	    	_this._reSize();

	    	$(window).bind('resize', function() {
	    		_this._reSize();
	    	});
	    },

	    watch: {
	    	'getCurrentFileById.height': '_reSize'
	    }
	}
</script>

<style lang='scss'>
	@import '../../../scss/mixins/all-mixin';

	.stage-content{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 20px;
		@include box-sizing(border-box);
		padding: 40px;
		background: url(../../../assets/red.png) no-repeat center center;
		background-size: 360px auto;

		&.overhidden{
			overflow: hidden;
		}

		&.overauto{
			overflow: auto;
		}
	}
</style>
