import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import toolBox from './modules/toolBox';
import canvas from './modules/canvas';

Vue.use(Vuex);

// rootState
const state = {
	name: 'rootState',
	version: '1.0.0',
	toolName: 'addModules',
	currentFileIndex: 0,
	currentFileId: '',
	cursor: 'default',
	cursorDefault: 'default',
	moduleMinHeight: 15,
	moduleMinWidth: 15,
	inputFocus: false,
	resizeFix: false,
	files: [
		// {
		// 	id: 'abc',
		// 	fileName: 'test',
		// 	version: '1.0.0',
		// 	width: 750,
		// 	height: 1000,
		// 	scale: 1,
		// 	fileSizeOverflow: false,
		// 	modules: [],
		// 	fileBg: {
		// 		isTransport: false,
		// 		bgColor: '#fff',
		// 		R: 255,
		// 		G: 255,
		// 		B: 255
		// 	},
		// 	currentModuleId: 'stage',
		// 	history: [
		// 		// [{}, {}],
		// 		// [{}, {}, {}]
		// 	]
		// }
	]
};

window.state = state;

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		toolBox,
		canvas
	},
	strict: false
})
