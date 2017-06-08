<template>
	<div class="stage-win pt20 pl10 pr10">
		<label class="bgcolor pb10 pt20">背景颜色:</label>
		<color-set @change="_colorChange" :colorInit="getCurrentFileById.fileBg"></color-set>

		<switch-txt-block 
			:switchName="switchName" 
			:switchVal="getCurrentFileById.fileBg.isTransport" 
			@change="_change">
		</switch-txt-block>

		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="'宽度'" 
				:inputVal="getCurrentFileById.width + ' px'" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl" 
				:hasPL="true"
				:inputName="'高度'"
				:inputVal="getCurrentFileById.height + ' px'" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import ColorSet from '../../ColorSet/ColorSet.vue';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';

	export default{
		data() {
			return {
				switchName: '背景是否透明:',
				inputWidth: 55
			}
		},

		computed: {
			...mapGetters(['getCurrentFileById'])
		},

		methods: {
			_change(val) {
				this.$store.dispatch('setStageTransport', val);
			},

			_colorChange(colorData) {
				this.$store.dispatch('setStageColor', colorData);
			}
		},

		components: {
			ColorSet,
			SwitchTxtBlock,
			TextLeftInput
	    },

	    created() {
	        
	    }
	}
</script>

<style lang="scss">
	.stage-win{
		.bgcolor{
			color: #fff;
			font-size: 12px;
		}
	}
</style>