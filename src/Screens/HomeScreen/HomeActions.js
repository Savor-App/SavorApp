import {AppConstants} from '../../Themes';
import {UtilityService} from '../../Services';
import Geocoder from "react-native-geocoding";
import Geolocation from 'react-native-geolocation-service';
export function setSourceCoords() {
    return async dispatch => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);

                let source = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: AppConstants.LATITUDE_DELTA,
                    longitudeDelta: AppConstants.LONGITUDE_DELTA,
                };
                dispatch(setSourceAddress());
                dispatch({type: 'SET_SOURCE_COORDS', payload: source});
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );

        /*let source = UtilityService.getGPSCoords();
        console.log("SOURCE_COORDS", source);
        if(source!==undefined){
            console.log("SOURCE_COORDS", source);
            dispatch({type: 'SET_SOURCE_COORDS', payload: source});
        }*/
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

export function setSourceAddress() {
    return ( dispatch, getState ) => {
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
