<template>
	<div class="module-border">
		<div class="bd-gray"></div>
		<div class="bd-active">
			<span v-for="item in className" @mouseenter="_mouseenter" @mousedown.stop="_mousedown" :class="item" class="resize"></span>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			mid: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				mouseIsDown: false,
				className: ['lt', 'rt', 'rb', 'bl'],
				moduleId: this.mid,
				oldHeight: 0,
				oldWidth: 0,
				oldLeft: 0,
				oldTop: 0,
				pressX: 0,
				pressY: 0
			}
		},

		computed: {
			...mapGetters(['getMousePoint', 'canvasMouseDown', 'getModules', 'getCurrentFileById', 'getCursorDefault', 'getModuleMinHeight', 'getModuleMinWidth', 'getModulesById'])
		},

		methods: {
			_mousedown(ev) {
				let _this = this;
				let target = $(ev.target);
				let resize = target.closest('.resize');

				this.$store.dispatch('pressModule', true);
				this.oldHeight = parseInt(_this.getModulesById.height, 10);
				this.oldWidth = parseInt(_this.getModulesById.width, 10);
				this.oldTop = parseInt(_this.getModulesById.top, 10);
				this.oldLeft = parseInt(_this.getModulesById.left, 10);
				this.pressX = ev.clientX;
				this.pressY = ev.clientY;

				$(document).bind('mousemove', _move);
				$(document).bind('mouseup', _up);

				function _move() {
					if(resize.length) {
						if(resize.hasClass('rt')) {
							resizeRT(_this);
						}else if(resize.hasClass('lt')) {
							resizeLT(_this);
						}else if(resize.hasClass('bl')) {
							resizeLB(_this);
						}else if(resize.hasClass('rb')) {
							resizeRB(_this);
						}

						_this.$store.dispatch('updateLineList', {
							mId: _this.getModulesById.id,
							newVal: {
								top: parseInt(_this.getModulesById.top, 10),
								left: parseInt(_this.getModulesById.left, 10)
							}
						});
					}
				}

				function _up() {
					let mdule = _this.getModulesById;
					
					if(mdule) {
						if(parseInt(mdule.left, 10) != _this.oldLeft || parseInt(mdule.top, 10) != _this.oldTop || parseInt(mdule.width, 10) != _this.oldWidth || parseInt(mdule.height, 10) != _this.oldHeight) {
							// 发生了移动
							_this.$store.dispatch('saveHistory');
						}
					}

					_this.$store.dispatch('setCursor', _this.getCursorDefault);
					_this.$store.dispatch('clearLine');
					$(document).unbind('mousemove', _move);
					$(document).unbind('mouseup', _up);
				}

				event.preventDefault();
			},

			_mouseenter(ev) {
				let _this = this;
				let target = $(ev.target);
				let resize = target.closest('.resize');

				if(resize.length) {
					if(resize.hasClass('bc')) {
						_this.$store.dispatch('setCursor', 'ns-resize');
					}else if(resize.hasClass('ct')){
						_this.$store.dispatch('setCursor', 'ns-resize');
					}else if(resize.hasClass('rc')) {
						_this.$store.dispatch('setCursor', 'ew-resize');
					}else if(resize.hasClass('lc')) {
						_this.$store.dispatch('setCursor', 'ew-resize');
					}else if(resize.hasClass('rb')) {
						_this.$store.dispatch('setCursor', 'nwse-resize');
					}else if(resize.hasClass('rt')) {
						_this.$store.dispatch('setCursor', 'nesw-resize');
					}else if(resize.hasClass('lt')) {
						_this.$store.dispatch('setCursor', 'nwse-resize');
					}else if(resize.hasClass('bl')) {
						_this.$store.dispatch('setCursor', 'nesw-resize');
					}else if(resize.hasClass('rb')) {
						_this.$store.dispatch('setCursor', 'nwse-resize');
					}
				}
			}
		},

		watch: {

		},

		components: {

	    },

	    mounted() {

	    }
	}

	function resizeRB(_this) {
		let thisModule = _this.getModulesById;
		let fixScale = _this.getModulesById.fixScale;
		let maxHeight = _this.getCurrentFileById.height;
		let y = _this.getMousePoint.y;
		let x = _this.getMousePoint.x;
		let naturalWidth = thisModule.naturalWidth;
		let naturalHeight = thisModule.naturalHeight;
		let newHeight = y - thisModule.top;

		if(newHeight <= _this.getModuleMinHeight) {
			newHeight = _this.getModuleMinHeight;
		}

		let newWidth;

		// 等比例
		if(fixScale) {
			newWidth = newHeight * naturalWidth / naturalHeight;
		}else{
			newWidth = x - thisModule.left;

			if(newWidth <= _this.getModuleMinWidth) {
				newWidth = _this.getModuleMinWidth;
			}
		}

		setVal(_this, {
			left: thisModule.left,
			top: thisModule.top,
			width: newWidth,
			height: newHeight
		});
	}

	function resizeRT(_this) {
		let y = _this.getMousePoint.y;
		let x = _this.getMousePoint.x;
		let fixScale = _this.getModulesById.fixScale;
		let thisModule = _this.getModulesById;
		let naturalWidth = thisModule.naturalWidth;
		let naturalHeight = thisModule.naturalHeight;

		let stageHeight = _this.getCurrentFileById.height;
		let bottomHeight = stageHeight - _this.oldHeight - _this.oldTop;
		let yMax = stageHeight - bottomHeight - _this.getModuleMinHeight;
		let newHeight = stageHeight - bottomHeight - y;

		if(y >= yMax) {
			y = yMax;
		}

		if(newHeight <= _this.getModuleMinHeight) {
			newHeight = _this.getModuleMinHeight;
		}

		let newWidth;

		// 等比例
		if(fixScale) {
			newWidth = newHeight * naturalWidth / naturalHeight;
		}else{
			newWidth = x - thisModule.left;

			if(newWidth <= _this.getModuleMinWidth) {
				newWidth = _this.getModuleMinWidth;
			}
		}

		setVal(_this, {
			left: thisModule.left,
			top: y,
			width: newWidth,
			height: newHeight
		});
	}

	function resizeLT(_this) {
		let x = _this.getMousePoint.x;
		let y = _this.getMousePoint.y;
		let fixScale = _this.getModulesById.fixScale;
		let thisModule = _this.getModulesById;
		let naturalWidth = thisModule.naturalWidth;
		let naturalHeight = thisModule.naturalHeight;

		let stageWidth = _this.getCurrentFileById.width;
		let stageHeight = _this.getCurrentFileById.height;
		let bottomHeight = stageHeight - _this.oldHeight - _this.oldTop;
		let rightWidth = stageWidth - _this.oldWidth - _this.oldLeft;
		let xMax = stageWidth - rightWidth - _this.getModuleMinWidth;
		let newWidth = stageWidth - rightWidth - x;

		if(x >= xMax) {
			x = xMax;
		}

		if(newWidth <= _this.getModuleMinWidth) {
			newWidth = _this.getModuleMinWidth;
		}

		let newHeight;

		// 等比例
		if(fixScale) {
			newHeight = newWidth * naturalHeight / naturalWidth;
		}else{
			newHeight = stageHeight - bottomHeight - y;

			if(newHeight <= _this.getModuleMinHeight) {
				newHeight = _this.getModuleMinHeight;
			}
		}

		let newTop = stageHeight - bottomHeight - newHeight;

		setVal(_this, {
			width: newWidth,
			height: newHeight,
			left: x,
			top: newTop
		});
	}

	function resizeLB(_this) {
		let x = _this.getMousePoint.x;
		let y = _this.getMousePoint.y;
		let fixScale = _this.getModulesById.fixScale;
		let thisModule = _this.getModulesById;
		let naturalWidth = thisModule.naturalWidth;
		let naturalHeight = thisModule.naturalHeight;

		let stageWidth = _this.getCurrentFileById.width;
		let rightWidth = stageWidth - _this.oldWidth - _this.oldLeft;
		let xMax = stageWidth - rightWidth - _this.getModuleMinWidth;
		let newWidth = stageWidth - rightWidth - x;

		if(x >= xMax) {
			x = xMax;
		}

		if(newWidth <= _this.getModuleMinWidth) {
			newWidth = _this.getModuleMinWidth;
		}

		let newHeight;

		// 等比例
		if(fixScale) {
			newHeight = newWidth * naturalHeight / naturalWidth;
		}else{
			newHeight = y - thisModule.top;

			if(newHeight <= _this.getModuleMinHeight) {
				newHeight = _this.getModuleMinHeight;
			}
		}

		setVal(_this, {
			width: newWidth,
			height: newHeight,
			left: x,
			top: thisModule.top
		});
	}

	function setVal(_this, newVal) {
		_this.$store.dispatch('setModuleById',{
			mId: _this.moduleId,
			newVal: {
				left: parseInt(newVal.left, 10),
				top: parseInt(newVal.top, 10),
				width: parseInt(newVal.width, 10),
				height: parseInt(newVal.height, 10)
			}
		});
	}
