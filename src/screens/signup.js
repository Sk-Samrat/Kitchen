import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {
  CustomText,
  Input,
  Button,
  CustomDropDown,
  Loader,
  ImageWithLabel,
  CommonView,
} from '../common/components/customComponents';
import { CustomAlert } from '../common/components/customAlert';
import constants from '../utils/constants';
// import {
//   ShowToast,
//   ShowErrorToast,
  // getData,
  // storeData,
// } from '../common/components/helper';
// import {
//   onSignUpUser,
//   getOTP,
//   userLog,
//   MobileNoCheck,
//   getValue,
// } from '../common/action/actions';
import {
  validateMobileNo,
  validatePasswordWeak,
  validateEmail,
} from '../common/components/validation';
// import { apiKeys } from '../services/serviceConstants';
import icons from '../common/components/icons';
import commonStyles from '../common/components/commonStyles';
import localKey from '../utils/localStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTP from './otp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MODULE_NAME = 'SignUp';
const SignUp = ({ navigation }) => {
  const mobileRef = useRef('mobile');
  const emailRef = useRef('email');
  const refferalRef = useRef('refferal');
  const passwordRef = useRef('password');
  const confirmPasswordRef = useRef('confirmPassword');
  const [loader, setLoader] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const [isCondition, setCondition] = useState(false);
  const [isConditionWarning, setConditionWarning] = useState(false);
  const [isConditionView, setConditionView] = useState(false);
  const [tnc, SetTNC] = useState('');
  const [allCountries, setCountries] = useState([]);
  const [otp, setOTP] = useState('X');
  const [isOTPScreen, setOTPScreen] = useState({ status: false, text: '' });
  const [attempts, setAttempts] = useState(3);
  const [isEmailReq, setEmailReq] = useState(false);
  const [error, setError] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    accept: '',
    refferal: '',
    emailId: '',
    mobileStatus: false,
    passwordStatus: false,
    confirmPasswordStatus: false,
    acceptStatus: false,
    refferalStatus: true,
    emailIdStatus: true,
  });
  const [textField, setText] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    refferal: '',
    country: 91,
    emailId: '',
  });
  
  const loadTNC = async () => {
    // try {
    //   setLoader(true);
    //   let param = {
    //     [apiKeys.KEY_NAME]: 'tnc',
    //   };
    //   const response = await getValue(param);
    //   if (
    //     response.status &&
    //     response.data &&
    //     response.data.results &&
    //     response.data.results.length > 0
    //   ) {
    //     SetTNC(response.data.results[0]?.langValue);
    //     setLoader(false);
    //   } else {
    //     ShowErrorToast(constants.ERROR.GEN);
    //     setLoader(false);
    //     navigation.popToTop();
    //   }
    // } catch (error) {
    //   setLoader(false);
    //   ShowErrorToast(constants.ERROR.GEN);
    //   await userLog(error.toString(), MODULE_NAME, 'user/getKeyValue');
    //   navigation.popToTop();
    // }
  };
  useEffect(() => {
    const onLoad = async () => {
      // let _allRoles = await getData(localKey.ALL_ROLES);
      // if (_allRoles) {
      //   _allRoles = JSON.parse(_allRoles);
      //   setAllRoles(_allRoles);
      //   setSelectedRole(_allRoles[0].value);
      // }
      // const countries = await getData(localKey.ALL_COUNTRIES);
      // setCountries(
      //   countries
      //     ? JSON.parse(countries)?.length > 0
      //       ? JSON.parse(countries)
      //       : []
      //     : [],
      // );
    };
    onLoad();
    loadTNC();
  }, []);
  //const validateMobileServer = async (mob, country) => {
    // try {
    //   //alert(country);
    //   const param = {
    //     [apiKeys.CHECK_MOBILE_PARAMS.USER_ID]: parseInt(mob),
    //     [apiKeys.CHECK_MOBILE_PARAMS.COUNTRY_ID]: parseInt(country),
    //   };
    //   const mobResp = await MobileNoCheck(param);
    //   //alert(mobResp.status);
    //   return mobResp.status;
    // } catch (error) {
    //   return true;
    // }
  //};
  const focusToNext = type => () => {
    if (type === 'mobile') refferalRef.current.focus();
    else if (type === 'refferal') emailRef.current.focus();
    else if (type === 'email') passwordRef.current.focus();
    else if (type === 'password') confirmPasswordRef.current.focus();
    else if (type === 'confirmPassword') mobileRef.current.focus();
  };
  const onChange = type => async text => {
    if (type === 'mobile') {
      setText({ ...textField, mobile: text });
      const _validateMobile = validateMobileNo(text);
      if (_validateMobile.status)
        setError({ ...error, mobile: '', mobileStatus: true });
      else
        setError({
          ...error,
          mobile: _validateMobile.error,
          mobileStatus: false,
        });
    } else if (type === 'password') {
      setText({ ...textField, password: text });
      const _validatePassword = validatePasswordWeak(text);
      if (_validatePassword.status)
        setError({ ...error, password: '', passwordStatus: true });
      else
        setError({
          ...error,
          password: _validatePassword.error,
          passwordStatus: false,
        });
    } else if (type === 'confirmPassword') {
      setText({ ...textField, confirmPassword: text });
      if (text === textField.password)
        setError({ ...error, confirmPassword: '', confirmPasswordStatus: true });
      else
        setError({
          ...error,
          confirmPassword: constants.CONFIRM_PASSWORD_MISMATCH,
          confirmPasswordStatus: false,
        });
    } else if (type === 'refferal') {
      setText({ ...textField, refferal: text });
    } else if (type === 'email') {
      setText({ ...textField, emailId: text });
      const _validateEmail = validateEmail(text);
      if (_validateEmail['status'] || (text.trim() === '' && !isEmailReq))
        setError({ ...error, emailId: '', emailIdStatus: true });
      else
        setError({
          ...error,
          emailId: _validateEmail['error'],
          emailIdStatus: false,
        });
    }
  };
  const onChangeDropDown = type => (value, index, data) => {
    if (type === 'country') {
      setText({ ...textField, country: value });
      if (parseInt(value) === 65) {
        //alert(parseInt(value));
        setEmailReq(true);
        const _validateEmail = validateEmail(textField.emailId);
        if (!_validateEmail['status'])
          setError({
            ...error,
            emailId: _validateEmail['error'],
            emailIdStatus: false,
          });
        const _validateMobile = validateMobileNo(textField.mobile);
        if (_validateMobile.status)
          setError({ ...error, mobile: '', mobileStatus: true });
        else
          setError({
            ...error,
            mobile: _validateMobile.error,
            mobileStatus: false,
          });
      } else {
        setEmailReq(false);
        const _validateEmail = validateEmail(textField.emailId);
        if (_validateEmail['status'] || textField.emailId.trim() === '')
          setError({ ...error, emailId: '', emailIdStatus: true });
        else
          setError({
            ...error,
            emailId: _validateEmail['error'],
            emailIdStatus: false,
          });
        const _validateMobile = validateMobileNo(textField.mobile);
        if (_validateMobile.status)
          setError({ ...error, mobile: '', mobileStatus: true });
        else
          setError({
            ...error,
            mobile: _validateMobile.error,
            mobileStatus: false,
          });
      }
    } else if (type === 'role') setSelectedRole(value);
  };
  const toggleCondition = type => {
    if (type === 'condition') {
      if (isCondition) {
        setError({
          ...error,
          accept: constants.YOU_MUST_ACCEPT_TERMS_AND_CONDITION_BEFORE_SIGNUP,
          acceptStatus: false,
        });
      } else {
        setError({
          ...error,
          accept: '',
          acceptStatus: true,
        });
      }
      setCondition(isCondition ? false : true);
    } else if (type === 'role') {
      setSeller(isSeller ? false : true);
    }
  };
  const onValidateOTP = text => {
    alert(text);
    if (text && text * 1 === otp * 1) {
      alert('Inside if of onValidateOTP');
      onSignUp(text * 1);
    } else {
      alert('Inside else of onValidateOTP');
      if (attempts < 2) {
        // ShowErrorToast(constants.REG_FAILED);
        alert(constants.REG_FAILED)
        navigation.popToTop();
      } else {
        setAttempts(attempts - 1);
        // ShowErrorToast(constants.ATTEMPT_LEFT.replace('x', attempts - 1));
        alert(constants.ATTEMPT_LEFT.replace('x', attempts - 1));
      }
    }
  };
  // const onRequestOTP = async () => {
  //   try {
  //     alert(textField.mobile);
      // alert(textField.country);
      // setLoader(true);
    //   if (!(await validateMobileServer(textField.mobile, textField.country))) {
    //     setLoader(false);
    //     setError({
    //       ...error,
    //       mobile: constants.WARNING.MOBILE_INV,
    //       mobileStatus: false,
    //     });
    //     return;
    //   }
    //   const devId = await getData(localKey.DEVICE_TOKEN);
    //   let param = {
    //     [apiKeys.GET_REG_OTP_PARAMS.USER_ID]: parseInt(textField.mobile),
    //     [apiKeys.GET_REG_OTP_PARAMS.COUNTRY_ID]: parseInt(textField.country),
    //     [apiKeys.GET_REG_OTP_PARAMS.DEVICE_TOKEN]: devId ? devId : '',
    //     [apiKeys.GET_REG_OTP_PARAMS.EMAIL]: textField.emailId,
    //     [apiKeys.GET_REG_OTP_PARAMS.REASON_ID]: 1,
    //   };
    //   const response = await getOTP(param);
    //   alert(response?.status);
    //   alert(response?.message);
    //   if (response?.status) {
    //     //alert(response.status);
    //     setOTP(response?.data?.otp);
    //     setLoader(false);
    //     setOTPScreen({ status: true, text: response?.message });
    //   } else {
    //     setLoader(false);
    //     ShowErrorToast(response?.message);
      // }
  //   } catch (error) {
  //     await userLog(error.toString(), MODULE_NAME, 'user/validatephone');
  //   }
  // };
  const onRequestOTP = async () => {
    try {
      alert(textField.mobile);
      // alert(textField.country);
      setLoader(true);
    //   if (!(await validateMobileServer(textField.mobile, textField.country))) {
    //     setLoader(false);
    //     setError({
    //       ...error,
    //       mobile: constants.WARNING.MOBILE_INV,
    //       mobileStatus: false,
    //     });
    //     return;
    //   }
    //   const devId = await getData(localKey.DEVICE_TOKEN);
    //   let param = {
    //     [apiKeys.GET_REG_OTP_PARAMS.USER_ID]: parseInt(textField.mobile),
    //     [apiKeys.GET_REG_OTP_PARAMS.COUNTRY_ID]: parseInt(textField.country),
    //     [apiKeys.GET_REG_OTP_PARAMS.DEVICE_TOKEN]: devId ? devId : '',
    //     [apiKeys.GET_REG_OTP_PARAMS.EMAIL]: textField.emailId,
    //     [apiKeys.GET_REG_OTP_PARAMS.REASON_ID]: 1,
    //   };
    //   const response = await getOTP(param);
    //   alert(response?.status);
    //   alert(response?.message);
    //   if (response?.status) {
    //     //alert(response.status);
        setOTP('123456');
        setLoader(false);
        setOTPScreen({ status: true, text: 'ENTER THE OTP' });
    //   } else {
    //     setLoader(false);
    //     ShowErrorToast(response?.message);
      // }
    } catch (error) {
      // await userLog(error.toString(), MODULE_NAME, 'user/validatephone');
    }
  };
  // const onSignUp = async _otp => {
    // try {
    //   setLoader(true);
    //   let param = {
    //     [apiKeys.REG_PARAMS.USER_ID]: parseInt(textField.mobile),
    //     [apiKeys.REG_PARAMS.EMAIL]: textField.emailId,
    //     [apiKeys.REG_PARAMS.PASSWORD]: textField.password,
    //     [apiKeys.REG_PARAMS.ROLE_ID]: selectedRole,
    //     [apiKeys.REG_PARAMS.COUNTRY_ID]: parseInt(textField.country),
    //     [apiKeys.REG_PARAMS.PROMOCODE]: textField.refferal,
    //     [apiKeys.REG_PARAMS.OTP]: _otp,
    //   };
    //   const response = await onSignUpUser(param);
    //   if (response.status) {
    //     storeData(
    //       localKey.USER_COUNTRY,
    //       JSON.stringify(
    //         allCountries.find(e => e.value * 1 === textField.country * 1),
    //       ),
    //     );
    //     setLoader(false);
    //     ShowToast(constants.REG_SUCCESS);
    //     setOTPScreen({ status: false, text: '' });
    //     navigation.navigate('login');
    //   } else {
    //     setLoader(false);
    //     navigation.popToTop();
    //     ShowErrorToast(response?.message);
    //   }
    // } catch (error) {
    //   await userLog(error.toString(), MODULE_NAME, 'user/registration');
    // }
  // };
  const onSignUp = async _otp => {
    try {
      setLoader(true);
    //   let param = {
    //     [apiKeys.REG_PARAMS.USER_ID]: parseInt(textField.mobile),
    //     [apiKeys.REG_PARAMS.EMAIL]: textField.emailId,
    //     [apiKeys.REG_PARAMS.PASSWORD]: textField.password,
    //     [apiKeys.REG_PARAMS.ROLE_ID]: selectedRole,
    //     [apiKeys.REG_PARAMS.COUNTRY_ID]: parseInt(textField.country),
    //     [apiKeys.REG_PARAMS.PROMOCODE]: textField.refferal,
    //     [apiKeys.REG_PARAMS.OTP]: _otp,
    //   };
    //   const response = await onSignUpUser(param);
    //   if (response.status) {
    //     storeData(
    //       localKey.USER_COUNTRY,
    //       JSON.stringify(
    //         allCountries.find(e => e.value * 1 === textField.country * 1),
    //       ),
    //     );
        setLoader(false);
        alert('inside onSignUp');
        // ShowToast(constants.REG_SUCCESS);
        alert(constants.REG_SUCCESS);
        setOTPScreen({ status: false, text: '' });
        navigation.navigate('login');
    //   } else {
    //     setLoader(false);
    //     navigation.popToTop();
    //     ShowErrorToast(response?.message);
    //   }
    } catch (error) {
      // await userLog(error.toString(), MODULE_NAME, 'user/registration');
    }
  };
  const validate = () => {
    if (!error.acceptStatus) {
      setConditionWarning(true);
      // alert('Inside If of Validate');
    }
    // alert(error.mobileStatus);
    error.mobileStatus
      ? error.emailIdStatus
        ? error.passwordStatus
          ? error.confirmPasswordStatus
            ? error.acceptStatus
              ? onRequestOTP()
              : setError({
                ...error,
                accept:
                  constants.YOU_MUST_ACCEPT_TERMS_AND_CONDITION_BEFORE_SIGNUP,
                acceptStatus: false,
              })
            : setError({
              ...error,
              confirmPassword: constants.WARNING.CONFIRM_PASSWORD_MISMATCH,
              confirmPasswordStatus: false,
            })
          : setError({
            ...error,
            password: constants.WARNING.PASSWORD_INV,
            passwordStatus: false,
          })
        : setError({
          ...error,
          emailId: constants.WARNING.EMAIL_INV,
          emailIdStatus: false,
        })
      : //alert('mobileStatus');
      setError({
        ...error,
        mobile: constants.WARNING.MOBILE_INV,
        mobileStatus: false,
      });
  };
  return (
    <React.Fragment>
      <Loader isLoading={loader} />
      <OTP
        onSubmit={onValidateOTP}
        isVisible={isOTPScreen.status}
        text={isOTPScreen.text}
      />
      <CustomAlert
        isCancelHidden
        isHTML
        text={tnc}
        onOkPress={() => {
          setConditionView(false);
        }}
        isModalVisible={isConditionView}
      />
      <CustomAlert
        isCancelHidden
        text={constants.WARNING.TNC}
        onOkPress={() => {
          setConditionWarning(false);
        }}
        isModalVisible={isConditionWarning}
      />
      {!isOTPScreen.status && (
        <CommonView>
          <View style={commonStyles.row}>
            {/* <CustomDropDown
              data={allCountries}
              label={constants.COUNTRY}
              value={
                allCountries.find(e => e.value * 1 === textField.country * 1)
                  ?.value
              }
              onChange={onChangeDropDown('country')}
              twoElement
            /> */}
            {/* <CustomDropDown
              isLogin
              data={allRoles}
              value={selectedRole}
              label={constants.ROLE}
              onChange={onChangeDropDown('role')}
              twoElement
            /> */}
          </View>
          <View style={commonStyles.row}>
            <Input
              ref={mobileRef}
              value={textField.mobile}
              onSubmitEditing={focusToNext('mobile')}
              placeholder={constants.MOBILE_NO}
              onChangeText={onChange('mobile')}
              blurOnSubmit={false}
              errorMessage={error.mobile}
              keyboardType="phone-pad"
              twoElement
              isRequired
            />
            <Input
              ref={refferalRef}
              value={textField.refferal}
              onSubmitEditing={focusToNext('refferal')}
              placeholder={constants.PROMOCODE}
              onChangeText={onChange('refferal')}
              blurOnSubmit={false}
              errorMessage={error.refferal}
              keyboardType="phone-pad"
              twoElement
            />
          </View>
          <Input
            ref={emailRef}
            value={textField.emailId}
            onSubmitEditing={focusToNext('email')}
            placeholder={constants.EMAIL}
            onChangeText={onChange('email')}
            keyboardType="email-address"
            blurOnSubmit={false}
            errorMessage={error['emailId']}
            isRequired={isEmailReq}
          />
          <View style={commonStyles.row}>
            <Input
              ref={passwordRef}
              secureTextEntry={true}
              value={textField.password}
              onSubmitEditing={focusToNext('password')}
              placeholder={constants.PASSWORD}
              onChangeText={onChange('password')}
              blurOnSubmit={false}
              errorMessage={error.password}
              twoElement
              isRequired
            />
            <Input
              ref={confirmPasswordRef}
              secureTextEntry={true}
              value={textField.confirmPassword}
              onSubmitEditing={focusToNext('confirmPassword')}
              placeholder={constants.CONF_PASSWORD}
              onChangeText={onChange('confirmPassword')}
              blurOnSubmit={false}
              errorMessage={error.confirmPassword}
              twoElement
              isRequired
            />
          </View>
          <ImageWithLabel
            style={{ alignSelf: 'flex-start' }}
            onPress={() => toggleCondition('condition')}
            source={isCondition ? icons.checkBox : icons.unCheckBox}
            label={constants.I_ACCEPT}
            textStyle={commonStyles.commonText}>
            <CustomText
              isLink
              style={[commonStyles.linkText, { paddingLeft: 0 }]}
              //onPress={() => setConditionView(true)}>
              onPress={() => navigation.navigate('tnc')}>
              {constants.TERMS_AND_CONDITIONS}
            </CustomText>
          </ImageWithLabel>
          <Button
            isGreen
            title={constants.SIGN_UP}
            style={commonStyles.buttonHalf}
            onPress={validate}
          />
          <CustomText
            isLink
            style={[commonStyles.linkText, { textAlign: 'center' }]}
            onPress={() => navigation.navigate('contactUs')}>
            {constants.HEAD_CONTACT_US}
          </CustomText>
        </CommonView>
      )}
    </React.Fragment>
  );
};
export default SignUp;
