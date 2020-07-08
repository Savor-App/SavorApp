import React, {Component} from 'react';
import { View, Linking, Text} from 'react-native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => (
    <View>
        <Text>
            This is a test
        </Text>
    </View>
);
class Boot extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerType={'front'} drawerContent={props => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
export default Boot;