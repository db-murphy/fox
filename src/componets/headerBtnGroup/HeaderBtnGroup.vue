<template>
	<ul class="win-btns" @mouseenter="showDetail" @mouseleave="hideDetail">
		<li v-bind:class="{ active: isActive , close: true}">
			<span></span>
		</li>
		<li v-bind:class="{ active: isActive , min: true}">
			<span></span>
		</li>
		<li v-bind:class="{ active: isActive , max: true}">
			<span></span>
		</li>
	</ul>
</template>

<script>
	var _this;

	export default {
		data() {
			return {
				isActive: false
			}
		},
		methods: {
			showDetail() {
				_this.isActive = true;
			},

			hideDetail() {
				_this.isActive = false;
			}
		},
		mounted() {
			_this = this;
		}
	}
</script>

<style lang='scss'>
	.win-btns{
		position: absolute;
		overflow: hidden;
		top: 50%;
		left: 8px;
		margin-top: -6px;

		li{
			width: 12px;
			height: 12px;
			border-radius: 50%;
			float: left;
			margin-right: 8px;
			position: relative;
		}

		&:last-child{
			margin-right: 0;
		}

		.close{
			background-color: #fc625d;

			&.active span{
				display: block;
			}

			span{
				display: none;
				width: 6px;
				height: 6px;
				position: absolute;
				left: 50%;
				top: 50%;
				-webkit-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
				background: url(./closeActive.jpg) no-repeat center center;
				background-size: 6px 6px;
			}
		}

		.min{
			background-color: #fdc041;

			&.active span{
				display: block;
			}

			span{
				display: none;
				width: 8px;
				border-top: 1px solid #985712;
				position: absolute;
				left: 50%;
				top: 50%;
				-webkit-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
			}
		}

		.max{
			background-color: #34c849;

			&.active span{
				display: block;
			}

			span{
				display: none;
				width: 6px;
				height: 6px;
				position: absolute;
				left: 50%;
				top: 50%;
				-webkit-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
				background: url(./max.jpg) no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
</style>