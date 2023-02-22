import React, { useEffect } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from "react-redux";

import Home from "../../screens/home";
import Contact from "../../screens/contact";
import Login from "../../screens/login";
import SignUp from "../../screens/signup";
import ProfileWithAddress from '../../screens/profileWithAddress';
import BottomTabNavigator from "./tabNavigator";
import DrawerNavigator from "./drawerNavigator";
import { RightDrawerScreen } from "./drawerNavigator";
import FoodItem from "../../screens/foodItem";
import FoodItemDetails from "../../screens/foodItemDetails";
import Offer from "../../screens/offer";
import Cart from "../../screens/shoppingCart";
import PopularFood from "../../screens/popularFood";
import GetStarted from "../../screens/getStarted";
import SignIn from "../../screens/signIn";
import OtpDetails from "../../screens/otpDetails";
import CreateProfile from "../../screens/createProfile";
import ForgetPassword from "../../screens/forgetPassword";
import ChangePassword from "../../screens/changePassword";
import EditDetails from "../../screens/editDetails";
import Favourites from "../../screens/favourites";
import MyOrders from "../../screens/myOrders";
import OrderDetails from "../../screens/orderDetails";

import { dummyFoodItemData } from "../../../data/data";
import { addMyProducts } from "../../../reducers/MyProductSlice";
import { dummyData } from "../../../data/data";
import { addMyOffer } from "../../../reducers/myOfferSlice";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

// const screenOptionStyle = {
//   headerStyle: "none",
//   headerTintColor: "white",
//   headerBackTitle: "Back",
// };

const screenOptionStyle = {
  headerShown: false
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {/* // <Stack.Navigator> */}
      <Stack.Screen name="LetsGetStated" component={GetStarted} />
      {/* <Stack.Screen name="LogintoApp" component={EditStackNavigator} /> */}
      <Stack.Screen name="SignInSignUp" component={SignUpStackNavigator} />
      <Stack.Screen name="OTPScreen" component={OtpDetails} />
      <Stack.Screen name="Profile" component={CreateProfile} />
      <Stack.Screen name="ForgetPasswordScreen" component={ForgetPassword} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePassword} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}

const MyOrdersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Orders" component={MyOrders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
}

const EditStackNavigator = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dummyFoodItemData.map(item => {
  //     dispatch(addMyProducts(item))
  //   })
  //   dummyData.map(item => {
  //     dispatch(addMyOffer(item))
  //   })
  // }, [])
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpStackNavigator} />
      <Stack.Screen name="EditDetails" component={ProfileWithAddress} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="FoodItem" component={FoodItem} />
      <Stack.Screen name="FoodItemDetails" component={FoodItemDetails} />
      <Stack.Screen name="OfferItem" component={Offer} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="PopularFood" component={PopularFood} />
    </Stack.Navigator>
  );
}

const SignUpStackNavigator = () => {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dummyFoodItemData.map(item => {
  //     dispatch(addMyProducts(item))
  //   })
  //   dummyData.map(item => {
  //     dispatch(addMyOffer(item))
  //   })
  // }, [])
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SignUp" component={SignIn} />
      <Stack.Screen name="Home" component={RightDrawerScreen} />
      <Stack.Screen name="EditProfile" component={EditDetails} />
      <Stack.Screen name="FavouriteItems" component={Favourites} />
      <Stack.Screen name="FoodItem" component={FoodItem} />
      <Stack.Screen name="FoodItemDetails" component={FoodItemDetails} />
      <Stack.Screen name="OfferItem" component={Offer} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="PopularFood" component={PopularFood} />
    </Stack.Navigator>
  );
}

// export { MainStackNavigator, ContactStackNavigator };
export { MainStackNavigator, EditStackNavigator, SignUpStackNavigator, ContactStackNavigator, MyOrdersStackNavigator };