<template>
	<i class="icon-tab-close"></i>
</template>

<script>
	export default {
	    data() {
	        return {
	            
	        }
	    },

		methods: {
			_click(ev) {
				this.$emit('close', ev);
			}
		},

	    components: {
	        
	    },

	    mounted() {
	    	
	    }
	} 
</script>

<style>
	.icon-tab-close{
		display: inline-block;
		width: 6px;
		height: 6px;
		background: url(./tabclose.jpg) no-repeat center center;
		background-size: 100% 100%;
	}
</style>