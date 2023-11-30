var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Subject } from "rxjs";
export class Popup {
    constructor(config = {}) {
        this.config = {
            primarySelector: undefined,
            popupClass: 'shadow-lg h-half w-1/2 bg-white',
        };
        this.container = document.createElement('div');
        this.popupBody = document.createElement('div');
        this.popupSelector = '';
        this.config = Object.assign(this.config, config);
        if (this.config.primarySelector === undefined &&
            document.querySelectorAll('.is-popup').length > 0) {
            const items = document.querySelectorAll('.is-popup').length;
            this.parentWrapper = (document.querySelectorAll('.is-popup')[items - 1]);
        }
        else {
            this.parentWrapper = document.querySelector('body').querySelectorAll('div')[0];
        }
        this.event = new Subject;
    }
    static show(component, params = {}, config = {}) {
        const popup = new Popup(config);
        popup.open(component, params);
        return popup;
    }
    hash() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    open(component, params = {}) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof component === 'function') {
                try {
                    component = (yield component()).default;
                }
                catch (exception) {
                    /**
                     * it has failed, maybe it's an inline-component.
                     * In that situation, we don't need to resolve the default.
                     */
                }
            }
            const body = document.querySelector('body').querySelectorAll('div')[0];
            this.parentWrapper.style.filter = 'blur(4px)';
            body.style.filter = 'blur(6px)';
            this.container.setAttribute('class', 'absolute top-0 left-0 w-full h-full flex items-center justify-center is-popup');
            /**
             * We need to listen to click even on the container
             * as it might be used to close the popup
             */
            this.container.addEventListener('click', (event) => {
                /**
                 * this will emit an even
                 * when the overlay is clicked
                 */
                this.event.next({
                    event: 'click-overlay',
                    value: true
                });
                event.stopPropagation();
            });
            /**
             * We don't want to propagate to the
             * overlay, that closes the popup
             */
            this.popupBody.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
            });
            const actualLength = document.querySelectorAll('.is-popup').length;
            this.container.id = 'popup-container-' + this.hash();
            this.popupSelector = `#${this.container.id}`;
            this.popupBody.setAttribute('class', 'zoom-out-entrance popup-body');
            this.popupBody.setAttribute('data-index', actualLength);
            this.popupBody.innerHTML = '<div class="vue-component"></div>';
            this.container.appendChild(this.popupBody);
            document.body.appendChild(this.container);
            /**
             * We'll provide a reference of the
             * wrapper so that the component
             * can manipulate that.
             */
            const componentClass = Vue.extend(component);
            this.instance = new componentClass({
                propsData: {
                    popup: this, // @deprecated
                }
            });
            /**
             * Let's intanciate the component
             * and mount it
             */
            this.instance.template = ((_a = component === null || component === void 0 ? void 0 : component.options) === null || _a === void 0 ? void 0 : _a.template) || undefined;
            this.instance.render = component.render || undefined;
            this.instance.methods = ((_b = component === null || component === void 0 ? void 0 : component.options) === null || _b === void 0 ? void 0 : _b.methods) || (component === null || component === void 0 ? void 0 : component.methods);
            this.instance.data = ((_c = component === null || component === void 0 ? void 0 : component.options) === null || _c === void 0 ? void 0 : _c.data) || (component === null || component === void 0 ? void 0 : component.data);
            this.instance.$popup = this;
            this.instance.$popupParams = params;
            this.instance.$mount(`#${this.container.id} .vue-component`);
        });
    }
    close() {
        /**
         * Let's start by destorying the
         * Vue component attached to the popup
         */
        this.instance.$destroy();
        /**
         * The Subject we've initialized earlier
         * need to be closed
         */
        this.event.unsubscribe();
        /**
         * For some reason we need to fetch the
         * primary selector once again.
         */
        this.parentWrapper.style.filter = 'blur(0px)';
        const body = document.querySelector('body').querySelectorAll('div')[0];
        if (document.querySelectorAll('.is-popup').length <= 1) {
            body.style.filter = 'blur(0px)';
        }
        const selector = `${this.popupSelector} .popup-body`;
        this.popupBody = document.querySelector(selector);
        this.popupBody.classList.remove('zoom-out-entrance');
        this.popupBody.classList.add('zoom-in-exit');
        this.container = document.querySelector(`${this.popupSelector}`);
        this.container.classList.remove('is-popup');
        setTimeout(() => {
            this.container.remove();
        }, 300); // as by default the animation is set to 500ms
    }
}
//# sourceMappingURL=popup.js.map