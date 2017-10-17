/* 公用过滤器 */
export default {
    // 获取字符串长度，mode != 0 时汉字占两个字符
    length(value, mode = 0) {
        if (mode === 0) {
            return value.length;
        }
        return ((value && value.toString()) || '').replace(/[^\x00-\xff]/g, 'xx').length;
    },
    // 兼容https; 将图片资源的链接http://改为//;
    safeLink(url) {
        if (!url) {
            return ''; 
        }
        return url.replace(/^http:/i, '');
    }
};