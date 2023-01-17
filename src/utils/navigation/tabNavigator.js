import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

import { MainStackNavigator, ContactStackNavigator } from "./stackNavigation";
// import Home from "../../screens/home";
import Home from "../../screens/kitchenHome";
import Contact from "../../screens/contact";
import FoodCourt from "../../screens/foodCourt";
import Cart from "../../screens/cart";
import PopularFood from "../../screens/popularFood";

const screenOptionStyle = {
    headerShown: false,
    tabBarActiveTintColor: '#694fad',
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptionStyle}>
            <Tab.Screen name="Dashboard"
                // component={MainStackNavigator}
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    // tabBarIcon: ({ color, size }) => (
                    //     <Icon name="home-outline" color={color} size={size} />
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name="md-home"
                            size={size}
                            color={focused ? '#694fad' : '#ccc'}
                        />
                    ),
                }}
            />
            <Tab.Screen name="FoodCourt"
                // component={ContactStackNavigator}
                component={FoodCourt}
                options={{
                    tabBarLabel: 'Food Court',
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name="fast-food"
                            color={focused ? '#694fad' : '#ccc'}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Cart"
                // component={ContactStackNavigator}
                component={Cart}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ focused, size }) => (
                        <Icon
                            name="cart"
                            color={focused ? '#694fad' : '#ccc'}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;