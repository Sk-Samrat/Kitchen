import React, { useState, useEffect, useRef } from 'react';
// import {errorLogout} from '../common/components/logout';
import { View, Keyboard, FlatList } from 'react-native';
import constants from '../utils/constants';
// import Geolocation from 'react-native-geolocation-service';
import icons from '../common/components/icons';
// import {apiKeys} from '../services/serviceConstants';
import commonStyles from '../common/components/commonStyles';
// import {
//   EditProfileWithAddressAction,
//   getAddress,
//   userLog,
//   PincodeCheck,
//   getProductCategories,
// } from '../common/action/actions';
import localKey from '../utils/localStorage';
import {
  CustomText,
  CustomDropDown,
  Button,
  Loader,
  CommonViewNoPadding,
  Input,
  ImageWithLabel,
  CollapsableHeader,
  CommonView,
} from '../common/components/customComponents';
import { CustomAlert } from '../common/components/customAlert';
import {
  validateName,
  validateEmail,
  validatePinCode,
  validateAddress,
  validateAge,
  requireField,
  validateDistance,
} from '../common/components/validation';
// import {
//   getData,
//   ShowToast,
//   ShowErrorToast,
//   LocationPermission,
//   storeData,
// } from '../common/components/helper';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import {StyleSheet, Dimensions} from 'react-native';
import {dynamicSize, getFontSize} from '../common/components/responsive';
// import colors from '../components/colors';
// import colors from '../common/components/colors';
const {height, width} = Dimensions.get('window');
const MODULE_NAME = 'ProfileWithAddress';

