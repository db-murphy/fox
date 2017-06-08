<template>
	<el-input v-model="input" :disabled="false" :value="inputVal" @blur="_blur" @focus="_focus" class="zf-input" size="mini"></el-input>
</template>

<script>
	export default {
		props: ['inputVal'],

		data() {
			return {
				input: this.inputVal
			}
		},

		computed: {

		},

		methods: {
			_blur() {
				this.$emit('zfblur', this.input);
				this.$store.dispatch('inputFocusUpdate', false);
			},

			_focus() {
				this.$store.dispatch('inputFocusUpdate', true);
			}
		}
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.zf-input{
		box-shadow: 0px 1px 0px #636363;
		border-radius: 4px;

		.el-input__inner{
			border-radius: 4px;
			padding: 3px 0 3px 6px;
			@include box-sizing(border-box);
			border: 1px solid #2d2d2d;
			background-color: #4a4a4a;
			color: #fff;
			font-weight: lighter;
			box-shadow: 0px 1px 1px #373737 inset;
		}
	}
</style>