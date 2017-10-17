export default (Component) => {
    Component.implement({
        initMenus() {
            // @todo 请替换为自己工程的menu逻辑
            this.data.menus = [{
                title: '分控管理',
                children: [{
                    title: '余额查询',
                    route: '/course/list'
                }, {
                    title: '审核任务',
                    route: '/course/list2'
                }, {
                    title: '数据报表',
                    url: '/course/list'
                }]
            }, {
                title: '采购管理',
                route: '/course/list'
            }];
        }
    });
};