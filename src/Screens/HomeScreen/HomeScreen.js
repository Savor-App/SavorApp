import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Button} from 'react-native';
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
        const destination = {
            latitude: 28.610247,
            longitude: 76.985111,
            latitudeDelta: AppConstants.LATITUDE_DELTA,
            longitudeDelta: AppConstants.LONGITUDE_DELTA,
        };
        return (
            <View style={{flex: 1}}>

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
                        coordinate={destination}
                        title={'Destination'}
                        description={'Destination Name'}
                    />
                </MapView>
                <View style={{backgroundColor: Colors.white, marginTop: 10, padding: 10,marginHorizontal:10, flexDirection:'row',height:100}}>
                    <TouchableOpacity
                        style={{justifyContent:'flex-start', marginHorizontal:5, marginTop:10}}
                        onPress={() => {this.props.navigation.openDrawer();
                    }}>
                        <Icon name={'bars'} size={22} />
                    </TouchableOpacity>
                    <View style={{marginLeft:10,flex:8}}>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                console.log(JSON.stringify(details.geometry.location));
                                this.props.setSourceLatLong(details.geometry.location.lat, details.geometry.location.lng);
                            }}
                            query={{
                                key: AppConstants.API_KEY,
                                language: 'en',
                            }}
                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GooglePlacesDetailsQuery={{ fields: 'geometry',}}
                        />
                    </View>
                </View>
                <View style={{marginHorizontal:10, padding:10}}>
                    <Text style={{textAlign:'center', backgroundColor:Colors.white}}>{'Latitude' + this.props.sourceCoords.latitude + '  Longitude' + this.props.sourceCoords.longitude}</Text>
                    <Text style={{textAlign:'center', backgroundColor:Colors.white}}>{this.props.sourceAddress.long_name}</Text>
                </View>
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
        setSourceLatLong: (lat, long) => dispatch(HomeActions.setSourceLatLong(lat, long)),
        setSourceAddress: () => dispatch(HomeActions.setSourceAddress()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);