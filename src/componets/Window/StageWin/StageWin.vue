<template>
	<div class="stage-win pt20 pl10 pr10">
		<div class="pb20">
			<txt-block
				:inputVal="getCurrentFileById.fileName"
				@zfblur="_fileNameBlur"
				ref="hrefInput"
				:inputName="'文件名称:'">
			</txt-block>
		</div>

		<div class="pb20 clearfix">
			<text-left-input class="fl"
				:hasPL="false"
				:inputName="'宽度'"
				:inputVal="getCurrentFileById.width"
				ref="widthInput"
				:disable="true"
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl"
				:hasPL="true"
				:inputName="'高度'"
				:inputVal="getCurrentFileById.height"
				ref="heightInput"
				@zfblur="(val)=>{_inputBlur(val, 'heightInput', 'height')}"
				:inputWidth="inputWidth">
			</text-left-input>
		</div>

		<div class="clearfix">
			<span class="txt-color ccacaca">画布背景色:</span>
			<el-color-picker v-model="bgColor" @change="_bgColorChange" size="mini"></el-color-picker>
		</div>

		<switch-txt-block
			:switchName="switchName"
			:switchVal="getCurrentFileById.fileBg.isTransport"
			@change="_change">
		</switch-txt-block>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import ColorSet from '../../ColorSet/ColorSet.vue';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';

	export default{
		data() {
			return {
				switchName: '背景是否透明:',
				inputWidth: 55,
				bgColor: '#fff'
			}
		},

		computed: {
			...mapGetters(['getCurrentFileById'])
		},

		methods: {
			_change(val) {
				this.$store.dispatch('setStageTransport', val);
				this.$store.dispatch('saveHistory');
			},

			_fileNameBlur(val) {
				this.$store.dispatch('setStageData', {
					fileName: val
				});
				this.$store.dispatch('saveHistory');
			},

			_bgColorChange(color) {
				this.$store.dispatch('setStageColor', color);
				this.$store.dispatch('saveHistory');
			},

			_bgStoreColorChange() {
				this.bgColor = this.getCurrentFileById.fileBg.bgColor;
			},

			_inputBlur(val, refName, attr) {
				let _this = this;
				let re = /^(\-)?\d+(\.\d+)?$/;

				if(re.test(val)) {
					// 宽高设置
					if(parseInt(val, 10) <= _this.getCurrentFileById.minHeight) {
						this.$message({
							showClose: true,
							message: '最小值为' + _this.getCurrentFileById.minHeight + 'px',
							type: 'error'
				        });

						this.$store.dispatch('setStageData', {
							height: _this.getCurrentFileById.minHeight
						});
						this.$store.dispatch('saveHistory');
					}else{
						this.$store.dispatch('setStageData', {
							height: parseInt(val, 10)
						});
						this.$store.dispatch('saveHistory');
					}
				}else{
					this.$refs[refName].setVal(this.getCurrentFileById[attr]);
					this.$message({
						showClose: true,
						message: '输入必须为数值',
						type: 'error'
			        });
				}
			}
		},

		components: {
			ColorSet,
			SwitchTxtBlock,
			TextLeftInput,
			TxtBlock
	    },

	    created() {

	    },

	    mounted() {
	        this.bgColor = this.getCurrentFileById.fileBg.bgColor;
	    },

	    watch: {
	    	'getCurrentFileById.fileBg.bgColor': '_bgStoreColorChange'
	    }
	}
</script>

<style lang="scss">
	.stage-win{
		.bgcolor{
			color: #fff;
			font-size: 12px;
		}

		.txt-color{
			display: inline-block;
			vertical-align: middle;
			font-size: 11px;
		}

		.el-color-picker{
			vertical-align: middle;
		}
	}
</style>
