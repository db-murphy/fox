<template>
	<el-select v-model="selValueDefPrivited" :popper-class="optionDef" placeholder="请选择" size="mini" :class="classNamePrivited">
	    <el-option
	      v-for="item in optionsPrivited"
	      :label="item.label"
	      :key="'a'"
	      :value="item.value">
	    </el-option>
	</el-select>
</template>

<script>
	export default {
		props: {
	    	options: {
	    		type: Array,
	    		default() {
	    			return [{
			          value: '选项1',
			          label: '我是选项1'
			        }, {
			          value: '选项2',
			          label: '我是选项2'
			        }]
	    		}
	    	},
	    	selValueDef: {
	    		type: String,
	    		default: '选项2'
	    	},
	    	className: {
	    		type: String,
	    		default: 'zf-sel-def'
	    	}
	    },
	    
		data() {
			return {
				selValueDefPrivited: this.selValueDef,
				optionsPrivited: this.options,
				classNamePrivited: this.className,
				optionDef: 'opt-def'
			}
		},
		components: {

		},
		mounted() {

		}
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.el-select.zf-sel-def{
		overflow: hidden;
		box-shadow: 0px 1px 0px #636363;
		border-radius: 4px;

		input{
			width: 80px;
			background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#747474), to(#636363));
			border:1px solid #2d2d2d;
			color: #fff;
			font-size: 11px;
			padding: 3px 0 3px 6px;
			-webkit-user-select: none;
		    -moz-user-select: none;
		    -ms-user-select: none;
		    user-select: none;
		    height: 22px;
		    @include box-sizing(border-box);
		}

		&:hover .el-input__inner, &:focus .el-input__inner{
			border:1px solid #2d2d2d;
		}

		.el-input__inner:focus{
			border:1px solid #2d2d2d;
		}

		.el-input__icon{
			@include transition(none);
			width: 14px;
			height: 14px;
			right: 4px;
			transform: scale(.9) translateY(-50%) rotateZ(180deg);
			color: #cacaca;

			&.is-reverse{
				transform: scale(.9) translateY(-50%);
			}
		}
	}

	.el-select-dropdown.opt-def{
		background: #535353;
		border:1px solid #2d2d2d;
		border-radius: 4px;
		overflow: hidden;

		.el-select-dropdown__list{
			padding: 0;
		}
		.el-select-dropdown__item{
			color: #fff;
			font-size: 12px;
			height: auto;
			text-align: left;
			padding: 4px 10px;
			background: #535353;
		}
		.el-select-dropdown__item.selected.hover, .el-select-dropdown__item.selected{
			background: #3b3b3b;
		}
		.el-select-dropdown__item.hover{
			background: #4a4a4a;
		}
	}
</style>