<template>
	<div class="input-txt-left">
		<label class="pr7" :class="{pl11: hasPL}">{{inputName}}</label>
		<div class="wrap" :style="{width: inputWidth + 'px'}">
			<zf-input :inputVal="inputVal" @zfblur="_blur"></zf-input>
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
		    color: #fff;
		    line-height: 22px;
		}

		.el-input{
			vertical-align: middle;
		}
	}
</style>