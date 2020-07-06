export default function reducer(state = {
    locale: null,
    internetConnected: true,
    prevRoute: null,
    currRoute: null
}, action) {
    switch (action.type) {
        case "SET_LOCALE": {
            return {...state, locale: action.payload};
        }
        case "SET_INTERNET_CONNECTED": {
            return {...state, internetConnected: action.payload};
        }
        case "SET_PREV_ROUTE": {
            return {...state, prevRoute: action.payload};
        }
        case "SET_CURR_ROUTE": {
            return {...state, currRoute: action.payload};
        }
        default:
            return state;
    }
}
