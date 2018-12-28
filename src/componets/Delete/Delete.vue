<template>
	<div class="delete-module" @click="_delete">
        <el-button type="primary" icon="el-icon-delete" size="mini"></el-button>
	</div>
</template>

<script>
export default {
    props: {

    },

    data() {
    	return {

    	}
    },

    computed: {

    },

    methods: {
    	_delete() {
            this.$store.dispatch('deleteModule');
			this.$store.dispatch('saveHistory');
        }
    },

    components: {

    },

    mounted() {

    }
}
</script>

<style lang='scss'>
	.delete-module{
        .el-button, .el-button:hover, .el-button:focus{
            border-color: #2d2d2d;
            background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#757575), to(#636363));
            box-shadow: 0px 1px 0px #636363;
        }
	}
</style>
