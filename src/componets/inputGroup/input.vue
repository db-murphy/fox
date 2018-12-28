<template>
	<el-input v-model="input" :disabled="disabled" @blur="_blur" @focus="_focus" class="zf-input" size="mini"></el-input>
</template>

<script>
	import $ from 'jquery';

	export default {
		props: {
			inputVal: {

			},

			disabled: {
	    		type: Boolean,
	    		default: false
	    	}
		},

		data() {
			return {
				input: this.inputVal
			}
		},

		computed: {

		},

		methods: {
			_blur(x) {
				this.$emit('zfblur', this.input);
				this.$store.dispatch('inputFocusUpdate', false);
			},

			_focus() {
				this.$store.dispatch('inputFocusUpdate', true);
			},

			setVal(val) {
				this.input = val;
			},

			_inputValChange() {
				this.input = this.inputVal;
			}
		},

		mounted() {
			$(this.$el).find('input').bind('keyup', (ev)=>{
				if(ev.keyCode == 13) {
					this.$emit('inputSubmit', this.input);
				}
			});
		},

		watch: {
	    	'inputVal': '_inputValChange'
	    }
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.zf-input.el-input{
		box-shadow: 0px 1px 0px #636363;
		border-radius: 4px;

		.el-input__inner{
			border-radius: 4px;
			padding: 3px 0 3px 6px;
			@include box-sizing(border-box);
			border: 1px solid #2d2d2d;
			background-color: #4a4a4a;
			color: #cacaca;
			font-weight: lighter;
			box-shadow: 0px 1px 1px #373737 inset;
		}
	}
</style>
