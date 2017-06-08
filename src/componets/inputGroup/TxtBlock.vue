<template>
	<div class="input-txt-block">
		<label class="pb10">{{inputName}}</label>
		<div class="wrap">
			<zf-input @zfblur="_blur" :inputVal="inputVal"></zf-input>
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
	    		type: String,
	    		default: ''
	    	}
	    },

		data() {
			return {
				
			}
		},

		methods: {
			_blur(val) {
				this.$emit('zfblur', val);
				//this.$store.dispatch('setPictureImgUrl', val);
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
		    color: #fff;
		    line-height: 1;
		}
	}
</style>