<template>
	<div class="zf-module" :style="styleObj" :mid="mid" :mindex="mindex" @mousedown="_mousedown">
		<border :mid="mid" v-if="mid == getCurrentModuleId"></border>
		<component :is="mname" :mindex="mindex" :mid="mid" :imgUrl="imgUrl" :loading="loading" :mdata="mdata"></component>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import Picture from './Picture/Picture.vue';
	import MapArea from './MapArea/MapArea.vue';
	import Tick from './Tick/Tick.vue';
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
				clickModule: false
			}
		},

		methods: {
			_click(ev) {
				if(this.clickModule) {
					this.$store.dispatch('setCurrentModuleId', this.mid);
				}
				
				event.stopPropagation();
			},

			_mousedown(ev) {
				this.$store.dispatch('setCurrentModuleId', this.mid);

				let _this = this;
				let mdule = _this.getModulesById;
				let xMax = parseInt(_this.getCurrentFileById.width, 10) - parseInt(mdule.width, 10);
				let yMax = parseInt(_this.getCurrentFileById.height, 10) - parseInt(mdule.height, 10);

				_this.disX = _this.getMousePoint.x - parseInt(mdule.left, 10);
				_this.disY = _this.getMousePoint.y - parseInt(mdule.top, 10);

				$(document).bind('mousemove', _move);
				$(document).bind('mouseup', _up);
				_this.clickModule = true;

				function _move() {
					let newX = _this.getMousePoint.x - _this.disX;
					let newY = _this.getMousePoint.y - _this.disY;

					_this.clickModule = false;
					// if(_this.getCurrentModuleId != _this.mid) return;
					_this.$store.dispatch('setModuleById',{
						mId: _this.mid,
						newVal: {
							top: newY,
							left: newX
						}
					});
				}

				function _up(ev) {
					$(document).unbind('mousemove', _move);
					$(document).unbind('mouseup', _up);
					
					if(_this.clickModule) {
						_this._click(ev);
					}
					_this.clickModule = false;
				}
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
			Picture,
			Border,
			MapArea,
			Tick
	    },

	    mounted() {
	    	
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