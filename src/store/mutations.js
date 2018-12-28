import { set } from 'vue';
import types from './mutation-types';
import getter from './getters';
import Utils from '../utils/helper';
import $ from 'jquery';

export default {
	[types.TOOL_SWITCH] (state, { toolName }) {
		setToolName(state, toolName);
	},

	[types.ALIGN] (state, type) {
		setAlign(state, type);
	},

	[types.CREATE_MODULE] (state, { type }) {
		createModule(state, type);
	},

	[types.DEL_HISTORY] (state, id) {
		delHistory(state, id);
	},

	[types.SET_SKUTAG_PRICE] (state, data) {
		setSkuTagPrice(state, data);
	},

	[types.SHOW_VERSION_MSG] (state, b) {
		state.showVersionMsg = b;
	},

	[types.SAVE_HISTORY] (state) {
		saveHistory(state);
	},

	[types.RETURN] (state) {
		_return(state);
	},

	[types.SET_MODULE_BY_ID] (state, val) {
		setModuleById(state, val);
	},

	[types.SET_CURSOR] (state, val) {
		setCursor(state, val);
	},

	[types.SET_MODULE_INDEX] (state, _boolean) {
		setModuleIndex(state, _boolean);
	},

	[types.SET_CURRENT_MODULE_INDEX] (state, index) {
		state.files[state.currentFileIndex].currentModuleIndex = index;
	},

	[types.SET_CURRENT_MODULE_ID] (state, id) {
		let currentFile = getter.getCurrentFileById(state);

		if(currentFile) {
			currentFile.currentModuleId = id;
		}

	},

	[types.SET_CURRENT_FILE_ID] (state, id) {
		state.currentFileId = id;
	},

	[types.DELETE_MODULE] (state) {
		deleteModule(state);
	},

	[types.DELETE_FILE] (state, id) {
		deleteFile(state, id);
	},

	[types.SET_STAGE_DATA] (state, data) {
		setStageData(state, data);
	},

	[types.SET_PICTURE_URL] (state, url) {
		setPictureImgUrl(state, url);
	},

	[types.INPUT_FOCUS_UPDATE] (state, _boolean) {
		state.inputFocus = _boolean;
	},

	[types.CREATE_FILE] (state, val) {
		createFile(state, val);
	},

	[types.UPDATE_FILE_IS_OVERFLOW] (state, _boolean) {
		updateFileIsOverflow(state, _boolean);
	},

	[types.UPDATE_FILE_IS_OVERFLOW_X] (state, _boolean) {
		updateFileIsOverflowx(state, _boolean);
	},

	[types.UPDATE_FILE_IS_OVERFLOW_Y] (state, _boolean) {
		updateFileIsOverflowy(state, _boolean);
	},

	[types.SET_CURRENT_MODULE_LOADING] (state, _boolean) {
		setCurrentModuleLoading(state, _boolean);
	},

	[types.SET_STAGE_COLOR] (state, color) {
		setStageColor(state, color);
	},

	[types.SET_STAGE_TRANSPORT] (state, _boolean) {
		setStageTransport(state, _boolean);
	},

	[types.SET_END_TIME] (state, time) {
		setTimeEnd(state, time);
	},

	[types.HSOW_MS] (state, _boolean) {
		showMs(state, _boolean);
	},

	[types.NEW_TAB] (state, _boolean) {
		newTab(state, _boolean);
	},

	[types.SET_HREF] (state, _href) {
		setHref(state, _href);
	},

	[types.SET_MODULE_DATA] (state, data) {
		setModuleData(state, data);
	}
}

function setSkuTagPrice(state, {price, moduleId, fileId}) {
	let files = state.files;
	let file = null;
	let _module = null;

	for(var i = 0; i < files.length; i++) {
		if(files[i].id == fileId) {
			file = files[i];
		}
	}

	if(!file) return;

	let modules = file.modules;

	for(var i = 0; i < modules.length; i++) {
		if(modules[i].id == moduleId) {
			_module = modules[i];
		}
	}

	if(!_module) return;

	_module.price = price;
};

function delHistory(state, id) {
	delete state.history[id];
}

function saveHistory(state) {
	// return;
	let currentFile = getter.getCurrentFileById(state);
	let currentFileCopy = {};

	if(!currentFile) return;
	$.extend(true, currentFileCopy, currentFile);
	state.history[currentFile.id].push(currentFileCopy);
	if(state.history[currentFile.id].length > 20) {
		state.history[currentFile.id].shift();
	}
}

