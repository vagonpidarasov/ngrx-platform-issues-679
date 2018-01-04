export function MainReducer(state:any, action:any):any {
    let newState = Object.assign({}, state, {update: (new Date()).getTime()});
    return newState;
}
