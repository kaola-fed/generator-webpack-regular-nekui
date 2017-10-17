import BaseComponent from 'common/BaseComponent';
import template from './index.html';

export default BaseComponent.extend({
    template,
    init() {
        this.$request('/test/value', {
            method: 'get',
            data: {
                test: 1
            },
            onload(json) {
                console.log(json);
            }
        });
        this.supr();
    }
});