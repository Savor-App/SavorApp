import React, {Component} from 'react';
import {View, Linking, Text, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {Colors} from './Themes'

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
    <View style={{flex: 1}}>
        <View style={{ flex: 2, backgroundColor: Colors.figmaBlue, alignItems: 'flex-start', }}>
            <View style={{
                borderRadius: 50,
                backgroundColor: Colors.white,
                height: 80,
                width: 80,
                margin: 20,
            }}>
            </View>
            <View style={{ marginLeft: 20, marginTop:35 }}>
                <Text style={{ color: Colors.white, fontWeight: 'bold' }}>ankitamehta283@gmail.com</Text>
            </View>
        </View>
        <View style={{flex: 5}}>
            <DrawerItemList {...props}/>
        </View>
    </View>
);

class Boot extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerType={'front'}
                                  drawerContent={props => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{drawerIcon: () => <Icon name={'home'} size={20}/>,}}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{drawerIcon: () => <Icon name={'user'} size={20}/>,
                    }}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Boot;