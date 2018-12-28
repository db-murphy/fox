function getDiscount(newPrice, oldPrice){
    var newPrice = newPrice * 10000;
    var oldPrice = oldPrice * 10000;
    var result = newPrice / oldPrice;
    var discount = Math.ceil(result * 100) / 10;
    
    if (discount > 9.9) {
        discount = "";
    } else if (discount < 0.1) {
        discount = 0.1;
    } else {
        discount = discount.toFixed(1);
        if (discount.substring(discount.length - 1, discount.length) == "0") {
            discount = discount.substring(0, discount.length - 2);
        }
    }

    return discount;
}

function timeForMs(time) {
    let date = time.split(' ')[0];
    let hours = time.split(' ')[1];

    let year = date.split('-')[0];
    let month = date.split('-')[1];
    let day = date.split('-')[2];

    let hour = hours.split(':')[0];
    let min = hours.split(':')[1];
    let sec = hours.split(':')[2];

    let dateObj = new Date();

    dateObj.setFullYear(year);    
    dateObj.setMonth(month - 1);
    dateObj.setDate(day);
    dateObj.setHours(hour);
    dateObj.setMinutes(min);
    dateObj.setSeconds(sec);

    return dateObj.getTime();
}

function formatPrice(price){
    var arr = price.split(".");

    if(arr.length == 2){
        if(arr[1] == "00"){
            return arr[0];
        }else if(arr[1].indexOf("0") == arr[1].length-1){
            return price.substring(0,price.length -1);
        }else{
            return price;
        }
    }else{
        return price;
    }
}

function checkDiscount(text){
    try{
        var value = text.replace(/[^0-9\.]/ig,"");
        if(value && value>0 && value<9.9){
            return true;
        }else{
            return false;
        }
    } catch (e){
        return true;
    }
}

function queryUrl(url) {
    var query_stirng = url.split('?')[1];
    var data = {}
    
    if(!query_stirng) {
        return data;
    }
    var query_arr = query_stirng.split('&');
    

    for(var i = 0; i < query_arr.length; i++) {
        var key = query_arr[i].split('=')[0];
        var value = query_arr[i].split('=')[1];

        data[key] = value;
    }

    return data;
}

// 二分法排序
function sortArr(arr, s, e){
	if(e==s)
	{
		//就一个
		return [arr[s]];
	}
	else if(s==e-1)
	{
		//就两个
		if(arr[s]<arr[e])
		{
			return [arr[s], arr[e]];
		}
		else
		{
			return [arr[e], arr[s]];
		}
	}
	
	var c=Math.floor((s+e)/2);
	
	//左边：s-c
	var arrL=sortArr(arr, s, c);
	//右边：c+1-e
	var arrR=sortArr(arr, c+1, e);

	//合并
	var result=[];

	while(arrL.length>0 || arrR.length>0)
	{
		if(arrL.length==0)
		{
			//右边都拿过来
			result=result.concat(arrR);
			break;
		}
		if(arrR.length==0)
		{
			result=result.concat(arrL);
			break;
		}
		
		if(arrL[0]<arrR[0])
		{
			result.push(arrL.shift());
		}
		else
		{
			result.push(arrR.shift());
		}
	}
	
	return result;
}

// 取随机数
function rnd(n, m){
	return parseInt(Math.random()*(m-n)+n);
}

// 随机从一个数组取一个数
function rndGetArr(arr) {
	var rndIndex = rnd(0, arr.length);

	return arr.splice(rndIndex, 1);
}

function timeTransform(dis_time, numberDouble) {
	var hour = parseInt(dis_time / 3600);
	dis_time = parseInt(dis_time % 3600);
	var min  = parseInt(dis_time / 60);
	dis_time = parseInt(dis_time % 60);

	if(numberDouble) {
		hour     = numToDuble(hour);
		min      = numToDuble(min);
		dis_time = numToDuble(dis_time);
	}else{
		hour     = hour;
		min      = min;
		dis_time = dis_time;
	}

	return {
		hour: hour,
		min: min,
		sec: dis_time
	}
}

