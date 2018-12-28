<template>
	<div class="zf-module-sku">
		<div class="sku-tag" :class="{'sku-tag-right': mdata.dir == 'left', 'sku-tag-left': mdata.dir == 'right'}" :style="wrapStyle">
			<div class="tag-left" :style="tagLeftStyle">
				<div class="circle-anima" v-if="mdata.dir == 'left'">
					<i class="icon-circle-fff" :style="circleStyle"></i>
					<div class="circle-anima1" :style="animaStyle"></div>
					<div class="circle-anima2" :style="animaStyle"></div>
				</div>
			</div>
			<div class="tag-con" :style="tagConStyle"><span class="price">{{mdata.price != ''? ('&yen;&nbsp;' + mdata.price): ''}}</span></div>
			<div class="tag-right" :style="tagRightStyle">
				<div class="circle-anima" v-if="mdata.dir == 'right'">
					<i class="icon-circle-fff" :style="circleStyle"></i>
					<div class="circle-anima1" :style="animaStyle"></div>
					<div class="circle-anima2" :style="animaStyle"></div>
				</div>
			</div>
        </div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';

	let that = {
		props: {
			mdata: {
				type: Object,
				default: {}
			}
		},

		data() {
			return {

			}
		},

		computed: {
			...mapGetters(['getCurrentFileId']),
			wrapStyle() {
				return {
					'height': this.mdata.height * (this.mdata.naturalHeight/this.mdata.naturalHeight) + 'px',
					'width': this.mdata.width * (this.mdata.naturalWidth/this.mdata.naturalWidth) + 'px'
				}
			},

			tagConStyle() {
				if(this.mdata.dir == 'left') {
					return {
						// 'line-height': this.mdata.height * (this.mdata.naturalHeight/this.mdata.naturalHeight) + 'px',
						'font-size': this.mdata.width * (this.mdata.naturalNumFontSize/this.mdata.naturalWidth) + 'px',
						'margin-left': this.mdata.width * (this.mdata.naturalTagLeftWidth/this.mdata.naturalWidth) + 'px',
						'margin-right': this.mdata.width * (this.mdata.naturalTagRightWidth/this.mdata.naturalWidth) + 'px'
					}
				}else{
					return {
						// 'line-height': this.mdata.height * (this.mdata.naturalHeight/this.mdata.naturalHeight) + 'px',
						'font-size': this.mdata.width * (this.mdata.naturalNumFontSize/this.mdata.naturalWidth) + 'px',
						'margin-left': this.mdata.width * (this.mdata.naturalTagRightWidth/this.mdata.naturalWidth) + 'px',
						'margin-right': this.mdata.width * (this.mdata.naturalTagLeftWidth/this.mdata.naturalWidth) + 'px'
					}
				}
			},

			tagLeftStyle() {
				if(this.mdata.dir == 'left') {
					return {
						'width': this.mdata.width * (this.mdata.naturalTagLeftWidth/this.mdata.naturalWidth) + 'px'
					}
				}else{
					return {
						'width': this.mdata.width * (this.mdata.naturalTagRightWidth/this.mdata.naturalWidth) + 'px'
					}
				}
			},

			// leftIconStyle() {
			// 	let x = this.mdata.width * (this.mdata.naturalTagLeftWidth/this.mdata.naturalWidth);
			// 	let y = this.mdata.height * (this.mdata.naturalHeight/this.mdata.naturalHeight) / 2;
            //
			// 	let b = Math.sqrt(x * x + y * y);
			// 	return {
			// 		'height': b + 'px',
			// 		'width': b + 'px',
			// 		'margin-top': -b + ''
			// 	}
			// },

			tagRightStyle() {
				if(this.mdata.dir == 'left') {
					return {
						'width': this.mdata.width * (this.mdata.naturalTagRightWidth/this.mdata.naturalWidth) + 'px'
					}
				}else{
					return {
						'width': this.mdata.width * (this.mdata.naturalTagLeftWidth/this.mdata.naturalWidth) + 'px'
					}
				}
			},

			animaStyle() {
				return {
					'width': this.mdata.width * (this.mdata.animaWidth/this.mdata.naturalWidth) + 'px',
					'height': this.mdata.width * (this.mdata.animaWidth/this.mdata.naturalWidth) + 'px',
					'margin-top': -this.mdata.width * (this.mdata.animaWidth/this.mdata.naturalWidth) / 2 + 'px',
					'margin-left': -this.mdata.width * (this.mdata.animaWidth/this.mdata.naturalWidth) / 2 + 'px',
				}
			},

			circleStyle() {
				return {
					'width': this.mdata.width * (this.mdata.witeIconWidth/this.mdata.naturalWidth) + 'px',
					'height': this.mdata.width * (this.mdata.witeIconWidth/this.mdata.naturalWidth) + 'px'
				}
			}
		},

		methods: {

		},

		components: {

	    },

	    mounted() {
			if(!this.mdata.skuid) return;
			this.$store.dispatch('getPrice', {
				skus: this.mdata.skuid,
				moduleId: this.mdata.id,
				fileId: this.getCurrentFileId
			});
	    },

	    watch: {

	    }
	}

	export default that;
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';
	@import '../../../scss/components/sku_tag';

	.zf-module-sku{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
</style>
