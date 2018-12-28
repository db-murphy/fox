import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import toolBox from './modules/toolBox';
import canvas from './modules/canvas';
import tipLine from './modules/TipLine';

Vue.use(Vuex);

// rootState
const state = {
	name: 'rootState',
	version: '1.0.4',
	toolName: 'addModules',
	currentFileIndex: 0,
	currentFileId: '',
	cursor: 'default',
	cursorDefault: 'default',
	moduleMinHeight: 30,
	moduleMinWidth: 30,
	inputFocus: false,
	resizeFix: false,
	history: {},
	files: [],
	showVersionMsg: false
};

window.state = state;

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		toolBox,
		canvas,
		tipLine
	},
	strict: false
})
