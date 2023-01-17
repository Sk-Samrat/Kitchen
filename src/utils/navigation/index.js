/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
//import {useSelector} from 'react-redux';
import { View, ScrollView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {createDrawerNavigator} from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//     createBottomTabNavigator,
//     createMaterialTopTabNavigator,
// } from 'react-navigation-tabs';
import commonStyles, {
    primaryColor,
    secondaryColor,
    inactiveColor,
    drawerWidth,
} from './../../common/components/commonStyles';
import constants from '../../utils/constants';
import icons from '../../common/components/icons';
import {
    CustomText,
    TabImage,
    DrawerTile,
} from '../../common/components/customComponents';
//import {getData} from '../../common/components/helper';
import localKey from '../localStorage';

//-------------Common Screens-------------
import Header from '../../common/components/header';
import Login from '../../screens/login';
//import Logout from './../../common/components/logout';
import SignUp from '../../screens/signup';
//import ForgotPassword from '../../screens/forgotPassword';
//import OTP from '../../screens/otp';
//import ContactUs from '../../screens/contactUs';
//import ProfileOption from '../../screens/profileOption';
//import RegisteredAddress from '../../screens/registeredAddress';
//import ChangePassword from '../../screens/changePassword';
// import PendingOrders from '../../screens/pendingOrders';
// import ExecutedOrders from '../../screens/executedOrders';
// import CancelledOrders from '../../screens/cancelledOrders';
// import OrderDetails from '../../screens/orderDetails';
// import EditProfile from '../../screens/editProfile';
// import Leager_Home from '../../screens/ledgerHome';
// import Ledger_Details from '../../screens/ledgerDetails';
// import Confirm_Order from './../../screens/Buyer/confirmOrder.Buyer';
import ProfileWithAddress from '../../screens/profileWithAddress';
// import Referral from '../../screens/referral';
// import PrivacyPolicy from '../../screens/privacyPolicy';
// import AboutUs from '../../screens/aboutUs';
// import NewRole from '../../screens/newRole';
// import Notification from '../../screens/notifications';
// import TnC from '../../screens/tnc';
import Home from '../../screens/home';
import Contact from '../../screens/contact';
import colors from '../../common/components/colors';
import { MainStackNavigator, ContactStackNavigator } from "./stackNavigation";

const HomeStack = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  // profileOption: {
  //   screen: ProfileOption,
  // },
  // editProfile: {
  //   screen: EditProfile,
  // },
  // regAddress: {
  //   screen: RegisteredAddress,
  // },
  // newRole: {
  //   screen: NewRole,
  //   navigationOptions: ({navigation}) => ({
  //     header: () => (
  //       <Header
  //         isBack
  //         firstLabel={constants.DRAWER_NEW_ROLE}
  //         navigation={navigation}
  //       />
  //     ),
  //   }),
  // },
  // deliveryAddresses_Buyer: {
  //   screen: DeliveryAddresses_Buyer,
  // },
  // addAddress_Buyer: {
  //   screen: AddAddress_Buyer,
  // },
  // ChangePassword: {
  //   screen: ChangePassword,
  //   navigationOptions: ({navigation}) => ({
  //     header: () => (
  //       <Header
  //         isBack
  //         firstLabel={constants.CHANGE_PASSWORD}
  //         navigation={navigation}
  //       />
  //     ),
  //   }),
  // },
  // selectSeller: SelectSeller_Buyer,
  // Notification: {
  //   screen: Notification,
  //   navigationOptions: ({navigation}) => ({
  //     header: () => (
  //       <Header
  //         isBack
  //         firstLabel={constants.HEAD_NOTIFICATION}
  //         navigation={navigation}
  //       />
  //     ),
  //   }),
  // },
  // searchProduct: {
  //   screen: SearchProduct_Buyer,
  //   navigationOptions: ({navigation}) => ({
  //     header: () => (
  //       <Header
  //         isDrawer
  //         isLanguage
  //         firstLabel={constants.HEAD_SEARCH_PRODUCT}
  //         navigation={navigation}
  //       />
  //     ),
  //   }),
  // },
});