</script>

<style lang="scss">
	@import '../../scss/mixins/all-mixin';

	.module-border{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 2;

		.bd-gray{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border: 1px solid #d0d0d0;
			z-index: 1;
		}

		.bd-active{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border: 1px solid #98b9fd;
			z-index: 2;

			span{
				position: absolute;
				width: 6px;
				height: 6px;
				border: 1px solid #000;
				@include box-sizing(border-box);
				background-color: #fff;

				&.lt{
					left: -3px;
					top: -3px;
					// cursor: nwse-resize;
				}

				&.ct{
					left: 50%;
					top: -3px;
					@include translate(-50%, 0);
					// cursor: ns-resize;
				}

				&.rt{
					right: -3px;
					top: -3px;
					// cursor: nesw-resize;
				}

				&.rc{
					right: -3px;
					top: 50%;
					@include translate(0, -50%);
					// cursor: ew-resize;
				}

				&.rb{
					right: -3px;
					bottom: -3px;
					// cursor: nwse-resize;
				}

				&.bc{
					left: 50%;
					bottom: -3px;
					@include translate(-50%, 0);
					// cursor: ns-resize;
				}

				&.bl{
					left: -3px;
					bottom: -3px;
					// cursor: nesw-resize;
				}

				&.lc{
					left: -3px;
					top: 50%;
					@include translate(0, -50%);
					// cursor: ew-resize;
				}
			}
		}
	}
</style>
