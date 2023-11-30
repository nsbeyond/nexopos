export default class CrudHandler {
    constructor() {
        this.instances = new Object;
    }
    getInstance(src) {
        return this.instances[src];
    }
    defineInstance(src, instance) {
        this.instances[src] = instance;
    }
}
//# sourceMappingURL=crud-handler.js.map