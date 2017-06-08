import $ from 'jquery';
import Utils from '../../../utils/helper';

class Timer {
	constructor(opts) {
		this.opts = opts;
		this.disTime = opts.disTime;
		this.numberDouble = opts.numberDouble;
		this.timer = null;
	}

	_run() {
		if(this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
		
		this._runFuc();
		this.timer = setInterval(this._runFuc.bind(this), 100);
	}

	_runFuc() {
		if(this.disTime < 0) {
			clearInterval(this.timer);
			this.timer = null;
			this.opts.timeUp && this.opts.timeUp();
			return;
		}

		var time_data = Utils.msTransform(this.disTime, this.numberDouble);

		this.opts.run(time_data);
		this.disTime -= 100;
	}

	_refresh(time) {
		this.disTime = time;
		this._run();
	}
}

export default Timer;