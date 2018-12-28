<template>
	<div class="align-group">
		<div class="pb10">
			<label class="pb10 fz12 ccacaca">横轴分布:</label>
			<el-button-group>
				<el-button size="mini" @click="_click('left')"><IconLeft></IconLeft></el-button>
				<el-button size="mini" @click="_click('centerx')"><IconCenterX></IconCenterX></el-button>
				<el-button size="mini" @click="_click('right')"><IconRight></IconRight></el-button>
			</el-button-group>
		</div>
		<div>
			<label class="pb10 fz12 ccacaca">纵轴分布:</label>
			<el-button-group>
				<el-button size="mini" @click="_click('top')"><IconTop></IconTop></el-button>
				<el-button size="mini" @click="_click('centery')"><TopDown></TopDown></el-button>
				<el-button size="mini" @click="_click('down')"><IconDown></IconDown></el-button>
			</el-button-group>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import IconLeft from '../Icons/Align/Left';
	import IconRight from '../Icons/Align/Right';
	import IconCenterX from '../Icons/Align/CenterX';
	import IconDown from '../Icons/Align/Down';
	import IconTop from '../Icons/Align/Top';
	import TopDown from '../Icons/Align/TopDown';

	export default{
		props: {
			
		},

		data() {
			return {
				align: 'left'
			}
		},

		computed: {
			
		},

		methods: {
			_click(type) {
				this.$emit('alignEvent', type);
			}
		},

		components: {
			IconLeft,
			IconCenterX,
			IconRight,
			IconDown,
			IconTop,
			TopDown
		},

		created() {
	        
	    },

	    watch: {
	    	
	    }
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.align-group{
		.el-button-group{
			border-radius: 4px;
			box-shadow: 0px 1px 0px #636363;
		}

		.el-button, .el-button:hover, .el-button:focus{
			border-color: #2d2d2d;
			background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
		}
	}
</style>