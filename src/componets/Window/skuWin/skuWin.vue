<template>
    <div class="sku-win pt20 pl10 pr10">
        <div class="pb10 line-area">
            <txt-block
				class="pt10"
				inputName="请正确填写skuId:"
				:inputVal="getModulesById.skuid"
				ref="skuInput"
				@zfblur="_skuBlur">
			</txt-block>

            <switch-txt-block
				switchName="水平翻转"
				:switchVal="getModulesById.dir == 'right'"
				@change="_dirchange">
			</switch-txt-block>
        </div>
        <div class="pb10 line-area">
			<div class="pt10 clearfix">
				<text-left-input class="fl"
					:hasPL="false"
					:inputName="width"
					:inputVal="getModulesById.width"
					ref="widthInput"
					@zfblur="(val)=>{_inputBlur(val, 'widthInput', 'width')}"
					:inputWidth="inputWidth">
				</text-left-input>

				<text-left-input class="fl"
					:hasPL="true"
					:inputName="height"
					:inputVal="getModulesById.height"
					ref="heightInput"
					@zfblur="(val)=>{_inputBlur(val, 'heightInput', 'height')}"
					:inputWidth="inputWidth">
				</text-left-input>
			</div>
			<div class="pt20 clearfix">
				<text-left-input class="fl"
					:hasPL="false"
					:inputName="x"
					:inputVal="getModulesById.left"
					ref="leftInput"
					@zfblur="(val)=>{_inputBlur(val, 'leftInput', 'left')}"
					:inputWidth="inputWidth">
				</text-left-input>

				<text-left-input class="fl"
					:hasPL="true"
					:inputName="y"
					:inputVal="getModulesById.top"
					ref="topInput"
					@zfblur="(val)=>{_inputBlur(val, 'topInput', 'top')}"
					:inputWidth="inputWidth">
				</text-left-input>
			</div>
		</div>
        <div class="pt10 pb10 line-area clearfix">
			<Align @alignEvent="_alignEvent"></Align>
		</div>

		<index-change @indexChange="_indexChange" class="pt10"></index-change>

		<DeleteModule class="pt20"></DeleteModule>
    </div>
</template>

<script>
const _script = require('./index');

export default _script;
</script>

<style lang='scss'>
@import './_style';
</style>
