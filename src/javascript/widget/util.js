export default {
    // 简化版的对象转request参数，_object对象必须只有一级，如{name: 'xxx', age: 18}
    object2query(obj) {
        let arr = [];
        for (let key of Object.keys(obj)) {
            let value = encodeURIComponent(obj[key]);
            arr.push(`${key}=${value}`);
        }
        return arr.join('&');
    },
    toQueryString(obj) {
        let keys = obj && Object.keys(obj);
        let params;
        if (keys && keys.length > 0) {
            params = keys.map(key => `${key}=${obj[key]}`).join('&');
        }
        return params;
    },
    extend(o1, o2, override) {
        for (let i in o2) {
            if (o1[i] == undefined || override) {
                o1[i] = o2[i];
            }
        }
        return o1;
    },
    filterParam(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!obj[key] && obj[key] !== 0) {
                    delete obj[key];
                }
            }
        }
    }
};
