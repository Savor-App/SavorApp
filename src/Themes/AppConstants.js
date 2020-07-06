import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const appConstants = {
    platformOS: Platform.OS,
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
    ASPECT_RATIO: width / height,
    LATITUDE_DELTA: 0.0922,
    LONGITUDE_DELTA: 0.0922 * (width/height),
    API_KEY: 'AIzaSyAUfamh5YDgsKMIl6anBhKnyWdw5kXW-MY',
};

export default appConstants;