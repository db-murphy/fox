import { set } from 'vue';
import types from '../../mutation-types'
import rootgetter from '../../getters';
import Vue from 'vue';
var count = 1;

export default {
	[types.UPDATELINELIST] (state, {mdata, rootState}) {
		updateInputData(state, mdata, rootState);
	},

	[types.CLEAR_LINE] (state, {mdata, rootState}) {
		clearLine(state);
	}
}

function clearLine(state) {
	for(var attr in state) {
		state[attr].splice(0, state[attr].length);
	}
}

function updateInputData(state, mdata, rootState) {
	let modules = rootgetter.getModules(rootState);
	let currentModule = rootgetter.getModulesById(rootState);
	let currentFile = rootgetter.getCurrentFileById(rootState);

	if(state[currentFile.id]) {
		state[currentFile.id].splice(0, state[currentFile.id].length);
	}else{
		Vue.set(state, currentFile.id, []);
	}

	for(var i  = 0; i < modules.length; i++) {
		if(modules[i].id == currentModule.id) continue;

		var bRush = rushTest(currentModule, modules[i]);
		var bAlign = alignCheck(currentModule, modules[i]);

		if(bRush.b) {
			for(var j = 0; j < bRush.derec.length; j++) {
				addLine(state, currentModule, bRush.derec[j], currentFile.id);
			}
		}

		if(bAlign.b) {
			for(var k = 0; k < bAlign.derec.length; k++) {
				addAlignLine(state, currentModule, bAlign.derec[k], currentFile.id);
			}
		}
	}
}

function addAlignLine(state, currentModule, derec, fileId) {
	let _val;

	if(derec == 'top') {
		_val = currentModule.top;
	}

	if(derec == 'bottom') {
		_val = currentModule.top + currentModule.height;
	}

	if(derec == 'left') {
		_val = currentModule.left;
	}

	if(derec == 'right') {
		_val = currentModule.left + currentModule.width;
	}

	state[fileId].push({
		direction: (derec == 'top' || derec == 'bottom')? 'top': 'left',
		val: _val
	});
}

function addLine(state, currentModule, derec, fileId) {
	let _val;

	if(derec == 'top') {
		_val = currentModule.top + currentModule.height;
	}

	if(derec == 'bottom') {
		_val = currentModule.top;
	}

	if(derec == 'left') {
		_val = currentModule.left + currentModule.width;
	}

	if(derec == 'right') {
		_val = currentModule.left;
	}

	state[fileId].push({
		direction: (derec == 'top' || derec == 'bottom')? 'top': 'left',
		val: _val
	});
}

function rushTest(currentModule, target) {
	let l1 = currentModule.left;
	let r1 = l1 + currentModule.width;
	let t1 = currentModule.top;
	let b1 = t1 + currentModule.height;

	let l2 = target.left;
	let r2 = l2 + target.width;
	let t2 = target.top;
	let b2 = t2 + target.height;
	let data = {
		b: false,
		derec: []
	}

	//碰上
	if(r1==l2) {
		data.derec.push('left');
	}

	if(l1==r2) {
		data.derec.push('right');
	}

	if(t1==b2) {
		data.derec.push('bottom');
	}

	if(b1==t2) {
		data.derec.push('top');
	}

	if(r1==l2 || l1==r2 || t1==b2 || b1==t2) {
		data.b = true;
	}else{
		data.b = false;
	}

	return data;
}

function alignCheck(currentModule, target) {
	let l1 = currentModule.left;
	let r1 = l1 + currentModule.width;
	let t1 = currentModule.top;
	let b1 = t1 + currentModule.height;

	let l2 = target.left;
	let r2 = l2 + target.width;
	let t2 = target.top;
	let b2 = t2 + target.height;

	let data = {
		b: false,
		derec: []
	}

	if(l1==l2) {
		data.derec.push('left');
	}

	if(r1==r2) {
		data.derec.push('right');
	}

	if(t1==t2) {
		data.derec.push('top');
	}

	if(b1==b2) {
		data.derec.push('bottom');
	}

	if(l1==l2 || r1==r2 || t1==t2 || b1==b2) {
		data.b = true;
	}else{
		data.b = false;
	}

	return data;
}