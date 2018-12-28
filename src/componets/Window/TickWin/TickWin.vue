<template>
	<div class="map-area-win pt20 pl10 pr10">
		<div class="pb20 line-area">
			<p class="end-time-data ccacaca">结束时间:</p>
			<div class="date">
			    <el-date-picker
					v-model="value1"
					type="datetime"
					:popper-class="'zf-date-picker'"
					@change="_timeChange"
					@focus="_timeFocus"
					placeholder="选择结束时间">
				</el-date-picker>
			</div>

			<switch-txt-block
				:switchVal="getModulesById.showMsec"
				@change="_msChange"
				:switchName="'显示毫秒:'">
			</switch-txt-block>
		</div>
		<div class="pb10 line-area">
			<div class="pt10 clearfix">
				<span class="txt-color ccacaca">文字颜色:</span>
				<el-color-picker v-model="txtColor" @change="_colorChange" size="mini"></el-color-picker>
			</div>

			<div class="pt5 clearfix">
				<span class="txt-color ccacaca">数字颜色:</span>
				<el-color-picker v-model="numColor" @change="_numColorChange" size="mini"></el-color-picker>
			</div>

			<div class="pt5 clearfix">
				<span class="txt-color ccacaca">数字背景:</span>
				<el-color-picker v-model="numbg" @change="_numBgChange" size="mini"></el-color-picker>
			</div>
		</div>

		<div class="pb10 line-area">
			<div class="pt10 clearfix">
				<text-left-input class="fl"
					:hasPL="false"
					:inputName="'宽度'"
					:inputVal="getModulesById.width"
					ref="widthInput"
					@zfblur="(val)=>{_inputBlur(val, 'widthInput', 'width')}"
					:inputWidth="inputWidth">
				</text-left-input>

				<text-left-input class="fl"
					:hasPL="true"
					:inputName="'高度'"
					:inputVal="getModulesById.height"
					ref="heightInput"
					@zfblur="(val)=>{_inputBlur(val, 'heightInput', 'height')}"
					:inputWidth="inputWidth">
				</text-left-input>
			</div>

			<div class="pt20 clearfix">
				<text-left-input class="fl"
					:hasPL="false"
					:inputName="'横轴'"
					:inputVal="getModulesById.left"
					ref="leftInput"
					@zfblur="(val)=>{_inputBlur(val, 'leftInput', 'left')}"
					:inputWidth="inputWidth">
				</text-left-input>

				<text-left-input class="fl"
					:hasPL="true"
					:inputName="'纵轴'"
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
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';
	import IndexChange from '../IndexChange/IndexChange.vue';
	import DeleteModule from '../../Delete/Delete.vue';
	import Align from '../../Align/Align';
	import Utils from '@/utils/helper';

	export default{
		data() {
			return {
				inputWidth: 55,
				value1: '',
				txtColor: '#fff',
				numColor: '#fff',
				numbg: '#000',
				endTime: ''
			}
		},

		computed: {
			...mapGetters(['getModulesById'])
		},

		methods: {
			_indexChange(status) {
				this.$store.dispatch('setModuleIndex', status);
				this.$store.dispatch('saveHistory');
			},

			_timeChange(time) {
				if(!time) return;
				this.$store.dispatch('setTimeEnd', time);
			},

			_colorChange(color) {
				let _this = this;

				this.$store.dispatch('setModuleById', {
					newVal: {
						txtColor: _this.txtColor
					}
				});
				this.$store.dispatch('saveHistory');
			},

			_alignEvent(type) {
				this.$store.dispatch('setModuleAlign', type);
				this.$store.dispatch('saveHistory');
			},

			_numColorChange() {
				let _this = this;

				this.$store.dispatch('setModuleById', {
					newVal: {
						numColor: _this.numColor
					}
				});
				this.$store.dispatch('saveHistory');
			},

			_numBgChange() {
				let _this = this;

				this.$store.dispatch('setModuleById', {
					newVal: {
						numbg: _this.numbg
					}
				});
				this.$store.dispatch('saveHistory');
			},

			_timeFocus() {

			},

			_msChange(val) {
				this.$store.dispatch('showMs', val);
				this.$store.dispatch('saveHistory');
			},

			_txtColorChange() {
				this.txtColor = this.getModulesById.txtColor;
			},

			_moduleNumColorChange() {
				this.numColor = this.getModulesById.numColor;
			},

			_moduleNumbgChange() {
				this.numbg = this.getModulesById.numbg;
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
			},

			_moduleEndTimeChange() {
				this.endTime = Utils.timeTrans(this.getModulesById.endTime);
				$('.el-date-editor .el-input__inner').val(this.endTime);
			}
		},

		components: {
			TxtBlock,
			SwitchTxtBlock,
			IndexChange,
			TextLeftInput,
			Align,
			DeleteModule
	    },

	    mounted() {
	        this.txtColor = this.getModulesById.txtColor;
	        this.numColor = this.getModulesById.numColor;
	        this.numbg = this.getModulesById.numbg;
	        this.endTime = Utils.timeTrans(this.getModulesById.endTime);
	        $('.el-date-editor .el-input__inner').val(this.endTime);
	    },

	    watch: {
	    	'getModulesById.txtColor': '_txtColorChange',
	    	'getModulesById.numColor': '_moduleNumColorChange',
	    	'getModulesById.numbg': '_moduleNumbgChange',
	    	'getModulesById.endTime': '_moduleEndTimeChange'
	    }
	}
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.map-area-win{
		.end-time-data{
			font-size: 11px;
		    line-height: 1;
		    display: block;
		    padding-bottom: 10px;

		    span{
		    	padding-left: 5px;
		    }
		}

		.end-time-label{
			font-size: 11px;
		    color: #fff;
		    line-height: 1;
		    display: block;
		}

		.date{
			.el-input{
				box-shadow: 0px 1px 0px #636363;
    			border-radius: 4px;
			}

			.el-input__icon{
				color: #fff;
				line-height: 24px;
			}

			.el-input__inner{
				height: 22px;
				@include box-sizing(border-box);
				border: 1px solid #2d2d2d;
				background-color: #4a4a4a;
				color: #cacaca;
				font-weight: lighter;
				box-shadow: 0px 1px 1px #373737 inset;
				border-radius: 4px;
				font-size: 12px;

				&::-webkit-input-placeholder{
					color: #cacaca;
					font-weight: lighter;
					font-size: 12px;
				}
			}

			.el-input__suffix{
				display: none;
			}
		}
	}

	.txt-color{
		display: inline-block;
		vertical-align: middle;
		font-size: 11px;
	}

	.el-color-picker{
		vertical-align: middle;
	}

	.zf-date-picker{
		&.el-picker-panel{
			background-color: #535353;
			border: 1px solid #2d2d2d;
			// box-shadow: 0px 1px 1px #373737;
			box-shadow: 0 2px 10px #000;
			color: #cacaca;
			left: auto !important;
			right: 30px !important;
		}

		.popper__arrow::after{
			border-bottom-color: #535353 !important;
		}

		.popper__arrow{
			border-bottom-color: #2d2d2d !important;
		}

		.el-date-table th{
			border-bottom: 1px solid #2d2d2d;
			box-shadow: 0px 1px 0px #636363;
		}

		.el-date-picker__time-header{
			border-bottom: 1px solid #2d2d2d;
			box-shadow: 0px 1px 0px #636363;
		}

		.el-picker-panel__footer{
			background-color: #535353;
			border-top: 1px solid #2d2d2d;
			box-shadow: 0px 1px 0px #636363 inset;
		}

		.el-input__inner{
			height: 22px;
			@include box-sizing(border-box);
			border: 1px solid #2d2d2d;
			background-color: #4a4a4a;
			color: #cacaca;
			font-weight: lighter;
			box-shadow: 0px 1px 1px #373737 inset;
			border-radius: 4px;
			font-size: 12px;
		}

		.el-picker-panel__icon-btn{
			color: #cacaca;
		}

		.el-date-table{
			th{
				color: #cacaca;
			}

			td.prev-month, td.next-month{
			    color: #808080;
			}

			td.available{

			}

			td.available:hover{
				color: #fff;
				background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
				border: 1px solid #2a2a2a;
	    		border-radius: 3px;
	    		height: 28px;
	    		width: 30px;

	    		div{
	    			height: 28px;

	    			span{
	    				line-height: 23px;
	    				border-radius: 0;
	    			}
	    		}
			}

			td.current{
				background-color: #20a0ff!important;
				border-radius: 3px;
			}

			td.current:not(.disabled) span{
				background: none;
			}
		}

		.el-picker-panel__link-btn{
			color: #cacaca;
		}

		.is-plain{
			background: none;
			border-color: #535353;
		}

		.el-button.is-plain:hover{
			color: #fff;
			background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
			border: 1px solid #2a2a2a;
    		border-radius: 3px;
    		box-shadow: 0px 1px 0px #636363;
		}

		.el-date-picker__header-label, .el-date-picker__header-label{
			color: #cacaca;
		}

		.el-time-panel{
			border-color: #2d2d2d;
			background-color: #535353;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .8);
		}

		.el-time-spinner__item{
			color: #cacaca;
		}

		.el-time-panel__footer{
			border-top: 1px solid #2d2d2d;
			box-shadow: 0px 1px 0px #636363 inset;

			.el-time-panel__btn{
				color: #cacaca;
			}
		}

		.el-time-spinner__item.active:not(.disabled){
			color: #20A0FF;
		}

		.el-time-panel__content::after, .el-time-panel__content::before{
			border-color: #2d2d2d;
		}

		.el-time-spinner__item:hover:not(.disabled):not(.active){
			background: none;
			color: #20A0FF;
		}
	}
</style>
