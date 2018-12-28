import $ from 'jquery';
import { Message } from 'element-ui';

export default {
    request: function (url, params, contentType) {
        if(contentType) {
            return new Promise(function(resolve, reject){
                $.ajax({
                    type : "post",
                    url : url,
                    data : params,
                    dataType: "json",
                    contentType: contentType,
                    success:function(data) {
                        if(data.code == 0) {
                            resolve(data);
                        }else{
                            reject(data);
                            Message({
                                showClose: true,
                				message: data.msg,
                				type: 'error'
                			});
                        }
                    }
                });
            })
        }else{
            return new Promise(function(resolve, reject){
                $.ajax({
                    type : "post",
                    url : url,
                    data : params,
                    dataType: "json",
                    success:function(data) {
                        if(data.code == 0) {
                            resolve(data);
                        }else{
                            reject(data);
                            Message({
                                showClose: true,
                				message: data.msg,
                				type: 'error'
                			});
                        }
                    }
                });
            })
        }

    }

}
