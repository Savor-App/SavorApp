import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {UtilityService} from '../../Services';
import {AppConstants} from '../../Themes';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

navigator.geolocation = require('@react-native-community/geolocation');

class HomeScreen extends Component {

    constructor() {
        super();
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: AppConstants.LATITUDE_DELTA,
                longitudeDelta: AppConstants.LONGITUDE_DELTA,
            },
            address: "NULL",
        }
    }

    componentDidMount() {
        //   UtilityService.requestGeoLocationPermissions();
        // Geolocation.getCurrentPosition(info => console.log(info));
        /*navigator.geolocation.getCurrentPosition(
            position => console.log("NATIVE GEOLOCATION",position),
            error => console.log(error),
            { enableHighAccuracy: false, timeout: 10000 });*/
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                Geocoder.init(AppConstants.API_KEY);
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: AppConstants.LATITUDE_DELTA,
                        longitudeDelta: AppConstants.LONGITUDE_DELTA,
                    }
                });
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                        let addressComponent = json.results[0].address_components[0];
                        this.setState({address: addressComponent});
                        console.log(addressComponent);
                    })
                    .catch(error =>
                        console.warn(error)
                    );
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    }

    render() {
        return (
            <View>
                <View>
                    <Text>{'Latitude' + this.state.region.latitude + '  Longitude' + this.state.region.longitude}</Text>
                    <Text>{this.state.address.long_name}</Text>
                </View>
                <MapView provider={PROVIDER_GOOGLE}
                         style={{height: '100%'}}
                         region={this.state.region}>
                    <Marker
                        draggable
                        onDragEnd={(e) => {
                            let coords = e.nativeEvent.coordinate;
                            console.log('dragEnd', coords);
                            this.setState({
                                ...this.state, region: {
                                    latitude: coords.latitude,
                                    longitude: coords.longitude,
                                    latitudeDelta: AppConstants.LATITUDE_DELTA,
                                    longitudeDelta: AppConstants.LONGITUDE_DELTA,
                                }
                            });
                            Geocoder.from(coords.latitude, coords.longitude)
                                .then(json => {
                                    let addressComponent = json.results[0].address_components[0];
                                    this.setState({address: addressComponent});
                                    console.log(addressComponent);
                                })
                                .catch(error =>
                                    console.warn(error)
                                );
                            console.log(JSON.stringify(this.state));
                        }}
                            coordinate={this.state.region}
                            title={'Home'}
                            description={'This is a test'}
                            />
                            </MapView>
                            </View>
                            );
                            }
                    }

                    export default HomeScreen;