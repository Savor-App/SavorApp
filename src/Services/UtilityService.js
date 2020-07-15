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

    getAddressFromCoords(lat, long) {
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

    decode(t, e) {
        let d=[];
        for (let n, o, u = 0, l = 0, r = 0, h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
            a = null, h = 0, i = 0;
            do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
            n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
            do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
            o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
        }
        return d = d.map(function (t) {
            return {latitude: t[0], longitude: t[1]}
        })
    }

}

const utilityService = new UtilityService();

export default utilityService;