import {AppConstants} from "../../Services";

export default function reducer(state = {
    internetConnected: true,
    sourceCoords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: AppConstants.LATITUDE_DELTA,
        longitudeDelta: AppConstants.LONGITUDE_DELTA,
    },
    sourceAddress: {},
    sourceFocus: false,
    destinationCoords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: AppConstants.LATITUDE_DELTA,
        longitudeDelta: AppConstants.LONGITUDE_DELTA,
    },
    destinationAddress: {},
    destinationFocus:false,
    routeCoords: [],
    hospitals: [{name:"LNJP",distance:"2.3kms"},{name:"Venkateshwar Hospital",distance:"3.5kms"},{name:"Mahindru Hospital",distance:"5.3kms"}],

}, action) {
    switch (action.type) {
        case "SET_SOURCE_COORDS": {
            return {...state, sourceCoords: action.payload};
        }
        case "SET_SOURCE_ADDRESS": {
            return {...state, sourceAddress: action.payload};
        }
        case "SET_DESTINATION_COORDS": {
            return {...state, destinationCoords: action.payload};
        }
        case "SET_DESTINATION_ADDRESS": {
            return {...state, destinationAddress: action.payload};
        }
        case "SET_INTERNET_CONNECTED": {
            return {...state, internetConnected: action.payload};
        }
        case "SET_SOURCE_FOCUS":{
            return {...state, sourceFocus:action.payload};
        }
        case "SET_DESTINATION_FOCUS":{
            return {...state, destinationFocus:action.payload};
        }
        case "SET_ROUTE_COORDS":{
            // console.log("ROUTE",action.payload);
            return {...state, routeCoords:action.payload};
        }
        default:
            return state;
    }
}
