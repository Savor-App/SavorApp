import {AppConstants} from "../../Themes";

export default function reducer(state = {
    internetConnected: true,
    sourceCoords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: AppConstants.LATITUDE_DELTA,
        longitudeDelta: AppConstants.LONGITUDE_DELTA,
    },
    sourceAddress: {},
}, action) {
    switch (action.type) {
        case "SET_SOURCE_COORDS": {
            return {...state, sourceCoords: action.payload};
        }
        case "SET_SOURCE_ADDRESS": {
            return {...state, sourceAddress: action.payload};
        }
        case "SET_INTERNET_CONNECTED": {
            return {...state, internetConnected: action.payload};
        }
        default:
            return state;
    }
}
