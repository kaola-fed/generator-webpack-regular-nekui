/* ListComopnent */
import { KLNotify } from 'nek-ui';
import _ from 'widget/util';
import BaseComponent from './BaseComponent.js';

export default BaseComponent.extend({
    watchedAttr: ['pageNo', 'pageSize'],
    events: {
        updatelist() {
            this.getList();
        }
    },
    config(data) {
        this.defaults({
            total: 1,
            pageNo: 1,
            pageSize: 20,
            condition: {},
            list: [],
            loading: false // 配合KLTable使用
        });

        this.supr(data);

        this.$watch(this.watchedAttr, function(){
            if(this.shouldUpdateList()){
                this.getList();
            }
        });
    },
    // @子类修改
    shouldUpdateList() {
        return true;
    },
    getExtraParam() {
        return this.data.condition;
    },
    refresh(condition) {
        this.data.pageNo = 1;
        this.data.condition = condition;
        this.$emit('updatelist');
    },
    /* @子类修改 重置表单筛选项 */
    reset() {
        this.data.condition = {};
    },
    getListParam() {
        const data = this.data;
        const _obj = _.extend({
            pageNo: data.pageNo,
            pageSize: data.pageSize
        }, this.getExtraParam());
        _.filterParam(_obj);
        return _obj;
    },
    bodyResolver(json) {
        if (json.code != 200) {
            KLNotify.error(json.message);
        }

        const result = json.result;
        const list = result.list || [];

        this.data.total = result.total;
        this.data.list = list;
        this.$update();
    },
    handleReset() {
        this.$update('condition', {});
    },
    // update loading
    getList() {
        this.data.loading = true;
        const that = this;
        const option = {
            progress: true,
            data: this.getListParam(),
            type: 'json',
            onload(json) {
                that.bodyResolver(json);
                that.$update('loading', false);
            },
            onerror() {
                that.$update('loading', false);
            }
        };
        if (this.xdrOption) {
            const xdrOpt = this.xdrOption();
            if (xdrOpt.norest) {
                option.norest = true;
            }
            option.method = xdrOpt.method || 'GET';
        }
        this.$request(this.url, option);
    }
});