<template>
	<div class="zf-module" :style="styleObj" :mid="mid" :mindex="mindex"
		@mousedown="_mousedown">
		<border :mid="mid" v-if="mid == getCurrentModuleId"></border>
		<component :is="mname" :mindex="mindex" :mid="mid" :imgUrl="imgUrl" :loading="loading" :mdata="mdata"></component>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import PictureCustom from './Picture/Picture.vue';
	import MapArea from './MapArea/MapArea.vue';
	import Tick from './Tick/Tick.vue';
	import Sku from './Sku/Sku.vue';
	import Border from './Border.vue';

	export default {
		props: {
			zindex: {
				type: Number,
				default: 1
			},
			mindex: {
				type: Number
			},
			mwidth: {
				type: Number,
				default: '100'
			},
			mheight: {
				type: Number,
				default: '60'
			},
			mleft: {
				type: Number,
				default: '0'
			},
			mtop: {
				type: Number,
				default: '0'
			},
			mid: {
				type: String,
				default: ''
			},
			mname: {
				type: String,
				default: ''
			},
			imgUrl: {
				type: String,
				default: ''
			},
			loading: {
				type: Boolean,
				default: false
			},
			mdata: {
				type: Object,
				default: {}
			}
		},

		data() {
			return {
				disX: 0,
				disY: 0,
				clickModule: false,
				timer: null,
				xCache: 0,
				yCache: 0
			}
		},

		methods: {
			_mousedown(ev) {
				let _this = this;
				let _mdule = _this.getModulesById;

				$('input').trigger('blur');

				if(_mdule) {
					_this.xCache = parseInt(_mdule.left, 10);
					_this.yCache = parseInt(_mdule.top, 10);
				}

				setTimeout(()=>{
					this.$store.dispatch('setCurrentModuleId', this.mid);
					let mdule = _this.getModulesById;
					let xMax = parseInt(_this.getCurrentFileById.width, 10) - parseInt(mdule.width, 10);
					let yMax = parseInt(_this.getCurrentFileById.height, 10) - parseInt(mdule.height, 10);

					_this.disX = _this.getMousePoint.x - parseInt(mdule.left, 10);
					_this.disY = _this.getMousePoint.y - parseInt(mdule.top, 10);
					$(document).bind('mousemove', _move);
				}, 20);

				$(document).bind('mouseup', _up);

				function _move() {
					let newX = _this.getMousePoint.x - _this.disX;
					let newY = _this.getMousePoint.y - _this.disY;

					// _this.clickModule = false;
					// if(_this.getCurrentModuleId != _this.mid) return;
					_this.$store.dispatch('setModuleById',{
						mId: _this.mid,
						newVal: {
							top: newY,
							left: newX
						}
					});

					_this._checkMPoint({
						mId: _this.mid,
						newVal: {
							top: newY,
							left: newX
						}
					});
				}

				function _up(ev) {
					let mdule = _this.getModulesById;

					ev.stopPropagation();
					$(document).unbind('mousemove', _move);

					if(mdule) {
						if(parseInt(mdule.left, 10) != _this.xCache || parseInt(mdule.top, 10) != _this.yCache) {
							// 发生了移动
							_this.$store.dispatch('saveHistory');
						}
					}

					setTimeout(()=>{
						$(document).unbind('mousemove', _move);
						$(document).unbind('mouseup', _up);
						_this.$store.dispatch('clearLine');
					}, 22);

					// if(_this.clickModule) {
					// 	_this._click(ev);
					// }
					// _this.clickModule = false;
				}
			},

			_checkMPoint(data) {
				this.$store.dispatch('updateLineList', data);
			}
		},

		computed: {
			...mapGetters(['getMousePoint', 'canvasMouseDown', 'getModules', 'getCurrentModuleId', 'getModulesById', 'getCurrentFileById']),
			styleObj() {
				return {
					zIndex: this.zindex,
					width: this.mwidth + 'px',
					height: this.mheight + 'px',
					left: this.mleft + 'px',
					top: this.mtop + 'px'
				}
			}
		},

		components: {
			PictureCustom,
			Border,
			MapArea,
			Tick,
			Sku
	    },

	    mounted() {
			let mdule = this.getModulesById;

			if(mdule) {
				this.xCache = parseInt(mdule.left, 10);
				this.yCache = parseInt(mdule.top, 10);
			}
	    }
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.zf-module{
		// border: 1px solid #ccc;
		position: absolute;
		@include box-sizing(border-box);
	}
</style>
