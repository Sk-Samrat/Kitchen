import React, { useState, useRef, useEffect } from 'react';
import constants from '../utils/constants';
import localKey from '../utils/localStorage';
import icons from '../common/components/icons';
//import {apiKeys} from '../services/serviceConstants';
import { AppLoader } from '../common/components/appLoader';
import commonStyles from '../common/components/commonStyles';
// import {
//   onAppLoad,
//   onLoginUser,
//   userLog,
//   getAddress,
// } from '../common/action/actions';
//import {ShowErrorToast, storeData, getData} from '../common/components/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  validateMobileNo,
  requirePassword,
} from '../common/components/validation';
import {
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TextInput,
} from 'react-native';
import {
  Loader,
  SplashButton,
  Input,
  CustomText,
  Button,
  //CustomDropDown,
} from '../common/components/customComponents';
import { LogBox } from 'react-native';
import EditDetails from './profileWithAddress';
import { EditStackNavigator } from '../utils/navigation/stackNavigation';
import Home from './home';
import SignUp from './signup';
import { SignUpStackNavigator } from '../utils/navigation/stackNavigation';

const MODULE_NAME = 'Login';
const Login = ({ navigation }) => {
  const phoneRef = useRef('phoneRef');
  const passwordRef = useRef('passwordRef');
  const [isLoader, setLoader] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const [ready, setReady] = useState(false);
  const [isLoginCard, setCard] = useState(false);
  const [textField, setText] = useState({ mobile: '', password: '' });
  const [error, setError] = useState({
    mobile: '',
    password: '',
    mobileStatus: false,
    passwordStatus: false,
  });
  useEffect(() => {
    onLoad();
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    //LogBox.ignoreLogs('componentWillUpdate');
    //LogBox.ignoreLogs('componentWillUpdate');
  }, []);
  const onLoad = async () => {
    // try {
    //   const _roleID = await getData(localKey.ROLE_ID);
    //   const _regAdd = await getData(localKey.REG_ADD);
    //   const resp = await onAppLoad();
    //   if (resp.status) {
    //     let _allRoles = await getData(localKey.ALL_ROLES);
    //     if (_allRoles) {
    //       _allRoles = JSON.parse(_allRoles);
    //       setAllRoles(_allRoles);
    //       setSelectedRole(_allRoles[0].value);
    //     }
    //     if (_regAdd && _regAdd.trim() !== '') {
    //       parseInt(_roleID) === 2
    //         ? navigation.navigate('drawerS')
    //         : navigation.navigate('drawer');
    //     } else setReady(true);
    //   }
    // } catch (error) {
    //   await userLog(error.toString(), MODULE_NAME, 'config/getconfigmaps');
    // }
    setReady(true);
  };
  const onChangeDropDown = (value, index, data) => {
    setSelectedRole(value);
  };
  const focusToNext = type => () => {
    if (type === 'mobile') passwordRef.current.focus();
    else if (type === 'password') Keyboard.dismiss();
  };
  const onChange = type => text => {
    if (type === 'mobile') {
      setText({ ...textField, mobile: text });
      const _validateEmail = validateMobileNo(text);
      if (_validateEmail['status'])
        setError({ ...error, mobileStatus: true, mobile: '' });
      else
        setError({
          ...error,
          mobileStatus: false,
          mobile: _validateEmail['error'],
        });
    } else if (type === 'password') {
      setText({ ...textField, password: text });
      const _validatePassword = requirePassword(text);
      if (_validatePassword['status'])
        setError({ ...error, passwordStatus: true, password: '' });
      else
        setError({
          ...error,
          passwordStatus: false,
          password: _validatePassword['error'],
        });
    }
  };
  const validate = () => {
    error.mobileStatus
      ? error.passwordStatus
        ? login()
        : setError({ ...error, password: constants.WARNING.PASSWORD })
      : setError({ ...error, mobile: constants.WARNING.MOBILE_INV });
  };
  const getRegisteredAddress = async (userId, paramRole) => {
    //   try {
    //     setLoader(true);
    //     let param = {
    //       [apiKeys.GET_ADDRESS_PARAMS.USER_ID]: userId,
    //       [apiKeys.GET_ADDRESS_PARAMS.IS_DELIVERY_ADDRESS]:
    //         paramRole === 2 ? 3 : 0,
    //     };
    //     const resp = await getAddress(param);
    //     if (resp.status) {
    //       if (resp && resp.data && resp.data.length > 0) {
    //         storeData(localKey.REG_ADD, JSON.stringify(resp.data[0]));
    //         setLoader(false);
    //         paramRole === 2
    //           ? navigation.navigate('drawerS')
    //           : navigation.navigate('drawer');
    //       } else {
    //         setLoader(false);
    //         navigation.navigate('editDetails');
    //       }
    //     } else {
    //       setLoader(false);
    //       ShowErrorToast(constants.ERROR.GEN);
    //     }
    //   } catch (error) {
    //     ShowErrorToast(constants.ERROR.GEN);
    //     await userLog(error.toString(), MODULE_NAME, 'useraddress/getaddress');
    //   }
  };
  // const login = async () => {
  //   try {
  //     setLoader(true);
  //     const devId = await getData(localKey.DEVICE_TOKEN);
  //     alert(parseInt(textField.mobile));
  //     alert(parseInt(selectedRole));
  //     alert(textField.password);
  //     alert(devId);
  //     console.log(devId);
  //     let param = {
  //       [apiKeys.LOGIN_PARAMS.USER_ID]: parseInt(textField.mobile),
  //       [apiKeys.LOGIN_PARAMS.ROLE_ID]: parseInt(selectedRole),
  //       [apiKeys.LOGIN_PARAMS.PASSWORD]: textField.password,
  //       [apiKeys.LOGIN_PARAMS.DEVICE_TOKEN]: devId ? devId : '',
  //     };
  //     const resp = await onLoginUser(param);
  //     if (resp.status && resp.data) {
  //       if (resp.data.firstName && resp.data.firstName !== '') {
  //         getRegisteredAddress(
  //           parseInt(textField.mobile),
  //           parseInt(selectedRole),
  //         );
  //       } else {
  //         setLoader(false);
  //         navigation.navigate('editDetails');
  //       }
  //     } else {
  //       setLoader(false);
  //       ShowErrorToast(resp.message);
  //     }
  //   } catch (error) {
  //     ShowErrorToast(constants.ERROR.GEN);
  //     await userLog(error.toString(), MODULE_NAME, 'user/login');
  //   }
  // };
  const login = async () => {
    try {
      setLoader(true);
    //   const devId = await getData(localKey.DEVICE_TOKEN);
      alert(parseInt(textField.mobile));
    //   alert(parseInt(selectedRole));
      alert(textField.password);
    //   alert(devId);
    //   console.log(devId);
    //   let param = {
    //     [apiKeys.LOGIN_PARAMS.USER_ID]: parseInt(textField.mobile),
    //     [apiKeys.LOGIN_PARAMS.ROLE_ID]: parseInt(selectedRole),
    //     [apiKeys.LOGIN_PARAMS.PASSWORD]: textField.password,
    //     [apiKeys.LOGIN_PARAMS.DEVICE_TOKEN]: devId ? devId : '',
    //   };
    //   const resp = await onLoginUser(param);
    //   if (resp.status && resp.data) {
    //     if (resp.data.firstName && resp.data.firstName !== '') {
    //       getRegisteredAddress(
    //         parseInt(textField.mobile),
    //         parseInt(selectedRole),
    //       );
    //     } else {
          setLoader(false);
          navigation.navigate('EditDetails');
    //     }
    //   } else {
    //     setLoader(false);
    //     ShowErrorToast(resp.message);
    //   }
    } catch (error) {
    //   ShowErrorToast(constants.ERROR.GEN);
    //   await userLog(error.toString(), MODULE_NAME, 'user/login');
    }
  };
  return (
    // <React.Fragment>
    //   {/* <Loader isLoading={isLoader} /> */}
    //   {ready ? (
    //     <ImageBackground
    //       source={icons.imageLanding}
    //       style={{
    //         flex: 1,
    //         //alignItems: 'center',
    //         //justifyContent: 'center',
    //         //resizeMode: 'stretch',
    //         //marginHorizontal: 5,
    //       }}>
    //       <KeyboardAwareScrollView
    //         style={{ flex: 1, flexDirection: 'column-reverse' }}>
    //         {isLoginCard ? (
    //           <TouchableWithoutFeedback
    //             // onPress={() => {
    //             //   Keyboard.dismiss;
    //             //}}
    //             >
    //             <View style={commonStyles.loginCard}>
    //               {/* <CustomDropDown
    //                 isLogin
    //                 data={allRoles}
    //                 value={selectedRole}
    //                 label={constants.ROLE}
    //                 onChange={onChangeDropDown}
    //               /> */}
    //               <View style={commonStyles.row}>
    //                 <Input
    //                   twoElement
    //                   isLogin
    //                   ref={phoneRef}
    //                   placeholder={constants.MOBILE_NO}
    //                   onChangeText={onChange('mobile')}
    //                   keyboardType="number-pad"
    //                   blurOnSubmit={false}
    //                   errorMessage={error['mobile']}
    //                   onSubmitEditing={focusToNext('mobile')}
    //                 />
    //                 <Input
    //                   twoElement
    //                   isLogin
    //                   maxLength={20}
    //                   ref={passwordRef}
    //                   onChangeText={onChange('password')}
    //                   placeholder={constants.PASSWORD}
    //                   secureTextEntry={true}
    //                   errorMessage={error['password']}
    //                   onSubmitEditing={focusToNext('password')}
    //                 />
    //               </View>

    //               <CustomText
    //                 isLink
    //                 //onPress={() => navigation.navigate('forgot')}
    //                 style={[commonStyles.linkText, { alignSelf: 'center' }]}>
    //                 {`${constants.FORGOT_PASSWORD}?`}
    //               </CustomText>
    //               <View style={commonStyles.row}>
    //                 <Button
    //                   isGreen
    //                   style={commonStyles.buttonThird}
    //                   title={constants.LOGIN}
    //                   onPress={validate}
    //                 />
    //                 <Button
    //                   isRed
    //                   style={commonStyles.buttonThird}
    //                   title={constants.CANCEL}
    //                   onPress={() => setCard(false)}
    //                 />
    //               </View>
    //             </View>
    //           </TouchableWithoutFeedback>
    //         ) : (
    //           [
    //             <SplashButton
    //               key="1"
    //               isTrans
    //               title={constants.LOGIN}
    //               onPress={() => setCard(true)}
    //             />,
    //             <SplashButton
    //               key="2"
    //               isGreen
    //               title={constants.SIGN_UP}
    //               onPress={() => navigation.navigate('signup')}
    //             />,
    //           ]
    //         )}
    //       </KeyboardAwareScrollView>
    //     </ImageBackground>
    //   ) : (
    //     <AppLoader onRefresh={onLoad} />
    //   )}
    // </React.Fragment>
    <React.Fragment>
      {ready ? (
        <ImageBackground
          source={icons.imageLanding}
          style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            resizeMode: 'stretch',
            //marginHorizontal: 5,
          }}>
          <KeyboardAwareScrollView
            style={{ flex: 1, flexDirection: 'column-reverse' }}>
            {isLoginCard ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss;
                }}
              >
                <View style={commonStyles.loginCard}>
                  {/* <CustomDropDown
                    isLogin
                    data={allRoles}
                    value={selectedRole}
                    label={constants.ROLE}
                    onChange={onChangeDropDown}
                  /> */}
                  <View style={commonStyles.row}>
                    <Input
                      twoElement
                      isLogin
                      ref={phoneRef}
                      placeholder={constants.MOBILE_NO}
                      onChangeText={onChange('mobile')}
                      keyboardType="number-pad"
                      blurOnSubmit={false}
                      errorMessage={error['mobile']}
                      onSubmitEditing={focusToNext('mobile')}
                    />
                    <Input
                      twoElement
                      isLogin
                      maxLength={20}
                      ref={passwordRef}
                      onChangeText={onChange('password')}
                      placeholder={constants.PASSWORD}
                      secureTextEntry={true}
                      errorMessage={error['password']}
                      onSubmitEditing={focusToNext('password')}
                    />
                  </View>

                  <CustomText
                    isLink
                    //onPress={() => navigation.navigate('forgot')}
                    style={[commonStyles.linkText, { alignSelf: 'center' }]}>
                    {`${constants.FORGOT_PASSWORD}?`}
                  </CustomText>
                  <View style={commonStyles.row}>
                    <Button
                      isGreen
                      style={commonStyles.buttonThird}
                      title={constants.LOGIN}
                      onPress={validate}
                    />
                    <Button
                      isRed
                      style={commonStyles.buttonThird}
                      title={constants.CANCEL}
                      onPress={() => setCard(false)}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              [
                <SplashButton
                  key="1"
                  isTrans
                  title={constants.LOGIN}
                  onPress={() => setCard(true)}
                />,
                <SplashButton
                  key="2"
                  isGreen
                  title={constants.SIGN_UP}
                  onPress={() => navigation.navigate('signup')}
                  // onPress={() => navigation.navigate('SignUpStackNavigator')}
                />,
              ]
            )}
          </KeyboardAwareScrollView>
        </ImageBackground>
      ) : (
        <AppLoader onRefresh={onLoad} />
      )}
    </React.Fragment>
  );
};
export default Login;
