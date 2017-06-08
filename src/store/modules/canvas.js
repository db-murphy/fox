import types from '../mutation-types';

const state = {
	name: 'canvas',
	mouseX: 0,
	mouseY: 0,
	inStage: false,
	mouseDown: false,
	pressModule: false
};

const getters = {
	getMousePoint: (state) => {
		return {
			x: state.mouseX,
			y: state.mouseY
		}
	},

	getInStage: (state) => state.inStage,

	canvasMouseDown: (state) => state.mouseDown,

	pressModule: (state) => state.pressModule
};

const actions = {
	mousePoint({commit, state}, xy) {
		commit(types.STAGE_MOUSE_MOVE, xy);
	},

	leaveStage({commit, state}) {
		commit(types.LEAVE_STAGE);
	},

	enterStage({commit, state}) {
		commit(types.ENTER_STAGE);
	},

	pressStage({commit, state}, _boolean) {
		commit(types.PRESS_STAGE, _boolean);
	},

	pressModule({commit, state}, _boolean) {
		commit(types.PRESS_MODULE, _boolean);
	}
};

const mutations = {
	[types.STAGE_MOUSE_MOVE] (state, {x, y}) {
		state.mouseX = x;
		state.mouseY = y;
	},

	[types.LEAVE_STAGE] (state) {
		state.inStage = false;
	},

	[types.ENTER_STAGE] (state) {
		state.inStage = true;
	},

	[types.PRESS_STAGE] (state, _boolean) {
		state.mouseDown = _boolean;
	},

	[types.PRESS_MODULE] (state, _boolean) {
		state.pressModule = _boolean;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};