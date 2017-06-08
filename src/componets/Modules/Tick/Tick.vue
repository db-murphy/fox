<template>
	<div class="zf-module-tick">
		<div class="time-wrap">
            <span class="day num one">{{day[0]}}</span>
            <span class="day num">{{day[1]}}</span>
            <span class="txt">天</span>
            <span class="hours num one">{{hour[0]}}</span>
            <span class="hours num">{{hour[1]}}</span>
            <span class="txt">时</span>
            <span class="min num one">{{min[0]}}</span>
            <span class="min num">{{min[1]}}</span>
            <span class="txt">分</span>
            <span class="sec num one">{{sec[0]}}</span>
            <span class="sec num">{{sec[1]}}</span>
            <span class="txt">秒</span>
            <span v-if="mdata.showMsec" class="ms num">{{ms}}</span>
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
			}
		},

		methods: {
			timeChange() {
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
            height: 48px;
            text-align: center;
            font-size: 0;
            width: 100%;

            span{
	            display: inline-block;
	            vertical-align: bottom;
	        }

	        .num{
	            width: 30px;
	            background-color: #000;
	            border-radius: 4px;
	            text-align: center;
	            line-height: 48px;
	            color: #fff;
	            font-size: 37px;
	        }

	        .txt{
	            color: #fff;
	            font-size: 21px;
	            line-height: 48px;
	            height: 48px;
	            width: 25px;
	        }

	        .num.ms{
	            background-color: #000;
	            color: #fff;
	        }

	        .one{
	        	margin-right: 2px;
	        }
        }
	}
</style>