function _return(state) {
	// return;
	let currentFile = getter.getCurrentFileById(state);
	let currentFileCopy = {};

	if(!currentFile) return;

	if(state.history[currentFile.id].length > 1) {
		state.history[currentFile.id].pop();

		$.extend(true, currentFile, state.history[currentFile.id][state.history[currentFile.id].length - 1]);
		currentFile.modules = [];

		var _modules = state.history[currentFile.id][state.history[currentFile.id].length - 1].modules;

		for(var i = 0; i < _modules.length; i++) {
			var _k = {};

			$.extend(true, _k, _modules[i]);
			currentFile.modules.push(_k);
		}
	}
}

function setAlign(state, type) {
	let currentFile = getter.getCurrentFileById(state);
	let currentModule = getter.getModulesById(state);

	switch(type) {
		case 'left':
			currentModule.left = 0;
			break;
		case 'centerx':
			currentModule.left = (currentFile.width - currentModule.width) / 2;
			break;
		case 'right':
			currentModule.left = currentFile.width - currentModule.width;
			break;
		case 'top':
			currentModule.top = 0;
			break;
		case 'centery':
			currentModule.top = (currentFile.height - currentModule.height) / 2;
			break;
		case 'down':
			currentModule.top = currentFile.height - currentModule.height;
			break;
	}
}

function setModuleData(state, data) {
	let module = getter.getModulesById(state);

	for(var attr in data) {
		module[attr] = data[attr];
	}
}

function setHref(state, _href) {
	let module = getter.getModulesById(state);

	module.href = _href;
}

function newTab(state, _boolean) {
	let module = getter.getModulesById(state);

	module.newTab = _boolean;
}

function showMs(state, _boolean) {
	let module = getter.getModulesById(state);

	module.showMsec = _boolean;
}

function setTimeEnd(state, time) {
	let newTime = time.getTime();
	let currentModule = getter.getModulesById(state);

	currentModule.endTime = newTime;
}

function setStageData(state, data) {
	let currentFile = getter.getCurrentFileById(state);

	for(var attr in data) {
		currentFile[attr] = data[attr];
	}
}

function setStageTransport(state, _boolean) {
	let currentFile = getter.getCurrentFileById(state);

	currentFile.fileBg.isTransport = _boolean;
}

function setStageColor(state, color) {
	let currentFile = getter.getCurrentFileById(state);

	// currentFile.fileBg.R = color.R;
	// currentFile.fileBg.G = color.G;
	// currentFile.fileBg.B = color.B;
	currentFile.fileBg.bgColor = color;
}

function setModuleIndex(state, _boolean) {
	let currentModule = getter.getModulesById(state);
	let allModules = getter.getModules(state);

	if(!currentModule) return;

	let currentModuleIndex = currentModule.index;
	let next = findNext(allModules, currentModuleIndex);
	let prev = findPrev(allModules, currentModuleIndex);

	if(_boolean) {
		// 上移
		if(next) {
			let nextIndex = next.index;

			next.index = currentModuleIndex;
			currentModule.index = nextIndex;
		}
	}else{
		// 下移
		if(prev) {
			let prevIndex = prev.index;

			prev.index = currentModuleIndex;
			currentModule.index = prevIndex;
		}
	}
}

function findPrev(allModules, currentModuleIndex) {
	let allIndex = [];
	let prevIndex;

	for(var i = 0; i < allModules.length; i++) {
		allIndex.push(allModules[i].index);
	}

	allIndex = sortArr(allIndex, 0, allIndex.length-1);

	for(var i = 0; i < allIndex.length; i++) {
		if(allIndex[i] == currentModuleIndex && i != 0) {
			prevIndex = allIndex[i - 1];
		}
	}

	if(typeof prevIndex == 'undefined') {
		return null;
	}else{
		return findModuleByIndex(allModules, prevIndex);
	}
}

