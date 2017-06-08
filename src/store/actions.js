import types from './mutation-types'

const ACTIONS = {
	toolSwitch ({ commit, state }, toolName) {
		commit(types.TOOL_SWITCH, {
	      toolName
	    });
	},

	createModule({ commit, state }, type) {
		commit(types.CREATE_MODULE, {
	      type
	    });
	},

	setModuleById({ commit, state }, val) {
		commit(types.SET_MODULE_BY_ID, val);
	},

	setCursor({ commit, state }, val) {
		commit(types.SET_CURSOR, val);
	},

	setCurrentModuleIndex({ commit, state }, index) {
		commit(types.SET_CURRENT_MODULE_INDEX, index);
	},

	setCurrentModuleId({ commit, state }, id) {
		commit(types.SET_CURRENT_MODULE_ID, id);
	},

	setCurrentFileId({ commit, state }, id) {
		commit(types.SET_CURRENT_FILE_ID, id);
	},

	deleteModule({ commit, state }) {
		commit(types.DELETE_MODULE);
	},

	deleteFile({ commit, state }, id) {
		commit(types.DELETE_FILE, id);
	},

	setPictureImgUrl({ commit, state }, data) {
		if(!data.url) return;

		getImg(data.url, (img) => {
			commit(types.SET_PICTURE_URL, data.url);
			commit(types.SET_CURRENT_MODULE_LOADING, false);

			let naturalWidth = img.naturalWidth;
			let naturalHeight = img.naturalHeight;

			commit(types.SET_MODULE_BY_ID, {
				newVal: {
					height: naturalHeight,
					width: naturalWidth,
					naturalWidth: naturalWidth,
					naturalHeight: naturalHeight
				}
			});
		}, data.fail);
	},

	inputFocusUpdate({ commit, state }, _boolean) {
		commit(types.INPUT_FOCUS_UPDATE, _boolean);
	},

	createNewFile({ commit, state }, val) {
		commit(types.CREATE_FILE, val);
	},

	updateFileIsOverflow({ commit, state }, _boolean) {
		commit(types.UPDATE_FILE_IS_OVERFLOW, _boolean);
	},

	setCurrentModuleLoading({ commit, state }, _boolean) {
		commit(types.SET_CURRENT_MODULE_LOADING, _boolean);
	},

	setModuleIndex({ commit, state }, _boolean) {
		commit(types.SET_MODULE_INDEX, _boolean);
	},

	setStageColor({ commit, state }, color) {
		commit(types.SET_STAGE_COLOR, color);
	},

	setStageTransport({ commit, state }, _boolean) {
		commit(types.SET_STAGE_TRANSPORT, _boolean);
	},

	setTimeEnd({ commit, state }, time) {
		commit(types.SET_END_TIME, time);
	},

	showMs({ commit, state }, _boolean) {
		commit(types.HSOW_MS, _boolean);
	},

	newTab({ commit, state }, _boolean) {
		commit(types.NEW_TAB, _boolean);
	},

	setHref({ commit, state }, _href) {
		commit(types.SET_HREF, _href);
	}
}

function getImg(url, callback, fail) {
	let img = new Image();

	img.onload = () => {

		callback && callback(img);
	}

	img.onerror = () => {
		fail();
	}

	img.src = url;
}

export default ACTIONS;
