import React, {FunctionComponent} from 'react';
import {Easing, Animated, Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View, Text} from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MyAccount from "../screens/MyAccount";
import MyOrders from "../screens/MyOrders";
import Contact from "../screens/Contact";
import Notification from "../screens/Notifications";
import Profile from "../screens/Profile";
import Header from '../common/Header';
import argonTheme from '../constants/Theme';
import Icon from '../common/Icon'
import Account from "../screens/Account";
import ResetPassword from "../screens/ResetPassword";
import BillingDetails from "../screens/BillingDetails";
import OrderDetails from "../screens/OrderDetails";
import Gallery from "../screens/Gallery";
import Informative from "../screens/Informative";

type Props = {};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator mode="card" headerMode="screen" initialRouteName={'MyOrders'}>
            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            back
                            title="Notification"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />


            <Stack.Screen
                name="Billing"
                component={BillingDetails}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Billing Details"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />

            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Order Details"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />
            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="My Orders"
                            image
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />
        </Stack.Navigator>
    );
}

function PastStack() {
    return (

        <Stack.Navigator mode="card" headerMode="screen" initialRouteName={'MyOrders'}>
            <Stack.Screen
                name="Billing"
                component={BillingDetails}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Billing Details"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />

            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Order Details"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />
            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="My Orders"
                            image
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />
        </Stack.Navigator>
    );
}

function AccountStack() {
    return (
        <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{
                    headerTitle: '',
                    cardStyle: {backgroundColor: "#FFFFFF"},
                    headerTransparent: true
                }}
            />

            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="My Orders"
                            image
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />
            <Stack.Screen
                name="Profile"
                component={MyAccount}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            back
                            title="MyAccount"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#FFFFFF"}
                }}
            />

            <Stack.Screen
                name="Contact"
                component={Contact}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            back
                            title="Contact Us"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#FFFFFF"}
                }}
            />
            <Stack.Screen
                name="Informative"
                component={Informative}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            back
                            title={scene.route.params && scene.route.params.name ? scene.route.params.name : 'Informative'}
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#FFFFFF"}
                }}
            />

            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            title="Order Details"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />


        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color}) => {
                    let iconName = '';
                    if (route.name === "Ongoing") {
                        iconName = "home";
                    } else if (route.name === "Past") {
                        iconName = "basecamp";
                    } else if (route.name === "Account") {
                        iconName = 'user'
                    }
                    // You can return any component that you like here!
                    return (
                        <Icon
                            name={iconName}
                            family="entypo"
                            size={22}
                            color={color}
                            style={{marginTop: 10}}
                        />
                    );
                }
            })}
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: argonTheme.COLORS.DEFAULT,
                inactiveTintColor: "gray",
                labelStyle: {
                    fontFamily: "open-sans-regular"
                }
            }}
        >
            <Tab.Screen name="Ongoing" component={HomeStack}/>
            <Tab.Screen name="Past" component={PastStack}/>
            <Tab.Screen name="Account" component={AccountStack}/>
        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator mode="card" initialRouteName="Login" headerMode='screen'>
            <Stack.Screen
                name="Reset"
                component={ResetPassword}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            white
                            iconColor={argonTheme.COLORS.WHITE}
                            bgColor={argonTheme.COLORS.PRIMARY}
                            transparent={true}
                            title="Reset Password"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            white
                            iconColor={argonTheme.COLORS.WHITE}
                            bgColor={argonTheme.COLORS.PRIMARY}
                            transparent={true}
                            title="Login"
                            back
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            white
                            iconColor={argonTheme.COLORS.WHITE}
                            bgColor={argonTheme.COLORS.PRIMARY}
                            transparent={true}
                            back
                            title="Register"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

const Navigation: FunctionComponent<Props> = (props) => {
    return (
        <Stack.Navigator mode="card" headerMode="none" initialRouteName="App">
            <Stack.Screen name="App" component={AppStack}/>
            <Stack.Screen name='Auth' component={AuthStack}/>
            <Stack.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    header: ({navigation, scene}) => (
                        <Header
                            back
                            white
                            transparent
                            title=""
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: {backgroundColor: "#F8F9FE"}
                }}
            />
        </Stack.Navigator>
    );
};

export default Navigation;

// drawerContentOptions={{
//   activeTintcolor: "white",
//       inactiveTintColor: "#000",
//       activeBackgroundColor: "transparent",
//       itemStyle: {
//     width: width * 0.75,
//         backgroundColor: "transparent",
//         paddingVertical: 16,
//         paddingHorizonal: 12,
//         justifyContent: "center",
//         alignContent: "center",
//         alignItems: "center",
//         overflow: "hidden"
//   },
//   labelStyle: {
//     fontSize: 18,
//         marginLeft: 12,
//         fontWeight: "normal"
//   }
// }}
