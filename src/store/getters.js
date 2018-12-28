const currentTool = (state) => {
	var toolData = {
		select: 'SelectPanel',
		mapArea: 'MapArea',
		stageScale: 'ScalePanel',
		addModules: 'ModulesPanel'
	}

  	return {
  		optionPanleName: toolData[state.toolName],
  		toolName: state.toolName
  	};
}

const getModules = (state) => {
	let currentFile = getCurrentFileById(state);
	let modules = null;

	if(currentFile) {
		modules = currentFile.modules;
	}

	return modules;
}

const getModulesById = (state) => {
	let currentFile = getCurrentFileById(state);

	if(!currentFile) {
		return null;
	}

	let modules = currentFile.modules;
	let id = currentFile.currentModuleId;

	for(var i = 0; i < modules.length; i++) {
		if(modules[i].id == id) {
			return modules[i];
		}
	}

	return null;
}

const getCurrentFileById = (state) => {
	let files = state.files;
	let currentId = state.currentFileId;

	for(var i = 0; i < files.length; i++) {
		if(files[i].id == currentId) {
			return files[i];
		}
	}

	return null;
}

const getCurrentFileIsOverflow = (state) => {
	let currentFile = getCurrentFileById(state);

	if(currentFile) {
		return currentFile.fileSizeOverflow;
	}

	return null;
}

const getCurrentFileIsOverflowX = (state) => {
	let currentFile = getCurrentFileById(state);

	if(currentFile) {
		return currentFile.fileSizeOverflowx;
	}

	return null;
}

const getCurrentFileIsOverflowY = (state) => {
	let currentFile = getCurrentFileById(state);

	if(currentFile) {
		return currentFile.fileSizeOverflowy;
	}

	return null;
}

const getCursor = (state) => {
	return state.cursor;
}

const getAllFiles = (state) => {
	return state.files;
}

const getCursorDefault = (state) => {
	return state.cursorDefault;
}

const getModuleMinHeight = (state) => {
	let module = getModulesById(state);

	if(module) {
		return module.minHeight;
	}
	return 0;
}

const getModuleMinWidth = (state) => {
	let module = getModulesById(state);

	return module? module.minWidth: 0;
}

const getCurrentModuleId = (state) => {
	let currentFile = getCurrentFileById(state);

	if(currentFile) {
		return currentFile.currentModuleId;
	}

	return '';
}

const inputFocusUpdate = (state) => {
	return state.inputFocus;
}

const getCurrentFileId = (state) => {
	return state.currentFileId;
}

const getCurrentModuleLoading = (state) => {
	let currentModule = getModulesById(state);

	return currentModule? currentModule.loading : false;
}

const getCurrentModuleName = (state) => {
	let currentModule = getModulesById(state);

	return currentModule? currentModule.moduleName : false;
}

const showVersionMsg = (state) => {
	return state.showVersionMsg;
}

const version = () => {
	return state.version;
}

export default {
	currentTool,
	getModules,
	getCursor,
	getCursorDefault,
	getModuleMinHeight,
	getModuleMinWidth,
	getModulesById,
	getCurrentModuleId,
	getCurrentFileById,
	inputFocusUpdate,
	getAllFiles,
	getCurrentFileId,
	getCurrentFileIsOverflow,
	getCurrentFileIsOverflowX,
	getCurrentFileIsOverflowY,
	getCurrentModuleLoading,
	getCurrentModuleName,
	showVersionMsg,
	version
}
