<template>
	<div class="win-tab">
		<ul>
			<li class="active">属性</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				tabs: []
			}
		},
		
		components: {
			
	    },

	    created() {
	        
	    }
	}
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.win-tab{
		height: 24px;
		background-color: #393939;
		border-bottom: 1px solid #6a6a6a;
		@include box-sizing(border-box);

		ul{
			@include clearfix();
			list-style: none;
			height: 100%;
			@include box-sizing(border-box);
			border-bottom: 1px solid #282828;
			// border-top: 1px solid #595959;
			background: url(./tabbg.jpg) repeat-x left 0;
			background-size: auto 1px;

			li{
				float: left;
				font-size: 12px;
				color: #a6a6a6;
				height: 100%;
				padding: 0 7px;
				line-height: 24px;
				position: relative;
				border-right: 1px solid #282828;

				&.active{
					color: #fff;
					background: #535353 url(./tabactive.jpg) repeat-x left 0;
					background-size: auto 1px;

					&:hover{
						background: #535353 url(./tabactive.jpg) repeat-x left 0;
						background-size: auto 1px;
						color: #fff;
					}
				}

				&.active::after{
					content: ' ';
					position: absolute;
					width: 100%;
					height: 4px;
					background-color: #535353;
					left: 0;
					bottom: -2px;
				}

				&:hover{
					background: #454545 url(./hoverbg.jpg) repeat-x left 0;
					background-size: auto 1px;
				}
			}
		}
	}
</style>