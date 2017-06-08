import $ from 'jquery';

function main(vm) {
	$(document).bind('contextmenu', function(ev) {
		return false;
	});
}

export default main;