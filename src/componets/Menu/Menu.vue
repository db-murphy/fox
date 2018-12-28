<template>
	<section class="menu">
		<h1 class="logo"></h1>
		<div class="modules-panel">
			<ul class="modules-wrap" @mousemove="_mousemove" @mouseup="_mouseup" @mousedown="_mousedown" @mouseleave="_mouseleave" @click="_click">
				<li v-for="(item, index) in modulesItems" :class="item.classObject" :index="index">
					<!-- <el-dropdown v-if="item.name == '预览'" trigger="hover" @command="_handlePreviewCommand">
						<div class="inner">
							<span class="item-txt">{{item.name}}</span>
						</div>
						<el-dropdown-menu slot="dropdown" class="dropdown-menu">
						    <el-dropdown-item command="pc">PC端</el-dropdown-item>
						    <el-dropdown-item command="m" class="nb">移动端</el-dropdown-item>
						    <el-dropdown-item command="app" class="nb">京东APP</el-dropdown-item>
						  </el-dropdown-menu>
					</el-dropdown> -->
					<div class="inner">
						<span class="item-txt">{{item.name}}<input v-if="item.name=='打开'" @change="_fileImport" type="file" class="open"></span>
					</div>
				</li>
			</ul>
		</div>
		<!-- 新建 -->
		<zf-dialog :dialogData="dialogData" @ok="_ok"></zf-dialog>
		<ZfDialogNormal :dialogData="exportDialogData" id="exportDialogData" class="exportDialogData">
			<div class="export-data" slot="content">
				<p class="export-waring mb10 mt10">
					<i class="el-icon-warning"></i>
					<span class="pl5 pr5">警告:</span>
					<span>请勿修改编码!</span>
				</p>
				<el-input id="foo" type="textarea" resize="none" v-model="exportValue" :disabled="false" class="zf-input no-select" size="mini" :autosize="{ minRows: 6, maxRows: 12}">
					<p></p>
				</el-input>
			</div>
			<div slot="zf-footer">
				<el-button @click="exportDialogData.dialogVisible = false">{{exportDialogData.cancelTxt}}</el-button>
				<el-button type="primary" @click="_copyCode" data-clipboard-target="#foo">{{exportDialogData.okTxt}}</el-button>
			</div>
		</ZfDialogNormal>

		<ZfDialogNormal :dialogData="importDialogData" id="importDialogData" class="importDialogData">
			<div class="export-data" slot="content">
				<el-input type="textarea" resize="none" @focus="_focus" @blur="_blur" v-model="importValue" :disabled="false" class="zf-input no-select" size="mini" :autosize="{ minRows: 10, maxRows: 12}">
					<p></p>
				</el-input>
			</div>
			<div slot="zf-footer">
				<el-button @click="_cancelImportDialogData">{{importDialogData.cancelTxt}}</el-button>
				<el-button type="primary" @click="_importSubmit">{{importDialogData.okTxt}}</el-button>
			</div>
		</ZfDialogNormal>

		<ZfDialogNormal :dialogData="appPreviewDialogData" :width="300" id="appPreviewDialogData" class="appPreviewDialogData">
			<div slot="content">
				<div class="code-wrap">
					<img :src="require('./code.png')">
				</div>
			</div>
		</ZfDialogNormal>

		<ZfDialogNormal :dialogData="helpDialogData" @close="_helpDialogDataClose" :width="400" id="helpDialogData" class="helpDialogData">
			<div slot="content">
				<div class="video-wrap">
					<p class="pb10 ac ccacaca fz12 canselect">如有疑问, 请咨询咚咚群: 6238486</p>
					<div class="ac pt20">
						<el-button type="primary" @click="_toVideo">去观看视频</el-button>
					</div>
					<!-- <video
					    id="my-player"
					    class="video-js vjs-big-play-centered"
					    controls
					    preload="auto"
					    fluid="true"
					    :poster="require('../../assets/videoPlaceHolder.jpg')"
					    data-setup='{}'>
					  <source src="//39.104.28.70:3100/static/help.mp4" type="video/mp4"></source>
					  <p class="vjs-no-js">
					    To view this video please enable JavaScript, and consider upgrading to a
					    web browser that
					    <a href="http://videojs.com/html5-video-support/" target="_blank">
					      supports HTML5 video
					    </a>
					  </p>
					</video> -->
				</div>
			</div>
		</ZfDialogNormal>
	</section>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import {IS_DEBUG} from '@/constants/url';
	import ZfDialog from '../Dialog/Dialog.vue';
	import ZfDialogNormal from '../Dialog/Normal';
	import TxtBlock from '../inputGroup/TxtBlock';
	import CryptoJS from 'crypto-js';
	import Clipboard from 'clipboard';
	let FileSaver = require('file-saver');

	// let code = CryptoJS.AES.encrypt(JSON.stringify({a: 1}), 'secretkey123');
	// var bytes  = CryptoJS.AES.decrypt(code.toString(), 'secretkey123');
	// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

	// console.log(decryptedData)

	export default {
		name: 'Menu',
		data() {
			return {
				importValue: '',
				dialogData: {
	    			dialogVisible: false,
	    			title: '新建',
	                width: 750,
	                height: 750,
	                name: '新建文档'
	    		},

	    		appPreviewDialogData: {
	    			dialogVisible: false,
	    			title: '请扫描二维码'
	    		},

	    		helpDialogData: {
	    			dialogVisible: false,
	    			title: '教程'
	    		},

	    		exportDialogData: {
	    			dialogVisible: false,
	    			title: '导出',
	    			val: '',
	    			okTxt: '复制编码',
	    			cancelTxt: '取消'
	    		},

	    		importDialogData: {
	    			dialogVisible: false,
	    			title: '导入编码',
	    			val: '',
	    			okTxt: '确定',
	    			cancelTxt: '取消'
	    		},

	    		player: null,

				modulesItems: [
					{
						name: '新建',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: '打开',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: '导出',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: '预览',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					},
					{
						name: '教程',
						classObject: {
	            			hover: false,
	            			active: false
	            		}
					}
				]
			}
		},
		methods: {
			_toVideo() {
				window.open('http://newbuz.360buyimg.com/video/4.5/jdvideo.html?autoplay=false&fuScrnEnabled=true&playbackRateEnabled=true&fileid=4564972819238551310&appid=1251412368&sw=750&sh=422');
			},
			_blur(x) {
				this.$store.dispatch('inputFocusUpdate', false);
			},

			_focus() {
				this.$store.dispatch('inputFocusUpdate', true);
			},
			_mousedown(ev) {
				let _this = this;

				var target = $(ev.target);
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					clearAllActiveStatus(_this.modulesItems);
					_this.modulesItems[_index].classObject.active = true;
					_this.modulesItems[_index].classObject.hover = false;
				}
			},

			_mouseup(ev) {
				let _this = this;
				var target = $(ev.target);
				var tool = target.closest('li');

				clearAllActiveStatus(_this.modulesItems);

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					_this.modulesItems[_index].classObject.hover = true;
				}
			},

			_mousemove(ev) {
				let _this = this;
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					clearAllHoverStatus(_this.modulesItems);
					if(!_this.modulesItems[_index].classObject.active) {
						_this.modulesItems[_index].classObject.hover = true;
					}
				}else{
					clearAllHoverStatus(_this.modulesItems);
				}

				return false;
			},

			_click(ev) {
				let _this = this;
				var target = $(ev.target);
				var tool = target.closest('li');

				if(tool.length) {
					var _index = parseInt(tool.attr('index'), 10);

					switch(_this.modulesItems[_index].name) {
						case '新建':
							this._createFile();
							break;
						case '导出':
							this._export();
							break;
						case '导入':
							// this._importFile();
							break;
						case '预览':
							this._preview();
							break;
						case '教程':
							this._showHelp();
							break;
					}
				}
			},

			_fileImport(ev) {
				let _this = this;
				let fileInput = ev.target;

				if(this.getAllFiles.length >= 5) {
					return this.$message({
						showClose: true,
						message: '做多同时打开5个文件',
						type: 'error'
			        });
				}

				if(typeof FileReader == 'undefined') {
					return this.$message({
						showClose: true,
						message: '请使用Chrome/firefox或者IE10以上的浏览器',
						type: 'error'
			        });
				}
				if(!fileInput.files.length) return;

				let file = fileInput.files[0];
				let reader = new FileReader();
				let type = file.name.split('.').pop();

				if(type != 'sghb') {
					return this.$message({
						showClose: true,
						message: '只能打开.sghb类型文件',
						type: 'error'
			        });
				}
				reader.readAsText(file);
				reader.onload = function() {
					fileInput.value = "";
					_this._codeImport(this.result);
				}
			},

			_codeImport(jsonString) {
				try{
					let decryptedData = JSON.parse(jsonString);

					for(let i = 0; i < this.getAllFiles.length; i++) {
						if(this.getAllFiles[i].id == decryptedData.id) {
							return this.$message({
								showClose: true,
								message: '改文件已经打开，请勿重复打开',
								type: 'error'
					        });
						}
					}
					this.$store.dispatch('createNewFile', decryptedData);
					this.importDialogData.dialogVisible = false;
				}catch(err){
					this.$message({
						showClose: true,
						message: '文件损坏，无法解析',
						type: 'error'
			        });
				}
			},

			_cancelImportDialogData() {
				this.importDialogData.dialogVisible = false;
				this.importValue = '';
			},

			_importFile() {
				this.importDialogData.dialogVisible = true;
			},

			_showHelp() {
				this.helpDialogData.dialogVisible = true;
				// if(!this.player) {
				// 	setTimeout(() => {
				// 		this.player = videojs('my-player', {
				// 			autoplay: false,
				// 			controlBar: {
				// 				muteToggle: false,
				// 				volumeMenuButton:false
				// 	        }
				// 		});
				// 	}, 2);
				// };
			},

			_helpDialogDataClose() {
				// this.player.pause();
			},

			_importSubmit() {
				if(this.importValue == '') {
					return this.$message({
						showClose: true,
						message: '输入不能为空',
						type: 'error'
			        });
				};

				// let bytes  = CryptoJS.AES.decrypt(this.importValue, 'secretkey123');

				try{
					// let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

					let decryptedData = JSON.parse(this.importValue);

					for(let i = 0; i < this.getAllFiles.length; i++) {
						if(this.getAllFiles[i].id == decryptedData.id) {
							return this.$message({
								showClose: true,
								message: '改文件已经存在，请勿重复导入',
								type: 'error'
					        });
						}
					}
					this.$store.dispatch('createNewFile', decryptedData);
					this.importDialogData.dialogVisible = false;
					this.importValue = '';
				}catch(err){
					this.$message({
						showClose: true,
						message: '编码被损坏，无法导入',
						type: 'error'
			        });
				}
			},

			_preview() {
				if(!this.getCurrentFileById) {
					return this.$message({
						showClose: true,
						message: '未找到可以预览的文件',
						type: 'error'
			        });
				};

				localStorage.huabanStr = JSON.stringify(this.getCurrentFileById);

				setTimeout(()=>{
					if(IS_DEBUG) {
						window.open('/static/preview/index.html');
					}else{
						window.open('/huabanpreview.html');
					}
				}, 10);
			},

			_mouseleave() {
				let _this = this;

				clearAllHoverStatus(_this.modulesItems);
			},

			_createFile() {
				if(this.getAllFiles.length >= 5) {
					return this.$message({
						showClose: true,
						message: '最多同时打开5个文件',
						type: 'error'
			        });
				}

				this.dialogData.dialogVisible = true;
			},

			_export() {
				if(!this.getCurrentFileById) {
					return this.$message({
						showClose: true,
						message: '无可导出的文件',
						type: 'error'
			        });
				};
				// this.exportDialogData.title = this.getCurrentFileById.fileName;
				// this.exportDialogData.dialogVisible = true;
				// setTimeout(function() {
				// 	if(!$('#exportDialogData .mask').length) {
				// 		$('#exportDialogData .el-textarea').append('<div class="mask"></div>');
				// 	}
				// }, 10);
				if(!!new Blob) {
					let blob = new Blob([this.exportValue], {type: "text/plain;charset=utf-8"});
					FileSaver.saveAs(blob, this.getCurrentFileById.fileName + '.sghb');
                }else{
                    this.$message({
                        showClose: true,
                        message: '请使用Chrome/firefox或者IE10以上的浏览器',
                        type: 'error'
                    });
				}
			},

			_ok(val) {
	            let height = parseFloat(val.height);
	            let stageHeight = $('.stage-content').height();
	            let stageWidth = $('.stage-content').width();
	            let overFlow = false;
	            let overFlowx = false;
	            let overFlowy = false;

	            if(stageHeight < height || stageWidth < parseFloat(val.width)) {
	                overFlow = true;
	            }

	            if(stageHeight < height) {
	            	overFlowy = true;
	            }

	            if(stageWidth < parseFloat(val.width)) {
	            	overFlowx = true;
	            }

	            this._addFile({
	                fileName: val.name,
	                width: parseFloat(val.width),
	                height: height,
	                fileSizeOverflow: overFlow,
	                fileSizeOverflowx: overFlowx,
	                fileSizeOverflowy: overFlowy,
	                fileBg: {
	                    isTransport: false,
	                    bgColor: '#fff',
	                    R: 255,
	                    G: 255,
	                    B: 255
	                }
	            });
				this.$emit('createFile');
	    	},

	    	_addFile(file) {
	            this.$store.dispatch('createNewFile', file);
	        },

	        _copyCode() {
	        	this.exportDialogData.dialogVisible = false;
	        },

	        _handlePreviewCommand(command) {
				switch(command) {
					case 'm':
						this._previewM();
						break;
					case 'pc':
						this._previewPC();
						break;
					case 'app':
						this._previewApp();
						break;
				}
	        },

	        _previewM() {
	        	if(!this.getCurrentFileById) {
					return this.$message({
						showClose: true,
						message: '无可预览的文件',
						type: 'error'
			        });
				};
				if(IS_DEBUG) {
					window.open('//127.0.0.1:8080/static/preview.html?device=m&str=' + JSON.stringify(this.getCurrentFileById));
				}
	        },

	        _previewPC() {
	        	if(!this.getCurrentFileById) {
					return this.$message({
						showClose: true,
						message: '无可预览的文件',
						type: 'error'
			        });
				};
				if(IS_DEBUG) {
					window.open('//127.0.0.1:8080/static/preview.html?device=pc&str=' + JSON.stringify(this.getCurrentFileById));
				}
	        },

	        _previewApp() {
	        	if(!this.getCurrentFileById) {
					return this.$message({
						showClose: true,
						message: '无可预览的文件',
						type: 'error'
			        });
				};
	        	this.appPreviewDialogData.dialogVisible = true;
	        }
		},
		computed: {
			...mapGetters(['getCurrentFileById', 'getAllFiles']),
			exportValue() {
				// let code = CryptoJS.AES.encrypt(JSON.stringify(this.getCurrentFileById), 'secretkey123');
				// console.log(JSON.stringify(this.getCurrentFileById, null, 4))
				// return code.toString();
				// return JSON.stringify(this.getCurrentFileById, null, 4);
				return JSON.stringify(this.getCurrentFileById);
			}
		},
		components: {
			ZfDialog,
			ZfDialogNormal,
			TxtBlock
		},
		mounted() {
			let clipboard = new Clipboard('#exportDialogData .dialog-footer .el-button--primary');
			let _this = this;

        	clipboard.on('success', function(e) {
			    e.clearSelection();

			    _this.$message({
					showClose: true,
					message: '复制成功',
					type: 'success'
		        });
			});

			clipboard.on('error', function(e) {

			});


		}
	};

	function clearAllHoverStatus(data) {
		for(var i = 0; i < data.length; i++) {
			data[i].classObject.hover = false;
		}
	}

	function clearAllActiveStatus(data) {
		for(var i = 0; i < data.length; i++) {
			data[i].classObject.active = false;
		}
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.menu{
		@include box-sizing(border-box);
		height: 40px;
		background-color: #535353;
		border-top: 1px solid #6a6a6a;
		border-bottom: 1px solid #282828;
		position: relative;

		.logo{
			position: absolute;
			left: 10px;
			top: 50%;
			@include translate(0, -50%);
			height: 26px;
			width: 90px;
			background: #535353 url(./logo2.png) no-repeat left center;
			background-size: contain;
		}

		.modules-panel{
			padding-left: 0;

			.el-dropdown{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
			}
		}

		.modules-wrap{
			position: absolute;
			left: 105px;
			top: 50%;
			@include translate(0, -50%);
		}

		.item-txt{
			font-size: 12px;
			color: #cacaca;
			position: absolute;
			left: 50%;
			top: 50%;
			@include translate(-50%, -50%);
			white-space: nowrap;

			.open{
				font-size: 0;
				opacity: 0;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: 3;
			}
		}

		.modules-panel ul li{
			width: 50px;
			height: 24px;
			@include box-sizing(content-box);

			&.plr10{
				padding: 0 10px;
			}
		}

		.exportDialogData .el-dialog__body{
			padding-top: 0;
		}

		.exportDialogData{
			.el-textarea{
				position: relative;

				.mask{
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					z-index: 3;
				}
			}
		}

		.el-icon-warning{
			font-size: 18px;
			color: #EB9E05;
			position: absolute;
			left: 0;
			top: 50%;
			@include translate(0, - 50%);
		}

		.export-waring{
			color: #EB9E05;
			padding-left: 20px;
			position: relative;
		}

		.appPreviewDialogData .el-dialog__footer{
			padding: 0;
		}

		.code-wrap{
			width: 200px;
			margin: 0 auto;

			img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		.helpDialogData{
			overflow: hidden;

			.el-dialog__body{
				padding: 20px;
			}

			.el-dialog__footer{
				display: none;
			}

			.video-js{
				box-shadow: 0px 5px 10px rgba(0, 0, 0, .7) inset;
			}

			.video-js *{
				outline: none;
			}

			.video-js .vjs-text-track-display{
				// box-shadow: 0px 5px 10px rgba(0, 0, 0, .7) inset;
			}

			.video-wrap{
				// width:
			}
		}
	}
</style>
