<template>
	<i v-bind:class="{ hover: isHover, active: isActive, 'max-glass': true}"></i>
</template>

<script>
	var _this;

	export default {
		props: {
	    	isHover: {
	    		type: Boolean,
	    		default: false
	    	},

	    	isActive: {
	    		type: Boolean,
	    		default: true
	    	}
	    },
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			_this = this;
		}
	}
</script>

<style lang='scss'>
	.max-glass{
		display: inline-block;
		width: 15px;
		height: 16px;
		background: url(./maxglass.jpg) no-repeat center center;
		background-size: 15px auto;

		&.hover{
			background: url(./maxglasshover.jpg) no-repeat center center;
			background-size: 15px auto;
		}

		&.active{
			background: url(./maxglassactive.jpg) no-repeat center center;
			background-size: 15px auto;
		}
	}
</style>