<template>
	<div class="map-area-win pt20 pl10 pr10">
		<div class="date">
			<el-date-picker
		      v-model="value1"
		      type="datetime"
		      :popper-class="'zf-date-picker'"
		      @change="_timeChange"
		      placeholder="选择结束时间">
		    </el-date-picker>
		</div>

		<switch-txt-block 
			:switchVal="getModulesById.showMsec"
			@change="_msChange"
			:switchName="'显示毫秒:'">
		</switch-txt-block>
		
		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="'宽度'" 
				:inputVal="getModulesById.width" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl"
				:hasPL="true" 
				:inputName="'高度'" 
				:inputVal="getModulesById.height" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>

		<div class="pt20 clearfix">
			<text-left-input class="fl" 
				:hasPL="false" 
				:inputName="'横轴'" 
				:inputVal="getModulesById.left" 
				:inputWidth="inputWidth">
			</text-left-input>

			<text-left-input class="fl" 
				:hasPL="true" 
				:inputName="'纵轴'" 
				:inputVal="getModulesById.top" 
				:inputWidth="inputWidth">
			</text-left-input>
		</div>

		<index-change @indexChange="_indexChange"></index-change>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TxtBlock from '../../inputGroup/TxtBlock';
	import SwitchTxtBlock from '../../SwitchGroup/TxtBlock';
	import TextLeftInput from '../../inputGroup/TxtLeft.vue';
	import IndexChange from '../IndexChange/IndexChange.vue';

	export default{
		data() {
			return {
				inputWidth: 55,
				value1: ''
			}
		},

		computed: {
			...mapGetters(['getModulesById'])
		},

		methods: {
			_indexChange(status) {
				this.$store.dispatch('setModuleIndex', status);
			},

			_timeChange(time) {
				this.$store.dispatch('setTimeEnd', time);
			},

			_msChange(val) {
				this.$store.dispatch('showMs', val);
			}
		},

		components: {
			TxtBlock,
			SwitchTxtBlock,
			IndexChange,
			TextLeftInput
	    },

	    mounted() {
	        
	    }
	}
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.map-area-win{
		.end-time-label{
			font-size: 11px;
		    color: #fff;
		    line-height: 1;
		    display: block;
		}

		.date{
			.el-input{
				box-shadow: 0px 1px 0px #636363;
    			border-radius: 4px;
			}

			.el-input__icon{
				color: #fff;
			}

			.el-input__inner{
				height: 22px;
				@include box-sizing(border-box);
				border: 1px solid #2d2d2d;
				background-color: #4a4a4a;
				color: #fff;
				font-weight: lighter;
				box-shadow: 0px 1px 1px #373737 inset;
				border-radius: 4px;
				font-size: 12px;

				&::-webkit-input-placeholder{
					color: #fff;
					font-weight: lighter;
					font-size: 12px;
				}
			}
		}
	}

	.zf-date-picker{
		background-color: #535353;
		border: 1px solid #2d2d2d;
		// box-shadow: 0px 1px 1px #373737;
		box-shadow: 0 2px 10px #000;
		color: #fff;

		.el-date-picker__time-header{
			border-bottom: 1px solid #2d2d2d;
			box-shadow: 0px 1px 0px #636363;
		}

		.el-picker-panel__footer{
			background-color: #535353;
			border-top: 1px solid #2d2d2d;
			box-shadow: 0px 1px 0px #636363 inset;
		}

		.el-input__inner{
			height: 22px;
			@include box-sizing(border-box);
			border: 1px solid #2d2d2d;
			background-color: #4a4a4a;
			color: #fff;
			font-weight: lighter;
			box-shadow: 0px 1px 1px #373737 inset;
			border-radius: 4px;
			font-size: 12px;
		}

		.el-picker-panel__icon-btn{
			color: #fff;
		}

		.el-date-table{
			th{
				color: #fff;
			}

			td.prev-month, td.next-month{
			    color: #808080;
			}

			td.available:hover{
				color: #fff;
				background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
				border: 1px solid #2a2a2a;
	    		border-radius: 3px;
			}

			td.current{
				background-color: #20a0ff!important;
				border-radius: 3px;
			}
		}

		.el-picker-panel__link-btn{
			color: #fff;
		}

		.el-picker-panel__btn{
			color: #fff;
			background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
			border: 1px solid #2a2a2a;
    		border-radius: 3px;
    		box-shadow: 0px 1px 0px #636363;
		}
	}
</style>