<template>
	<div class="picture-win pt20 pl10 pr10">
		<div class="pb10 line-area">
			<div class="zf-fileupload">
		        <el-upload
		          :action="uploadUrl"
				  :data="uploadFileData"
		          :show-file-list="true"
		          :name="'filedata'"
				  :before-upload="_beforeUpload"
		          :on-error="_error"
		          :on-success="handleSuccess">
		          <el-button size="small" type="primary">点击上传</el-button>
		          <span class="el-upload__tip pl5" slot="tip">不超过{{size}}kb</span>
		        </el-upload>
			</div>

			<txt-block
				class="pt10"
				:inputName="inputName"
				:inputVal="getModulesById.imgUrl"
				ref="imgUrlInput"
				@zfblur="_imgBlur">
			</txt-block>

			<switch-txt-block
				:switchName="switchName"
				:switchVal="getModulesById.lazyLoad"
				@change="_change">
			</switch-txt-block>
		</div>

		<div class="pb10 line-area">
			<div class="pt10 clearfix">
				<text-left-input class="fl"
					:hasPL="false"
					:inputName="width"
					:inputVal="getModulesById.width"
					ref="widthInput"
					@zfblur="(val)=>{_inputBlur(val, 'widthInput', 'width')}"
					:inputWidth="inputWidth">
				</text-left-input>

				<text-left-input class="fl"
					:hasPL="true"
					:inputName="height"
					:inputVal="getModulesById.height"
					ref="heightInput"
					@zfblur="(val)=>{_inputBlur(val, 'heightInput', 'height')}"
					:inputWidth="inputWidth">
				</text-left-input>
			</div>
			<div class="pt20 clearfix">
				<text-left-input class="fl"
					:hasPL="false"
					:inputName="x"
					:inputVal="getModulesById.left"
					ref="leftInput"
					@zfblur="(val)=>{_inputBlur(val, 'leftInput', 'left')}"
					:inputWidth="inputWidth">
				</text-left-input>

				<text-left-input class="fl"
					:hasPL="true"
					:inputName="y"
					:inputVal="getModulesById.top"
					ref="topInput"
					@zfblur="(val)=>{_inputBlur(val, 'topInput', 'top')}"
					:inputWidth="inputWidth">
				</text-left-input>
			</div>
		</div>

		<div class="pt10 pb10 line-area clearfix">
			<Align @alignEvent="_alignEvent"></Align>
		</div>

		<index-change @indexChange="_indexChange" class="pt10"></index-change>

		<DeleteModule class="pt20"></DeleteModule>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import {API, IS_DEBUG, RegExps} from '@/constants/url';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';
	import Arrow from '../../Icons/Arrow/Arrow.vue';
	import IndexChange from '../IndexChange/IndexChange.vue';
	import ZfDialog from '../../Dialog/Dialog.vue';
	import DeleteModule from '../../Delete/Delete.vue';
	import Align from '../../Align/Align';
	// import ZffileUpLoad from '../../FileUpLoad/FileUpLoad.vue';

	export default{
		data() {
			return {
				inputName: '图片地址: (请以//开头)',
				switchName: '是否开启懒加载:',
				width: '宽度:',
				height: '高度:',
				x: '横轴:',
				y: '纵轴:',
				inputWidth: 55,
				dialogData: {
	    			dialogVisible: false,
	    			title: '确认'
	    		},
				uploadFileData: {},
				size: 800
			}
		},

		computed: {
			...mapGetters(['getModulesById', 'getModuleMinHeight', 'getModuleMinWidth']),
			uploadUrl() {
	            return IS_DEBUG? '//127.0.0.1:3100/redm/uploadpicpop': API.IMG_UPLOAD;
	        }
		},

		methods: {
			_indexChange(status) {
				this.$store.dispatch('setModuleIndex', status);
				this.$store.dispatch('saveHistory');
			},

			_alignEvent(type) {
				this.$store.dispatch('setModuleAlign', type);
				this.$store.dispatch('saveHistory');
			},

			_ok() {
				this.$store.dispatch('setModuleById', {
					newVal: {
						lazyLoad: val
					}
				});
			},

			_imgBlur(val) {
				let _this = this;

				if(!RegExps.URL.test(val)) {
					return _this.$message({
					  showClose: true,
					  message: '图片链接请以//开头',
					  type: 'error'
					});
				}

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
				this.$store.dispatch('setModuleById', {
					newVal: {
						lazyLoad: val
					}
				});
				this.$store.dispatch('saveHistory');
			},

			_beforeUpload(file) {
				var type = file.name.split('.').pop();
	            var _size = file.size / 1024;

	            if(this.size && _size > this.size) {
	                this.$message({
						showClose: true,
						message: '图片大小不能超过'+this.size+'k!',
						type: 'error'
					});
	                return false;
	            }
				this.uploadFileData.fileName = file.name;
			},

			handleSuccess(res, y, z) {
				if(res.code != 0) {
	                return this.$message({
						showClose: true,
						message: res.msg,
						type: 'error'
	                });
	            }

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
					url: res.result.url,
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
			},

			_inputBlur(val, refName, attr) {
				let _this = this;
				let thisModule = _this.getModulesById;
				let naturalWidth = thisModule.naturalWidth;
				let naturalHeight = thisModule.naturalHeight;
				let re = /^(\-)?\d+(\.\d+)?$/;

				if(re.test(val)) {
					if(attr == 'width' || attr == 'height') {
						// 宽高设置
						if(parseInt(val, 10) <= 0) {
							// 负数
							if(attr == 'width') {
								this.$store.dispatch('setModuleById', {
									newVal: {
										width: _this.getModuleMinWidth,
										height: parseInt(_this.getModuleMinWidth * naturalHeight / naturalWidth, 10)
									}
								});
								this.$store.dispatch('saveHistory');
							}else{
								this.$store.dispatch('setModuleById', {
									newVal: {
										width: parseInt(_this.getModuleMinHeight * naturalWidth / naturalHeight, 10),
										height: _this.getModuleMinHeight
									}
								});
								this.$store.dispatch('saveHistory');
							}
						}else{
							// 正数
							if(attr == 'width') {
								this.$store.dispatch('setModuleById', {
									newVal: {
										width: parseInt(val, 10),
										height: parseInt(parseInt(val, 10) * naturalHeight / naturalWidth, 10)
									}
								});
								this.$store.dispatch('saveHistory');
							}else{
								this.$store.dispatch('setModuleById', {
									newVal: {
										width: parseInt(parseInt(val, 10) * naturalWidth / naturalHeight, 10),
										height: parseInt(val, 10)
									}
								});
								this.$store.dispatch('saveHistory');
							}
						}
					}else{
						// x, y设置
						this.$store.dispatch('setModuleById', {
							newVal: {
								[attr]: parseInt(val, 10)
							}
						});
						this.$store.dispatch('saveHistory');
						this.$refs[refName].setVal(parseInt(val, 10));
					}
				}else{
					this.$refs[refName].setVal(this.getModulesById[attr]);
					this.$message({
						showClose: true,
						message: '输入必须为数值',
						type: 'error'
			        });
				}
			}
		},

		components: {
			TxtBlock,
			SwitchTxtBlock,
			TextLeftInput,
			IndexChange,
			ZfDialog,
			Align,
			DeleteModule
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

		.el-upload-list{
			.is-success{
				display: none;
			}

			.el-icon-document{
				color: #cacaca;
			}

			.el-upload-list__item-name{
				color: #cacaca;
				font-size: 12px;
			}

			.is-uploading{
				margin-bottom: 5px;
			}

			.el-progress__text{
				color: #cacaca;
				font-size: 12px;
			}
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

			.el-button span{
				color: #cacaca;
			}
		}
	}
</style>