function msTransform(dis_time, numberDouble) {
    var dayms = dis_time / (3600000 * 24);

    if(dayms < 1) {
        var day = 0;
    }else{
        var day  = parseInt(dis_time / (3600000 * 24));
    }
    
    dis_time = parseInt(dis_time % (3600000 * 24));

    var hour = parseInt(dis_time / 3600000);
    dis_time = parseInt(dis_time % 3600000);

    var min  = parseInt(dis_time / 60000);
    dis_time = parseInt(dis_time % 60000);

    var sec  = parseInt(dis_time / 1000);
    dis_time = parseInt(dis_time % 1000 / 100);

    if(numberDouble) {
    	hour     = numToDuble(hour);
	    min      = numToDuble(min);
	    sec      = numToDuble(sec);
	    day      = numToDuble(day);
    }else{
    	hour     = hour;
	    min      = min;
	    sec      = sec;
	    day      = day;
    }

    return {
        day: day,
        hour: hour,
        min: min,
        sec: sec,
        ms: dis_time
    }
}

function numToDuble(num) {
	if(num < 10) {
		return '0' + num;
	}else{
		return num + '';
	}
}

var ua = window.navigator.userAgent;
var Firefox = !!ua.match(/Firefox/i);
var IEMobile = !!ua.match(/IEMobile/i);
var cssPrefix = Firefox?'-moz-':IEMobile?'-ms-':'-webkit-';
var stylePrefix = Firefox?'Moz':IEMobile?'ms':'webkit';
var CSSMatrix = IEMobile?'MSCSSMatrix':'WebKitCSSMatrix';

function getTranslate(x, y) {
	var win = window;
	var has3d = !!Firefox || CSSMatrix in win && 'm11' in new win[CSSMatrix]();

    x = parseFloat(x);
    y = parseFloat(y);

    if (x != 0) {
        x += 'px';
    }

    if (y != 0) {
        y += 'px';
    }

    if (has3d) {
        return 'translate3d(' + x + ', ' + y + ', 0)';
    } else {
        return 'translate(' + x + ', ' + y + ')';
    }
}

function setTransitionStyle(obj, duration, timingFunction) {
    if (duration === '' && timingFunction === '') {
        obj.style[stylePrefix + 'Transition'] = '';
    } else {
        obj.style[stylePrefix + 'Transition'] = cssPrefix + 'transform ' + duration + ' ' + timingFunction + ' 0s';
    }
}

function setTransformStyle(obj, offset) {
    var x = 0, y = 0;
    if (typeof offset === 'object') {
        x = offset.x;
        y = offset.y;
    } else {
        if (obj.axis === 'y') {
            y = offset;
        } else {
            x = offset;
        }
    }

    obj.style[stylePrefix + 'Transform'] = getTranslate(x, y);
}

function timeTrans(timestamp){  
    if(!timestamp) return ''; 
    var time = new Date(timestamp);  
    var y = time.getFullYear();  
    var m = time.getMonth()+1;  
    var d = time.getDate();  
    var h = time.getHours();  
    var mm = time.getMinutes();  
    var s = time.getSeconds();  
    return y+'-'+numToDuble(m)+'-'+numToDuble(d)+' '+numToDuble(h)+':'+numToDuble(mm)+':'+numToDuble(s);  
}

export default {
	getDiscount: getDiscount,
	formatPrice: formatPrice,
	checkDiscount: checkDiscount,
	queryUrl: queryUrl,
	sortArr: sortArr,
	rnd: rnd,
	rndGetArr: rndGetArr,
	timeTransform: timeTransform,
	numToDuble: numToDuble,
	getTranslate: getTranslate,
	setTransitionStyle: setTransitionStyle,
	setTransformStyle: setTransformStyle,
	msTransform: msTransform,
    timeForMs: timeForMs,
    timeTrans: timeTrans
}
