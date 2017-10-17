import BaseComponent from 'common/BaseComponent';
import template from './index.html';
import menuMixin from './mixins/menu';

import 'less/base.less';
import './index.less';

const Layout = BaseComponent.extend({
    template,
    config(data) {
        this.defaults({
            sidebarReady: true
        });
        this.initMenus();
        this.supr(data);
    },
    init() {
        /* 如果不setTimeout,sidebar与右侧内容同时渲染, sidebar动画会有明显卡顿,所以这里增加setTimeout,先显示sidebar, 间隔一段时间后才显示右侧内容; */
        const that = this;
        setTimeout(() => {
            that.$update('sidebarReady', true);
        }, 400);
    },
    stopPropagation(e) {
        e.stopPropagation();
    }
});

Layout.use(menuMixin);
Layout.directive('fadeIn', (ele) => {
    /* 延时是因为列表渲染比较慢,如果不加延时高度会闪一下 */
    setTimeout(() => {
        ele.classList.add('fadeIn');
    }, 450);
});

export default Layout;