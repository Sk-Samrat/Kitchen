import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  CustomModal,
  Button,
  Input,
  CustomText,
  Loader,
} from './customComponents';
import commonStyles from './commonStyles';
import constants from '../../utils/constants';
import {validateNumber, validateMobileNo} from './validation';
// import {MobileNoCheck} from '../../common/action/actions';
import localKey from '../../utils/localStorage';
// import {getData} from '../../common/components/helper';
// import {apiKeys} from '../../services/serviceConstants';
import {ScrollView} from 'react-native-gesture-handler';
export const CustomAlert = props => {
  const {
    isModalVisible,
    isCancelHidden,
    onCancelPress,
    onOkPress,
    okText,
    cancelText,
    text,
    isHTML,
  } = props;
  return (
    <CustomModal isModalVisible={isModalVisible}>
      <View style={commonStyles.modalContainer}>
        <ScrollView>
          {isHTML ? (
            <WebView
              style={(commonStyles.container, commonStyles.maxHeight)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{html: text}}
            />
          ) : (
            <CustomText isBold style={commonStyles.flatListContainer}>
              {text}
            </CustomText>
          )}
        </ScrollView>
        <View style={commonStyles.buttonModalContainer}>
          {isCancelHidden ? null : (
            <Button
              isRed
              title={cancelText ? cancelText : constants.CANCEL}
              onPress={onCancelPress}
            />
          )}
          <Button
            isGreen
            title={okText ? okText : constants.OK}
            onPress={onOkPress}
          />
        </View>
      </View>
    </CustomModal>
  );
};
export const ModalInput = props => {
  const {
    isModalVisible,
    onCancelPress,
    onOkPress,
    okText,
    cancelText,
    isCancelHidden,
    text,
    inputType,
  } = props;
  const discountRef = useRef('discount');
  const deliveryRef = useRef('delivery');
  const userRef = useRef('user');
  const paymentRef = useRef('payment');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    discount: '',
    discountStatus: true,
    delivery: '',
    deliveryStatus: true,
    otp: '',
    otpStatus: false,
    user: '',
    userStatus: true,
    payment: '',
    paymentStatus: true,
  });
  const [textField, setText] = useState({
    discount: '',
    delivery: '',
    otp: '',
    user: '',
    payment: '',
  });
  const _cleanData = () => {
    onOkPress(textField);
    setText({
      discount: '',
      delivery: '',
      otp: '',
      user: '',
      payment: '',
    });
    setError({
      discount: '',
      discountStatus: true,
      delivery: '',
      deliveryStatus: true,
      otp: '',
      otpStatus: true,
      user: '',
      userStatus: true,
      payment: '',
      paymentStatus: true,
    });
  };
  const _onOkPress = async () => {
    if (inputType === 'discount') {
      error.discountStatus
        ? _cleanData()
        : setError({
            ...error,
            discount: constants.WARNING.DISCOUNT_INV,
            discountStatus: false,
          });
    } else if (inputType === 'delivery') {
      error.deliveryStatus
        ? _cleanData()
        : setError({
            ...error,
            delivery: constants.WARNING.DELIVERY_CHARGES_INV,
            deliveryStatus: false,
          });
    } else if (inputType === 'otp') {
      error.deliveryStatus
        ? _cleanData()
        : setError({
            ...error,
            otp: constants.WARNING.OTP_INV,
            otpStatus: false,
          });
    } else if (inputType === 'user') {
      const country = await getData(localKey.USER_COUNTRY);
      const param = {
        [apiKeys.CHECK_MOBILE_PARAMS.USER_ID]: parseInt(textField.user),
        [apiKeys.CHECK_MOBILE_PARAMS.COUNTRY_ID]: country
          ? parseInt(JSON.parse(country).value)
          : 91,
      };
      setLoader(true);
      const mobResp = await MobileNoCheck(param);
      setLoader(false);
      error.userStatus && mobResp.status
        ? _cleanData()
        : setError({
            ...error,
            user: constants.WARNING.MOBILE_INV,
            userStatus: false,
          });
    } else if (inputType === 'payment') {
      error.paymentStatus
        ? _cleanData()
        : setError({
            ...error,
            payment: constants.WARNING.PAYMENT_INV,
            paymentStatus: false,
          });
    }
  };
  const _onCancel = () => {
    setText({
      discount: '',
      delivery: '',
      user: '',
      payment: '',
    });
    setError({
      discount: '',
      discountStatus: true,
      delivery: '',
      deliveryStatus: true,
      user: '',
      userStatus: true,
      payment: '',
      paymentStatus: true,
    });
    onCancelPress();
  };
  const _onChange = type => async text => {
    text = text
      .trim()
      .replace('-', '')
      .replace('.', '')
      .replace(',', '');
    if (type === 'discount') {
      setText({...textField, discount: text * 1});
      const _validateDiscount = validateNumber(text);
      if (_validateDiscount.status || text.trim() === '')
        setError({...error, discount: '', discountStatus: true});
      else
        setError({
          ...error,
          discount: _validateDiscount.error,
          discountStatus: false,
        });
    } else if (type === 'delivery') {
      setText({...textField, delivery: text * 1});
      const _validateDiscount = validateNumber(text);
      if (_validateDiscount.status || text.trim() === '')
        setError({...error, delivery: '', deliveryStatus: true});
      else
        setError({
          ...error,
          delivery: _validateDiscount.error,
          deliveryStatus: false,
        });
    } else if (type === 'otp') {
      setText({...textField, otp: text * 1});
      const _validateOTP = validateNumber(text);
      if (_validateOTP.status) setError({...error, otp: '', otpStatus: true});
      else
        setError({
          ...error,
          otp: _validateOTP.error,
          otpStatus: false,
        });
    } else if (type === 'user') {
      setText({...textField, user: text * 1});
      const _validateUser = validateMobileNo(text);
      if (text.trim() === '' || _validateUser.status)
        setError({...error, user: '', userStatus: true});
      else
        setError({
          ...error,
          user: constants.WARNING.MOBILE_INV,
          userStatus: false,
        });
    } else if (type === 'payment') {
      setText({...textField, payment: text * 1});
      const _validatePayment = validateNumber(text);
      if (_validatePayment.status || text.trim() === '')
        setError({...error, payment: '', paymentStatus: true});
      else
        setError({
          ...error,
          payment: _validatePayment.error,
          paymentStatus: false,
        });
    }
  };

  return (
    <React.Fragment>
      <Loader isLoading={loader} />
      <CustomModal isModalVisible={isModalVisible}>
        <View style={commonStyles.modalContainer}>
          {inputType === 'discount' ? (
            <Input
              ref={discountRef}
              value={textField.discount}
              placeholder={constants.DISCOUNT}
              onChangeText={_onChange('discount')}
              blurOnSubmit={false}
              errorMessage={error.discount}
              keyboardType="number-pad"
              isModal
            />
          ) : null}
          {inputType === 'payment' ? (
            <Input
              ref={paymentRef}
              value={textField.payment}
              placeholder={constants.PAYMENT_INFO}
              onChangeText={_onChange('payment')}
              blurOnSubmit={false}
              errorMessage={error.payment}
              keyboardType="number-pad"
              isModal
            />
          ) : null}
          {inputType === 'delivery' ? (
            <Input
              ref={deliveryRef}
              value={textField.delivery}
              placeholder={constants.DELIVERY_CHARGES}
              onChangeText={_onChange('delivery')}
              blurOnSubmit={false}
              errorMessage={error.delivery}
              keyboardType="number-pad"
              isModal
            />
          ) : null}
          {inputType === 'otp' ? (
            <Input
              value={textField.otp}
              placeholder={constants.HEAD_OTP}
              onChangeText={_onChange('otp')}
              blurOnSubmit={false}
              errorMessage={error.otp}
              keyboardType="number-pad"
              isModal
            />
          ) : null}
          {inputType === 'user' ? (
            <Input
              ref={userRef}
              value={textField.user}
              placeholder={text ? text : constants.USER_DETAILS}
              onChangeText={_onChange('user')}
              blurOnSubmit={false}
              errorMessage={error.user}
              keyboardType="number-pad"
              isModal
            />
          ) : null}
          <View style={commonStyles.buttonModalContainer}>
            {isCancelHidden ? null : (
              <Button
                isRed
                title={cancelText ? cancelText : constants.CANCEL}
                onPress={_onCancel}
              />
            )}
            <Button
              isGreen
              title={okText ? okText : constants.OK}
              onPress={_onOkPress}
            />
          </View>
        </View>
      </CustomModal>
    </React.Fragment>
  );
};
export const OTPModal = props => {
  const {isModalVisible} = props;
  return <CustomModal isModalVisible={isModalVisible} />;
};
export const ModalContainer = ({isModalVisible, children, style}) => {
  return (
    <CustomModal isModalVisible={isModalVisible}>
      <View style={[commonStyles.modalContainer, style]}>{children}</View>
    </CustomModal>
  );
};
export const Feedback = props => {
  const {order, onOkPress, onCancelPress, isModalVisible} = props;
  return (
    <CustomModal isModalVisible={isModalVisible}>
      <View style={commonStyles.modalContainer}>
        <CustomText isBold style={commonStyles.flatListContainer}>
          {constants.ORDER_DEL_CONF.replace('!', order?.orderID)
            .replace('@', order?.shopName)
            .replace('$', order?.orderDateTime.split(' ')[0])}
        </CustomText>
        <View style={commonStyles.buttonModalContainer}>
          <Button isRed title={constants.NO} onPress={onCancelPress} />
          <Button isGreen title={constants.YES} onPress={onOkPress} />
        </View>
      </View>
    </CustomModal>
  );
};
