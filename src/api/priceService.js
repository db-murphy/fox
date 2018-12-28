import $ from 'jquery';
import { Message } from 'element-ui';

export default {
    // 获取价格
    getPrice: (params) =>{
        return new Promise(function(resolve, reject){
            $.ajax({
                type : "get",
                url : '//pm.3.cn/prices/mgets',
                data : {'skuids': params.reqSkus, 'type':1, "origin":2, 'source': 'm_red'},
                dataType: "jsonp",
                jsonp: 'callback',
                timeout: 8000,
                success:function(data) {
                    resolve(data);
                },
                error: function(err) {
                    Message({
                        showClose: true,
                        message: '获取价格失败,请检查网络设置,或者skuid是否正确',
                        type: 'error'
                    });
                }
            });
        })
    }
}
