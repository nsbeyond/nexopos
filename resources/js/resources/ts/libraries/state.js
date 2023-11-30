import { BehaviorSubject } from "rxjs";
export class State {
    constructor(state) {
        this.state = {};
        this.behaviorState = new BehaviorSubject({});
        this.behaviorState.subscribe(state => {
            this.state = state;
        });
        this.setState(state);
    }
    setState(object) {
        this.behaviorState.next(Object.assign(Object.assign({}, this.state), { object }));
    }
}
//# sourceMappingURL=state.js.map