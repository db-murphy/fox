<template>
	<i v-bind:class="{ hover: isHover, active: isActive, 'glass-reduce': true}"></i>
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

<style lang='scss'>
	.glass-reduce{
		display: inline-block;
		width: 15px;
		height: 15px;
		background: url(./glass-reduce.jpg) no-repeat center center;
		background-size: 15px 15px;

		&.active{
			background: url(./glass-active.jpg) no-repeat center center;
			background-size: 15px 15px;
		}

		&.hover{
			background: url(./glass-hover.jpg) no-repeat center center;
			background-size: 15px 15px;
		}
	}
</style>