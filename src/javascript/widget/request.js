/**
 * 通用请求方法
 * @param  url     请求的地址
 * @param  options 请求参数，有data, method, onload, onerror
 * @param  options.data     请求的参数，为对象，可不传，默认为{}
 * @param  options.method   'GET'或'POST'，可不传，默认GET
 * @param  options.onload   请求成功的回调函数
 * @param  options.onerror  请求失败的回调函数，可不传
 * @param  options.mask     是否显示loading遮罩, 默认false
 * @param  options.btn      请求时是否disable按钮, 需要配合KLButton使用，默认false
 */
import util from './util';
import { KLModal, KLLoading } from 'nek-ui';

const baseUrl = '/api';

const loadingHandler = (options, loading) => {
    const { mask, btn } = options;
    if (loading) {
        mask && KLLoading.show(); // 显示遮罩
        btn && btn.$update('loading', true);  // disable按钮
    } else {
        mask && KLLoading.hide();
        btn && btn.$update('loading', false);
    }
};

const request = (url, options) => {
    let { data, method, norest, onload, onerror } = options;
    method = method || 'GET';
    data = data || {};

    let reqOpt = {
        method,
        credentials: 'include',   // 修复请求不自动带上cookie的问题
        headers: {
            'Content-Type': norest ? 'application/x-www-form-urlencoded' : 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    // 请求出错默认方法，如无特殊处理，调用时可以省略onerror方法
    let defaultFunc = message => res => KLModal.alert((res && res.message) || message);
    onerror = onerror || defaultFunc('请求失败');
    onload = onload || defaultFunc('请求成功');

   // 处理请求参数，区分get, post, norest
    method = method.toLowerCase();
    if (method === 'get') {
        url += `?${util.object2query(data)}`;
    } else {
        norest ? reqOpt.body = util.toQueryString(data) : reqOpt.body = JSON.stringify(data);
    }
    
    loadingHandler(options, true);

    fetch(baseUrl + url, reqOpt)
        .then(res => res.json())
        .then((json) => {
            loadingHandler(options, false);
            if (json.code && json.code >= 200 && json.code < 400) {
                onload(json);
            } else {
                onerror(json);
            }
        })
        .catch((err) => {
            loadingHandler(options, false);
            onerror(err);
        });
};

export default request;
