import $ from 'jquery';
export const IS_DEBUG = $('body').attr('data-debug') == 'true';

export const API = {
	IMG_UPLOAD: '/fileupload/uploadManagerPic.html' // 图片上传
};

export const RegExps = {
	URL: /^(\/\/)[^\s]+/
};
