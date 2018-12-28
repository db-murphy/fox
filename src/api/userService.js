import {API, IS_DEBUG} from '../constants/url';
import baseService from './baseService';
import dataMock from '../datamock';

export default {
    // 获取用户信息
    getUserMsg: (params, rootState) =>{
        params.version = rootState.version;
        console.log('%c-->用户信息request:\n', 'color: green');
        console.log(params);
        if(IS_DEBUG) {
            return new Promise((resolve, reject) => {
                resolve(dataMock.userData);
            });
        }

        return baseService.request(API.LOGIN_INFO, params);
    }
}
