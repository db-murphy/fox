<template>
	<div class="index-change clearfix" @mousedown="_mousedown" @mouseup="_mouseup" @click="_click">
		<div class="item pr20 up fl">
			<label class="ccacaca">向上调整</label>
			<div class="btn fl" @mouseenter="_mouseenter" @mouseleave="_mouseleave" :class="{hover: classObj[0].isHover, active: classObj[0].isActive}">
				<div class="inner">
					<arrow :type="'up'" :isActive="classObj[0].isActive"></arrow>
				</div>
			</div>
		</div>

		<div class="item down fl">
			<label class="ccacaca">向下调整</label>
			<div class="btn fl" @mouseenter="_mouseenter" @mouseleave="_mouseleave" :class="{hover: classObj[1].isHover, active: classObj[1].isActive}">
				<div class="inner">
					<arrow :type="'down'" :isActive="classObj[1].isActive"></arrow>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import Arrow from '../../Icons/Arrow/Arrow.vue';

	export default{
		data() {
			return {
				classObj: [
					{
						isActive: false,
						isHover: false
					},
					{
						isActive: false,
						isHover: false
					}
				]
			}
		},

		methods: {
			_mousedown(ev) {
				let target = $(ev.target);
				let btn = target.closest('.btn');

				if(btn.length) {
					let item = target.closest('.item');
					let index = item.index();

					this.classObj[index].isActive = true;
					this.classObj[index].isHover = false;
				}
			},

			_mouseup(ev) {
				let target = $(ev.target);
				let btn = target.closest('.btn');

				if(btn.length) {
					let item = target.closest('.item');
					let index = item.index();

					this.classObj[index].isActive = false;
					this.classObj[index].isHover = true;
				}
			},

			_mouseenter(ev) {
				let target = $(ev.target);
				let item = target.closest('.item');
				let index = item.index();

				this.classObj[index].isHover = true;
			},

			_mouseleave(ev) {
				let target = $(ev.target);
				let item = target.closest('.item');
				let index = item.index();

				this.classObj[index].isHover = false;
			},

			_click(ev) {
				let target = $(ev.target);
				let item = target.closest('.item');
				let index = item.index();

				if(item.hasClass('up')) {
					this.$emit('indexChange', true);
				}else if(item.hasClass('down')) {
					this.$emit('indexChange', false);
				}
			}
		},

		components: {
			Arrow
	    },

	    created() {
	        
	    }
	}
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.index-change{
		font-size: 12px;
		color: #fff;

		label{
			float: left;
			line-height: 24px;
			padding-right: 5px;
		}
		
		.btn{
			width: 31px;
			height: 24px;
			@include box-sizing(border-box);

			.inner{
				position: relative;
				@include box-sizing(border-box);
				width: 100%;
				height: 100%;

				i{
					position: absolute;
					left: 50%;
					top: 50%;
					@include translate(-50%, -50%);
				}
			}

			&.hover{
				box-shadow: 0px 1px 0px #636363;
    			border-radius: 3px;

				.inner{
					background-color: #727272;
				    border: 1px solid #2a2a2a;
				    border-radius: 3px;
				    box-shadow: 0px 1px 0px #909090 inset;
				    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
				}
			}

			&.active{
				box-shadow: 0px 1px 0px #636363;
    			border-radius: 3px;

    			.inner{
    				border: 1px solid #2a2a2a;
				    border-radius: 3px;
				    background-color: #3b3b3b;
				    box-shadow: 0px 2px 2px #2b2b2b inset;
    			}
			}
		}
	}
</style>