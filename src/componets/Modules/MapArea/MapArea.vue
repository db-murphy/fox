<template>
	<div class="zf-module-map" @mousedown="_mousedown" @mousemove="_mousemove">

	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			
		},

		data() {
			return {
				
			}
		},

		computed: {
			...mapGetters(['getModules', 'getModulesById'])
		},

		methods: {
			_mousedown(ev) {
				event.preventDefault();
			},

			_mousemove(ev) {
				event.preventDefault();
			}
		},

		components: {
			
	    },

	    mounted() {
	    	
	    }
	}
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.zf-module-map{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background-color: rgba(255, 255, 255, .4);
		border: 1px solid #fff;
	}
</style>