// const _renderDrawerBuyer = (user, navigation) => {
//   // updatedProduct = useSelector(state => state.productReducer.cart);
//   return (
//     <ScrollView
//       contentContainerStyle={{
//         flex: 1,
//         backgroundColor: secondaryColor,
//       }}>
//       <LinearGradient
//         style={commonStyles.profileInfoContainer}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         colors={['#7d2657', '#3b5998']}>
//         <View style={{flex: 1, paddingStart: dynamicSize(10)}}>
//           <CustomText isItalic style={commonStyles.navName}>
//             {user.userName}
//           </CustomText>
//           <CustomText isItalic style={commonStyles.navName}>
//             {user.userId}
//           </CustomText>
//         </View>
//       </LinearGradient>
//       <DrawerTile
//         source={icons.activeHome}
//         title={constants.DRAWER_HOME}
//         onPress={() => {
//           navigation.closeDrawer(), navigation.navigate('auth');
//         }}
//       />
//       <DrawerTile
//         source={icons.myOrderIcon}
//         title={constants.HEAD_ORDERS}
//         onPress={() => {
//           // navigation.navigate('MyOredrStack'), navigation.closeDrawer();
//         }}
//       />
//       <DrawerTile
//         source={icons.ledger}
//         title={constants.HEAD_LEDGER}
//         onPress={() => {
//           // navigation.navigate('ledger'), navigation.closeDrawer();
//         }}
//       />
//       <DrawerTile
//         source={icons.share}
//         title={constants.DRAWER_SHARE}
//         onPress={() => {
//           // navigation.navigate('referral'), navigation.closeDrawer();
//         }}
//       />
//       <DrawerTile
//         source={icons.contactUS}
//         title={constants.HEAD_CONTACT_US}
//         onPress={() => {
//           // navigation.navigate('contactUs'), navigation.closeDrawer();
//         }}
//       />
//       <DrawerTile
//         source={icons.aboutUs}
//         title={constants.DRAWER_ABOUT}
//         onPress={() => {
//           // navigation.navigate('aboutUs'), navigation.closeDrawer();
//         }}
//       />
//       <DrawerTile
//         source={icons.privacyPolicy}
//         title={constants.DRAWER_PRIVACY}
//         onPress={() => {
//           // navigation.navigate('privacyPolicy'), navigation.closeDrawer();
//         }}
//       />
//       <DrawerTile
//         source={icons.logout}
//         title={constants.DRAWER_LOG_OUT}
//         onPress={() => {
//           // navigation.navigate('logOut');
//         }}
//       />
//     </ScrollView>
//   );
// };

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Contact" component={Contact} />
//     </Tab.Navigator>
//   );
// };

// const bottomTabNavigator = createBottomTabNavigator(
//   {
//     homeTab: {
//       screen: HomeStack,
//       navigationOptions: {
//         tabBarIcon: ({focused}) => (
//           <TabImage
//             icon={icons.activeHome}
//             focused={focused}
//             styles={commonStyles.navCommonTabIcon}
//             deFocusColor={inactiveColor}
//           />
//         ),
//         tabBarLabel: constants.DRAWER_HOME,
//       },
//     },
//     // catOrderTab: {
//     //   screen: CategoryOrderStack,
//     //   navigationOptions: {
//     //     tabBarIcon: ({focused}) => (
//     //       <TabImage
//     //         icon={icons.catelogue}
//     //         focused={focused}
//     //         styles={commonStyles.navCommonTabIcon}
//     //         deFocusColor={inactiveColor}
//     //       />
//     //     ),
//     //     tabBarLabel: constants.CATALOG,
//     //   },
//     // },
//     // searchProductTab: {
//     //   screen: SearchProductStack,
//     //   navigationOptions: {
//     //     tabBarIcon: ({focused}) => (
//     //       <TabImage
//     //         icon={icons.searchIcon}
//     //         focused={focused}
//     //         styles={commonStyles.navCommonTabIcon}
//     //         deFocusColor={inactiveColor}
//     //       />
//     //     ),
//     //     tabBarLabel: constants.SEARCH,
//     //   },
//     // },
//     // myCartTab: {
//     //   screen: CartStack,
//     //   navigationOptions: {
//     //     tabBarIcon: ({focused}) => (
//     //       <TabImage
//     //         icon={icons.cart}
//     //         isCartFilled={updatedProduct && updatedProduct.length > 0}
//     //         focused={focused}
//     //         styles={commonStyles.navCommonTabIcon}
//     //         deFocusColor={inactiveColor}
//     //       />
//     //     ),
//     //     tabBarLabel: constants.HEAD_CART,
//     //   },
//     // },
// //   },
// //   {
// //     tabBarOptions: {
// //       activeTintColor: colors.black,
// //       inactiveTintColor: inactiveColor,
// //       showLabel: true,
// //       style: commonStyles.bottomShadow,
// //     },
//   },
// );

// const DrawerWithBotttomStack = createStackNavigator({
//   bottomTab: {
//     screen: bottomTabNavigator,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   // MyOredrStack: {
//   //   screen: MyOredrStack,
//   //   navigationOptions: {
//   //     headerShown: false,
//   //   },
//   // },
//   // ledger: {
//   //   screen: LedgerStack,
//   //   navigationOptions: {
//   //     headerShown: false,
//   //   },
//   // },
//   // referral: Referral,
//   // contactUs: {
//   //   screen: ContactUs,
//   //   navigationOptions: ({navigation}) => ({
//   //     header: () => (
//   //       <Header
//   //         firstLabel={constants.HEAD_CONTACT_US}
//   //         navigation={navigation}
//   //         isDrawer
//   //       />
//   //     ),
//   //   }),
//   // },
//   // logOut: {
//   //   screen: Logout,
//   //   navigationOptions: ({navigation}) => ({
//   //     headerShown: false,
//   //   }),
//   // },
//   // aboutUs: {
//   //   screen: AboutUs,
//   //   navigationOptions: ({navigation}) => ({
//   //     header: () => (
//   //       <Header
//   //         firstLabel={constants.DRAWER_ABOUT}
//   //         navigation={navigation}
//   //         isDrawer
//   //       />
//   //     ),
//   //   }),
//   // },
//   // privacyPolicy: {
//   //   screen: PrivacyPolicy,
//   //   navigationOptions: ({navigation}) => ({
//   //     header: () => (
//   //       <Header
//   //         firstLabel={constants.DRAWER_PRIVACY}
//   //         navigation={navigation}
//   //         isDrawer
//   //       />
//   //     ),
//   //   }),
//   // },
// });

