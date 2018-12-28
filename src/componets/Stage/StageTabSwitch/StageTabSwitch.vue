<template>
	<div v-if="getCurrentFileById" class="stage-tab-switch">
		<span class="line"></span>
		<ul>
			<li v-for="item in _allFiles" :fileid="item.id" :class="{active: item.id == getCurrentFileId}" @click="_click">
				<div class="close-wrap" @click.stop="_close">
					<TabClose></TabClose>
				</div>
				<div class="inner">
					<p>{{item.fileName}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';
	import TabClose from '../../Icons/TabClose/TabClose.vue';

	export default {
	    data() {
	        return {

	        }
	    },

	    computed: {
			...mapGetters(['getAllFiles', 'getCurrentFileById', 'getCurrentFileId']),
			_allFiles() {
				return this.getAllFiles;
			}
		},

		methods: {
			_click(ev) {
				let target = $(ev.target);
				let li = target.closest('li');

				if(li.length) {
					let id = li.attr('fileid');

					$('input').trigger('blur');
					setTimeout(()=>{
						this.$store.dispatch('setCurrentFileId', id);
					}, 20);
				}
			},

			_close(ev) {
				let target = $(ev.target);
				let li = target.closest('li');

				if(li.length) {
					let id = li.attr('fileid');

					this.$store.dispatch('deleteFile', id);
					this.$store.dispatch('delHistory', id);
				}
			}
		},

	    components: {
	        TabClose
	    },

	    watch: {
	    	getAllFiles() {

	    	}
	    },

	    mounted() {
	    	let _this = this;
	    }
	}
</script>

<style lang='scss'>
	@import '../../../scss/mixins/all-mixin';

	.stage-tab-switch{
		height: 19px;
		background-color: #393939;
        border-bottom: 1px solid #282828;
        position: relative;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, .5);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 100;
	}
	.stage-tab-switch .line{
		position: absolute;
		left: 0;
		right: 0;
		border-top: 1px solid #4a4a4a;
		z-index: 1;
	}
	.stage-tab-switch ul{
		height: 100%;
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 2;
		@include display-flex();
	}
	.stage-tab-switch li{
		max-width: 200px;
		height: 100%;
		background-color: #383838;
		font-size: 0;
		position: relative;
		float: left;
		border-right: 1px solid #282828;
		@include flex(1);
	}
	.stage-tab-switch li.active{
		background-color: #535353;
	}
	.stage-tab-switch li .close-wrap{
		height: 100%;
		width: 20px;
		position: absolute;
		left: 0px;
		top: 0;
	}
	.stage-tab-switch li .icon-tab-close{
		position: absolute;
		left: 8px;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.stage-tab-switch .inner{
		height: 100%;
		-webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
            box-sizing: border-box;
        border-top: 1px solid #4a4a4a;
        padding-left: 22px;
	}
	.stage-tab-switch li.active .inner{
		border-top: 1px solid #6a6a6a;
	}
	.stage-tab-switch p{
		font-size: 12px;
		color: #a6a6a6;
		line-height: 18px;
	}
	.stage-tab-switch .active p{
		color: #e7e7e7;
	}
</style>
