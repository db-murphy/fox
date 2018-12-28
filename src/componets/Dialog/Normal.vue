<template>
	<el-dialog :title="dialogData.title" @close="_close" :width="width + 'px'" :visible.sync="dialogData.dialogVisible" :custom-class="zfDialogClass" :show-close="false">
		<slot name="content"></slot>
		<span slot="footer" class="dialog-footer">
			<slot name="zf-footer"></slot>
		</span>
	</el-dialog>
</template>

<script>
	export default {
	    props: {
	    	dialogData: {
	    		type: Object
	    	},

	    	width: {
	    		type: Number,
	    		default: 500
	    	}
	    },

	    data() {
	    	return {
	    		zfDialogClass: 'zf-dialognormal',
	    		name: this.dialogData.name
	    	}
	    },

	    computed: {

	    },

	    methods: {
	    	_ok() {
	    		this.$emit('ok');
	    	},

	    	_close() {
	    		this.$emit('close');
	    	}
	    },

	    components: {

	    }
	} 
</script>

<style lang='scss'>
	.zf-dialognormal{
		&.el-dialog{
			overflow: hidden;
			background-color: #535353;
			border-radius: 4px;
			box-shadow: 0px 0px 40px 10px #000;
		}

		.el-dialog__header{
			text-align: center;
			padding-top: 8px;
			padding-bottom: 12px;
			background: url(./headerBg.jpg) repeat-x;
			background-size: auto 100%;
			border-bottom: 1px solid #6a6a6a;
			line-height: 1;

			.el-dialog__title{
				line-height: 1;
				color: #cacaca;
				font-size: 12px;
			}
		}

		.dialog-footer{
			.el-button--default:hover{
				background-color: #fff;
				color: #5a5e66;
			}
		}
	}
</style>