function findNext(allModules, currentModuleIndex) {
	let allIndex = [];
	let nextIndex;

	for(var i = 0; i < allModules.length; i++) {
		allIndex.push(allModules[i].index);
	}

	allIndex = sortArr(allIndex, 0, allIndex.length-1);

	for(var i = 0; i < allIndex.length; i++) {
		if(allIndex[i] == currentModuleIndex && i != allIndex.length-1) {
			nextIndex = allIndex[i + 1];
		}
	}

	if(typeof nextIndex == 'undefined') {
		return null;
	}else{
		return findModuleByIndex(allModules, nextIndex);
	}
}

function resortModuleIndex(allModules) {
	let allIndex = [];

	for(var i = 0; i < allModules.length; i++) {
		allIndex.push(allModules[i].index);
	}

	allIndex = sortArr(allIndex, 0, allIndex.length-1);

	for(var i = 0; i < allIndex.length; i++) {
		let _module = findModuleByIndex(allModules, allIndex[i]);

		_module.index = i + 1;
	}
}

function findModuleByIndex(allModules, index) {
	for(var i = 0; i < allModules.length; i++) {
		if(allModules[i].index == index) {
			return allModules[i]
		}
	}

	return null;
}

function setCurrentModuleLoading(state, _boolean) {
	let currentModule = getter.getModulesById(state);

	if(!currentModule) return;
	currentModule.loading = _boolean;
}

function updateFileIsOverflow(state, _boolean) {
	let currentFile = getter.getCurrentFileById(state);

	currentFile.fileSizeOverflow = _boolean;
}

function updateFileIsOverflowx(state, _boolean) {
	let currentFile = getter.getCurrentFileById(state);

	currentFile.fileSizeOverflowx = _boolean;
}

function updateFileIsOverflowy(state, _boolean) {
	let currentFile = getter.getCurrentFileById(state);

	currentFile.fileSizeOverflowy = _boolean;
}

// 删除文件
function deleteFile(state, fileId) {
	let files = getter.getAllFiles(state);
	let currentFileId = getter.getCurrentFileId(state);

	for(var i = 0; i < files.length; i++) {
		if(fileId == files[i].id) {
			files.splice(i, 1);
		}

		if(fileId == currentFileId) {
			if(files[i]) {
				state.currentFileId = files[i].id;
			}else if(files[i - 1]){
				state.currentFileId = files[i - 1].id;
			}else{
				state.currentFileId = '';
			}
		}
	}
}

function setPictureImgUrl(state, url) {
	let module = getter.getModulesById(state);

	if(!module) return;

	module.imgUrl = url;
}

function setCursor(state, val) {
	state.cursor = val;
}

// 设置当前工具名称
function setToolName(state, toolName) {
	state.toolName = toolName;
}

// 创建模块
function createModule(state, type) {
	let moduleName = {
		picture: 'PictureCustom',
		mapArea: 'MapArea',
		tick: 'Tick',
		sku: 'Sku'
	};

	let currentFile = getter.getCurrentFileById(state);

	if(!currentFile) return;

	const timestamp = Date.now();
	let _modules = currentFile.modules;
	let id = timestamp + '';
	let disX = $('.stage-content').scrollLeft();
	let disY = $('.stage-content').scrollTop();

	currentFile.currentModuleId = id;

	let moduleData = {
		id: id,
		type: type,
		moduleName: moduleName[type],
		index: _modules.length + 1,
		moduleRootFontSize: '100'
	}

	switch(type) {
		case 'mapArea':
			moduleData.width = 500;
			moduleData.height = 300;
			moduleData.left = 10 + disX;
			moduleData.top = 100 + disY;
			moduleData.naturalWidth = 500;
			moduleData.naturalHeight = 300;
			moduleData.fixScale = false;
			moduleData.href = '';
			moduleData.linkTransform = {
				wx: "",
				m: "",
				pc: "",
				rn: "",
				minapp: ""
			};
			moduleData.newTab = false;
			moduleData.minWidth = 10;
			moduleData.minHeight = 10;
			moduleData.maping = {
				wx: {},
				m: {},
				pc: {},
				rn: {},
				minapp: {}
			};
			break;

		case 'picture':
			moduleData.width = 500;
			moduleData.height = 300;
			moduleData.left = 10 + disX;
			moduleData.top = 100 + disY;
			moduleData.naturalWidth = 500;
			moduleData.naturalHeight = 300;
			moduleData.imgUrl = '';
			moduleData.lazyLoad = true;
			moduleData.loading = false;
			moduleData.fixScale = true;
			moduleData.minWidth = 50;
			moduleData.minHeight = 30;
			break;

		case 'sku':
			moduleData.width = 260;
			moduleData.height = 100;
			moduleData.left = 10 + disX;
			moduleData.top = 100 + disY;
			moduleData.naturalWidth = 260;
			moduleData.naturalHeight = 100;
			moduleData.fixScale = true;
			moduleData.minWidth = 86;
			moduleData.minHeight = 33;
			moduleData.naturalNumFontSize = 37;
			moduleData.naturalTagLeftWidth = 55;
			moduleData.naturalTagRightWidth = 15;
			moduleData.animaWidth = 70;
			moduleData.witeIconWidth = 20;
			moduleData.dir = 'left';
			moduleData.price = '';
			moduleData.skuid = '';
			break;

		case 'tick':
			moduleData.width = 380;
			moduleData.height = 48;
			moduleData.left = 10 + disX;
			moduleData.top = 100 + disY;
			moduleData.naturalWidth = 380;
			moduleData.naturalHeight = 48;
			moduleData.naturalNumFontSize = 37;
			moduleData.naturalNumWidth = 30;
			moduleData.naturalNumBorderRadius = 4;
			moduleData.naturalTxtFontSize = 21;
			moduleData.naturalTxtWidth = 25;
			moduleData.marginRight = 2;
			moduleData.fixScale = true;
			moduleData.endTime = 0;
			moduleData.numberDouble = true;
			moduleData.showMsec = true;
			moduleData.txtColor = '#fff';
			moduleData.numColor = '#fff';
			moduleData.numbg = '#000';
			moduleData.minWidth = 50;
			moduleData.minHeight = 30;
			break;
	}

	_modules.push(moduleData);
}

