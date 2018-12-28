import types from '../../mutation-types'

const ACTIONS = {
	updateLineList ({ commit, state, rootState }, mdata) {
		commit(types.UPDATELINELIST, {
			mdata,
			rootState
		});
	},

	clearLine ({ commit, state, rootState }, mdata) {
		commit(types.CLEAR_LINE, {});
	}
}

export default ACTIONS;
