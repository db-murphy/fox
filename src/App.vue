<template>
    <div id="hare-app" class="hare-app noselect">
        <!-- <HareHeader :app-name="appName"></HareHeader> -->

        <!-- 菜单开始 -->
        <AppMenu @createFile="_showWin" :class="{'blur': showVersionMsg}"></AppMenu>
        <!-- 菜单结束 -->

        <!-- 选项调板开始 -->
        <!-- <OptionPanel></OptionPanel> -->
        <!-- 选项调板结束 -->

        <div class="con-wrap" :class="{'blur': showVersionMsg}">
            <!-- 工具箱开始 -->
            <ToolBox></ToolBox>
            <!-- 工具箱结束 -->

            <!-- 工作区开始 -->
            <section class="hare-content" :style="contentStyle">
                <div class="stage-box">
                    <Stage></Stage>
                </div>
            </section>
            <!-- 工作区结束 -->

            <!-- 窗口调板开始 -->
            <section class="hare-window" :style="hareWinStyle">
                <window/>
                <div class="hide-btn" @click="_clickHideBtn">
        			<i v-if="showWin" class="el-icon-d-arrow-right"></i>
        			<i v-if="showWin" class="el-icon-d-arrow-right shadow"></i>
        			<i v-if="!showWin" class="el-icon-d-arrow-left"></i>
        			<i v-if="!showWin" class="el-icon-d-arrow-left shadow"></i>
        		</div>
            </section>
            <!-- 窗口调板结束 -->
        </div>

        <transition name="el-fade-in-linear">
            <VersionMsg v-if="showVersionMsg"/>
        </transition>
    </div>
</template>

<script>
import $ from 'jquery';
import HareHeader from './componets/header/Header';
import OptionPanel from './componets/OptionPanel/OptionPanel';
import Stage from './componets/Stage/Stage';
import TextLeftSel from './componets/selectGroup/TxtLeft';
import Window from './componets/Window/window';
import AppMenu from './componets/Menu/Menu';
import ToolBox from './componets/ToolBox/ToolBox';
import VersionMsg from './componets/VersionMsg/VersionMsg';
import key from './global/key';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            appName: '闪购画板',
            hareWinStyle: {
                right: '-293px'
            },
            contentStyle: {
                right: '0px'
            },
            showWin: false
        }
    },

    computed: {
        ...mapGetters(['getModulesById', 'getCurrentModuleId', 'showVersionMsg', 'version'])
    },

    methods: {
        _clickHideBtn(b) {
            this.showWin = !this.showWin;

            if(this.showWin) {
                this.hareWinStyle.right = 0;
                this.contentStyle.right = '293px';
            }else{
                this.hareWinStyle.right = '-293px';
                this.contentStyle.right = '0';
            }
        },

        _showWin() {
            this.showWin = true;
            this.hareWinStyle.right = 0;
            this.contentStyle.right = '293px';
        },

        _return() {
            this.$store.dispatch('returnHistory');
        },

        _verisonChace() {
            if(localStorage.huabanVersion != this.version) {
                this.$store.dispatch('setVersionMsgShow', true);
            }
        },

        _translate(ev) {
            let _this = this;

            if(!_this.getModulesById) return;

            let newX = _this.getModulesById.left;
            let newY = _this.getModulesById.top;

            // 左移
    		if(ev.keyCode == 37 && _this.getModulesById) {
    			newX = --newX;
    		}

    		// 右移
    		if(ev.keyCode == 39 && _this.getModulesById) {
    			newX = ++newX;
    		}

            // 上移
            if(ev.keyCode == 38 && _this.getModulesById) {
    			newY = --newY;
    		}

            if(ev.keyCode == 40 && _this.getModulesById) {
    			newY = ++newY;
    		}

            _this.$store.dispatch('setModuleById',{
                mId: _this.getModulesById,
                newVal: {
                    left: newX,
                    top: newY
                }
            });

            _this.$store.dispatch('updateLineList', {
                mId: this.getCurrentModuleId,
                newVal: {
                    left: newX,
                    top: newY
                }
            });
        }
    },

    components: {
        HareHeader,
        OptionPanel,
        Stage,
        Window,
        AppMenu,
        ToolBox,
        VersionMsg
    },

    mounted() {
        let _this = this;
        key(this);

        this._verisonChace();

        $(document).unbind('mousemove');
        $(document).bind('mousemove', _docmousemove);

        function _docmousemove(ev) {
            if(!$('#canvas').length) return;
            let target = $('#canvas').offset();

            _this.canvasLeft = target.left;
            _this.canvasTop = target.top;
            _this.$store.dispatch('mousePoint', {
                x: ev.clientX - _this.canvasLeft,
                y: ev.clientY - _this.canvasTop
            });
        }

        $(document).unbind('keydown');
        $(document).bind('keydown', _dockeydown);

        function _dockeydown(ev) {
            if(ev.target.tagName.toLocaleLowerCase() == 'input') return;

            if(ev.keyCode == 37 || ev.keyCode == 39 || ev.keyCode == 38 || ev.keyCode == 40) {
                // 移动操作
                _this._translate(ev);
            }

            var ctrlKey = ev.ctrlKey || ev.metaKey;

            // 撤销操作
            if(ctrlKey && ev.keyCode == 90) _this._return();

            return false;
        }

        $(document).unbind('keyup');
        $(document).bind('keyup', _dockeyup);

        function _dockeyup() {
            _this.$store.dispatch('clearLine');
        }
    }
}
</script>

<style lang='scss'>
@import './scss/mixins/all-mixin';
@import './scss/base/reset';
@import './scss/base/lib';
@import './scss/base/anima';
@import './scss/components/all-com';

.hare-app{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
    cursor: Default;
    overflow: hidden;
    background-color: #3a3a3a;
    @include box-sizing(border-box);
    // background: url(./assets/stagebg.jpg);

    .con-wrap{
        position: absolute;
        left: 0;
        right: 0;
        top: 39px;
        bottom: 0;
        overflow: hidden;
    }

    .hare-content{
        left: 38px;
        // left: 0;
        right: 293px;
        position: absolute;
        bottom: 0;
        top: 0;
        @include box-sizing(border-box);
        transition: right 300ms linear;
    }

    .hare-window{
        position: absolute;
        width: 293px;
        top: 0;
        right: 0;
        bottom: 0;
        border-top: 1px solid #282828;
        border-left: 1px solid #282828;
        background-color: #535353;
        @include box-sizing(border-box);
        box-shadow: -5px 0px 20px rgba(0, 0, 0, .5);
        z-index: 1;
        transition: right 300ms linear;

        .hide-btn{
			width: 30px;
			height: 70px;
			background-color: #535353;
			position: absolute;
			left: -15px;
			top: 50%;
			@include translate(0, -50%);
			border-radius: 15px;
			box-shadow: -5px 0px 20px rgba(0, 0, 0, 0.5);
			z-index: 3;
			cursor: pointer;

			i{
				position: absolute;
				top: 50%;
				left: 2px;
				color: #636363;
				@include translate(0, -50%);
			}

			i.shadow{
				left: 0px;
				color: #000;
			}
		}
    }

    .stage-box{
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