// const drawerNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: DrawerWithBotttomStack,
//     },
//   },
//   {
//     unmountOnBlur: true,
//     drawerWidth: drawerWidth,
//     contentComponent: props => {
//       const {navigation} = props;
//       const [user, setUser] = useState({});
//       useEffect(() => {
//         const GetUser = async () => {
//           // const userId = await getData(localKey['USER_ID']);
//           // const userName = await getData(localKey['USER_NAME']);
//           // const seller = await getData(localKey.SELECTED_SELLER);
//           const userId = '8972305461';
//           const userName = 'Samrat';
//           setUser({
//             userId: userId,
//             userName: userName,
//             // seller: seller && seller !== '' ? JSON.parse(seller) : null,
//           });
//         };
//         GetUser();
//       }, []);
//       return _renderDrawerBuyer(user, navigation);
//     },
//   },
// );

const Authenticate = createStackNavigator({
    login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        },
    },
    signup: {
        screen: SignUp,
        navigationOptions: ({ navigation }) => ({
            //headerShown: false,
            header: () => (
                <Header firstLabel={constants.HEAD_SIGN_UP} navigation={navigation} />
            ),
        }),
    },
    // forgot: {
    //   screen: ForgotPassword,
    //   navigationOptions: ({navigation}) => ({
    //     header: () => (
    //       <Header
    //         isBack
    //         firstLabel={constants.HEAD_FORGOT_PASSWORD}
    //         navigation={navigation}
    //       />
    //     ),
    //   }),
    // },
    // otp: {
    //   screen: OTP,
    //   navigationOptions: ({navigation}) => ({
    //     header: (
    //       <Header
    //         isBack
    //         firstLabel={constants.HEAD_OTP}
    //         navigation={navigation}
    //       />
    //     ),
    //   }),
    // },
    // resetPassword: {
    //   screen: ChangePassword,
    //   navigationOptions: ({navigation}) => ({
    //     header: (
    //       <Header
    //         isBack
    //         firstLabel={constants.HEAD_RESET_PASSWORD}
    //         navigation={navigation}
    //       />
    //     ),
    //   }),
    // },
    // contactUs: {
    //   screen: ContactUs,
    //   navigationOptions: ({navigation}) => ({
    //     header: () => (
    //       <Header
    //         firstLabel={constants.HEAD_CONTACT_US}
    //         navigation={navigation}
    //         isBack
    //       />
    //     ),
    //   }),
    // },
    // tnc: {
    //   screen: TnC,
    //   navigationOptions: ({navigation}) => ({
    //     header: () => (
    //       <Header
    //         firstLabel={constants.TERMS_AND_CONDITIONS}
    //         navigation={navigation}
    //         isBack
    //       />
    //     ),
    //   }),
    // },
});
const EditDetails = createStackNavigator({
  editProfile: {
    screen: ProfileWithAddress,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <Header
          firstLabel={constants.HEAD_PROFILE_UPDATE}
          navigation={navigation}
          isLogout
        />
      ),
    }),
  },
//   logOut: {
//     screen: Logout,
//     navigationOptions: ({navigation}) => ({
//       headerShown: false,
//     }),
//   },
});

// const CheckToken = ({navigation}) => {
//   useEffect(() => {
//     const fetchToken = async () => {
//       const token = await getData(localKey['LOGIN_TOKEN']);
//       const user = await getData(localKey.USER_NAME);
//       let _roleId = await getData(localKey.ROLE_ID);
//       _roleId = parseInt(_roleId);
//       const reg_Add = await getData(localKey.REG_ADD);
//       if (user && reg_Add && reg_Add !== '' && token) {
//         if (_roleId && _roleId === 1) navigation.navigate('drawer');
//         else navigation.navigate('drawerS');
//       } else if (token & user || token) navigation.navigate('editDetails');
//       else navigation.navigate('auth');
//     };
//     fetchToken();
//   }, []);
//   return <View />;
// };

const Routes = createSwitchNavigator({
    //checkToken: CheckToken,
    auth: Authenticate,
    // drawer: drawerNavigator,
    drawer: HomeStack,
    // drawerS: drawerNavigatorSeller,
    editDetails: EditDetails,
});
export default (RouteContainer = createAppContainer(Routes));
