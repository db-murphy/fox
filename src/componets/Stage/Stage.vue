<template>
	<div class="stage">
		<StageTabSwitch></StageTabSwitch>
		<StageContent></StageContent>
	</div>
</template>

<script>
	import StageTabSwitch from './StageTabSwitch/StageTabSwitch.vue';
	import StageContent from './StageContent/StageContent.vue';

	export default {
	    data() {
	        return {
	            
	        }
	    },
	    components: {
	        StageTabSwitch,
	        StageContent
	    }
	}
</script>

<style>
	.stage{
		border: 1px solid #282828;
		height: 100%;
		margin: 0 1px;
		margin-left: 0;
		background-color: #282828;
		/*background-color: #fff;*/
		position: relative;
		overflow: hidden;
		-webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
            box-sizing: border-box;
	}
</style>