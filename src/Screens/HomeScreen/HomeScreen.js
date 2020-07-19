import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Button, ScrollView,Keyboard, FlatList} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline,} from 'react-native-maps';
import {UtilityService, AppConstants} from '../../Services';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as HomeActions from './HomeActions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './HomeStyles';
import Colors from "../../Themes/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import SplashScreen from 'react-native-splash-screen';

navigator.geolocation = require('@react-native-community/geolocation');

class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        UtilityService.requestGeoLocationPermissions();
        this.props.setSourceCoords();
        this.refs.sourceLocation.setAddressText(this.props.sourceAddress.long_name);
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView provider={PROVIDER_GOOGLE}
                         style={styles.map}
                         minZoomLevel={10}
                         onPress={ () => {
                             this.props.setSourceFocus(false);
                             this.props.setDestinationFocus(false);
                             Keyboard.dismiss();
                         }}
                         region={this.props.sourceCoords}>
                    {this.props.routeCoords.size!==0 ? <Polyline
                        coordinates={[
                           // {latitude: this.props.sourceCoords.latitude, longitude: this.props.sourceCoords.longitude}, // optional
                            ...this.props.routeCoords,
                         //   {latitude: final.latitude, longitude: final.longitude}, // optional
                        ]}
                        strokeColor={Colors.darkPrimary}
                        strokeWidth={4}
                    /> : null}
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
                            this.props.setSourceFocus(false);
                            this.props.setDestinationFocus(false);
                            Keyboard.dismiss();
                        }}>
                        <Icon name={'bars'} size={22} color={Colors.darkerPrimary}/>
                    </TouchableOpacity>
                    <View style={styles.sourceSearchBar}>
                        <GooglePlacesAutocomplete
                            ref="sourceLocation"
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
                            ref='destinationLocation'
                            style={styles.sourceSearchInput}
                            placeholder='Search Destination'
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                console.log(JSON.stringify(details.geometry.location));
                                this.props.setDestinationLatLong(details.geometry.location.lat, details.geometry.location.lng);
                                this.props.setDestinationFocus(false);
                                this.props.getDirections(this.props.sourceCoords, this.props.destinationCoords);
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
                    {this.props.destinationCoords.latitude!==0 ? <TouchableOpacity
                        style={styles.drawerIcon}
                        onPress={() => {
                            this.refs.destinationLocation.setAddressText('');
                            this.props.clearRouteCoords();
                            this.props.setSourceFocus(false);
                            this.props.setDestinationFocus(false);
                            Keyboard.dismiss();
                            this.props.setDestinationLatLong(0,0);
                        }}>
                        <Icon name={'times-circle'} size={22}/>
                    </TouchableOpacity>: null}
                </View>
                {null ? <View style={styles.coordinatesAndAddressContainer}>
                    <Text style={{
                        textAlign: 'center',
                        backgroundColor: Colors.white
                    }}>{'Latitude' + this.props.sourceCoords.latitude + '  Longitude' + this.props.sourceCoords.longitude}</Text>
                    <Text style={{
                        textAlign: 'center',
                        backgroundColor: Colors.white
                    }}>{this.props.sourceAddress.long_name}</Text>
                </View> : null}
                {/*<TouchableOpacity
                    onPress={()=> {this.props.getDirections(this.props.sourceCoords, this.props.destinationCoords)}}
                >
                    <Text>GET DIRECTIONS</Text>
                </TouchableOpacity>*/}

                <View style={styles.bottomNavBar}>
                    <TouchableOpacity style={styles.bottomNavBarButtonContainer} onPress={() => this.RBSheet.open()}>
                        <Text style={styles.bottomNavBarButtonText}>Hospitals</Text>
                    </TouchableOpacity>
                    <View style={styles.divider}/>
                    <TouchableOpacity style={styles.bottomNavBarButtonContainer} onPress={() => this.RBSheet1.open()}>
                        <Text style={styles.bottomNavBarButtonText}>Specialist</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.emergencyButtonContainer}>
                    <Icon name={'plus'} size={45} color={Colors.red}/>
                </TouchableOpacity>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={300}
                    openDuration={250}
                    animationType={'slide'}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            // alignItems: "center",
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                        }
                    }}
                >
                    <View style={styles.hospitalsHeadingTextContainer}>
                        <Text style={styles.hospitalsHeadingText}>Hospitals</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                            paddingVertical: 10
                        }}
                        data={this.props.hospitals}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item,index})=> (
                            <TouchableOpacity key={index} style={styles.hospitalListItemContainer} onPress={()=>{
                                this.props.setDestinationLatLong(item.lat, item.lng);
                                this.RBSheet.close();
                                this.refs.destinationLocation.setAddressText(item.name);
                                this.props.getRoute();
                            }}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </RBSheet>
                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    height={300}
                    openDuration={250}
                    animationType={'slide'}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            // alignItems: "center"
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                        }
                    }}
                >
                    <View style={styles.hospitalsHeadingTextContainer}>
                        <Text style={styles.hospitalsHeadingText}>Specialists</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                            paddingVertical: 10
                        }}
                        data={this.props.hospitals}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item,index})=> (
                            <TouchableOpacity key={index} style={styles.hospitalListItemContainer}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </RBSheet>
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
        routeCoords: state.homeReducer.routeCoords,
        hospitalsBottomSheetVisibility: state.homeReducer.hospitalsBottomSheetVisibility,
        hospitals: state.homeReducer.hospitals,
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
        getDirections:(source,dest) => dispatch(HomeActions.getDirections(source,dest)),
        getRoute:() => dispatch(HomeActions.getRoute()),
        clearRouteCoords: () => dispatch(HomeActions.clearRouteCoords()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);