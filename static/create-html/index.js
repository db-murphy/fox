if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());

;(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(global);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global);
    } else {
        global.CreateHtml = factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    var file = null;
    var proportion = 1;

    if(!document.getElementById('huaban-css')) {
        var huabanCss = document.createElement('link');
        var head = document.getElementsByTagName('head')[0];

        huabanCss.id = 'huaban-css';
        huabanCss.href = '//static.360buyimg.com/shangou/huaban/create-html/css/main.css';
        huabanCss.setAttribute('rel', 'stylesheet');
        head.appendChild(huabanCss);
    }

    // 倒计时
    function Tick(opts) {
        this.opts = opts;
        this.disTime = opts.disTime;
        this.numberDouble = opts.numberDouble;
    }

    var _timerProto = {
        _run: function() {
            if(this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }

            this._runFuc();
            this.timer = setInterval(this._runFuc.bind(this), 100);
        },

        _runFuc: function() {
            if(this.disTime < 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.opts.timeUp && this.opts.timeUp();
                return;
            }

            var time_data = Utils.msTransform(this.disTime, this.numberDouble);

            this.opts.run(time_data);
            this.disTime -= 100;
        },

        _refresh: function(time) {
            this.disTime = time;
            this._run();
        }
    }

    Tick.prototype = _timerProto;

    // config to html
    function CreateHtml(opts, boxWidth, device, extendParams) {
        this.boxWidth = boxWidth;
        this.device = device;
        this.opts = Utils.configDataTrans(opts);
        this.file = null;
        this.proportion = 1;
        this.extendParams = extendParams || {};
        this.imgs = [];
        this.skus = [];
        this.priceMap = {};
    }

    var _proto = {
        init: function() {
            var _this = this;

            // 创建区域
            this.createFile();

            // 创建模块
            _this.createModule();

            Utils.loadImg(this.imgs, function() {
                _this.extendParams.imgsLoaded && _this.extendParams.imgsLoaded()
            });

            this.extendParams.domReady && this.extendParams.domReady();

            // 获取价格
            _this.getPrice();

            return this.file;
        },

        createFile: function() {
            this.file = document.createElement('div');
            this.file.id = 'fox' + this.opts.id;
            this.file.setAttribute('data-name', this.opts.fileName);
            this.file.className="fox-area";
            this.proportion = this.boxWidth / this.opts.width;
            Utils.css(this.file, {
                width: this.boxWidth + 'px',
                height: this.opts.height * this.proportion + 'px',
                margin: '0 auto',
                position: 'relative',
                padding: 0,
                margin: 0,
                overflow: 'hidden',
                backgroundColor: this.opts.fileBg.isTransport? 'transparent': this.opts.fileBg.bgColor
            });
        },

        createModule: function() {
            var modules = this.opts.modules;

            for(var i = 0; i < modules.length; i++) {
                switch(modules[i].type) {
                    case 'picture':
                        if(modules[i].imgUrl) {
                            this.createPicture(modules[i]);
                            this.imgs.push(modules[i].imgUrl);
                        }
                        break;

                    case 'tick':
                        this.createTick(modules[i]);
                        break;

                    case 'mapArea':
                        this.createMapArea(modules[i]);
                        break;

                    case 'sku':
                        this.createSku(modules[i]);
                        break;
                }
            }
        },

        getPrice: function(){
            var _this = this;
            if(!this.skus.length) return;

            Utils.fnJsonP('//pm.3.cn/prices/mgets', 'callback', {'skuids': this.skus.join(','), 'type':1, "origin":2, 'source': 'm_red'}, function(data){
                _this.setPriceToMap(data);
                _this.setPrice(data);
            }, function() {

            });
        },

        setPriceToMap: function(prices) {
            for(var i = 0; i < prices.length; i++) {
                var _price = parseFloat(prices[i].p);

                this.priceMap[prices[i].id] = _price <= 0? '暂无价格': prices[i].p;
            }
        },

        setPrice: function(prices) {
            var allSku = Utils.GetByClass(this.file, 'sku-tag');

            for(var i = 0; i < allSku.length; i++) {
                var skuid = allSku[i].getAttribute('sku-id');

                if(this.priceMap[skuid] == '暂无价格') {
                    allSku[i].className = allSku[i].className + ' none';
                }else{
                    Utils.GetByClass(allSku[i], 'price')[0].innerHTML = '&yen;&nbsp;' + this.priceMap[skuid];
                }
            }
        },

        createSku: function(module) {
            var wrap = document.createElement('div');
            var _tagLeftStyle = this.tagLeftStyle(module);
            var _tagConStyle = this.tagConStyle(module);
            var _tagRightStyle = this.tagRightStyle(module);
            var wrapClassName = [];
            var leftAnimaHtml = this.getLeftAnimaHtml(module);
            var rightAnimaHtml = this.getRightAnimaHtml(module);

            var _innerHtml = '<div class="tag-left" style="'+ _tagLeftStyle +'">'+ leftAnimaHtml +'</div>'+
                            '<div class="fox-tag-con" style="'+_tagConStyle+'">' +
                                '<span class="price"></span>'+
                            '</div>'+
                            '<div class="tag-right" style="'+_tagRightStyle+'">'+rightAnimaHtml+'</div>';

            Utils.css(wrap, {
                'position': 'absolute',
                // 'width':  this.sizeTransForm(module.width) + 'px',
                'z-index':  module.index,
                'height': this.sizeTransForm(module.height) + 'px',
                'left': this.sizeTransForm(module.left) + 'px',
                'top': this.sizeTransForm(module.top) + 'px'
            });
            wrap.id = 'fox-module' + module.id;
            if(module.skuid) {
                this.skus.push(module.skuid);
            }

            if(module.dir == 'left') {
                wrapClassName = ['sku-tag', 'sku-tag-right'];
            }else{
                wrapClassName = ['sku-tag', 'sku-tag-left']
            }

            if(!Utils.surportAnimation()) {
                wrapClassName.push('no-animation');
            }
            wrap.className = wrapClassName.join(' ');
            wrap.setAttribute('sku-id', module.skuid?module.skuid: '');
            wrap.innerHTML = _innerHtml;
            this.file.appendChild(wrap);
        },

        getLeftAnimaHtml: function(module) {
            if(module.dir == 'left' && Utils.surportAnimation()) {
                return '<div class="circle-anima">' +
        					'<i class="icon-circle-fff" style="'+this.getCircleStyle(module)+'"></i>' +
        					'<div class="circle-anima1" style="'+this.animaStyle(module)+'"></div>' +
        					'<div class="circle-anima2" style="'+this.animaStyle(module)+'"></div>' +
        				'</div>';
            }else{
                return '';
            }
        },

        getRightAnimaHtml: function(module) {
            if(module.dir == 'right' && Utils.surportAnimation()) {
                return '<div class="circle-anima">' +
        					'<i class="icon-circle-fff" style="'+this.getCircleStyle(module)+'"></i>' +
        					'<div class="circle-anima1" style="'+this.animaStyle(module)+'"></div>' +
        					'<div class="circle-anima2" style="'+this.animaStyle(module)+'"></div>' +
        				'</div>';
            }else{
                return '';
            }
        },

        createPicture: function(module) {
            var wrap = document.createElement('div');
            var imgHtml = '';
            var _srcLazy = '';
            var _src = '';

            if(module.lazyLoad) {
                _srcLazy = module.imgUrl;
                wrap.setAttribute('data-xhr-layzr', true);
            }else{
                _src = module.imgUrl;
                wrap.setAttribute('data-xhr-layzr', false);
            }

            var img = '<img src="'+ module.imgUrl +'" style="width: 100%; height: 100%; display: block; outline: none">';

            Utils.css(wrap, {
                'width':  this.sizeTransForm(module.width) + 'px',
                'height': this.sizeTransForm(module.height) + 'px',
                'position': 'absolute',
                'z-index':  module.index,
                'left': this.sizeTransForm(module.left) + 'px',
                'top': this.sizeTransForm(module.top) + 'px'
            });
            wrap.id = 'fox-module' + module.id;
            wrap.innerHTML = img;
            this.file.appendChild(wrap);
        },

        createTick: function(module) {
            var wrap = document.createElement('div');
            // var _style = 'position: absolute; width: ' + this.sizeTransForm(module.width) + 'px; z-index: '+ module.index +'; height: ' + this.sizeTransForm(module.height) + 'px; left: ' + this.sizeTransForm(module.left) + 'px; top: ' + this.sizeTransForm(module.top) + 'px;';

            Utils.css(wrap, {
                'position': 'absolute',
                'width':  this.sizeTransForm(module.width) + 'px',
                'z-index':  module.index,
                'height': this.sizeTransForm(module.height) + 'px',
                'left': this.sizeTransForm(module.left) + 'px',
                'top': this.sizeTransForm(module.top) + 'px'
            });
            // wrap.setAttribute('style', _style);
            wrap.id = 'fox-module' + module.id;

            if(module.showMsec) {
                var _tickHtml ='<div style="height: 100%; text-align: center; font-size: 0; width: 100%;">' +
                    '<span class="day" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="day" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">天</span>' +
                    '<span class="hours" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="hours" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">时</span>' +
                    '<span class="min" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="min" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">分</span>' +
                    '<span class="sec" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="sec" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">秒</span>' +
                    '<span class="ms" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                '</div>';
            }else{
                var _tickHtml ='<div style="height: 100%; text-align: center; font-size: 0; width: 100%;">' +
                    '<span class="day" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="day" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">天</span>' +
                    '<span class="hours" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="hours" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">时</span>' +
                    '<span class="min" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="min" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="txt" style="'+ this.getTxtStyle(module) +'">分</span>' +
                    '<span class="sec" style="'+ this.getNumStyle(module, true) +'">0</span>' +
                    '<span class="sec" style="'+ this.getNumStyle(module, false) +'">0</span>' +
                    '<span class="day" class="txt" style="'+ this.getTxtStyle(module) +'">秒</span>' +
                '</div>';
            }

            wrap.innerHTML = _tickHtml;

            var day = Utils.GetByClass(wrap, 'day');
            var hour = Utils.GetByClass(wrap, 'hours');
            var min = Utils.GetByClass(wrap, 'min');
            var sec = Utils.GetByClass(wrap, 'sec');
            var ms = Utils.GetByClass(wrap, 'ms');
            var time = new Date().getTime();

            var tick = new Tick({
                disTime: module.endTime - time,
                numberDouble: true,
                run: function (time){
                    day[0].innerHTML = time.day[0];
                    day[1].innerHTML = time.day[1];

                    hour[0].innerHTML = time.hour[0];
                    hour[1].innerHTML = time.hour[1];

                    min[0].innerHTML = time.min[0];
                    min[1].innerHTML = time.min[1];

                    sec[0].innerHTML = time.sec[0];
                    sec[1].innerHTML = time.sec[1];

                    if(module.showMsec) {
                        ms[0].innerHTML = time.ms[0];
                    }
                }
            });

            tick._run();
            this.file.appendChild(wrap);
        },

        createMapArea: function(module) {
            var wrap = document.createElement('a');
            // var _style = 'position: absolute; width: ' + this.sizeTransForm(module.width) + 'px; z-index: '+ module.index +'; height: ' + this.sizeTransForm(module.height) + 'px; left: ' + this.sizeTransForm(module.left) + 'px; top: ' + this.sizeTransForm(module.top) + 'px;';
            var hrefTransform = '';

            Utils.css(wrap, {
                'position': 'absolute',
                'width':  this.sizeTransForm(module.width) + 'px',
                'z-index':  module.index,
                'height': this.sizeTransForm(module.height) + 'px',
                'left': this.sizeTransForm(module.left) + 'px',
                'top': this.sizeTransForm(module.top) + 'px'
            });
            // wrap.setAttribute('style', _style);
            wrap.id = 'fox-module' + module.id;

            if(module.href) {
                module.href = decodeURIComponent(module.href);
            }

            if(this.device == 'preview') {
                hrefTransform = module.href? module.href: 'javascript:;';
            }else{
                hrefTransform = module.linkTransform[this.device]?this.aLinkTrans(module.linkTransform[this.device]): 'javascript:;';
            }

            if(module.newTab) {
                wrap.target = '_blank';
            }

            wrap.href = hrefTransform;
            for(var attr in module.maping[this.device]) {
                if(this.extendParams.actId && attr == 'report-eventparam' && /^actid_/.test(module.maping[this.device][attr])) {
                    module.maping[this.device][attr] = module.maping[this.device][attr].replace(/^actid_/, this.extendParams.actId + '_');
                }

                if(attr == 'mp-class') {
                    wrap.setAttribute('class', module.maping[this.device][attr]);
                }else{
                    wrap.setAttribute(attr, module.maping[this.device][attr]);
                }

                wrap.setAttribute('class', 'J_ping');
            }

            this.file.appendChild(wrap);
        },

        aLinkTrans: function(link) {
            link = decodeURIComponent(link);

            if(/openapp/.test(link) || /openApp/.test(link)) {
                link = link.replace(/openapp/, 'openApp');
                link = link.replace(/jdmobile/, 'jdMobile');

                if(/\#\?_redcustom/.test(link)) {
                    // 针对于rn
                    var openappLink = link.split('des=');

                    openappLink[1] = encodeURIComponent(openappLink[1].replace(/\'/g, '"'));

                    return openappLink.join('des=');
                }else{
                    // 针对内嵌m页
                    link = link.replace(/\'/g, '"');

                    return link;
                }
            }else{
                if(/\#\?_redcustom/.test(link)) {
                    // 针对于rn
                    var openappLink = link.split('des=');

                    openappLink[1] = encodeURIComponent(openappLink[1].replace(/\'/g, '"'));

                    return openappLink.join('des=');
                }
            }

            return link;
        },

        getNumStyle: function(module, hasMargin) {
            var margin = hasMargin?this.sizeTransForm(module.marginRight/module.naturalWidth*module.width): 0;

            var style = 'display: inline-block;'+
                    'vertical-align: middle;'+
                    'text-align: center;'+
                    'height: 100%;' +
                    'width: ' + this.sizeTransForm(module.naturalNumWidth/module.naturalWidth*module.width) +'px;' +
                    'line-height: ' + this.sizeTransForm(module.height) +'px;' +
                    'font-size: ' + this.sizeTransForm(module.naturalNumFontSize/module.naturalWidth*module.width) +'px;' +
                    'border-radius: ' + this.sizeTransForm(module.naturalNumBorderRadius/module.naturalWidth*module.width) +'px;' +
                    'color: ' + module.numColor + ';'+
                    'background-color: '+module.numbg+';' +
                    'margin-right: '+ margin +'px;';

            return style;
        },

        getTxtStyle: function(module) {
            var style = 'display: inline-block;'+
                    'vertical-align: middle;'+
                    'text-align: center;'+
                    'height: 100%;' +
                    'width: ' + this.sizeTransForm(module.naturalTxtWidth/module.naturalWidth*module.width) +'px;' +
                    'line-height: ' + this.sizeTransForm(module.height) +'px;'+
                    'font-size: ' + this.sizeTransForm(module.naturalTxtFontSize/module.naturalWidth*module.width) +'px;' +
                    'color: ' + module.txtColor+';';

            return style;
        },

        sizeTransForm: function(size) {
            return size * this.proportion;
        },

        tagLeftStyle: function(module) {
            var _style = null;
            var _styleStr = '';

            if(module.dir == 'left') {
                _style = {
                    'width': this.sizeTransForm(module.naturalTagLeftWidth/module.naturalWidth*module.width) + 'px'
                }
            }else{
                _style = {
                    'width': this.sizeTransForm(module.naturalTagRightWidth/module.naturalWidth*module.width) + 'px'
                }
            }

            for(var attr in _style) {
                _styleStr += attr + ':' + _style[attr] + ';';
            }
            return _styleStr;
        },

        getCircleStyle: function(module) {
            var _style = null;
            var _styleStr = '';

            _style = {
                'width': this.sizeTransForm(module.witeIconWidth/module.naturalWidth*module.width) + 'px',
                'height': this.sizeTransForm(module.witeIconWidth/module.naturalWidth*module.width) + 'px'
            }

            for(var attr in _style) {
                _styleStr += attr + ':' + _style[attr] + ';';
            }
            return _styleStr;
        },

        animaStyle: function(module) {
            var _style = null;
            var _styleStr = '';

            _style = {
                'width': this.sizeTransForm(module.animaWidth/module.naturalWidth*module.width) + 'px',
                'height': this.sizeTransForm(module.animaWidth/module.naturalWidth*module.width) + 'px',
                'margin-top': -this.sizeTransForm(module.animaWidth/module.naturalWidth*module.width) / 2 + 'px',
                'margin-left': -this.sizeTransForm(module.animaWidth/module.naturalWidth*module.width) / 2 + 'px'
            }

            for(var attr in _style) {
                _styleStr += attr + ':' + _style[attr] + ';';
            }

            return _styleStr;
        },

        tagConStyle: function(module) {
            var _style = null;
            var _styleStr = '';

            if(module.dir == 'left') {
                _style = {
                    'line-height': this.sizeTransForm(module.height) + 'px',
                    'font-size': this.sizeTransForm(module.naturalNumFontSize/module.naturalWidth*module.width) + 'px',
                    'margin-left': this.sizeTransForm(module.naturalTagLeftWidth/module.naturalWidth*module.width) + 'px',
                    'margin-right': this.sizeTransForm(module.naturalTagRightWidth/module.naturalWidth*module.width) + 'px'
                }
            }else{
                _style = {
                    'line-height': this.sizeTransForm(module.height) + 'px',
                    'font-size': this.sizeTransForm(module.naturalNumFontSize/module.naturalWidth*module.width) + 'px',
                    'margin-left': this.sizeTransForm(module.naturalTagRightWidth/module.naturalWidth*module.width) + 'px',
                    'margin-right': this.sizeTransForm(module.naturalTagLeftWidth/module.naturalWidth*module.width) + 'px'
                }
            }

            for(var attr in _style) {
                _styleStr += attr + ':' + _style[attr] + ';';
            }

            return _styleStr;
        },

        tagRightStyle: function(module) {
            var _style = null;
            var _styleStr = '';

            if(module.dir == 'left') {
                _style = {
                    'width': this.sizeTransForm(module.naturalTagRightWidth/module.naturalWidth*module.width) + 'px'
                }
            }else{
                _style = {
                    'width': this.sizeTransForm(module.naturalTagLeftWidth/module.naturalWidth*module.width) + 'px'
                }
            }

            for(var attr in _style) {
                _styleStr += attr + ':' + _style[attr] + ';';
            }

            return _styleStr;
        }
    }

    CreateHtml.prototype = _proto;

    var Utils = {
        css: function(obj, name) {
            for(var i in name){
                if(i=='opacity')
                {
                    obj.style.filter='alpha(opacity:'+name[i]+')';
                    obj.style.opacity=name[i]/100;
                }
                else
                {
                    obj.style[i]=name[i];
                }
            }
        },

        loadImg: function(oImgAll, callback) {
            var k = 0;

            if(!oImgAll.length) {
                return callback && callback();
            }

            for (var i = 0; i < oImgAll.length; i++) {
                (function (i) {
                    var yImg = new Image();

                    yImg.onload = function () {
                        k++;
                        if (k == oImgAll.length) {
                            callback && callback();
                        }
                    };

                    yImg.onerror = function () {
                        k++;

                        if (k == oImgAll.length) {
                            callback && callback();
                        }
                    }
                    yImg.src = oImgAll[i];
                })(i);
            }
        },

        // 取随机数
    	rnd: function (n, m){
    		return parseInt(Math.random()*(m-n)+n);
    	},

    	// 随机从一个数组取一个数
    	rndGetArr: function (arr) {
    		var rndIndex = Utils.rnd(0, arr.length);

    		return arr.splice(rndIndex, 1);
    	},

        surportAnimation: function() {
            var animation = false;
            var domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
            var elm = document.createElement('div');

            if( elm.style.animationName !== undefined ) { animation = true; }

            if( animation === false ) {
              for( var i = 0; i < domPrefixes.length; i++ ) {
                if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                  animation = true;
                  break;
                }
              }
            }

            return animation;
        },

        queryUrl: function(url) {
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
        },

        msTransform: function(dis_time, numberDouble) {
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
                hour     = Utils.toDuble(hour);
                min      = Utils.toDuble(min);
                sec      = Utils.toDuble(sec);
                day      = Utils.toDuble(day);
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
                ms: dis_time + ''
            }
        },

        fnJsonP: function(url,cbName,data,fnScc,fnFaild){
    		var sCbName = 'json_p'+Math.random();

    		sCbName = sCbName.replace('.','');
    		data[cbName] = sCbName;

    		window[sCbName] = function(){
    			fnScc&&fnScc.apply(null,arguments);
    			oS.parentNode.removeChild(oS);
    			window[sCbName] = null;
    			clearTimeout(timer);

    		};

    		var arr = [];

    		for(var name in data){

    			arr.push(name+'='+data[name]);

    		};

    		var str = url+'?'+arr.join('&');
    		var oS = document.createElement('script');
    		var aS = document.getElementsByTagName('script');

    		oS.src = str;
    		aS[0].parentNode.insertBefore(oS,aS[0]);

    		var timer = setTimeout(function(){

    			oS.parentNode.removeChild(oS);
    			fnFaild&&fnFaild();

    		},5000);

    	},

        getStyle: function(obj, name){
    		if(obj.currentStyle)
    		{
    			return obj.currentStyle[name];
    		}
    		else
    		{
    			return getComputedStyle(obj, false)[name];
    		}
    	},

        toDuble: function(num){
            if(num<10){

                return '0'+num;

            }else{

                return num + '';

            };

        },

        // 去除转移符
        replaceEscape: function(str) {
            return str.replace(/[\\\f\n\r\t\b]/g, '');
        },

        configDataTrans: function(opts) {
            if((typeof opts).toLocaleLowerCase() == 'string') {
                opts = Utils.replaceEscape(opts);

                try{
                    return JSON.parse(opts);
                }catch(err) {
                    console.log('json格式错误, 解析失败');
                    return null;
                }
            }else{
                return opts;
            }
        },

        GetByClass: function(obj, sName){
            if(obj.getElementsByClassName){
                return obj.getElementsByClassName(sName);
            }else{
                var arr = [ ];
                var re = new RegExp('(^|\\s)'+sName+'(\\s|$)');
                var aEle = obj.getElementsByTagName('*');

                for(var i=0; i<aEle.length; i++){
                    if(re.test(aEle[i].className)){
                        arr.push(aEle[i]);
                    };
                };

                return arr;
            };
        },

        formatPrice: function (price){
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
    };

    return CreateHtml;
}));
