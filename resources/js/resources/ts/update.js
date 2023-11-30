import Vue from 'vue';
const nsDatabaseUpdate = require('./pages/update/ns-database-update').default;
console.log(nsDatabaseUpdate);
window['nsUpdate'] = new Vue({
    el: '#main-container',
    components: {
        nsDatabaseUpdate
    }
});
//# sourceMappingURL=update.js.map