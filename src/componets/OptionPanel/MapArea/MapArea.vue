<template>
	<div class="option-map-area">
		<text-left-sel class="fl" :selName="selName" :selOptions="selOptions" :selValueDef="selValueDef"></text-left-sel>
		<text-left-input class="fl" :inputName="width" :inputWidth="inputWidth"></text-left-input>
		<text-left-input class="fl" :inputName="height" :inputWidth="inputWidth"></text-left-input>
	</div>
</template>

<script>
	import TextLeftSel from '../../selectGroup/TxtLeft.vue';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';

	export default {
		data() {
			return {
				selName: '样式:',
				width: '宽度:',
				height: '高度:',
				inputWidth: 55,
				selOptions: [{
		          value: '0',
		          label: '正常'
		        }, {
		          value: '1',
		          label: '固定比例'
		        },{
		          value: '2',
		          label: '固定大小'
		        }],
		        selValueDef: '0'
			}
		},
		components: {
			TextLeftSel,
			TextLeftInput
		}
	};
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.option-map-area{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding-left: 38px;
		padding-top: 5px;
		@include box-sizing(border-box);
	}
</style>