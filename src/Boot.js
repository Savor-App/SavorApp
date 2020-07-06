import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';

class Boot extends Component {
    render() {
        return (
            <View>
                <HomeScreen/>
            </View>
        )
    }
}

export default Boot;