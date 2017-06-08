<template>
	<div class="zf-module-pic" @mousedown="_mousedown" @mousemove="_mousemove">
		<div v-loading="loading" element-loading-text="图片加载中" class="loading-img">
			<picture-icon v-if="!loading"></picture-icon>
		</div>
		<img :src="imgUrl">
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import PictureIcon from '../../Icons/Picture/Picture.vue';

	export default {
		props: {
			mindex: {
				type: Number
			},
			mid: {
				type: String,
				default: ''
			},
			imgUrl: {
				type: String,
				default: ''
			},
			loading: {
				type: Boolean,
				default: false
			}
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
			PictureIcon
	    },

	    mounted() {
	    	
	    }
	}
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.zf-module-pic{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;

		img{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
		}

		.loading-img{
			font-size: 40px;
			width: 100%;
			height: 100%;

			.el-icon-picture{
				position: absolute;
				left: 50%;
				top: 50%;
				@include translate(-50%, -50%);
			}

			.el-loading-spinner .path{
				stroke: #535353;
			}

			.el-loading-text{
				color: #535353;
				font-size: 14px;
			}
		}
	}
</style>