<template>
	<div class="input-txt-left">
		<label class="pr7 ccacaca" :class="{pl11: hasPL}" :style="{'width': labelWidth, 'text-align': align}">{{inputName}}</label>
		<div class="wrap" :style="{width: inputWidth + 'px'}">
			<zf-input :inputVal="inputVal" @inputSubmit="_inputSubmit" @zfblur="_blur" ref="zfInput" :disabled="disable"></zf-input>
		</div>
	</div>
</template>

<script>
	import ZfInput from './input';

	export default {
		props: {
	    	inputName: {
	    		type: String,
	    		default: '文字左边input'
	    	},

	    	inputWidth: {
	    		type: Number,
	    		default: 55
	    	},

	    	hasPL: {
	    		type: Boolean,
	    		default: true
	    	},

	    	inputVal: {

	    	},

	    	labelWidth: {
	    		type: String,
	    		default: 'auto'
	    	},

	    	align: {
	    		type: String,
	    		default: 'left'
	    	},

	    	disable: {
	    		type: Boolean,
	    		default: false
	    	}
	    },

		data() {
			return {

			}
		},

		computed: {

		},

		methods: {
			_blur(val) {
				this.$emit('zfblur', val);
			},

			setVal(val) {
				this.$refs.zfInput.setVal(val);
			},

			_inputSubmit(val) {
				this.$emit('inputSubmit', val);
			}
		},

		components: {
			ZfInput
		},

		mounted() {

		}
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.input-txt-left{
		font-size: 0;

		.wrap{
			display: inline-block;
		}

		label{
			display: inline-block;
		    vertical-align: middle;
		    height: 100%;
		    font-size: 11px;
		    line-height: 22px;
		    @include box-sizing(border-box);
		}

		.el-input{
			vertical-align: middle;
		}
	}
</style>
