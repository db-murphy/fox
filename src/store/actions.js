import types from './mutation-types';
import priceService from '../api/priceService';

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

	setVersionMsgShow({ commit, state }, b) {
		commit(types.SHOW_VERSION_MSG, b);
	},

	delHistory({ commit, state }, id) {
		commit(types.DEL_HISTORY, id);
	},

	setModuleAlign({ commit, state }, type) {
		commit(types.ALIGN, type);
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

	setPictureImgUrl({ commit, state, dispatch }, data) {
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
			dispatch('saveHistory');
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

	updateFileIsOverflowX({ commit, state }, _boolean) {
		commit(types.UPDATE_FILE_IS_OVERFLOW_X, _boolean);
	},

	updateFileIsOverflowY({ commit, state }, _boolean) {
		commit(types.UPDATE_FILE_IS_OVERFLOW_Y, _boolean);
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

	setStageData({ commit, state }, data) {
		commit(types.SET_STAGE_DATA, data);
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
	},

	setModuleData({ commit, state }, data) {
		commit(types.SET_MODULE_DATA, data);
	},

	saveHistory({ commit, state }) {
		setTimeout(()=>{

		}, 100);
		commit(types.SAVE_HISTORY);
	},

	returnHistory({ commit, state }) {
		commit(types.RETURN);
	},

	getPrice({ commit, state }, prams) {
		priceService.getPrice({
			reqSkus: prams.skus
		}).then(function(data) {
			commit(types.SET_SKUTAG_PRICE, {
				price: data[0].p,
				moduleId: prams.moduleId,
				fileId: prams.fileId
			});
		}).catch(function(err) {

		});
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
