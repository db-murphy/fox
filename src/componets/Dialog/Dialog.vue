<template>
	<el-dialog :title="dialogData.title" :width="'500px'" :visible.sync="dialogData.dialogVisible" :custom-class="zfDialogClass" :show-close="false">
		<div class="pt20 clearfix">
			<text-left-input class="fl"
				:hasPL="false"
				:inputName="'名称:'"
				:inputVal="name"
				@zfblur="_nblur"
				align="right"
				labelWidth="60px"
				:inputWidth="152">
			</text-left-input>
		</div>

		<div class="pt20 clearfix">
			<text-left-input class="fl"
				:hasPL="false"
				:inputName="'高度:'"
				@zfblur="_hblur"
				:inputVal="height"
				labelWidth="60px"
				align="right"
				:inputWidth="inputWidth">
			</text-left-input>
			<div class="input-txt-left fl">
				<label class="pr7 ccacaca" style="width: 60px; text-align: right; line-height: 28px;">宽度:</label>
				<div class="wrap" style="width: 55px; height: 28px; vertical-align: middle;">
					<span style="font-size: 12px; color: #cacaca;line-height: 28px;">{{width}}</span>
				</div>
			</div>
		</div>

		<div class="pt20 clearfix fz0">
			<span class="ccacaca fz12 pr7 lable">设备:</span>
			<el-radio-group v-model="device" size="mini" @change="_deviceChange" class="zf-radio-group">
				<el-radio-button label="移动端"></el-radio-button>
				<el-radio-button label="PC端"></el-radio-button>
			</el-radio-group>
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
	    		height: this.dialogData.height,
				width: this.dialogData.width,
	    		name: this.dialogData.name,
	    		device: '移动端'
	    	}
	    },

	    computed: {

	    },

	    methods: {
	    	_ok() {
	    		let width = this.device == '移动端'? 750: 1000;

	    		this.dialogData.dialogVisible = false;
	    		this.$emit('ok', {
	    			width: width,
	    			height: this.height,
	    			name: this.name
	    		});
	    	},

	    	_nblur(val) {
	    		if(val){
	    			this.name = val;
	    		}else{
	    			this.name = '新建文档';
	    		}
	    	},

	    	_hblur(val) {
	    		this.height = val
	    	},

			_deviceChange(val) {
				if(val == '移动端') {
					this.width = 750;
				}else if(val == 'PC端') {
					this.width = 1000;
				}
			}
	    },

	    components: {
	    	TextLeftInput
	    }
	}
</script>

<style lang='scss'>
	@import '../../scss/mixins/all-mixin';

	.zf-dialog{
		&.el-dialog{
			overflow: hidden;
			background-color: #535353;
			border-radius: 4px;
			box-shadow: 0px 0px 40px 10px #000;
		}

		.el-dialog__header{
			text-align: center;
			font-size: 15px;
			padding-top: 8px;
			padding-bottom: 8px;
			background: url(./headerBg.jpg) repeat-x;
			background-size: auto 100%;
			border-bottom: 1px solid #6a6a6a;
			line-height: 1;

			.el-dialog__title{
				line-height: 1;
				color: #fff;
				font-size: 12px;
			}
		}

		.lable{
			@include box-sizing(border-box);
			width: 60px;
			text-align: right;
			display: inline-block;
			vertical-align: middle;
		}
	}
</style>
