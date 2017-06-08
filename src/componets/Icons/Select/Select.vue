<template>
	<i v-bind:class="{ hover: isHover, active: isActive, 'icon-select': true}"></i>
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
	    		default: false
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

<style lang="scss">
	.icon-select{
		display: inline-block;
		width: 17px;
		height: 15px;
		background: url(./select.jpg) no-repeat center center;
		background-size: 17px auto;

		&.hover{
			background: url(./select-hover.jpg) no-repeat center center;
			background-size: 17px auto;
		}

		&.active{
			background: url(./select-active.jpg) no-repeat center center;
			background-size: 17px auto;
		}
	}
</style>