/* All the common utility functions */

import {PermissionsAndroid} from 'react-native';
import { AppConstants } from '../Themes';
const LOCATION_PERMISSION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

class UtilityService{

    requestGeoLocationPermissions() {
        return PermissionsAndroid.request(LOCATION_PERMISSION);
    }

    checkGeoLocationPermissions() {
        if (AppConstants.platformOS === "android") {
            return PermissionsAndroid.check(LOCATION_PERMISSION);
        }
    }
}

const utilityService = new UtilityService();

export default utilityService;