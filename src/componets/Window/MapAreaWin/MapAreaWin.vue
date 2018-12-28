<template>
	<div class="map-area-win pt20 pl10 pr10">
		<div class="pb10 line-area">
			<txt-block
				:inputVal="getModulesById.href"
				@zfblur="_hrefBlur"
				ref="hrefInput"
				:inputName="'链接地址: (请以//开头)'">
			</txt-block>

			<switch-txt-block
				:switchVal="getModulesById.newTab"
				@change="_newTab"
				:switchName="'新窗口打开:'">
			</switch-txt-block>
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
					ref="heightInput"
					:inputVal="getModulesById.height"
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
	import { mapGetters } from 'vuex';
	import {RegExps} from '@/constants/url';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';
	import IndexChange from '../IndexChange/IndexChange.vue';
	import DeleteModule from '../../Delete/Delete.vue';
	import Align from '../../Align/Align';

	export default{
		props: {
			mId: {

			}
		},
		data() {
			return {
				inputWidth: 55
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

			_newTab(val) {
				this.$store.dispatch('setModuleById', {
					newVal: {
						newTab: val
					}
				});
				this.$store.dispatch('saveHistory');
			},

			_alignEvent(type) {
				this.$store.dispatch('setModuleAlign', type);
				this.$store.dispatch('saveHistory');
			},

			_hrefBlur(val) {
				if(!RegExps.URL.test(val)) {
					this.$message({
						showClose: true,
						message: '链接地址请以//开头',
						type: 'error'
			        });
			        this.$refs.hrefInput.setVal(this.getModulesById.href);
				}else{
					this.$store.dispatch('setModuleById', {
						newVal: {
							href: val
						}
					});
					this.$store.dispatch('saveHistory');
				}
			},

			_inputBlur(val, refName, attr) {
				let _this = this;
				let thisModule = _this.getModulesById;
				let re = /^(\-)?\d+(\.\d+)?$/;

				if(re.test(val)) {
					if(attr == 'width' || attr == 'height') {
						// 宽高设置
						if(parseInt(val, 10) <= _this.getModulesById.minWidth) {
							// 负数
							if(attr == 'width') {
								this.$store.dispatch('setModuleById', {
									newVal: {
										width: _this.getModulesById.minWidth
									}
								});
								this.$store.dispatch('saveHistory');
							}else{
								this.$store.dispatch('setModuleById', {
									newVal: {
										height: _this.getModulesById.minHeight
									}
								});
								this.$store.dispatch('saveHistory');
							}
						}else{
							// 正数
							if(attr == 'width') {
								this.$store.dispatch('setModuleById', {
									newVal: {
										width: parseInt(val, 10)
									}
								});
								this.$store.dispatch('saveHistory');
							}else{
								this.$store.dispatch('setModuleById', {
									newVal: {
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
			IndexChange,
			TextLeftInput,
			Align,
			DeleteModule
	    },

	    created() {

	    }
	}
</script>

<style lang="scss">

</style>
