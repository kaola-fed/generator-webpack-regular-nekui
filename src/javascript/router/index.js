
/* 路由文件由build/router.js中生成，请勿手动修改 */
import restate from 'regular-state';
import Layout from 'common/layout';

const routes = {
    app: {
        url: '',
        view: Layout
    },
    'app.course/list': {
        url: '/course/list',
        view: (option, resolve) => {
            require.ensure([], () => {
                resolve(require('page/course/list/index').default);
            });
        }
    },
    'app.course/list2': {
        url: '/course/list2',
        view: (option, resolve) => {
            require.ensure([], () => {
                resolve(require('page/course/list2/index').default);
            });
        }
    }
};

export default restate({ routes });
