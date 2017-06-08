<template>
	<div class="modules-panel">
		<ul class="modules-wrap pt5" @mousemove="_mousemove" @mouseup="_mouseup" @mousedown="_mousedown" @mouseleave="_mouseleave" @click="_click">
			<li v-for="(item, index) in modulesItems" :class="item.classObject" :index="index">
				<div class="inner">
					<component :is="item.tools" :isHover="item.classObject.hover" :isActive="item.classObject.active"></component>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import $ from 'jquery';
	import Picture from '../../Icons/Picture/Picture.vue';
	import Tick from '../../Icons/Tick/Tick.vue';
	import MapArea from '../../Icons/MapArea/MapArea.vue';

	var _this;
	export default {
		data() {
			return {
				modulesItems: [
					{
						name: 'picture',
						tools: Picture,
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: 'tick',
						tools: Tick,
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: 'mapArea',
						tools: MapArea,
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					}
				]
			}
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

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);
						
					this.$store.dispatch('createModule', _this.modulesItems[_index].name);
				}
			},

			_mouseleave() {
				clearAllHoverStatus(_this.modulesItems);
			}
		},
		components: {
			Picture,
			MapArea,
			Tick
		},
		mounted() {
			_this = this;
		}
	};

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

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.modules-panel{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding-left: 8px;
		@include box-sizing(border-box);

		ul{
			list-style: none;
			@include clearfix();
			
			li{
				width: 30px;
				height: 22px;
				float: left;
				border-radius: 3px;
				@include box-sizing(border-box);
				position: relative;
				margin-right: 5px;
				overflow: hidden;

				.inner{
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					@include box-sizing(border-box);
					border-radius: 3px;
				}

				&.hover{
					box-shadow: 0px 1px 0px #636363;

					.inner{
						border: 1px solid #2b2b2b;
						background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
						box-shadow: 0px 1px 0px #636363;
					}
				}

				&.active{
					box-shadow: 0px 1px 0px #636363;

					.inner{
						border: 1px solid #2b2b2b;
						background: #393939;
						box-shadow: 0px 2px 2px #2b2b2b inset;
					}
				}
			}

			i{
				font-size: 14px;
				position: absolute;
				left: 50%;
				top: 50%;
				@include translate(-50%, -50%);
			}
		}
	}
</style>