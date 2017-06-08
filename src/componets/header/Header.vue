<template>
	<h1 class="hare-header">
		<BtnGroup></BtnGroup>
		<p @click="createFile">{{appName}}</p>
		<zf-dialog :dialogData="dialogData" @ok="_ok"></zf-dialog>
	</h1>
</template>

<script>
import $ from 'jquery';
import BtnGroup from '../headerBtnGroup/HeaderBtnGroup.vue';
import ZfDialog from '../Dialog/Dialog.vue';

export default {
    props: {
    	appName: {
    		type: String,
    		default: '野兔'
    	}
    },

    data() {
    	return {
    		dialogData: {
    			dialogVisible: false,
    			title: '新建',
                width: 750,
                height: 750
    		}
    	}
    },

    methods: {
    	createFile() {
    		this.dialogData.dialogVisible = true;
    
    	},

    	_ok(val) {
            let height = val.height;
            let stageHeight = $('.stage-content').height();
            let overFlow = false;

            if(stageHeight < height) {
                overFlow = true;
            }

            this._addFile({
                fileName: 'test2',
                width: val.width,
                height: height,
                fileSizeOverflow: overFlow,
                fileBg: {
                    isTransport: false,
                    bgColor: '#fff',
                    R: 255,
                    G: 255,
                    B: 255
                }
            });
    	},

        _addFile(file) {
            this.$store.dispatch('createNewFile', file);
        }
    },

    components: {
    	BtnGroup,
    	ZfDialog
    },

    mounted() {
        window.createFile = this.createFile;
        window.addFile = this._addFile;
    }
}
</script>

<style lang='scss'>
	.hare-header{
		height: 22px;
		background: url(./headerBg.jpg) repeat-x;
		background-size: auto 22px;
		font-size: 0;
		position: relative;
		-webkit-app-region: drag;

		p{
			font-size: 15px;
			color: #e3e3e3;
			text-align: center;
			line-height: 22px;
			font-weight: lighter;
		}
	}
</style>