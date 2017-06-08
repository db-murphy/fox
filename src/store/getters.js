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
	let modules = currentFile.modules;

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
	let fileId = state.currentFileId;
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
	return state.moduleMinHeight;
}

const getModuleMinWidth = (state) => {
	return state.moduleMinWidth;
}

const getCurrentModuleId = (state) => {
	let currentFile = getCurrentFileById(state);

	return currentFile.currentModuleId;
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
	getCurrentModuleLoading,
	getCurrentModuleName
}