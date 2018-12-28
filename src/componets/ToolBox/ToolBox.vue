<template>
	<section class="tool-box">
		<ul @mousemove="_mousemove" @mouseup="_mouseup" @mousedown="_mousedown" @mouseleave="_mouseleave" @click="_click">
			<el-tooltip v-for="(item, index) in modulesItems" :key="item.name" popper-class="tool-tooltip" class="item" effect="dark" :content="item.cn" placement="right">
				<li :class="item.classObject" :index="index">
					<div class="inner">
				    	<component :is="item.tools" :isHover="item.classObject.hover" :isActive="item.classObject.active"></component>
				    </div>
				</li>
			</el-tooltip>
		</ul>
	</section>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import MapArea from '../Icons/MapArea/MapArea.vue';
	import PictureCustom from '../Icons/Picture/Picture.vue';
	import Tick from '../Icons/Tick/Tick.vue';
	import Sku from '../Icons/Sku/Sku.vue';

	var _this;

	export default {
	    data() {
	        return {
	            modulesItems: [
	            	{
						name: 'picture',
						tools: PictureCustom,
						cn: '图片',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: 'tick',
						tools: Tick,
						cn: '倒计时',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: 'mapArea',
						tools: MapArea,
						cn: '点击区域',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: 'sku',
						tools: Sku,
						cn: '价格标签',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					}
	            ]
	        }
	    },

	    computed: {
			...mapGetters(['currentTool', 'getCurrentFileById'])
		},

	    methods: {
			_mousedown(ev) {
				var target = $(ev.target);
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					clearAllActiveStatus(_this.modulesItems);
					_this.modulesItems[_index].classObject.active = true;
					_this.modulesItems[_index].classObject.hover = false;
				}
			},

			_mouseup(ev) {
				var target = $(ev.target);
				var tool = target.closest('li');

				clearAllActiveStatus(_this.modulesItems);

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					_this.modulesItems[_index].classObject.hover = true;
				}
			},

			_mousemove(ev) {
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					clearAllHoverStatus(_this.modulesItems);
					if(!_this.modulesItems[_index].classObject.active) {
						_this.modulesItems[_index].classObject.hover = true;
					}
				}else{
					clearAllHoverStatus(_this.modulesItems);
				}

				return false;
			},

			_click(ev) {
				var target = $(ev.target);
				var tool = target.closest('li');

				if(!tool.length) return;

				if(!this.getCurrentFileById) {
					return this.$message({
						showClose: true,
						message: '请先创建文件',
						type: 'error'
					});
				};

				var _index = parseInt(tool.attr('index'), 10);

				this.$store.dispatch('createModule', _this.modulesItems[_index].name);
				this.$store.dispatch('saveHistory');
			},

			_mouseleave() {
				clearAllHoverStatus(_this.modulesItems);
			}
		},

	    components: {
	        MapArea,
	        PictureCustom,
	        Tick,
			Sku
	    },

	    mounted() {
			_this = this;
			// setStartStatus(this.toolItems, this.currentTool.toolName);
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
</script>

<style lang='scss'>
	@import '../../scss/mixins/all-mixin';

	.tool-box{
		position: absolute;
		width: 38px;
		left: 0;
		top: 0px;
		bottom: 0;
		background-color: #535353;
		overflow: hidden;
		border-top: 1px solid #282828;
		border-right: 1px solid #282828;
		box-shadow: 5px 0px 20px rgba(0, 0, 0, .5);
		z-index: 1;
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
		margin-bottom: 8px;
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
