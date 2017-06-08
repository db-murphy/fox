<template>
	<div class="option-select">
		<zf-checkbox :checkboxName="checkboxName"></zf-checkbox>
	</div>
</template>

<script>
	import ZfCheckbox from '../../Checkbox/checkbox.vue';

	export default {
		data() {
			return {
				checkboxName: '自动选择图层'
			}
		},
		components: {
			ZfCheckbox
		}
	};
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.option-select{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding-left: 38px;
		// padding-top: 5px;
		@include box-sizing(border-box);
	}
</style>