import { BehaviorSubject } from "rxjs";
import { nsHttpClient } from "./bootstrap";
export class Dashboard {
    constructor() {
        this._reports = {
            day: nsHttpClient.get('/api/nexopos/v4/dashboard/day'),
            bestCustomers: nsHttpClient.get('/api/nexopos/v4/dashboard/best-customers'),
            weeksSummary: nsHttpClient.get('/api/nexopos/v4/dashboard/weeks'),
            bestCashiers: nsHttpClient.get('/api/nexopos/v4/dashboard/best-cashiers'),
            recentOrders: nsHttpClient.get('/api/nexopos/v4/dashboard/recent-orders')
        };
        this._day = new BehaviorSubject({});
        this._bestCustomers = new BehaviorSubject([]);
        this._weeksSummary = new BehaviorSubject({});
        this._bestCashiers = new BehaviorSubject([]);
        this._recentOrders = new BehaviorSubject([]);
        for (let index in this._reports) {
            this.loadReport(index);
        }
    }
    loadReport(type) {
        return this._reports[type]
            .subscribe(result => {
            this[`_${type}`].next(result);
        });
    }
    get day() {
        return this._day;
    }
    get bestCustomers() {
        return this._bestCustomers;
    }
    get bestCashiers() {
        return this._bestCashiers;
    }
    get recentOrders() {
        return this._recentOrders;
    }
    get weeksSummary() {
        return this._weeksSummary;
    }
}
window.Dashboard = new Dashboard;
//# sourceMappingURL=dashboard.js.map