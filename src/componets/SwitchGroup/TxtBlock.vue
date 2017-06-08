<template>
	<div class="switch-txt-block-wrap">
		<label class="pb10 pt20">{{switchName}}</label>
		<zf-switch :switchVal="switchVal" @switchChange="_switchChange"></zf-switch>
	</div>
</template>

<script>
	import ZfSwitch from './Switch.vue';

	export default{
		props: {
			switchName: {
				type: String,
				default: 'switchName:'
			},

			switchVal: {
				type: Boolean,
				default: true
			}
		},

		data() {
			return {

			}
		},

		methods: {
			_switchChange(val) {
				this.$emit('change', val);
			}
		},

		components: {
			ZfSwitch
		},

		created() {
	        
	    }
	};
</script>

<style lang="scss">
	.switch-txt-block-wrap{
		label{
			display: inline-block;
		    font-size: 11px;
		    color: #fff;
		    line-height: 1;
		}
	}
</style>