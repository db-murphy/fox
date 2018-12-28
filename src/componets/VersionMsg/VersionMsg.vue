<template>
	<div class="version-msg">
		<div class="version-wrap">
			<h2>升级说明</h2>
	        <div class="item-wrap" v-for="(item, index) in msgs" :key="index">
				<transition enter-active-class="animated fadeIn" leave-active-class="fadeOutRight">
					<p v-show="item.show">{{item.txt}}</p>
				</transition>
	        </div>
			<a href="javascript:;" class="version-kown" @click="_done">
				<span>知道了</span>
			</a>
		</div>
    </div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';

	export default{
		props: {

		},

		data() {
			return {
				msgs: [
					{
						show: false,
						txt: '修复教程视频无法播放bug'
					}
				],
				index: 0,
				timer: null
			}
		},

		computed: {
			...mapGetters(['version'])
		},

		methods: {
			showMsg() {
				this.index = 0;
				this.timer = setInterval(()=>{
					if(this.index > this.msgs.length - 1) {
						clearInterval(this.timer);
						this.timer = null;
						return;
					}
					this.msgs[this.index].show = true;
					this.index++;
				}, 500);
			},

			_done() {
				this.$store.dispatch('setVersionMsgShow', false);
				localStorage.huabanVersion = this.version;
			}
		},

		components: {

		},

		created() {

	    },

		mounted() {
			this.showMsg();
		},

	    watch: {

	    }
	};
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.version-msg{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;

		.version-wrap{
			position: absolute;
	        width: 90%;
	        height: 80%;
	        background-color: rgba(255, 255, 255, .8);
	        border-radius: 14px;
	        @include box-sizing(border-box);
	        @include center('position');
	        padding: 20px 30px;
	        box-shadow: 5px 0px 20px rgba(0, 0, 0, 1);
			overflow: hidden;
		}

        h2{
            color: #6e6e6e;
            font-size: 40px;
            padding-bottom: 30px;
        }

		.item-wrap{
			margin-bottom: 15px;
			overflow: hidden;
		}

		.version-kown{
			width: 260px;
			height: 50px;
			border: 1px solid #6e6e6e;
			border-radius: 10px;
			text-align: center;
			position: absolute;
			bottom: 30px;
			left: 50%;
			margin-left: -130px;
			text-decoration: none;
			color: #6e6e6e;
			font-size: 20px;
			transition: all 300ms linear;

			span{
				@include center(absolute);
				line-height: 1;
			}

			&:hover{
				border-color: #000;
				color: #000;
				background-color: rgba(255, 255, 255, .5);
			}
		}

        p{
            font-size: 24px;
            // padding-bottom: 10px;
            color: #6e6e6e;
			padding-left: 20px;
			height: 24px;
			line-height: 1;
			position: relative;

			&::before{
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				width: 10px;
				background-color: #6e6e6e;
			}
        }
	}
</style>
