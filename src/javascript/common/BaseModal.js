/* BaseModal */
import { KLModal } from 'nek-ui';
import BaseMixin from './_mixin.js';

export default KLModal.extend({
    config(data) {
        this.supr(data);
    }
}).use(BaseMixin);