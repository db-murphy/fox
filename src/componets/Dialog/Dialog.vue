<template>
	<el-dialog :title="dialogData.title" v-model="dialogData.dialogVisible" size="tiny" :custom-class="zfDialogClass" :show-close="false">
	  <div class="pt20 clearfix">
		<text-left-input class="fl" 
			:hasPL="false" 
			:inputName="'宽度'" 
			:inputVal="dialogData.width" 
			@zfblur="_wblur"
			:inputWidth="inputWidth">
		</text-left-input>

		<text-left-input class="fl" 
			:hasPL="true" 
			:inputName="'高度'" 
			@zfblur="_hblur"
			:inputVal="dialogData.height" 
			:inputWidth="inputWidth">
		</text-left-input>
	</div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogData.dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="_ok">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	import TextLeftInput from '../inputGroup/TxtLeft.vue';

	export default {
	    props: {
	    	dialogData: {
	    		type: Object
	    	}
	    },

	    data() {
	    	return {
	    		zfDialogClass: 'zf-dialog',
	    		inputWidth: 55,
	    		width: this.dialogData.width,
	    		height: this.dialogData.height
	    	}
	    },

	    computed: {

	    },

	    methods: {
	    	_ok() {
	    		this.dialogData.dialogVisible = false;
	    		this.$emit('ok', {
	    			width: this.width,
	    			height: this.height
	    		});
	    	},

	    	_wblur(val) {
	    		this.width = val
	    	},

	    	_hblur(val) {
	    		this.height = val
	    	}
	    },

	    components: {
	    	TextLeftInput
	    }
	} 
</script>

<style lang='scss'>
	.zf-dialog{
		overflow: hidden;
		background-color: #535353;
		border-radius: 4px;
		box-shadow: 0px 0px 40px 10px #000;

		.el-dialog__header{
			text-align: center;
			font-size: 15px;
			padding-top: 4px;
			padding-bottom: 4px;
			background: url(./headerBg.jpg) repeat-x;
			background-size: auto 100%;
			border-bottom: 1px solid #6a6a6a;

			.el-dialog__title{
				line-height: 1;
				color: #fff;
			}
		}
	}
</style>