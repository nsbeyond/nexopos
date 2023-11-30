import * as Lodash from "lodash";
import axios from "axios";
import * as ChartJS from "chart.js";
import VueRouter from "vue-router";
import { EventEmitter, HttpClient, SnackBar, State } from "./libraries/libraries";
import { fromEvent } from "rxjs";
import * as RxJS from 'rxjs';
import * as moment from 'moment';
import { Popup } from "./libraries/popup";
import Vue from "vue";
import FormValidation from "./libraries/form-validation";
import Url from "./libraries/url";
import { nsCurrency, nsAbbreviate, nsRawCurrency, nsTruncate } from "./filters/declarations";
import CrudHandler from "./libraries/crud-handler";
import { createHooks } from '@wordpress/hooks';
import { __, __m } from "./libraries/lang";
import popupResolver from "./libraries/popup-resolver";
import popupCloser from "./libraries/popup-closer";
import Echo from "laravel-echo";
import Tax from "./libraries/tax";
const Pusher = require('pusher-js');
;
window._ = Lodash;
window.ChartJS = ChartJS;
window.Pusher = Pusher;
window.Vue = Vue;
window.moment = moment;
window.Axios = axios;
window.__ = __;
window.__m = __m;
window.VueRouter = VueRouter;
window.SnackBar = SnackBar;
window.nsHooks = createHooks();
window.popupResolver = popupResolver,
    window.popupCloser = popupCloser,
    window.Axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
window.Axios.defaults.withCredentials = true;
if (ns.websocket.enabled) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: ns.websocket.key,
        wsHost: ns.websocket.host,
        wsPort: ns.websocket.port,
        wssPort: ns.websocket.port,
        namespace: '',
        forceTLS: ns.websocket.secured,
        disableStats: true,
        encrypted: ns.websocket.secured,
        enabledTransports: ns.websocket.secured ? ['ws', 'wss'] : ['ws'],
        disabledTransports: ns.websocket.secured ? ['sockjs', 'xhr_polling', 'xhr_streaming'] : []
    });
}
const nsEvent = new EventEmitter;
const nsHttpClient = new HttpClient;
const nsSnackBar = new SnackBar;
const nsUrl = new Url;
const nsCrudHandler = new CrudHandler;
const nsHooks = window.nsHooks;
/**
 * create a screen class
 * that controls the device sizes
 */
const nsScreen = new class {
    constructor() {
        this.breakpoint = '';
        this.detectScreenSizes();
        fromEvent(window, 'resize')
            .subscribe(v => this.detectScreenSizes());
    }
    detectScreenSizes() {
        switch (true) {
            case (window.outerWidth > 0) && (window.outerWidth <= 480):
                this.breakpoint = 'xs';
                break;
            case (window.outerWidth > 480) && (window.outerWidth <= 640):
                this.breakpoint = 'sm';
                break;
            case (window.outerWidth > 640) && (window.outerWidth <= 1024):
                this.breakpoint = 'md';
                break;
            case (window.outerWidth > 1024) && (window.outerWidth <= 1280):
                this.breakpoint = 'lg';
                break;
            case (window.outerWidth > 1280):
                this.breakpoint = 'xl';
                break;
        }
    }
};
const nsState = new State({
    sidebar: ['xs', 'sm', 'md'].includes(nsScreen.breakpoint) ? 'hidden' : 'visible'
});
nsHttpClient.defineClient(axios);
window.nsEvent = nsEvent;
window.nsHttpClient = nsHttpClient;
window.nsSnackBar = nsSnackBar;
window.nsCurrency = nsCurrency;
window.nsTruncate = nsTruncate;
window.nsRawCurrency = nsRawCurrency;
window.nsAbbreviate = nsAbbreviate;
window.nsState = nsState;
window.nsUrl = nsUrl;
window.nsScreen = nsScreen;
window.ChartJS = ChartJS;
window.EventEmitter = EventEmitter;
window.Popup = Popup;
window.RxJS = RxJS;
window.FormValidation = FormValidation;
window.nsCrudHandler = nsCrudHandler;
window.nsTax = Tax;
export { nsHttpClient, nsSnackBar, nsEvent, nsState, nsScreen, nsUrl, nsHooks };
//# sourceMappingURL=bootstrap.js.map