function setModuleById(state, val) {
	let module = getter.getModulesById(state);
	let newVal = val.newVal;

	if(module){
		for(let attr in newVal) {
			module[attr] = newVal[attr];
		}
	}
}

function deleteModule(state) {
	let currentModuleId = getter.getCurrentModuleId(state);
	let modues = getter.getModules(state);

	if(!modues) return;

	for(var i = 0; i < modues.length; i++) {
		if(modues[i].id == currentModuleId) {
			modues.splice(i, 1);
			break;
		}
	}

	if(modues.length) resortModuleIndex(modues);
}

function createFile(state, val) {
	let timestamp = Date.now();
	let fileData = {};
	let fileId = timestamp + '';
	let files = state.files;

	fileData.fileName = val.fileName;

	if(val.id) {
		fileData.id = val.id;
	}else{
		fileData.id = fileId;
	}

	fileData.width = val.width;
	fileData.height = val.height;
	fileData.minWidth = 100;
	fileData.minHeight = 10;
	fileData.scale = 1;

	if(val.modules) {
		fileData.modules = val.modules;
	}else{
		fileData.modules = [];
	}

	fileData.fileBg = val.fileBg;
	fileData.currentModuleId = 'stage';
	// fileData.history = [];
	fileData.fileSizeOverflow = val.fileSizeOverflow;
	fileData.fileSizeOverflowx = val.fileSizeOverflowx;
	fileData.fileSizeOverflowy = val.fileSizeOverflowy;

	state.files.push(fileData);

	if(val.id) {
		state.currentFileId = val.id;
	}else{
		state.currentFileId = fileId;
	}
	state.history[fileData.id] = [];
	saveHistory(state);
}

function sortArr(arr, s, e){
	if(e==s)
	{
		//就一个
		return [arr[s]];
	}
	else if(s==e-1)
	{
		//就两个
		if(arr[s]<arr[e])
		{
			return [arr[s], arr[e]];
		}
		else
		{
			return [arr[e], arr[s]];
		}
	}

	var c=Math.floor((s+e)/2);

	//左边：s-c
	var arrL=sortArr(arr, s, c);
	//右边：c+1-e
	var arrR=sortArr(arr, c+1, e);

	//合并
	var result=[];

	while(arrL.length>0 || arrR.length>0)
	{
		if(arrL.length==0)
		{
			//右边都拿过来
			result=result.concat(arrR);
			break;
		}
		if(arrR.length==0)
		{
			result=result.concat(arrL);
			break;
		}

		if(arrL[0]<arrR[0])
		{
			result.push(arrL.shift());
		}
		else
		{
			result.push(arrR.shift());
		}
	}

	return result;
}
