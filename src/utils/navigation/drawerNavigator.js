import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./stackNavigation";
import TabNavigator from "./tabNavigator";
import Icon from 'react-native-vector-icons/Ionicons';

import FoodCourt from "../../screens/foodCourt";
import Cart from "../../screens/cart";
import colors from "../../common/components/colors";

import CustomDrawer from "../../common/components/customDrawer";
import EditDetails from "../../screens/editDetails";
import CustomDrawerEditProfile from "../../common/components/customDrawerEditProfile";

const screenOptionStyle = {
    headerShown: false,
    drawerStyle: {
        // backgroundColor: colors.lightGreyWhite,
        width: '75%',
    },
    drawerActiveBackgroundColor: '#694fad',
    drawerActiveTintColor: '#fff',
    drawerInactiveTintColor: '#333',
    drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
    },
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            id="LeftDrawer"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={screenOptionStyle}
        >
            <Drawer.Screen name="Dashborad"
                component={TabNavigator}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="md-home"
                            size={size}
                            color={focused ? '#fff' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="Food"
                component={FoodCourt}
                // component={TabNavigator}
                options={{
                    drawerLabel: 'Food Court',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="fast-food"
                            size={size}
                            color={focused ? '#fff' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="CartItems"
                component={Cart}
                // component={TabNavigator}
                options={{
                    drawerLabel: 'Cart',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="cart"
                            size={size}
                            color={focused ? '#fff' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="Contact"
                component={ContactStackNavigator}
                // component={TabNavigator}
                options={{
                    drawerLabel: 'Contact Us',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="md-call"
                            size={size}
                            color={focused ? '#fff' : '#ccc'}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
    return (
        <RightDrawer.Navigator
            id="RightDrawer"
            drawerContent={props => <CustomDrawerEditProfile {...props} />}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colors.smoke,
                    width: '100%',
                },
            }}
        >
            <RightDrawer.Screen name="Home" component={DrawerNavigator} />
            <RightDrawer.Screen name="My Account" component={EditDetails} />
        </RightDrawer.Navigator>
    );
};

export default DrawerNavigator;
export { RightDrawerScreen };
