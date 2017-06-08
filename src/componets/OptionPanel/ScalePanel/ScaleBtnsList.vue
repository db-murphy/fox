<template>
	<div class="scale-btns-wrap">
		<ul @mousemove="_mousemove" @mouseleave="_mouseleave" @click="_click" class="glass-wrap pt5 fl">
			<li v-for="(item, index) in glassItems" :class="item.classObject" :index="index">
				<component :is="item.tools" :isHover="item.classObject.hover" :isActive="item.classObject.active"></component>
			</li>
		</ul>
	</div>
</template>

<script>
	import $ from 'jquery';
	import ScaleAddIcon from '../../Icons/ScaleAdd/ScaleAdd.vue';
	import ScaleReduceIcon from '../../Icons/ScaleReduce/ScaleReduce.vue';

	var _this;

	export default {
		data() {
			return {
				glassItems: [
					{
						name: 'add',
	            		tools: ScaleAddIcon,
	            		classObject: {
	            			hover: false,
	            			active: true
	            		}
					},
					{
						name: 'reduce',
	            		tools: ScaleReduceIcon,
	            		classObject: {
	            			hover: false,
	            			active: false
	            		}
					}
				]
			}
		},
		methods: {
			_mousemove(ev) {
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					clearAllHoverStatus(_this.glassItems);
					if(!_this.glassItems[_index].classObject.active) {
						_this.glassItems[_index].classObject.hover = true;
					}
				}else{
					clearAllHoverStatus(_this.glassItems);
				}

				return false;
			},

			_click(ev) {
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					clearAllActiveStatus(_this.glassItems);
					_this.glassItems[_index].classObject.active = true;
					_this.glassItems[_index].classObject.hover = false;
				}

				return false;
			},

			_mouseleave() {
				clearAllHoverStatus(_this.glassItems);
			}
		},
		components: {
			ScaleAddIcon,
			ScaleReduceIcon
		},
		mounted(){
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

	.scale-btns-wrap{
		@include clearfix();

		ul{
			list-style: none;
			@include clearfix();

			li{
				width: 22px;
				height: 22px;
				float: left;
				border-radius: 3px;
				@include box-sizing(border-box);
				position: relative;
				margin-right: 2px;

				&.hover{
					border: 1px solid #2b2b2b;
					background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
					box-shadow: 0px 1px 0px #636363;
				}

				&.active{
					border: 1px solid #2b2b2b;
					background: #393939;
					box-shadow: 0px 2px 2px #2b2b2b inset;
				}

				i{
					position: absolute;
					left: 50%;
					top: 50%;
					@include translate(-50%, -50%);
				}
			}
		}
	}
</style>