const ProfileWithAddress = ({ navigation }) => {
  const fnameRef = useRef('fname');
  const lnameRef = useRef('lname');
  const emailRef = useRef('email');
  const ageRef = useRef('age');
  const addLine1Ref = useRef('addressLine1');
  const addLine2Ref = useRef('addressLine2');
  const cityRef = useRef('city');
  const pinRef = useRef('pin');
  const stateRef = useRef('state');
  const countryRef = useRef('country');
  const shopNameRef = useRef('shopName');
  const promocodeRef = useRef('promoCode');
  const distanceRef = useRef('distance');
  const heightRef = useRef('height');
  const weightRef = useRef('weight');
  const [userID, setUserId] = useState('');
  const [roleID, setRole] = useState('1');
  const [emailID, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [selectedCountry, setCountry] = useState({});
  const [helpInDelivery, setDeliveryHelp] = useState(false);
  const [useMyLocation, setUseLocationStatus] = useState(false);
  const [coordinate, setLocation] = useState({ lat: 0, long: 0 });
  const [isPIICollapsed, setPIICollapsed] = useState(false);
  const [isCatCollapsed, setCatCollapsed] = useState(true);
  const [isBCollapsed, setBCollapsed] = useState(true);
  const [isAddCollapsed, setAddCollapsed] = useState(true);
  const [allCategories, setCategories] = useState([]);
  const [warning, setWarning] = useState({ text: '', isWarning: false });

  const [error, setError] = useState({
    firstName: '',
    emailId: '',
    age: '',
    addressLine1: '',
    city: '',
    pin: '',
    state: '',
    country: '',
    shopName: '',
    distance: '',
    firstNameStatus: false,
    emailIdStatus: true,
    ageStatus: true,
    addressLine1Status: false,
    cityStatus: false,
    pinStatus: false,
    countryStatus: true,
    stateStatus: true,
    shopNameStatus: true,
    distanceStatus: true,
  });
  const [textField, setText] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    emailId: '',
    height: '',
    weight: '',
    age: '',
    habbit: '',
    gender: 'M',
    language: -1,
    addressLine1: '',
    addressLine2: '',
    city: '',
    pin: '',
    state: '',
    country: '',
    shopName: '',
    promoCode: '',
    distance: '',
  });

  const [selected, setSelected] = useState("");

  // useEffect(() => {
    // const fetchDetails = async () => {
    //   try {
    //     const _userId = await getData(localKey.USER_ID);
    //     const _roleId = await getData(localKey.ROLE_ID);
    //     const _email = await getData(localKey.EMAIL);
    //     const langs = await getData(localKey.ALL_LANGUAGES);
    //     setLanguages(
    //       langs ? (JSON.parse(langs)?.length > 0 ? JSON.parse(langs) : []) : [],
    //     );
    //     let country = await getData(localKey.USER_COUNTRY);
    //     country = country ? JSON.parse(country) : {};
    //     setCountry(country);
    //     setRole(parseInt(_roleId));
    //     setUserId(parseInt(_userId));
    //     setEmail(_email && _email !== 'null' ? _email : '');
    //   } catch (error) {
    //     await userLog(error.toString(), MODULE_NAME, 'user/getroles');
    //     errorLogout(navigation);
    //   }
    // };
    // fetchDetails();
    // fetchCategories();
  // }, []);
  // const fetchCategories = async () => {
  //   try {
  //     const _userId = await getData(localKey.USER_ID);
  //     const _roleId = await getData(localKey.ROLE_ID);
  //     let _countryCode = await getData(localKey.USER_COUNTRY);
  //     _countryCode = _countryCode ? JSON.parse(_countryCode).value : 0;
  //     let param = {
  //       [apiKeys.GET_CATEGORY_PARAMS.USER_ID]: parseInt(_userId),
  //       [apiKeys.GET_CATEGORY_PARAMS.LANGUAGE_ID]: -1,
  //       [apiKeys.GET_CATEGORY_PARAMS.COUNTRY_ID]: _countryCode,
  //       [apiKeys.GET_CATEGORY_PARAMS.SELLER_MOBILE]: parseInt(_userId),
  //     };
  //     if (parseInt(_roleId) === 2) {
  //       const response = await getProductCategories(param);
  //       if (
  //         response.status &&
  //         response.data &&
  //         response.data.results &&
  //         response.data.results.length > 0
  //       ) {
  //         setCategories(response.data.results);
  //         setLoader(false);
  //       } else {
  //         setLoader(false);
  //       }
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     await userLog(error.toString(), MODULE_NAME, 'itemlist/getcategory');
  //     errorLogout(navigation);
  //   }
  // };
  // const accessPermission = async () => {
  //   const hasLocationPermission = await LocationPermission();
  //   if (hasLocationPermission)
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         const {latitude, longitude} = position['coords'];
  //         setLocation({lat: latitude, long: longitude});
  //       },
  //       error => {
  //         ShowErrorToast(constants.CANT_FETCH_YOUR_LOCATION);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   else ShowErrorToast(constants.CANT_FETCH_YOUR_LOCATION);
  // };
  const _focusToNext = type => () => {
    if (type === 'fname') lnameRef.current.focus();
    else if (type === 'lname') ageRef.current.focus();
    else if (type === 'email') ageRef.current.focus();
    else if (type === 'age')
      roleID === '1' ? heightRef.current.focus() : addLine1Ref.current.focus();
    else if (type === 'height') roleID === 1 && weightRef.current.focus();
    else if (type === 'weight') addLine1Ref.current.focus();
    else if (type === 'addressLine1') addLine2Ref.current.focus();
    else if (type === 'addressLine2') cityRef.current.focus();
    else if (type === 'city')
      pinRef.current
        ? pinRef.current.focus()
        : roleID === '2'
          ? shopNameRef.current.focus()
          : Keyboard.dismiss();
    else if (type === 'pin')
      roleID === 2 ? shopNameRef.current.focus() : Keyboard.dismiss();
    else if (type === 'shopName') distanceRef.current.focus();
    else if (type === 'distance') Keyboard.dismiss();
  };
  const _onChange = type => async text => {
    if (type === 'fname') {
      setText({ ...textField, firstName: text });
      const _validateFirstName = validateName(text);
      if (_validateFirstName['status'])
        setError({ ...error, firstName: '', firstNameStatus: true });
      else
        setError({
          ...error,
          firstName: _validateFirstName['error'],
          firstNameStatus: false,
        });
    } else if (type === 'lname') {
      setText({ ...textField, lastName: text });
    } else if (type === 'age') {
      const _validateAge = validateAge(text);
      if (_validateAge['status'] || text.trim() === '')
        setError({ ...error, age: '', ageStatus: true });
      else
        setError({
          ...error,
          age: _validateAge['error'],
          ageStatus: false,
        });
      setText({
        ...textField,
        age: text
          .replace('.', '')
          .replace('-', '')
          .replace(',', ''),
      });
    } else if (type === 'email') {
      setText({ ...textField, emailId: text });
      const _validateEmail = validateEmail(text);
      if (_validateEmail['status'] || text.trim() === '')
        setError({ ...error, emailId: '', emailIdStatus: true });
      else
        setError({
          ...error,
          emailId: _validateEmail['error'],
          emailIdStatus: false,
        });
    } else if (type === 'height') {
      setText({ ...textField, height: text });
    } else if (type === 'weight') {
      setText({ ...textField, weight: text });
    } else if (type === 'addressLine1') {
      setText({ ...textField, addressLine1: text });
      const _validateAddressLine1 = validateAddress(text);
      if (_validateAddressLine1.status)
        setError({ ...error, addressLine1: '', addressLine1Status: true });
      else
        setError({
          ...error,
          addressLine1: _validateAddressLine1.error,
          addressLine1Status: false,
        });
    } else if (type === 'addressLine2') {
      setText({ ...textField, addressLine2: text });
    } else if (type === 'city') {
      setText({ ...textField, city: text });
      const _validatecity = requireField(text);
      if (_validatecity.status)
        setError({ ...error, city: '', cityStatus: true });
      else
        setError({
          ...error,
          city: _validatecity.error,
          cityStatus: false,
        });
    } else if (type === 'state') {
      setText({ ...textField, state: text });
      const _validateState = true; //requireField(text);
      if (_validateState.status)
        setError({ ...error, state: '', stateStatus: true });
      else
        setError({
          ...error,
          state: _validateState.error,
          stateStatus: false,
        });
    } else if (type === 'country') {
      setText({ ...textField, country: text });
      const _validateCountry = true; //requireField(text);
      if (_validateCountry.status)
        setError({ ...error, country: '', countryStatus: true });
      else
        setError({
          ...error,
          country: _validateCountry.error,
          countryStatus: false,
        });
    } else if (type === 'shopName') {
      setText({ ...textField, shopName: text });
      const _validateShopName = requireField(text);
      if (_validateShopName.status)
        setError({ ...error, shopName: '', shopNameStatus: true });
      else
        setError({
          ...error,
          shopName: _validateShopName.error,
          shopNameStatus: false,
        });
    } else if (type === 'pin') {
      setText({ ...textField, pin: text });
      const _validatePin = validatePinCode(text);
      if (_validatePin.status) {
        try {
          // const param = {
          //   [apiKeys.VALIDATE_PIN_PARAMS.USER_ID]: userID,
          //   [apiKeys.VALIDATE_PIN_PARAMS.ROLE_ID]: roleID,
          //   [apiKeys.VALIDATE_PIN_PARAMS.PIN]: parseInt(text),
          //   [apiKeys.VALIDATE_PIN_PARAMS.COUNTRY_ID]: parseInt(
          //     selectedCountry.value,
          //   ),
          // };
          setLoader(true);
          // const pinResp = await PincodeCheck(param);
          // if (!pinResp.status) {
          //   setError({
          //     ...error,
          //     pin: constants.INVALID_PIN,
          //     pinStatus: false,
          //   });
          //   ShowErrorToast(constants.INVALID_PIN);
          //   setLoader(false);
          // } else {
            setError({ ...error, pin: '', pinStatus: true });
            setLoader(false);
          // }
        } catch (error) {
          // await userLog(error.toString(), MODULE_NAME, 'user/validatePin');
        }
      }
    } else if (type === 'promoCode') {
      setText({ ...textField, promoCode: text });
    } else if (type === 'distance') {
      const _validateDistance = validateDistance(text);
      if (_validateDistance['status'] || text.trim() === '')
        setError({ ...error, distance: '', distanceStatus: true });
      else
        setError({
          ...error,
          distance: _validateDistance['error'],
          distanceStatus: false,
        });
      setText({
        ...textField,
        distance: text
          .replace('.', '')
          .replace('-', '')
          .replace(',', ''),
      });
    }
  };
  // const _onChangeDropDown = type => (value, index, data) => {
  //   if (type === 'gender') {
  //     setText({ ...textField, gender: value });
  //   } else if (type === 'age') {
  //     setText({ ...textField, age: value });
  //   } else if (type === 'habbit') {
  //     setText({ ...textField, habbit: value });
  //   } else if (type === 'language') {
  //     setText({ ...textField, language: value });
  //   }
  // };
  // const _toggleRadio = () => {
  //   !helpInDelivery
  //     ? setError({
  //       ...error,
  //       distanceStatus: false,
  //       distance: constants.WARNING.DISTANCE_INV,
  //     })
  //     : setError({
  //       ...error,
  //       distanceStatus: true,
  //       distance: '',
  //     });
  //   setDeliveryHelp(helpInDelivery ? false : true);
  // };
  // const _toggleLocation = () => {
  //   if (!useMyLocation) {
  //     setText({ ...textField, pin: '' });
  //     setError({ ...error, pin: '', pinStatus: true });
  //     accessPermission();
  //   } else {
  //     setError({
  //       ...error,
  //       pin: constants.INVALID_PIN,
  //       pinStatus: false,
  //     });
  //     setText({ ...textField, pin: '' });
  //     setLocation({ lat: 0, long: 0 });
  //   }
  //   setUseLocationStatus(useMyLocation ? false : true);
  // };
  const _validate = () => {
    error.firstNameStatus
      ? error.emailIdStatus
        ? error.ageStatus
          ? error.distanceStatus
            ? _validate_v2()
            : setError({
              ...error,
              distance: constants.WARNING.DISTANCE_INV,
              distanceStatus: false,
            })
          : setError({
            ...error,
            age: constants.WARNING.AGE_INV,
            ageStatus: false,
          })
        : setError({
          ...error,
          emailId: constants.WARNING.EMAIL_INV,
          emailIdStatus: false,
        })
      : setError({
        ...error,
        firstName: constants.WARNING.NAME_INV,
        firstNameStatus: false,
      });
  };
  const _validate_v2 = () => {
    error.addressLine1Status
      ? error.cityStatus
        // ? error.pinStatus
          ? error.countryStatus
            ? error.stateStatus
              ? roleID === '2'
                ? error.shopNameStatus && textField.shopName.trim() !== ''
                  ? _onSave()
                  : setError({
                    ...error,
                    shopName: constants.WARNING.SHOP_NAME_INV,
                    shopNameStatus: false,
                  })
                : _onSave()
              : setError({
                ...error,
                state: constants.WARNING.STATE_INV,
                stateStatus: false,
              })
            : setError({
              ...error,
              country: constants.WARNING.COUNTRY_INV,
              countryStatus: false,
            })
          // : setError({
          //   ...error,
          //   pin: constants.WARNING.PINCODE_INV_1,
          //   pinStatus: false,
          // })
        : setError({
          ...error,
          city: constants.WARNING.CITY,
          cityStatus: false,
        })
      : setError({
        ...error,
        addressLine1: constants.WARNING.ADDRESS_INV,
        addressLine1Status: false,
      });
  };
  // const _onSave = async () => {
  //   alert('onSave');
    // try {
    //   let _cat = [];
    //   allCategories.forEach(e => {
    //     if (e.isUserCategory === 1) {
    //       _cat.push(e.categoryID);
    //     }
    //   });
    //   if (roleID === 2 && _cat.length < 1) {
    //     setWarning({text: constants.WARNING.CATEGORY, isWarning: true});
    //     return;
    //   }
    //   setLoader(true);
    //   let param = {
    //     [apiKeys.COMPLET_REG_PARAMS.USER_ID]: userID,
    //     [apiKeys.COMPLET_REG_PARAMS.ON_BOARDED_BY]: userID,
    //     [apiKeys.COMPLET_REG_PARAMS.ROLE_ID]: roleID,
    //     [apiKeys.COMPLET_REG_PARAMS.FIRST_NAME]: textField.firstName,
    //     [apiKeys.COMPLET_REG_PARAMS.LAST_NAME]: textField.lastName,
    //     [apiKeys.COMPLET_REG_PARAMS.GENDER]: textField.gender,
    //     [apiKeys.COMPLET_REG_PARAMS.EMAIL]: emailID,
    //     [apiKeys.COMPLET_REG_PARAMS.FOOD_HABBIT]: textField.habbit,
    //     [apiKeys.COMPLET_REG_PARAMS.HEIGHT]:
    //       textField.height && textField.height !== ''
    //         ? parseInt(textField.height)
    //         : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.WEIGHT]:
    //       textField.weight && textField.weight !== ''
    //         ? parseInt(textField.weight)
    //         : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.AGE]:
    //       textField.age && textField.age !== '' ? parseInt(textField.age) : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.DO_DELIVERY]:
    //       roleID === 2 ? (helpInDelivery ? 1 : 0) : 2,
    //     [apiKeys.COMPLET_REG_PARAMS.SHOP_NAME]: textField.shopName,
    //     [apiKeys.COMPLET_REG_PARAMS.LANGUAGE_ID]: parseInt(textField.language),
    //     //[apiKeys.COMPLET_REG_PARAMS.PROMOCODE]: textField.promoCode,
    //     [apiKeys.COMPLET_REG_PARAMS.ADDRESS_ONE]: textField.addressLine1,
    //     [apiKeys.COMPLET_REG_PARAMS.ADDRESS_TWO]: textField.addressLine2,
    //     [apiKeys.COMPLET_REG_PARAMS.CITY]: textField.city,
    //     [apiKeys.COMPLET_REG_PARAMS.STATE]: textField.state,
    //     [apiKeys.COMPLET_REG_PARAMS.PIN]:
    //       coordinate.lat > 0 ? null : parseInt(textField.pin),
    //     [apiKeys.COMPLET_REG_PARAMS.COUNTRY_ID]: selectedCountry.value * 1,
    //     [apiKeys.COMPLET_REG_PARAMS.LAT]: coordinate.lat,
    //     [apiKeys.COMPLET_REG_PARAMS.LONG]: coordinate.long,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_DELIVERY_ADDRESS]: roleID === 2 ? 2 : 1,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_DEFAULT_ADDRESS]: roleID === 2 ? 2 : 1,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_REG_ADDRESS]: 1,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_SHOP_ADDRESS]: roleID === 2 ? 1 : 2,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_SHOP_OPEN]: 1,
    //     [apiKeys.COMPLET_REG_PARAMS.DEL_DISTANCE]:
    //       roleID === 2 && helpInDelivery ? parseInt(textField.distance) : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.CATEGORIES]:
    //       roleID === 2 && _cat && _cat.length > 0 ? JSON.stringify(_cat) : null,
    //   };
    //   const response = await EditProfileWithAddressAction(param);
    //   if (response.status) {
    //     try {
    //       let param = {
    //         [apiKeys.GET_ADDRESS_PARAMS.USER_ID]: userID,
    //         [apiKeys.GET_ADDRESS_PARAMS.IS_DELIVERY_ADDRESS]:
    //           roleID === 2 ? 3 : 0,
    //       };
    //       const response = await getAddress(param);
    //       if (response.status) {
    //         if (response && response.data && response.data.length > 0) {
    //           storeData(localKey.REG_ADD, JSON.stringify(response.data[0]));
    //           storeData(
    //             localKey.USER_NAME,
    //             `${textField.firstName} ${textField.lastName}`,
    //           );
    //           try {
    //             storeData(
    //               localKey.USER_LANGUAGE,
    //               JSON.stringify(
    //                 languages.find(
    //                   e => e.value * 1 === parseInt(textField.language),
    //                 ),
    //               ),
    //             );
    //           } catch (err) {
    //             storeData(localKey.USER_LANGUAGE, JSON.stringify({}));
    //           }
    //           setLoader(false);
    //           ShowToast(constants.REG_SUCCESS);
    //           roleID === 2
    //             ? navigation.navigate('drawerS')
    //             : navigation.navigate('drawer');
    //         } else {
    //           setLoader(false);
    //           ShowErrorToast(constants.ERROR.GEN);
    //         }
    //       } else {
    //         setLoader(false);
    //         ShowErrorToast(constants.ERROR.GEN);
    //       }
    //       setLoader(false);
    //     } catch (error) {
    //       await userLog(
    //         error.toString(),
    //         MODULE_NAME,
    //         'useraddress/getaddress',
    //       );
    //       errorLogout(navigation);
    //     }
    //   } else {
    //     setLoader(false);
    //     ShowErrorToast(constants.ERROR.GEN);
    //   }
    // } catch (error) {
    //   await userLog(error.toString(), MODULE_NAME, 'user/addprofwithadd');
    //   errorLogout(navigation);
    // }
  // };
  const _onSave = async () => {
    alert('onSave');
    // try {
    //   let _cat = [];
    //   allCategories.forEach(e => {
    //     if (e.isUserCategory === 1) {
    //       _cat.push(e.categoryID);
    //     }
    //   });
    //   if (roleID === 2 && _cat.length < 1) {
    //     setWarning({text: constants.WARNING.CATEGORY, isWarning: true});
    //     return;
    //   }
      // setLoader(true);
    //   let param = {
    //     [apiKeys.COMPLET_REG_PARAMS.USER_ID]: userID,
    //     [apiKeys.COMPLET_REG_PARAMS.ON_BOARDED_BY]: userID,
    //     [apiKeys.COMPLET_REG_PARAMS.ROLE_ID]: roleID,
    //     [apiKeys.COMPLET_REG_PARAMS.FIRST_NAME]: textField.firstName,
    //     [apiKeys.COMPLET_REG_PARAMS.LAST_NAME]: textField.lastName,
    //     [apiKeys.COMPLET_REG_PARAMS.GENDER]: textField.gender,
    //     [apiKeys.COMPLET_REG_PARAMS.EMAIL]: emailID,
    //     [apiKeys.COMPLET_REG_PARAMS.FOOD_HABBIT]: textField.habbit,
    //     [apiKeys.COMPLET_REG_PARAMS.HEIGHT]:
    //       textField.height && textField.height !== ''
    //         ? parseInt(textField.height)
    //         : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.WEIGHT]:
    //       textField.weight && textField.weight !== ''
    //         ? parseInt(textField.weight)
    //         : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.AGE]:
    //       textField.age && textField.age !== '' ? parseInt(textField.age) : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.DO_DELIVERY]:
    //       roleID === 2 ? (helpInDelivery ? 1 : 0) : 2,
    //     [apiKeys.COMPLET_REG_PARAMS.SHOP_NAME]: textField.shopName,
    //     [apiKeys.COMPLET_REG_PARAMS.LANGUAGE_ID]: parseInt(textField.language),
    //     //[apiKeys.COMPLET_REG_PARAMS.PROMOCODE]: textField.promoCode,
    //     [apiKeys.COMPLET_REG_PARAMS.ADDRESS_ONE]: textField.addressLine1,
    //     [apiKeys.COMPLET_REG_PARAMS.ADDRESS_TWO]: textField.addressLine2,
    //     [apiKeys.COMPLET_REG_PARAMS.CITY]: textField.city,
    //     [apiKeys.COMPLET_REG_PARAMS.STATE]: textField.state,
    //     [apiKeys.COMPLET_REG_PARAMS.PIN]:
    //       coordinate.lat > 0 ? null : parseInt(textField.pin),
    //     [apiKeys.COMPLET_REG_PARAMS.COUNTRY_ID]: selectedCountry.value * 1,
    //     [apiKeys.COMPLET_REG_PARAMS.LAT]: coordinate.lat,
    //     [apiKeys.COMPLET_REG_PARAMS.LONG]: coordinate.long,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_DELIVERY_ADDRESS]: roleID === 2 ? 2 : 1,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_DEFAULT_ADDRESS]: roleID === 2 ? 2 : 1,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_REG_ADDRESS]: 1,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_SHOP_ADDRESS]: roleID === 2 ? 1 : 2,
    //     [apiKeys.COMPLET_REG_PARAMS.IS_SHOP_OPEN]: 1,
    //     [apiKeys.COMPLET_REG_PARAMS.DEL_DISTANCE]:
    //       roleID === 2 && helpInDelivery ? parseInt(textField.distance) : 0,
    //     [apiKeys.COMPLET_REG_PARAMS.CATEGORIES]:
    //       roleID === 2 && _cat && _cat.length > 0 ? JSON.stringify(_cat) : null,
    //   };
    //   const response = await EditProfileWithAddressAction(param);
    //   if (response.status) {
    //     try {
    //       let param = {
    //         [apiKeys.GET_ADDRESS_PARAMS.USER_ID]: userID,
    //         [apiKeys.GET_ADDRESS_PARAMS.IS_DELIVERY_ADDRESS]:
    //           roleID === 2 ? 3 : 0,
    //       };
    //       const response = await getAddress(param);
    //       if (response.status) {
    //         if (response && response.data && response.data.length > 0) {
    //           storeData(localKey.REG_ADD, JSON.stringify(response.data[0]));
    //           storeData(
    //             localKey.USER_NAME,
    //             `${textField.firstName} ${textField.lastName}`,
    //           );
    //           try {
    //             storeData(
    //               localKey.USER_LANGUAGE,
    //               JSON.stringify(
    //                 languages.find(
    //                   e => e.value * 1 === parseInt(textField.language),
    //                 ),
    //               ),
    //             );
    //           } catch (err) {
    //             storeData(localKey.USER_LANGUAGE, JSON.stringify({}));
    //           }
              // setLoader(false);
              alert('onSave before drawer');
              navigation.navigate('Home');
    //           ShowToast(constants.REG_SUCCESS);
    //           roleID === 2
    //             ? navigation.navigate('drawerS')
    //             : navigation.navigate('drawer');
    //         } else {
    //           setLoader(false);
    //           ShowErrorToast(constants.ERROR.GEN);
    //         }
    //       } else {
    //         setLoader(false);
    //         ShowErrorToast(constants.ERROR.GEN);
    //       }
    //       setLoader(false);
    //     } catch (error) {
    //       await userLog(
    //         error.toString(),
    //         MODULE_NAME,
    //         'useraddress/getaddress',
    //       );
    //       errorLogout(navigation);
    //     }
    //   } else {
    //     setLoader(false);
    //     ShowErrorToast(constants.ERROR.GEN);
    //   }
    // } catch (error) {
    //   await userLog(error.toString(), MODULE_NAME, 'user/addprofwithadd');
    //   errorLogout(navigation);
    // }
  };
  const _renderPersonal = () => {
    return (
      <React.Fragment>
        <View style={commonStyles.row}>
          <Input
            isRequired
            ref={fnameRef}
            value={textField.firstName}
            onSubmitEditing={_focusToNext('fname')}
            placeholder={constants.FIRST_NAME}
            onChangeText={_onChange('fname')}
            blurOnSubmit={false}
            errorMessage={error.firstName}
            twoElement
          />
          <Input
            ref={lnameRef}
            value={textField.lastName}
            onSubmitEditing={_focusToNext('lname')}
            placeholder={constants.LAST_NAME}
            onChangeText={_onChange('lname')}
            blurOnSubmit={false}
            errorMessage={error.lastName}
            twoElement
          />
        </View>
        <View style={commonStyles.row}>
          <Input
            value={userID.toString()}
            placeholder={constants.CONTACT_NUMBER}
            readonly
            twoElement
          />
          <Input
            ref={ageRef}
            value={textField.age}
            onSubmitEditing={_focusToNext('age')}
            placeholder={constants.AGE}
            onChangeText={_onChange('age')}
            blurOnSubmit={false}
            errorMessage={error.age}
            twoElement
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        {emailID ? (
          <Input value={emailID} placeholder={constants.EMAIL} readonly />
        ) : null}
        {/* <Input
          ref={promocodeRef}
          value={textField.promoCode}
          placeholder={constants.PROMOCODE}
          onChangeText={_onChange('promoCode')}
          blurOnSubmit={false}
        /> */}
        {roleID === '1' ? (
          <View style={commonStyles.row}>
            <Input
              ref={heightRef}
              onSubmitEditing={_focusToNext('height')}
              placeholder={constants.PLACEHOLDER_HEIGHT}
              keyboardType="number-pad"
              value={textField['height']}
              onChangeText={_onChange('height')}
              twoElement
            />
            <Input
              ref={weightRef}
              onSubmitEditing={_focusToNext('weight')}
              placeholder={constants.PLACEHOLDER_WEIGHT}
              value={textField['weight']}
              keyboardType="number-pad"
              onChangeText={_onChange('weight')}
              twoElement
            />
          </View>
        ) : null}
        {/* {roleID === '2' ? (
          <CustomDropDown
            data={constants.AVAILABLE_GENDERS}
            label="Gender"
            value={
              constants.AVAILABLE_GENDERS.find(
                e => e.value === textField.gender,
              )?.value
            }
            onChange={_onChangeDropDown('gender')}
          />
        ) : null} */}
        {/* {roleID === '1' ? (
          <View style={commonStyles.row}>
            <CustomDropDown
              data={constants.AVAILABLE_GENDERS}
              label="Gender"
              value={
                constants.AVAILABLE_GENDERS.find(
                  e => e.value === textField.gender,
                )?.value
              }
              onChange={_onChangeDropDown('gender')}
              twoElement
            />
            <CustomDropDown
              data={constants.AVAILABLE_MEALS}
              value={
                constants.AVAILABLE_MEALS.find(
                  e => e.value === textField.habbit,
                )?.value
              }
              onChange={_onChangeDropDown('habbit')}
              label={constants.PLACEHOLDER_FOOD}
              twoElement
            />
          </View>
        ) : null} */}
        {roleID === '1' ? (
          <View style={commonStyles.row}>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={constants.AVAILABLE_GENDERS}
              placeholder="Gender"
              // onSelect={() => alert(selected)}
              // label="Gender"
              // searchPlaceholder="search gender"
              boxStyles={{marginLeft:0, marginRight:25, width: width - dynamicSize(225)}}
              dropdownStyles={{width: width - dynamicSize(225)}}
              inputStyles={{fontWeight: 'bold', color: 'black'}}
            // value={
            //   constants.AVAILABLE_GENDERS.find(
            //     e => e.value === textField.gender,
            //   )?.value
            // }
            // onChange={_onChangeDropDown('gender')}
            // twoElement
            />
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={constants.AVAILABLE_MEALS}
              // value={
              //   constants.AVAILABLE_MEALS.find(
              //     e => e.value === textField.habbit,
              //   )?.value
              // }
              // onChange={_onChangeDropDown('habbit')}
              // label={constants.PLACEHOLDER_FOOD}
              boxStyles={{width: width - dynamicSize(225)}}
              dropdownStyles={{width: width - dynamicSize(225)}}
              inputStyles={{fontWeight: 'bold', color: 'black'}}
              placeholder={constants.PLACEHOLDER_FOOD}
            // twoElement
            />
          </View>
        ) : null}
        {/* {languages.length > 0 ? (
          <CustomDropDown
            data={languages}
            label={constants.PLACEHOLDER_LANG}
            value={
              languages.find(e => e.value * 1 === textField.language * 1)?.value
            }
            onChange={_onChangeDropDown('language')}
          />
        ) : null} */}
        {/* {languages.length > 0 ? ( */}
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={languages}
            placeholder={constants.PLACEHOLDER_LANG}
            boxStyles={{width: width - dynamicSize(50), marginBottom: 10, marginTop: 10}}
            dropdownStyles={{width: width - dynamicSize(50), marginBottom: 10, marginTop: 0}}
            // inputStyles={{fontWeight: 'bold', color: 'black'}}
            // search={false}
            // placeholderTextColor={{color: '#C7C7CD'}}
          // label={constants.PLACEHOLDER_LANG}
          // value={
          //   languages.find(e => e.value * 1 === textField.language * 1)?.value
          // }
          // onChange={_onChangeDropDown('language')}
          />
        {/* ) : null} */}
      </React.Fragment>
    );
  };
  const _renderAddress = () => {
    return (
      <React.Fragment>
        <Input
          isRequired
          ref={addLine1Ref}
          onSubmitEditing={_focusToNext('addressLine1')}
          value={textField.addressLine1}
          placeholder={constants.ADDRESS_ONE}
          onChangeText={_onChange('addressLine1')}
          blurOnSubmit={false}
          errorMessage={error.addressLine1}
        />
        <Input
          ref={addLine2Ref}
          value={textField.addressLine2}
          onSubmitEditing={_focusToNext('addressLine2')}
          placeholder={constants.ADDRESS_TWO}
          onChangeText={_onChange('addressLine2')}
          blurOnSubmit={false}
        />
        <View style={commonStyles.row}>
          <Input
            isRequired
            ref={cityRef}
            onSubmitEditing={_focusToNext('city')}
            value={textField.city}
            placeholder={constants.CITY}
            onChangeText={_onChange('city')}
            blurOnSubmit={false}
            errorMessage={error.city}
          //twoElement
          />
          {/* <Input
            ref={stateRef}
            value={textField.state}
            placeholder={constants.STATE}
            onChangeText={_onChange('state')}
            blurOnSubmit={false}
            errorMessage={error.state}
            twoElement
          /> */}
        </View>
        <View style={commonStyles.row}>
          <Input
            ref={countryRef}
            onSubmitEditing={_focusToNext('country')}
            value={selectedCountry.label}
            placeholder={constants.COUNTRY}
            onChangeText={_onChange('country')}
            blurOnSubmit={false}
            errorMessage={error.country}
            twoElement={!useMyLocation}
            readonly
          />
          {!useMyLocation ? (
            <Input
              isRequired
              ref={pinRef}
              onSubmitEditing={_focusToNext('pin')}
              value={textField.pin}
              placeholder={constants.PINCODE}
              onChangeText={_onChange('pin')}
              blurOnSubmit={false}
              errorMessage={error.pin}
              twoElement
              keyboardType="numeric"
            />
          ) : null}
        </View>
        {/* <View
          style={[
            commonStyles.row,
            commonStyles.addressComponent,
            { flex: 1, alignSelf: 'flex-end' },
          ]}>
          <ImageWithLabel
            onPress={_toggleLocation}
            source={useMyLocation ? icons.activeGPS : icons.inactiveGPS}
            label={constants.USE_MY_LOCATION}
            textStyle={commonStyles.commonText}
          />
        </View> */}
      </React.Fragment>
    );
  };
  // const _renderBusiness = () => {
  //   return (
  //     <CommonView keyboardShouldPersistTaps={'handled'}>
  //       <View
  //         style={[
  //           commonStyles.cardRowContainer,
  //           commonStyles.flatListContainer,
  //         ]}>
  //         <View style={[commonStyles.cardRowDataContainer, { flex: 3 }]}>
  //           <CustomText isBold>{constants.NEED_HELP}</CustomText>
  //         </View>
  //         <View style={[commonStyles.cardRowCenterContainer, { flex: 0.02 }]}>
  //           <CustomText>:</CustomText>
  //         </View>
  //         <View style={[commonStyles.cardRowDataContainer, { flex: 1 }]}>
  //           <ImageWithLabel
  //             onPress={_toggleRadio}
  //             source={helpInDelivery ? icons.checkBox : icons.unCheckBox}
  //           />
  //         </View>
  //       </View>
  //       <Input
  //         isRequired
  //         ref={shopNameRef}
  //         onSubmitEditing={_focusToNext('shopName')}
  //         value={textField.shopName}
  //         placeholder={constants.SHOP_NAME}
  //         onChangeText={_onChange('shopName')}
  //         blurOnSubmit={false}
  //         errorMessage={error.shopName}
  //       />
  //       <Input
  //         isRequired={helpInDelivery}
  //         ref={distanceRef}
  //         onSubmitEditing={_focusToNext('distance')}
  //         value={textField.distance}
  //         placeholder={constants.DEL_DIST}
  //         onChangeText={_onChange('distance')}
  //         keyboardType="numeric"
  //         blurOnSubmit={false}
  //         errorMessage={error.distance}
  //       />
  //     </CommonView>
  //   );
  // };
  // const _toggleCategory = item => {
  //   if (item.categoryID != constants.SELLER_CAT_NO) {
  //     let _allCats = [...allCategories];
  //     let _index = _allCats.findIndex(e => e.categoryID === item.categoryID);
  //     _allCats[_index].isUserCategory =
  //       _allCats[_index].isUserCategory === 0 ? 1 : 0;
  //     setCategories(_allCats);
  //   } else {
  //     ShowToast(constants.WARNING.CATEGORY_OWN);
  //   }
  // };
  // const _renderEachCategories = ({ item, index }) => {
  //   return (
  //     <View style={commonStyles.categoryCheckContainer}>
  //       <ImageWithLabel
  //         onPress={() => _toggleCategory(item)}
  //         source={
  //           item.isUserCategory && item.isUserCategory.toString() === '1'
  //             ? icons.checkBox
  //             : icons.unCheckBox
  //         }
  //         label={item.category}
  //         textStyle={commonStyles.commonText}
  //       />
  //     </View>
  //   );
  // };
  // const _renderCategory = () => {
  //   return (
  //     <React.Fragment>
  //       <FlatList
  //         data={allCategories}
  //         key={'searchResult'}
  //         contentContainerStyle={commonStyles.flatListContainer}
  //         //ItemSeparatorComponent={_seperator}
  //         numColumns={2}
  //         showsVerticalScrollIndicator={false}
  //         ListEmptyComponent={_renderEmpty}
  //         renderItem={_renderEachCategories}
  //         keyExtractor={_keyExtractor}
  //         columnWrapperStyle={commonStyles.spaceBetweenCard}
  //       />
  //     </React.Fragment>
  //   );
  // };
  // const _renderEmpty = () => {
  //   return <CustomText isInfo>{constants.EMPTY_TEXTS.NO_CATEGORY}</CustomText>;
  // };
  // const _keyExtractor = (item, index) => index.toString();
  return (
    <React.Fragment>
      <Loader isLoading={loader} />
      <CustomAlert
        isModalVisible={warning.isWarning}
        isCancelHidden
        onOkPress={() => {
          setWarning({ text: '', isWarning: false });
        }}
        text={warning.text}
      />
      <ScrollView>
        <View style={[commonStyles.container]}>
          <CollapsableHeader
            label={constants.PERSONAL_INFO}
            isCollapsed={false}
          />
          {_renderPersonal()}
          <CollapsableHeader
            label={constants.ADDRESS_INFO}
            isCollapsed={false}
          />
          {_renderAddress()}
          {/* {roleID === 2 && (
            <React.Fragment>
              <CollapsableHeader
                label={constants.BUSINESS_INFO}
                isCollapsed={false}
              />
              {_renderBusiness()}
              <CollapsableHeader
                label={constants.CAT_INFO}
                isCollapsed={false}
              />
              {_renderCategory()}
            </React.Fragment>
          )} */}
        </View>
      </ScrollView>
      <Button
        isGreen
        title={constants.UPDATE}
        style={commonStyles.buttonThird}
        onPress={_validate}
      />
    </React.Fragment>
  );
};
export default ProfileWithAddress;
