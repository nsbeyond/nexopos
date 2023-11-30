import { Popup } from "@/libraries/popup";
import { default as nsProductUnitPopup } from '@/popups/ns-pos-units.vue';
export class ProductUnitPromise {
    constructor(product) {
        this.product = product;
    }
    run() {
        return new Promise((resolve, reject) => {
            const popup = new Popup({
                popupClass: 'shadow-lg h-1/2-screen w-3/4 xl:w-1/4 bg-white'
            });
            const product = this.product;
            popup.open(nsProductUnitPopup, { resolve, reject, product });
        });
    }
}
//# sourceMappingURL=product-unit.js.map