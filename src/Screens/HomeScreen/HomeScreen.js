import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Button, ScrollView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {UtilityService, AppConstants} from '../../Services';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as HomeActions from './HomeActions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './HomeStyles';
import Colors from "../../Themes/Colors";

navigator.geolocation = require('@react-native-community/geolocation');

class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        UtilityService.requestGeoLocationPermissions();
        this.props.setSourceCoords();
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView provider={PROVIDER_GOOGLE}
                         style={styles.map}
                         minZoomLevel={15}
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
                        coordinate={this.props.destinationCoords}
                        title={'Destination'}
                        description={'Destination Name'}
                    />
                </MapView>
                <View style={[styles.sourceSearchBarContainer, {height: this.props.sourceFocus ? 200 : 63}]}>
                    <TouchableOpacity
                        style={styles.drawerIcon}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name={'bars'} size={22}/>
                    </TouchableOpacity>
                    <View style={styles.sourceSearchBar}>
                        <GooglePlacesAutocomplete
                            style={styles.sourceSearchInput}
                            placeholder='Search Source'
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                console.log(JSON.stringify(details.geometry.location));
                                this.props.setSourceLatLong(details.geometry.location.lat, details.geometry.location.lng);
                                this.props.setSourceFocus(false);
                            }}
                            query={{
                                key: AppConstants.API_KEY,
                                language: 'en',
                            }}
                            textInputProps={{
                                onFocus: () => {
                                    this.props.setSourceFocus(true);
                                    this.props.setDestinationFocus(false);
                                }
                            }}
                            styles={styles.googlePlacesAutocomplete}
                            // currentLocation={true}
                            // disableScroll={false}
                            // currentLocationLabel={'Current Location'}
                            enablePoweredByContainer={false}
                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GooglePlacesDetailsQuery={{fields: 'geometry',}}
                        />
                    </View>
                </View>
                <View style={[styles.sourceSearchBarContainer, {height: this.props.destinationFocus ? 200 : 63}]}>
                    <View style={styles.sourceSearchBar}>
                        <GooglePlacesAutocomplete
                            style={styles.sourceSearchInput}
                            placeholder='Search Destination'
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                console.log(JSON.stringify(details.geometry.location));
                                this.props.setDestinationLatLong(details.geometry.location.lat, details.geometry.location.lng);
                                this.props.setDestinationFocus(false);
                            }}
                            query={{
                                key: AppConstants.API_KEY,
                                language: 'en',
                            }}
                            textInputProps={{
                                onFocus: () => {
                                    this.props.setDestinationFocus(true);
                                    this.props.setSourceFocus(false);
                                }
                            }}
                            styles={styles.googlePlacesAutocomplete}
                            keyboardShouldPersistTaps={'always'}
                            enablePoweredByContainer={false}
                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GooglePlacesDetailsQuery={{fields: 'geometry',}}
                        />
                    </View>
                </View>
                <View style={styles.coordinatesAndAddressContainer}>
                    <Text style={{
                        textAlign: 'center',
                        backgroundColor: Colors.white
                    }}>{'Latitude' + this.props.sourceCoords.latitude + '  Longitude' + this.props.sourceCoords.longitude}</Text>
                    <Text style={{
                        textAlign: 'center',
                        backgroundColor: Colors.white
                    }}>{this.props.sourceAddress.long_name}</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        sourceCoords: state.homeReducer.sourceCoords,
        sourceAddress: state.homeReducer.sourceAddress,
        sourceFocus: state.homeReducer.sourceFocus,
        destinationCoords: state.homeReducer.destinationCoords,
        destinationAddress: state.homeReducer.destinationAddress,
        destinationFocus: state.homeReducer.destinationFocus,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSourceCoords: () => dispatch(HomeActions.setSourceCoords()),
        setSourceLatLong: (lat, long) => dispatch(HomeActions.setSourceLatLong(lat, long)),
        setDestinationLatLong: (lat, long) => dispatch(HomeActions.setDestinationLatLong(lat, long)),
        setSourceAddress: () => dispatch(HomeActions.setSourceAddress()),
        setSourceFocus: (bool) => dispatch(HomeActions.setSourceFocus(bool)),
        setDestinationFocus: (bool) => dispatch(HomeActions.setDestinationFocus(bool)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);