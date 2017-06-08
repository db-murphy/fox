<template>
	<div class="sel-txt-left">
		<label class="pr7">{{selName}}</label>
		<zf-select :options="selOptions" :selValueDef="selValueDef"></zf-select>
	</div>
</template>

<script>
	import ZfSelect from './Select';

	let options = () => {
		return [{
          value: '选项1',
          label: '我是选项1'
        }, {
          value: '选项2',
          label: '我是选项2'
        }]
	}

	export default {
		props: {
	    	selName: {
	    		type: String,
	    		default: '文字左边下拉框'
	    	},
	    	selOptions: {
	    		type: Array,
	    		default: options
	    	},
	    	selValueDef: {
	    		type: String,
	    		default: '选项2'
	    	}
	    },
		data() {
			return {
				
			}
		},
		components: {
			ZfSelect
		}
	};
</script>

<style lang="scss">
	.sel-txt-left{
		font-size: 0;

		label{
			display: inline-block;
			vertical-align: middle;
			height: 100%;
			font-size: 11px;
			color: #fff;
			line-height: 22px;
		}

		.el-select{
			vertical-align: middle;
		}
	}
</style>