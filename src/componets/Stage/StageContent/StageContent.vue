<template>
	<div class="stage-content" :style="{cursor: 'default'}" :class="classObj">
		<StageCanvas></StageCanvas>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import StageCanvas from './Canvas/Canvas.vue';

	let _this;

	export default {
	    data() {
	        return {
	           
	        }
	    },

	    computed: {
			...mapGetters(['getCursor', 'getCurrentFileIsOverflow', 'getCurrentFileById']),
			classObj() {
				return {
					overhidden: !this.getCurrentFileIsOverflow, 
					overauto: this.getCurrentFileIsOverflow
				}
			}
		},

	    components: {
	        StageCanvas
	    },

	    mounted() {
	    	_this = this;
	    	resize();

	    	function resize() {
	    		if(!_this.getCurrentFileById) return;

	    		let stageHeight = $(_this.$el).height();
	    		let stageWidth = $(_this.$el).width();

	    		if(_this.getCurrentFileById.height > stageHeight || _this.getCurrentFileById.width > stageWidth) {
	    			_this.$store.dispatch('updateFileIsOverflow', true);
	    		}else{
	    			_this.$store.dispatch('updateFileIsOverflow', false);
	    		}
	    	}

	    	$(window).bind('resize', function() {
	    		resize();
	    	});
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

		&.overhidden{
			overflow: hidden;
		}

		&.overauto{
			overflow: auto;
		}
	}
</style>