<template>
	<div class="zf-slider">
		<div class="zf-slider-item">
			<label>R</label>
			<el-slider v-model="R" show-input :show-input-controls="false" :max="255"></el-slider>
		</div>
		<div class="zf-slider-item">
			<label>G</label>
			<el-slider v-model="G" show-input :show-input-controls="false" :max="255"></el-slider>
		</div>
		<div class="zf-slider-item">
			<label>B</label>
			<el-slider v-model="B" show-input :show-input-controls="false" :max="255"></el-slider>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
	    	colorInit: {
	    		type: Object,
	    		default: {
	    			R: 255,
					G: 255,
					B: 255
	    		}
	    	}
	    },

		data() {
			return {
				R: this.colorInit.R,
				G: this.colorInit.G,
				B: this.colorInit.B
			}
		},

		methods: {
			handlerRGB() {
				let _this = this;

				this.$emit('change', {
    				R: _this.R,
					G: _this.G,
					B: _this.B
    			});
			},

			colorInitChange() {
				this.R = this.colorInit.R;
				this.G = this.colorInit.G;
				this.B = this.colorInit.B;
			}
		},

		components: {
			
	    },

	    watch: {
	    	B: 'handlerRGB',

	    	G: 'handlerRGB',

	    	R: 'handlerRGB',

	    	colorInit: 'colorInitChange'
	    },

	    mounted() {
	        
	    }
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.zf-slider{
		.el-slider__runway{
			// box-shadow: 0px 1px 0px #636363;
			box-shadow: 0px 1px 2px #000 inset;
			background-color: #fff;
		}
		.el-slider__bar{
			background-color: #393939;
			background-color: rgb(27, 131, 251);
			// box-shadow: 0px 1px 0px #636363;
			box-shadow: 0px 1px 1px #000 inset;
			border-bottom: 1px solid #636363;
		}

		.el-slider__button{
			background-color: rgb(27, 131, 251);
			// background-color: #393939;
			box-shadow: 1px 1px 2px #000;
		}

		.el-slider{
			position: relative;
		}

		.el-input-number{
			width: 50px;
			position: absolute;
			right: 0;
			top: 50%;
			@include translate(0, -50%);
			margin: 0;
		}

		.el-slider__runway{
			margin-right: 60px;
		}

		.el-input__inner{
			background-color: #4a4a4a;
			color: #fff;
			border: 1px solid #2d2d2d;
			box-shadow: 0px 1px 1px #373737 inset;
			@include box-sizing(border-box);
			height: 22px;
			padding: 3px 5px;
			text-align: center;
			line-height: 1;
		}

		.zf-slider-item{
			padding-left: 20px;
			position: relative;

			label{
				position: absolute;
				left: 0;
				top: 50%;
				@include translate(0, -50%);
				color: #fff;
				font-size: 12px;
			}
		}
	}

	.el-tooltip__popper.is-dark{
		background-color: #252525;

		.popper__arrow::after{
			border-top-color: #252525;
		}
	}
</style>