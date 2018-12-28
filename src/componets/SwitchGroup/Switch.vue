<template>
	<div class="zf-switch">
		<el-switch v-model="switchval" @change="_change" :width="40" active-text="" active-color="#1b83fb" inactive-color="#3b3b3b" inactive-text=""></el-switch>
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
			},

			_switchValChange() {
				this.switchval = this.switchVal;
			}
		},

		components: {

		},

		created() {
	        
	    },

	    watch: {
	    	'switchVal': '_switchValChange'
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

			.el-switch__button{
				width: 20px;
				height: 20px;
				top: 0px;
			}
		}
	}
</style>