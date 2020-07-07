import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {UtilityService, AppConstants} from '../../Services';
import {connect} from 'react-redux';
import * as HomeActions from './HomeActions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');

class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("DIDMOUNT=================");
        UtilityService.requestGeoLocationPermissions();
        this.props.setSourceCoords();
    }

    render() {
        const destination = {
            latitude: 28.610247,
            longitude:  76.985111,
            latitudeDelta: AppConstants.LATITUDE_DELTA,
            longitudeDelta: AppConstants.LONGITUDE_DELTA,
        };
        return (
            <View>
                <View>
                    <Text>{'Latitude' + this.props.sourceCoords.latitude + '  Longitude' + this.props.sourceCoords.longitude}</Text>
                    <Text>{this.props.sourceAddress.long_name}</Text>
                </View>
                <MapView provider={PROVIDER_GOOGLE}
                         style={{height: '100%'}}
                         minZoomLevel={10}
                         region={this.props.sourceCoords}>
                    <Marker
                        draggable
                        onDragEnd={(e) => {
                            let coords = e.nativeEvent.coordinate;
                            console.log('dragEnd', coords);
                            this.props.setSourceLatLong(coords.latitude, coords.longitude);
                            this.props.setSourceAddress();
                        }}
                        coordinate={this.props.sourceCoords}
                        title={'Source'}
                        description={this.props.sourceAddress.long_name}/>
                    <Marker
                        coordinate={destination}
                        title={'Destination'}
                        description={'Destination Name'}
                    />
                </MapView>


            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        sourceCoords: state.homeReducer.sourceCoords,
        sourceAddress: state.homeReducer.sourceAddress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSourceCoords: () => dispatch(HomeActions.setSourceCoords()),
        setSourceLatLong: (lat, long) => dispatch(HomeActions.setSourceLatLong(lat,long)),
        setSourceAddress: () => dispatch(HomeActions.setSourceAddress()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);