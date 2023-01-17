// import moment from 'moment';
import Toast from 'react-native-tiny-toast';
// import Toast from 'react-native-simple-toast';
import colors from './colors';
import {Platform, PermissionsAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import AsyncStorage from '@react-native-community/async-storage';
import constants from '../../utils/constants';
import localKey from '../../utils/localStorage';

// export const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(`${key}`, value);
//   } catch (e) {
//     console.log(e);
//     ShowErrorToast(constants.ERROR.GEN);
//   }
// };

// export const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(`${key}`);
//     if (value !== null) {
//       return value;
//     }
//   } catch (e) {
//     ShowErrorToast(constants.ERROR.GEN);
//   }
// };

// export const removeData = async key => {
//   try {
//     await AsyncStorage.removeItem(`${key}`);
//   } catch (e) {
//     ShowErrorToast(constants.ERROR.GEN);
//   }
// };

// export const multiRemoveData = async () => {
//   const keys = [localKey.USER_ID];
//   try {
//     await AsyncStorage.multiRemove(keys);
//   } catch (e) {
//     ShowErrorToast(constants.ERROR.GEN);
//   }
// };

// export const clearAllData = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (e) {
//     ShowErrorToast(constants.ERROR.GEN);
//   }
// };

// export const getDateTime = (type, format = 'YYYY-MM-DD') => {
//   if (type === 'date') return moment().format(format);
//   else return moment().format('HH:mm');
// };

// export const formatedDateTime = (dateTime, type, format = 'YYYY-MM-DD') => {
//   if (type === 'date') return moment(dateTime).format(format);
//   else if (type === 'time') return moment(dateTime).format('HH:mm');
// };
// export const getCappingDaysOfMonth = (month, format = 'DD-MM-YYYY') => {
//   const startDate = moment([moment().year(), month - 1]);
//   const endDate = moment(startDate).endOf('month');
//   return {startDate: startDate.format(format), endDate: endDate.format(format)};
// };

export const ShowToast = msg => {
  return Toast.show(`${msg}`, {
    //position: height / 8,
    containerStyle: {backgroundColor: colors['green']},
    textStyle: {color: colors['white']},
  });
};

export const NormalToast = msg => {
  return Toast.show(msg);
};

export const ShowErrorToast = msg => {
  return Toast.show(`${msg}`, {
    //position: height / 8,
    containerStyle: {backgroundColor: colors['red']},
    textStyle: {color: colors['white']},
  });
};

// export const LocationPermission = async () => {
//   if (
//     Platform.OS === 'ios' ||
//     (Platform.OS === 'android' && Platform.Version < 23)
//   ) {
//     return true;
//   }

//   const hasPermission = await PermissionsAndroid.check(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   );

//   if (hasPermission) return true;

//   const status = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   );

//   if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

//   if (status === PermissionsAndroid.RESULTS.DENIED) {
//     ShowErrorToast(constants.WARNING.LOCATION_PERMISSION_DENIED);
//   } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//     ShowErrorToast(constants.WARNING.LOCATION_PERMISSION_REVOKED);
//   }

//   return false;
// };

// export const setLoginLocalKeys = async response => {
//   try {
//     storeData(localKey.LOGIN_TOKEN, 'true');
//     storeData(localKey.ROLE_ID, response.roleID.toString());
//     storeData(localKey.USER_ID, response.phoneNumber.toString());
//     storeData(localKey.EMAIL, response.email ? response.email.toString() : '');
//     const allCountries = JSON.parse(await getData(localKey.ALL_COUNTRIES));
//     const allLanguages = JSON.parse(await getData(localKey.ALL_LANGUAGES));
//     try {
//       storeData(
//         localKey.USER_COUNTRY,
//         JSON.stringify(
//           allCountries.find(e => e.value * 1 === response.countryID * 1),
//         ),
//       );
//     } catch (err) {
//       storeData(
//         localKey.USER_COUNTRY,
//         JSON.stringify(allCountries.find(e => e.value * 1 === 91)),
//       );
//     }
//     if (response && response.firstName) {
//       try {
//         storeData(
//           localKey.USER_LANGUAGE,
//           JSON.stringify(
//             allLanguages.find(e => e.value * 1 === response.languageID * 1),
//           ),
//         );
//       } catch (err) {
//         storeData(localKey.USER_LANGUAGE, JSON.stringify({}));
//       }
//       storeData(
//         localKey.USER_NAME,
//         response.firstName.concat(' ').concat(response.lastName),
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const CheckConnectivity = async () => {
  let _conStatus = false;
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.log(error);
    return _conStatus;
  }
};
