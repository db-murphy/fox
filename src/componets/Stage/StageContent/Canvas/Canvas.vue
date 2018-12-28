<template>
	<div v-if="getCurrentFileById"
		id="canvas"
		:style="_styleObj"
		class="canvas"
		:class="_classObj"
		@mousemove="_mousemove"
		@mousedown.stop="_mousedown"
		@mouseup="_mouseup"
		@mouseleave="_mouseleave"
		@mouseenter="_mouseenter">
		<!-- 放置大量模块开始 -->
		<module v-for="module in getModules"
			:mdata="module"
			:mid="module.id"
			:mindex="module.index"
			:mname="module.moduleName"
			:loading="module.loading"
			:zindex="module.index"
			:mwidth="module.width"
			:mheight="module.height"
			:imgUrl="module.imgUrl"
			:mtop="module.top"
			:key="module.id"
			:mleft="module.left">
		</module>
		<!-- 放置大量模块结束 -->
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import Module from '../../../Modules/Module.vue';

	export default {
		props: {
	    	overflow: {
	    		type: Object
	    	}
	    },

	    data() {
	        return {
	        	canvasLeft: 0,
	        	canvasTop: 0,
	        	canvasPressDown: false,
	        	canvasPressUp: false,
	        	clickStage: false
	        }
	    },

	    computed: {
			...mapGetters(['getModules', 'pressModule', 'inputFocusUpdate', 'getModulesById', 'getCurrentFileById', 'getCurrentFileIsOverflow', 'getCurrentModuleLoading']),

			_styleObj() {
				let bg;
				let rgb;
				let styleData = {
					width: this.getCurrentFileById.width + 'px',
					height: this.getCurrentFileById.height + 'px'
				};

				if(!this.getCurrentFileById.fileBg.isTransport) {
					bg = this.getCurrentFileById.fileBg.bgColor;
					// let _R = this.getCurrentFileById.fileBg.R;
					// let _G = this.getCurrentFileById.fileBg.G;
					// let _B = this.getCurrentFileById.fileBg.B;

					// rgb = 'rgb(' + _R + ',' + _G + ',' + _B + ')';
					styleData.backgroundColor = bg;
				}else{
					let img = require('./tranparent.jpg');

					styleData.backgroundImage = 'url(' + img + ')';
					styleData.backgroundSize = '8px 8px';
				}

				return styleData;
			},

			_classObj() {
				return {
					scroller: this.getCurrentFileIsOverflow,
	        		abs: !this.getCurrentFileIsOverflow
				}
			}
		},

	    methods: {
	    	_mousemove(ev) {
	    		this.clickStage = false;
	    	},

	    	_mouseleave() {
	    		this.$store.dispatch('leaveStage');
	    	},

	    	_mouseenter() {
	    		this.$store.dispatch('enterStage');
	    	},

	    	_mousedown(ev) {
	    		this.clickStage = true;
	    		let target = $(ev.target);

	    		if(!target.closest('.zf-module').length) {
					$('input').trigger('blur');
					setTimeout(()=>{
						this.$store.dispatch('setCurrentModuleId', '');
					}, 20);
	    		}
	    		// this.$store.dispatch('pressStage', true);
	    	},

	    	_mouseup(ev) {
	    		let target = $(ev.target);

	    		// if(target.hasClass('canvas') && this.clickStage) {
	    		// 	this.$store.dispatch('setCurrentModuleId', '');
	    		// }
	    		// this.$store.dispatch('pressStage', false);
	    		// if(!this.pressModule) {
	    		// 	//this.$store.dispatch('createModule', 'picture');
	    		// }
	    		// this.$store.dispatch('pressModule', false);
	    	}
	    },

	    components: {
	    	Module
	    },

	    mounted() {
	    	let _this = this;
	    }
	}
</script>

<style lang='scss'>
	.canvas{
		overflow: hidden;
		box-shadow: 0px 0px 20px 10px #000;
		position: relative;

		&.abs{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		&.scroller{
			margin: 0 auto;
		}
	}
</style>
