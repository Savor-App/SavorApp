/* All the common utility functions */

import {PermissionsAndroid} from 'react-native';
import {AppConstants} from '../Themes';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from "react-native-geocoding";

const LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

class UtilityService {

    requestGeoLocationPermissions() {
        return PermissionsAndroid.request(LOCATION_PERMISSION);
    }

    checkGeoLocationPermissions() {
        if (AppConstants.platformOS === "android") {
            return PermissionsAndroid.check(LOCATION_PERMISSION);
        }
    }

    getGPSCoords() {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                Geocoder.init(AppConstants.API_KEY);
                return {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: AppConstants.LATITUDE_DELTA,
                    longitudeDelta: AppConstants.LONGITUDE_DELTA,
                };

            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    }

    getAddressFromCoords(lat, long){
        Geocoder.from(lat, long)
            .then(json => {
                let addressComponent = json.results[0].address_components[0];
                // this.setState({address: addressComponent});
                console.log(addressComponent);
                return addressComponent;
            })
            .catch(error =>
                console.warn(error)
            );
    }

}

const utilityService = new UtilityService();

export default utilityService;