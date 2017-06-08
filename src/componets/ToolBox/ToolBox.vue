<template>
	<section class="tool-box">
		<ul @mousemove="_mousemove" @mouseleave="_mouseleave" @click="_click">
			<li v-for="item in toolItems" :class="item.classObject">
				<div class="inner">
			    	<component :is="item.tools" :isHover="item.classObject.hover" :isActive="item.classObject.active"></component>
			    </div>
			</li>
		</ul>
	</section>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import SelectIcon from '../Icons/Select/Select.vue';
	import MapArea from '../Icons/MapArea/MapArea.vue';
	import MaxGlass from '../Icons/MaxGlass/MaxGlass.vue';
	import Picture from '../Icons/Picture/Picture.vue';
	import Modules from '../Icons/Modules/Modules.vue';

	var _this;

	export default {
	    data() {
	        return {
	            toolItems: [
	            	// {
	            	// 	name: 'select',
	            	// 	tools: SelectIcon,
	            	// 	classObject: {
	            	// 		hover: false,
	            	// 		active: false,
	            	// 		'map-area': true
	            	// 	}
	            	// },
	            	{
	            		name: 'mapArea',
	            		tools: MapArea,
	            		classObject: {
	            			hover: false,
	            			active: false,
	            			'map-area': true
	            		}
	            	},
	            	// {
	            	// 	name: 'stageScale',
	            	// 	tools: MaxGlass,
	            	// 	classObject: {
	            	// 		hover: false,
	            	// 		active: false,
	            	// 		'map-area': true
	            	// 	}
	            	// },
	            	{
	            		name: 'addModules',
	            		tools: Modules,
	            		classObject: {
	            			hover: false,
	            			active: true,
	            			'map-area': true
	            		}
	            	}
	            ]
	        }
	    },

	    computed: {
			...mapGetters(['currentTool'])
		},

	    methods: {
			_mousemove(ev) {
				var target = $(ev.target);
				var tool = target.closest('.map-area');

				if(tool.length) {
					var _index = tool.index();

					clearAllHoverStatus(_this.toolItems);
					if(!_this.toolItems[_index].classObject.active) {
						_this.toolItems[_index].classObject.hover = true;
					}
				}else{
					clearAllHoverStatus(_this.toolItems);
				}

				return false;
			},

			_click(ev) {
				var target = $(ev.target);
				var tool = target.closest('.map-area');

				if(tool.length) {
					var _index = tool.index();

					clearAllActiveStatus(_this.toolItems);
					_this.toolItems[_index].classObject.active = true;
					_this.toolItems[_index].classObject.hover = false;

					// 工具箱状态切换
					this.$store.dispatch('toolSwitch', _this.toolItems[_index].name);
				}

				return false;
			},

			_mouseleave() {
				clearAllHoverStatus(_this.toolItems);
			}
		},

	    components: {
	    	SelectIcon,
	        MapArea,
	        MaxGlass,
	        Picture,
	        Modules
	    },

	    mounted() {
			_this = this;
			setStartStatus(this.toolItems, this.currentTool.toolName);
		}
	} 

	function clearAllHoverStatus(data) {
		for(var i = 0; i < data.length; i++) {
			data[i].classObject.hover = false;
		}
	}

	function clearAllActiveStatus(data) {
		for(var i = 0; i < data.length; i++) {
			data[i].classObject.active = false;
		}
	}

	function setStartStatus(obj, tool) {
		for(var i = 0; i < obj.length; i++) {
			if(obj[i].name == tool) {
				obj[i].classObject.active = true;
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../scss/mixins/all-mixin';

	.tool-box{
		position: absolute;
		width: 38px;
		left: 0;
		top: 55px;
		bottom: 0;
		background-color: #535353;
		overflow: hidden;
		border-top: 1px solid #282828;
		border-right: 1px solid #282828;
		-webkit-box-sizing: border-box;
     		-moz-box-sizing: border-box;
          		box-sizing: border-box;
	}
	.tool-box ul{
		width: 100%;
		height: 100%;
		font-size: 0;
		padding: 17px 3px 0;
		-webkit-box-sizing: border-box;
     		-moz-box-sizing: border-box;
          		box-sizing: border-box;
	}
	.tool-box ul li{
		margin-bottom: 2px;
	}
	.tool-box .inner{
		-webkit-box-sizing: border-box;
     		-moz-box-sizing: border-box;
          		box-sizing: border-box;
		height: 24px;
		position: relative;
	}
	.tool-box .inner i{
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		font-size: 14px;
	}
	.tool-box li.active, .tool-box li.hover{
		-webkit-box-shadow:0px 1px 0px #636363;
		box-shadow:0px 1px 0px #636363; 
		border-radius: 3px;
	}
	.tool-box li.active .inner{
		border: 1px solid #2a2a2a;
		border-radius: 3px;
		background-color: #3b3b3b;
		-webkit-box-shadow:0px 2px 2px #2b2b2b inset;
		box-shadow:0px 2px 2px #2b2b2b inset; 
	}
	.tool-box li.hover .inner{
		background-color: #727272;
		border: 1px solid #2a2a2a;
		border-radius: 3px;
		-webkit-box-shadow: 0px 1px 0px #909090 inset;
		box-shadow: 0px 1px 0px #909090 inset; 
		background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
	}
</style>