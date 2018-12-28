<template>
	<div class="zf-module-tick">
		<div class="time-wrap">
            <span class="day num one" :style="[numStyle, oneStyle]">{{day[0]}}</span>
            <span class="day num" :style="numStyle">{{day[1]}}</span>
            <span class="txt" :style="txtStyle">天</span>
            <span class="hours num one" :style="[numStyle, oneStyle]">{{hour[0]}}</span>
            <span class="hours num" :style="numStyle">{{hour[1]}}</span>
            <span class="txt" :style="txtStyle">时</span>
            <span class="min num one" :style="[numStyle, oneStyle]">{{min[0]}}</span>
            <span class="min num" :style="numStyle">{{min[1]}}</span>
            <span class="txt" :style="txtStyle">分</span>
            <span class="sec num one" :style="[numStyle, oneStyle]">{{sec[0]}}</span>
            <span class="sec num" :style="numStyle">{{sec[1]}}</span>
            <span class="txt" :style="txtStyle">秒</span>
            <span v-if="mdata.showMsec" class="ms num" :style="numStyle">{{ms}}</span>
            <span>{{this.mdata.naturalHeight}}/{{this.mdata.naturalWidth}}</span>
        </div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import Tick from './Tick';

	let that = {
		props: {
			mdata: {
				type: Object,
				default: {}
			}
		},

		data() {
			return {
				day: '00',
				hour: '00',
				min: '00',
				sec: '00',
				ms: 0
			}
		},

		computed: {
			...mapGetters(['getModulesById']),
			getDisTime() {
				let date = new Date();

				if(this.mdata.endTime == 0) {
					return 0;
				}else{
					return this.mdata.endTime - date.getTime();
				}
			},

			numStyle() {
				return {
					width: this.mdata.width * (this.mdata.naturalNumWidth/this.mdata.naturalWidth) + 'px',
					lineHeight: this.mdata.height + 'px',
					fontSize: this.mdata.width * (this.mdata.naturalNumFontSize/this.mdata.naturalWidth) + 'px',
					borderRadius: this.mdata.width * (this.mdata.naturalNumBorderRadius/this.mdata.naturalWidth) + 'px',
					color: this.mdata.numColor,
					backgroundColor: this.mdata.numbg
				}
			},

			txtStyle() {
				return {
					fontSize: this.mdata.width * (this.mdata.naturalTxtFontSize/this.mdata.naturalWidth) + 'px',
					lineHeight: this.mdata.height + 'px',
					width: this.mdata.width * (this.mdata.naturalTxtWidth/this.mdata.naturalWidth) + 'px',
					color: this.mdata.txtColor
				}
			},

			oneStyle() {
				return {
					marginRight: this.mdata.width * (this.mdata.marginRight/this.mdata.naturalWidth) + 'px'
				}
			}
		},

		methods: {
			timeChange() {
				if(this.getDisTime < 0) {
					return this.$message({
						showClose: true,
						message: '时间选择不合法, 请重新选择',
						type: 'error'
			        });
				}
				this.tick._refresh(this.getDisTime);
			}
		},

		components: {

	    },

	    mounted() {
	    	let _this = this;

	    	if(_this.tick) return;

	    	_this.tick = new Tick({
	    		disTime: _this.getDisTime,
	    		numberDouble: true,
	    		run: (time) => {
	    			_this.day = time.day,
					_this.hour = time.hour,
					_this.min = time.min,
					_this.sec = time.sec,
					_this.ms = time.ms;
	    		}
	    	});

	    	_this.tick._run();
	    },

	    watch: {
	    	getDisTime: 'timeChange'
	    }
	}

	export default that;
</script>

<style lang="scss">
	@import '../../../scss/mixins/all-mixin';

	.zf-module-tick{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1;

		.time-wrap{
            height: 100%;
            text-align: center;
            font-size: 0;
            width: 100%;

            span{
	            display: inline-block;
	            vertical-align: bottom;
	        }

	        .num{
	            background-color: #000;
	            text-align: center;
	            height: 100%;
	        }

	        .txt{
	            height: 100%;
	        }

	        .num.ms{
	            background-color: #000;
	            color: #fff;
	        }
        }
	}
</style>
