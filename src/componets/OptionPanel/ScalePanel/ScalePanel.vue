<template>
	<div class="option-scale">
		<scale-btns-wrap></scale-btns-wrap>
	</div>
</template>

<script>
	import ScaleBtnsWrap from './ScaleBtnsList.vue';

	export default {
		data() {
			return {
				
			}
		},
		components: {
			ScaleBtnsWrap
		}
	};
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.option-scale{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding-left: 38px;
		@include box-sizing(border-box);
	}
</style>