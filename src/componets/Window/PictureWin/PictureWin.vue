<template>
	<div class="picture-win pt20 pl10 pr10">
		<div class="zf-fileupload">
	        <el-upload
	          action="http://127.0.0.1:3100/redm/uploadfile" 
	          :show-upload-list="true" 
	          :name="'picture'"
	          :on-error="_error"
	          :on-success="handleSuccess">
	          <el-button size="small" type="primary">点击上传</el-button>
	          <span class="el-upload__tip pl5" slot="tip">不超过500kb</span>
	        </el-upload>
		</div>

		<txt-block 
			class="pt10"
			:inputName="inputName" 
			:inputVal="getModulesById.imgUrl" 
			@zfblur="_blur">
		</txt-block>

		<switch-txt-block 
			:switchName="switchName" 
			:switchVal="getModulesById.lazyLoad" 
			@change="_change">
		</switch-txt-block>

		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="width" 
				:inputVal="getModulesById.width + ' px'" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl" 
				:hasPL="true" 
				:inputName="height" 
				:inputVal="getModulesById.height + ' px'" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>
		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="x" 
				:inputVal="getModulesById.left + ' px'" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl" 
				:hasPL="true" 
				:inputName="y" 
				:inputVal="getModulesById.top + ' px'" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>

		<index-change @indexChange="_indexChange"></index-change>

		<zf-dialog :dialogData="dialogData" @ok="_ok"></zf-dialog>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';
	import Arrow from '../../Icons/Arrow/Arrow.vue';
	import IndexChange from '../IndexChange/IndexChange.vue';
	import ZfDialog from '../../Dialog/Dialog.vue';
	// import ZffileUpLoad from '../../FileUpLoad/FileUpLoad.vue';

	export default{
		data() {
			return {
				inputName: '图片地址:',
				switchName: '是否开启懒加载:',
				width: '宽度:',
				height: '高度:',
				x: '横轴:',
				y: '纵轴:',
				inputWidth: 55,
				dialogData: {
	    			dialogVisible: false,
	    			title: '确认'
	    		}
			}
		},

		computed: {
			...mapGetters(['getModulesById'])
		},

		methods: {
			_indexChange(status) {
				this.$store.dispatch('setModuleIndex', status);
			},

			_ok() {
				this.$store.dispatch('setModuleById', {
					newVal: {
						lazyLoad: val
					}
				});
			},

			_blur(val) {
				let _this = this;

				this.$store.dispatch('setPictureImgUrl', {
					url: val,
					fail() {
						_this.$message({
				          showClose: true,
				          message: '图片加载失败',
				          type: 'error'
				        });
				        _this.$store.dispatch('setCurrentModuleLoading', false);
					}
				});

				this.$store.dispatch('setCurrentModuleLoading', true);
			},

			_change(val) {
				if(!val) {
					this.dialogData.dialogVisible = true;
				}else{
					this.$store.dispatch('setModuleById', {
						newVal: {
							lazyLoad: val
						}
					});
				}
			},

			handleSuccess(res, y, z) {
				this.$message({
		          showClose: true,
		          message: '图片上传成功',
		          type: 'success'
		        });

				if(z.length > 1) {
					z.shift()
				}

				let _this = this;

				this.$store.dispatch('setPictureImgUrl', {
					url: res.url,
					fail() {
						_this.$message({
				          showClose: true,
				          message: '图片加载失败',
				          type: 'error'
				        });
				        _this.$store.dispatch('setCurrentModuleLoading', false);
					}
				});

				this.$store.dispatch('setCurrentModuleLoading', true);
			},

			_error() {
				this.$message({
		          showClose: true,
		          message: '图片上传失败',
		          type: 'error'
		        });
			}
		},

		components: {
			TxtBlock,
			SwitchTxtBlock,
			TextLeftInput,
			IndexChange,
			ZfDialog
			// ZffileUpLoad
	    },

	    created() {
	        
	    }
	}
</script>

<style lang="scss">
	.zf-fileupload{
		.el-upload__tip{
			color: #bebdbd;
		}

		.el-progress.is-success .el-progress-bar__inner{
			background-color: #20a0ff;
		}

		.el-upload{
			width: auto;

			.el-upload__file__name{
				color: #fff;
				font-size: 12px;
				margin-right: 0;
			}

			.is-finished{
				display: none;
			}

			.el-upload__files{
				margin: 0;

				li{
					margin-bottom: 10px;
				}
			}

			.el-upload__file.is-finished:hover .el-upload__btn-delete, .el-upload__btn-delete{
				display: none;
			}

			.el-upload__file:hover{
				background: none;
			}

			.el-upload__file.is-finished a:hover{
				text-decoration: none;
				color: #fff;
			}

			.el-progress__text{
				color: #fff;
			}

			.el-icon-document{
				color: #fff;
			}

			.el-button--small{
				padding: 5px 7px;
				font-size: 12px;
				// background-color: rgb(27, 131, 251);
				// background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#2b8cfb), to(#1b83fb));
				background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
				border: 1px solid #2a2a2a;
				box-shadow: 0px 1px 0px #636363;
			}
		}
	}
</style>