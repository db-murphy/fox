<template>
	<div class="zf-fileupload">
        <el-upload
          action="//jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
    	
    },

    components: {

    },

    mounted() {
        
    }
} 
</script>

<style lang='scss'>
	.zf-fileupload{
		border: 1px solid red;
		/*.el-upload__tip{
			color: #fff;
			font-size: 12px;
		}*/
	}
</style>