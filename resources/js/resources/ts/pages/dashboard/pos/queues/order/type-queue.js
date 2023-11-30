import { Popup } from "@/libraries/popup";
const orderTypePopup = require('@/popups/ns-pos-order-type-popup').default;
export class TypeQueue {
    constructor(order) {
        this.order = order;
    }
    run() {
        return new Promise((resolve, reject) => {
            if (this.order.type === undefined) {
                return Popup.show(orderTypePopup, { resolve, reject });
            }
            resolve(true);
        });
    }
}
window.TypeQueue = TypeQueue;
//# sourceMappingURL=type-queue.js.map