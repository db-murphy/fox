<template>
	<div class="zf-switch">
		<el-switch v-model="switchval" @change="_change" :width="40" on-text="" on-color="#1b83fb" off-color="#3b3b3b" off-text=""></el-switch>
	</div>
</template>

<script>
	export default{
		props: {
			switchVal: {
				type: Boolean,
				default: true
			}
		},

		data() {
			return {
				switchval: this.switchVal
			}
		},

		methods: {
			_change() {
				this.$emit('switchChange', this.switchval);
			}
		},

		components: {

		},

		created() {
	        
	    }
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.zf-switch{
		.el-switch__core{
			box-shadow: 0px 2px 2px #404040 inset;
			border-color: #535353 !important;
			height: 21px;

			// .el-switch__button{
			// 	top: 50%;
			// 	@include translate(0, -50%);
			// }
		}
	}
</style>