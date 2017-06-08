<template>
    <div id="hare-app" class="hare-app">
        <HareHeader :app-name="appName"></HareHeader>

        <!-- 选项调板开始 -->
        <OptionPanel></OptionPanel>
        <!-- 选项调板结束 -->

        <!-- 工具箱开始 -->
        <!-- <ToolBox></ToolBox> -->
        <!-- 工具箱结束 -->

        <!-- 工作区开始 -->
        <section class="hare-content">
            <div class="stage-box">
                <Stage></Stage>
            </div>
        </section>
        <!-- 工作区结束 -->

        <!-- 窗口调板开始 -->
        <section class="hare-window">
            <window></window>
        </section>
        <!-- 窗口调板结束 -->
    </div>
</template>

<script>
import HareHeader from './componets/header/Header.vue';
import OptionPanel from './componets/OptionPanel/OptionPanel.vue';
import ToolBox from './componets/ToolBox/ToolBox.vue';
import Stage from './componets/Stage/Stage.vue';
import TextLeftSel from './componets/selectGroup/TxtLeft.vue';
import Window from './componets/Window/window.vue';
import key from './global/key';

export default {
    data() {
        return {
            appName: '迅狐'
        }
    },

    components: {
        HareHeader,
        OptionPanel,
        ToolBox,
        Stage,
        Window
    },

    mounted() {
        key(this);
    }
} 
</script>

<style lang='scss'>
@import './scss/mixins/all-mixin';
@import './scss/base/reset';
@import './scss/base/lib';

.hare-app{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
    cursor: Default;
    user-select:none;
    overflow: hidden;
    background-color: #3a3a3a;
    @include box-sizing(border-box);

    .hare-content{
        /*left: 38px;*/
        left: 0;
        right: 293px;
        position: absolute;
        bottom: 0;
        top: 55px;
        @include box-sizing(border-box);
    }

    .hare-window{
        position: absolute;
        width: 293px;
        top: 55px;
        right: 0;
        bottom: 0;
        border-top: 1px solid #282828;
        border-left: 1px solid #282828;
        background-color: #535353;
        @include box-sizing(border-box);
    }

    .stage-box{
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>