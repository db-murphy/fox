<template>
	<span class="tip-line" :style="_styleObj"></span>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';

	export default{
		props: {
			lineData: {
				type: Object,
				default: {

				}
			}
		},

		data() {
			return {
				
			}
		},

		computed: {
			...mapGetters(['getCurrentFileById', 'getCurrentFileIsOverflow', 'getCurrentFileIsOverflowX', 'getCurrentFileIsOverflowY']),
			_styleObj() {
				let _style = {};
				let stageHeight = $('.stage-content').height();
	    		let stageWidth = $('.stage-content').width();
	    		let _val = this.lineData.val;

				if(!this.getCurrentFileById) return _style;
				if(this.lineData.direction == 'left'){
					_style.top = '0px';
					_style.borderLeft = '1px solid #4affff';
					if(this.getCurrentFileIsOverflowY) {
						_style.height = this.getCurrentFileById.height + 80 + 'px';
					}else{
						_style.height = stageHeight + 80 + 'px';
					}

					_val = this.lineData.val + $('.stage-content').scrollLeft() + ($('#canvas').offset().left - $('.stage-content').offset().left);
					
				}else if(this.lineData.direction == 'top'){
					_style.left = '0px';
					_style.borderTop = '1px solid #4affff';
					if(this.getCurrentFileIsOverflowX) {
						_style.width = this.getCurrentFileById.width + 80 + 'px';
					}else{
						_style.width = stageWidth + 80 + 'px';
					};

					_val = this.lineData.val + $('.stage-content').scrollTop() + ($('#canvas').offset().top - $('.stage-content').offset().top);
				}

				return {
					[this.lineData.direction]: _val + 'px',
					..._style
				}
			}
		},

		methods: {
			
		},

		components: {

		},

		created() {
	        
	    },

	    watch: {
	    	
	    }
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.tip-line{
		position: absolute;
		z-index: 100;
	}
</style>