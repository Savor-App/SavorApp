import {UtilityService, AppConstants} from '../../Services';
import Geocoder from "react-native-geocoding";
import Geolocation from 'react-native-geolocation-service';


export function setSourceCoords() {
    return dispatch => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                let source = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: AppConstants.LATITUDE_DELTA,
                    longitudeDelta: AppConstants.LONGITUDE_DELTA,
                };
                dispatch({type: 'SET_SOURCE_COORDS', payload: source});
                dispatch(setSourceAddress());
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    }
}

export function setSourceLatLong(lat, long) {
    return dispatch => {
        let source = {
            latitude: lat,
            longitude: long,
            latitudeDelta: AppConstants.LATITUDE_DELTA,
            longitudeDelta: AppConstants.LONGITUDE_DELTA,
        };
        console.log("SOURCE_COORDS", source);
        dispatch({type: 'SET_SOURCE_COORDS', payload: source});
        setSourceAddress();
    }
}


export function setDestinationLatLong(lat, long) {
    return dispatch => {
        let dest = {
            latitude: lat,
            longitude: long,
            latitudeDelta: AppConstants.LATITUDE_DELTA,
            longitudeDelta: AppConstants.LONGITUDE_DELTA,
        };
        console.log("DESTINATION_COORDS", dest);
        dispatch({type: 'SET_DESTINATION_COORDS', payload: dest});
        // setSourceAddress();
    }
}

export function setSourceAddress() {
    return (dispatch, getState) => {
        const {sourceCoords} = getState().homeReducer;
        Geocoder.init(AppConstants.API_KEY);
        Geocoder.from(sourceCoords.latitude, sourceCoords.longitude)
            .then(json => {
                let addressComponent = json.results[0].address_components[0];
                console.log(addressComponent);
                dispatch({type: 'SET_SOURCE_ADDRESS', payload: addressComponent});
            })
            .catch(error =>
                console.warn(error)
            );

        /*let address = UtilityService.getAddressFromCoords(sourceCoords.latitude, sourceCoords.longitude);
        console.log("SOURCE_ADDRESS", address);
        dispatch({type: 'SET_SOURCE_ADDRESS', payload: address});*/
    }
}

export function setSourceFocus(bool) {
    return dispatch => {
        dispatch({type: 'SET_SOURCE_FOCUS', payload: bool});
        // dispatch({type:'SET_DESTINATION_FOCUS', payload: !bool});
    };
}

export function setDestinationFocus(bool) {
    return dispatch => {
        dispatch({type: 'SET_DESTINATION_FOCUS', payload: bool});
        // dispatch({type: 'SET_SOURCE_FOCUS', payload: !bool});
    };
}

export function getDirections(source, dest) {
    const mode = 'driving'; // 'walking';
    const origin = source.latitude + ',' + source.longitude;
    const destination = dest.latitude + ',' + dest.longitude;
    const APIKEY = AppConstants.API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    console.log("CATCHMEIFYOUCAN");
    return dispatch => {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                console.log("CATCHMEIFYOUCAN1");
                if (responseJson.routes.length) {
                    const log = UtilityService.decode(responseJson.routes[0].overview_polyline.points);
                    console.log("POLYLINE_OVERVIEW", JSON.stringify(log));
                    dispatch({type: 'SET_ROUTE_COORDS', payload: log});
                }
            })
            .catch(e => {
                console.warn(e);
            });
    };
}
