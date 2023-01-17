import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import localKey from '../utils/localStorage';
// import {apiKeys} from '../services/serviceConstants';
// import {getValue, userFeedback, userLog} from '../common/action/actions';
import {
  CustomText,
  CustomDropDown,
  Button,
  Loader,
  Input,
} from '../common/components/customComponents';
// import {getData, ShowToast, ShowErrorToast} from '../common/components/helper';
import commonStyles from '../common/components/commonStyles';
import constants from '../utils/constants';
import {requireField, validateMobileNo} from '../common/components/validation';
const MODULE_NAME = 'ContactUs';
const ContactUs = ({navigation}) => {
  const selectedOptionFromParam = navigation.getParam('option');
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState();
  const [contactTypes, setContactType] = useState([]);
  const [error, setError] = useState({
    mobile: '',
    comment: '',
    mobileStatus: true,
    commentStatus: false,
  });
  const [textField, setText] = useState({
    mobile: '',
    contactType: selectedOptionFromParam
      ? parseInt(selectedOptionFromParam)
      : 1,
    comment: '',
  });
  useEffect(() => {
    _onLoad();
  }, []);
  const _onChange = type => text => {
    if (type === 'comment') {
      setText({...textField, comment: text});
      const _validateComment = requireField(text);
      if (_validateComment['status'])
        setError({...error, comment: '', commentStatus: true});
      else
        setError({
          ...error,
          comment: _validateComment['error'],
          commentStatus: false,
        });
    } else if (type === 'mobile') {
      setText({...textField, mobile: text});
      const _validateMobile = validateMobileNo(text);
      if (_validateMobile['status'])
        setError({...error, mobile: '', mobileStatus: true});
      else
        setError({
          ...error,
          mobile: _validateMobile['error'],
          mobileStatus: false,
        });
    }
  };
  const _onChangeDropDown = type => (value, index, data) => {
    if (type === 'contactType') setText({...textField, contactType: value});
  };
  const _onLoad = async () => {
    try {
      setLoader(true);
      const _userId = await getData(localKey.USER_ID);
      if (_userId) {
        setUser({_userId});
        setText({...textField, mobile: _userId});
      }
      let param = {
        [apiKeys.KEY_NAME]: 'contact',
      };
      const response = await getValue(param);
      if (
        response.status &&
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        let op = [];
        response.data.results.map(e => {
          op.push({label: e.langValue, value: e.langNo});
        });
        setContactType(op);
        setLoader(false);
      } else {
        ShowErrorToast(constants.ERROR.GEN);
        setLoader(false);
        navigation.popToTop();
      }
    } catch (error) {
      await userLog(error.toString(), MODULE_NAME, 'user/getKeyValue');
      setLoader(false);
      ShowErrorToast(constants.ERROR.GEN);
      navigation.popToTop();
    }
  };
  const _onSave = async () => {
    try {
      setLoader(true);
      let param = {
        [apiKeys.CONTACT_US_PARAMS.USER_ID]: parseInt(textField.mobile),
        [apiKeys.CONTACT_US_PARAMS.REASON_CODE]: parseInt(
          textField.contactType,
        ),
        [apiKeys.CONTACT_US_PARAMS.COMMENTS]: JSON.stringify(textField.comment),
      };
      const response = await userFeedback(param);
      if (response.status) {
        setLoader(false);
        ShowToast(response.message);
        navigation.popToTop();
      } else {
        setLoader(false);
        ShowErrorToast(constants.ERROR.GEN);
        navigation.popToTop();
      }
    } catch (error) {
      await userLog(error.toString(), MODULE_NAME, 'user/contactus');
      setLoader(false);
      ShowErrorToast(constants.ERROR.GEN);
      navigation.popToTop();
    }
  };
  const _validate = () => {
    error.mobileStatus
      ? error.commentStatus
        ? _onSave()
        : setError({
            ...error,
            comment: constants.WARNING.FEEDBACK,
            commentStatus: false,
          })
      : setError({
          ...error,
          mobile: constants.WARNING.MOBILE_INV,
          mobileStatus: false,
        });
  };
  return (
    <React.Fragment>
      <Loader isLoading={loader} />
      <View style={commonStyles.container}>
        <Input
          value={textField.mobile}
          placeholder={constants.MOBILE_NO}
          onChangeText={_onChange('mobile')}
          keyboardType="phone-pad"
          blurOnSubmit={false}
          errorMessage={error.mobile}
          readonly={user && user != ''}
        />
        {selectedOptionFromParam && textField.contactType === 3 ? (
          <Input
            value={
              contactTypes.find(e => e.value * 1 === textField.contactType * 1)
                ?.label
            }
            placeholder={constants.FEEDBACK_TYPE}
            readonly
          />
        ) : (
          <CustomDropDown
            data={contactTypes}
            label={constants.FEEDBACK_TYPE}
            value={
              contactTypes.find(e => e.value * 1 === textField.contactType * 1)
                ?.value
            }
            onChange={_onChangeDropDown('contactType')}
          />
        )}
        <TextInput
          multiline
          numberOfLines={10}
          maxLength={100}
          placeholder={constants.GIVE_FEEDBACK}
          style={commonStyles.textMultiContainer}
          onChangeText={_onChange('comment')}
        />
        <CustomText
          style={[commonStyles.errorText, commonStyles.textErrorContainer]}>
          {error.comment}
        </CustomText>
        <Button
          isGreen
          title={constants.SUBMIT}
          style={commonStyles.buttonThird}
          onPress={_validate}
        />
      </View>
    </React.Fragment>
  );
};
export default ContactUs;
