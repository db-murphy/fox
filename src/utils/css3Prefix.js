define(function (require, exports, module){
	return (function() {
		var divTemp = document.createElement("div"),
            arrCss = ["","webkit","moz","ms"],
            obj = {TRANSFORM: "", TRANSITION: "",TRANSITIONEND:"", ANIMATION:""};

        for(var i = 0; i < arrCss.length; i++){
            var test = arrCss[i]? (arrCss[i] + "Transform"): "transform";
            if(test in divTemp.style){
                obj.TRANSFORM = test;
                break;
            }
        }

        for(i = 0; i < arrCss.length; i++){
            test = arrCss[i]? (arrCss[i] + "Transition"): "transition";
            if(test in divTemp.style){
                obj.TRANSITION = test;
                var temp = obj.TRANSITION === "transition" ? "end" :"End";
                obj.TRANSITIONEND = test + temp;
                break;
            }
        }

        for(i = 0; i < arrCss.length; i++){
            test = arrCss[i]? (arrCss[i] + "Animation"): "animation";
            if(test in divTemp.style){
                obj.ANIMATION = test;
                break;
            }
        }
        return obj;
	})();
});
