<template>
	<el-checkbox class="zf-checkbox" v-model="checked" checked>{{checkboxName}}</el-checkbox>
</template>

<script>
	export default {
		props: {
			checkboxName: {
				type: String,
				default: '备选项'
			}
		},
		data() {
			return {
				checked: true
			}
		},
		components: {
			
		}
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.zf-checkbox{
		overflow: hidden;

		.el-checkbox__input{
			float: left;
			line-height: 32px;
			height: 32px;
			position: relative;
			width: 18px;
		}

		.el-checkbox__input .el-checkbox__inner, .el-checkbox__input.is-checked .el-checkbox__inner{
			border: 1px solid #2b2b2b;
			background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#747474), to(#626262));
			box-shadow: 0px 1px 0px #636363;
			overflow: hidden;
			position: absolute;
			float: left;
			top: 50%;
			@include translate(0, -50%);

			&::before{
				content: '';
				border-top: 1px solid #909090;
				position: absolute;
				top: 0px;
				left: 0;
				right: 0;
			}
		}

		.el-checkbox__label{
			font-size: 12px;
			color: #fff;
			float: left;
			line-height: 32px;
		}
	}
</style>