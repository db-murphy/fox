<template>
	<div class="map-area-win pt20 pl10 pr10">
		<txt-block 
			:inputVal="getModulesById.href"
			@zfblur="_hrefBlur"
			:inputName="'链接地址:'">
		</txt-block>

		<switch-txt-block 
			:switchVal="getModulesById.newTab"
			@change="_newTab"
			:switchName="'新窗口打开:'">
		</switch-txt-block>
		
		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="'宽度'" 
				:inputVal="getModulesById.width" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl"
				:hasPL="true" 
				:inputName="'高度'" 
				:inputVal="getModulesById.height" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>

		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="'横轴'" 
				:inputVal="getModulesById.left" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl" 
				:hasPL="true" 
				:inputName="'纵轴'" 
				:inputVal="getModulesById.top" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>

		<index-change @indexChange="_indexChange"></index-change>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';
	import IndexChange from '../IndexChange/IndexChange.vue';

	export default{
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
			},

			_newTab(val) {
				this.$store.dispatch('newTab', val);
			},

			_hrefBlur(val) {
				this.$store.dispatch('setHref', val);
			}
		},

		components: {
			TxtBlock,
			SwitchTxtBlock,
			IndexChange,
			TextLeftInput
	    },

	    created() {
	        
	    }
	}
</script>

<style lang="scss">
	
</style>