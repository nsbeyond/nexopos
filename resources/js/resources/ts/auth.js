import Vue from 'vue';
import * as components from './components/components';
const nsRegister = () => import('./pages/auth/ns-register.vue');
const nsLogin = () => import('./pages/auth/ns-login.vue');
const nsPasswordLost = () => import('./pages/auth/ns-password-lost.vue');
const nsNewPassword = () => import('./pages/auth/ns-new-password.vue');
const nsState = window['nsState'];
const nsScreen = window['nsScreen'];
const nsExtraComponents = window['nsExtraComponents'];
window['nsComponents'] = Object.assign(components, nsExtraComponents, {
    nsRegister,
    nsLogin,
    nsPasswordLost,
    nsNewPassword
});
window['authVueComponent'] = new Vue({
    el: '#page-container',
    components: Object.assign(Object.assign({ nsLogin,
        nsRegister,
        nsPasswordLost,
        nsNewPassword }, nsExtraComponents), components)
});
//# sourceMappingURL=auth.js.map