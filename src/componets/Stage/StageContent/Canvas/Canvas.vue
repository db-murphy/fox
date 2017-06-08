<template>
	<div v-if="getCurrentFileById" id="canvas" :style="_styleObj" class="canvas" :class="_classObj" @mousemove="_mousemove" @mousedown="_mousedown" @mouseup="_mouseup" @mouseleave="_mouseleave" @mouseenter="_mouseenter">
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
			:mleft="module.left">
		</module>
		<!-- 放置大量模块结束 -->
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import Picture from '../../../Modules/Picture/Picture.vue';
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
					let _R = this.getCurrentFileById.fileBg.R;
					let _G = this.getCurrentFileById.fileBg.G;
					let _B = this.getCurrentFileById.fileBg.B;

					rgb = 'rgb(' + _R + ',' + _G + ',' + _B + ')';
					styleData.backgroundColor = rgb;
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
	    			this.$store.dispatch('setCurrentModuleId', '');
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
	    	Picture,
	    	Module
	    },

	    mounted() {
	    	let _this = this;

	    	$(document).bind('mousemove', function(ev) {
	    		if(!$('#canvas').length) return;
	    		let target = $('#canvas').offset();

	    		_this.canvasLeft = target.left;
	    		_this.canvasTop = target.top;
	    		_this.$store.dispatch('mousePoint', {
	    			x: ev.clientX - _this.canvasLeft,
	    			y: ev.clientY - _this.canvasTop
	    		});
	    	});

	    	$(document).bind('keyup', function(ev) {
	    		if(ev.keyCode == 8 && _this.inputFocusUpdate == false) {
	    			_this.$store.dispatch('deleteModule');
	    		}

	    		// 左移
	    // 		if(ev.keyCode == 37 && _this.inputFocusUpdate == false && _this.getModulesById) {
	    // 			let newX = --_this.getModulesById.left;

	    // 			_this.$store.dispatch('setModuleById',{
					// 	mId: _this.getModulesById,
					// 	newVal: {
					// 		left: newX
					// 	}
					// });
	    // 		}

	    // 		// 右移
	    // 		if(ev.keyCode == 39 && _this.inputFocusUpdate == false && _this.getModulesById) {
	    // 			let newX = ++_this.getModulesById.left;

	    // 			_this.$store.dispatch('setModuleById',{
					// 	mId: _this.getModulesById,
					// 	newVal: {
					// 		left: newX
					// 	}
					// });
	    // 		}
	    	});
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