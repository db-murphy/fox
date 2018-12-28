<template>
	<div class="input-txt-block">
		<label class="pb10 ccacaca">{{inputName}}</label>
		<div class="wrap">
			<zf-input @zfblur="_blur" @inputSubmit="_inputSubmit" :inputVal="inputVal" ref="zfInput"></zf-input>
		</div>
	</div>
</template>

<script>
	import ZfInput from './input';
	import { mapGetters } from 'vuex';

	export default {
		props: {
	    	inputName: {
	    		type: String,
	    		default: '文字独占一行显示'
	    	},

	    	inputVal: {

	    	}
	    },

		data() {
			return {

			}
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
		}
	};
</script>

<style lang="scss">
	.input-txt-block{
		font-size: 0;

		label{
			display: block;
		    font-size: 11px;
		    line-height: 1;
		}
	}
</style>
