<template>
	<i v-bind:class="{ hover: isHover, active: isActive, 'el-icon-picture': true}"></i>
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
	.el-icon-picture{
		color: #cacaca;

		&.active{
			color: #b8b8b8;
		}
	}
</style>