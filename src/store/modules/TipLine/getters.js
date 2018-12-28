const getLineListData = (state, getters) => {	
	// console.log(state[getters.getCurrentFileId]?state[getters.getCurrentFileId]: []);
  	return state[getters.getCurrentFileId]?state[getters.getCurrentFileId]: [];
  	return state;
}

export default {
	getLineListData
}