<template>
	<i class="icon-arrow-zf" :class="classObj"></i>
</template>

<script>
	export default{
		props: {
			type: {
				type: String,
				default: 'up'
			},

			isActive: {
	    		type: Boolean,
	    		default: true
	    	}
		},

		computed: {
			classObj() {
				let _this = this;

				return {
					up: _this.type == 'up',
					down: _this.type == 'down',
					active: _this.isActive
				}
			}
		},

		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.icon-arrow-zf{
		display: inline-block;
		width: 9px;
		height: 14px;

		&.up{
			background: url(./up.png) no-repeat left top;
			background-size: 9px auto;

			&.active{
				background: url(./up.png) no-repeat left top;
				background-size: 9px auto;
			}
		}

		&.down{
			background: url(./down.png) no-repeat left top;
			background-size: 9px auto;
		}
	}
</style>