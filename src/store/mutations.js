import { set } from 'vue';
import types from './mutation-types';
import getter from './getters';
import Utils from '../utils/helper';

export default {
	[types.TOOL_SWITCH] (state, { toolName }) {
		setToolName(state, toolName);
	},

	[types.CREATE_MODULE] (state, { type }) {
		createModule(state, type);
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

		currentFile.currentModuleId = id;
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
	let newTime = Utils.timeForMs(time);
	let currentModule = getter.getModulesById(state);

	currentModule.endTime = newTime;
}

function setStageTransport(state, _boolean) {
	let currentFile = getter.getCurrentFileById(state);

	currentFile.fileBg.isTransport = _boolean;
}

function setStageColor(state, color) {
	let currentFile = getter.getCurrentFileById(state);

	currentFile.fileBg.R = color.R;
	currentFile.fileBg.G = color.G;
	currentFile.fileBg.B = color.B;
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
		picture: 'Picture',
		mapArea: 'MapArea',
		tick: 'Tick'
	};
	
	let currentFile = getter.getCurrentFileById(state);

	if(!currentFile) return;

	const timestamp = Date.now();
	let _modules = currentFile.modules;
	let id = timestamp + '';

	currentFile.currentModuleId = id;

	let moduleData = {
		id: id,
		type: type,
		moduleName: moduleName[type],
		index: _modules.length + 1
	}

	switch(type) {
		case 'mapArea':
			moduleData.width = 500;
			moduleData.height = 300;
			moduleData.left = 10;
			moduleData.top = 100;
			moduleData.naturalWidth = 500;
			moduleData.naturalHeight = 300;
			moduleData.fixScale = false;
			moduleData.href = '';
			moduleData.newTab = false
			break;

		case 'picture':
			moduleData.width = 500;
			moduleData.height = 300;
			moduleData.left = 10;
			moduleData.top = 100;
			moduleData.naturalWidth = 500;
			moduleData.naturalHeight = 300;
			moduleData.imgUrl = '';
			moduleData.lazyLoad = true;
			moduleData.loading = false;
			moduleData.fixScale = true;
			break;

		case 'tick':
			moduleData.width = 500;
			moduleData.height = 48;
			moduleData.left = 10;
			moduleData.top = 100;
			moduleData.naturalWidth = 500;
			moduleData.naturalHeight = 48;
			moduleData.fixScale = true;
			moduleData.endTime = 0;
			moduleData.numberDouble = true;
			moduleData.showMsec = true;
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

	for(var i = 0; i < modues.length; i++) {
		if(modues[i].id == currentModuleId) {
			modues.splice(i, 1);
			break;
		}
	}
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
	fileData.scale = 1;

	if(val.modules) {
		fileData.modules = val.modules;
	}else{
		fileData.modules = [];
	}
	
	fileData.fileBg = val.fileBg;
	fileData.currentModuleId = 'stage';
	fileData.history = [];
	fileData.fileSizeOverflow = val.fileSizeOverflow;

	state.files.push(fileData);

	if(val.id) {
		state.currentFileId = val.id;
	}else{
		state.currentFileId = fileId;
	}
}

function sortArr(arr, s, e)
{
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