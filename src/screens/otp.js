import React, {useState, useRef} from 'react';
import {
  CommonView,
  Button,
  OtpText,
  CustomText,
} from '../common/components/customComponents';
import commonStyles from '../common/components/commonStyles';
import constants from '../utils/constants';
import {validateNumber} from '../common/components/validation';
// import {ShowErrorToast} from '../common/components/helper';
export const OTP = props => {
  const ref1 = useRef('I1');
  const ref2 = useRef('I2');
  const ref3 = useRef('I3');
  const ref4 = useRef('I4');
  const ref5 = useRef('I5');
  const ref6 = useRef('I6');
  const {onSubmit, isVisible, text} = props;
  const [textField, setText] = useState({
    I1: '',
    I2: '',
    I3: '',
    I4: '',
    I5: '',
    I6: '',
  });
  const _onChange = type => text => {
    if (type === 'I1') {
      setText({...textField, I1: text});
      const _validateI1 = validateNumber(text);
      if (_validateI1.status) ref2.current.focus();
      else {
        setText({...textField, I1: ''});
        // ShowErrorToast(_validateI1.error);
      }
    }
    if (type === 'I2') {
      setText({...textField, I2: text});
      if (text.trim() === '') ref1.current.focus();
      const _validateI2 = validateNumber(text);
      if (_validateI2.status) ref3.current.focus();
      else {
        setText({...textField, I2: ''});
        // ShowErrorToast(_validateI2.error);
      }
    }
    if (type === 'I3') {
      setText({...textField, I3: text});
      if (text.trim() === '') ref2.current.focus();
      const _validateI3 = validateNumber(text);
      if (_validateI3.status) ref4.current.focus();
      else {
        setText({...textField, I3: ''});
        // ShowErrorToast(_validateI3.error);
      }
    }
    if (type === 'I4') {
      setText({...textField, I4: text});
      if (text.trim() === '') ref3.current.focus();
      const _validateI4 = validateNumber(text);
      if (_validateI4.status) ref5.current.focus();
      else {
        setText({...textField, I4: ''});
        // ShowErrorToast(_validateI4.error);
      }
    }
    if (type === 'I5') {
      setText({...textField, I5: text});
      if (text.trim() === '') ref4.current.focus();
      const _validateI5 = validateNumber(text);
      if (_validateI5.status) ref6.current.focus();
      else {
        setText({...textField, I5: ''});
        // ShowErrorToast(_validateI5.error);
      }
    }
    if (type === 'I6') {
      setText({...textField, I6: text});
      if (text.trim() === '') ref5.current.focus();
      const _validateI6 = validateNumber(text);
      if (_validateI6.status) ref6.current.focus();
      else {
        setText({...textField, I6: ''});
        // ShowErrorToast(_validateI6.error);
      }
    }
  };
  const _focusToNext = type => () => {
    if (type === 'I1') ref2.current.focus();
    else if (type === 'I2') ref3.current.focus();
    else if (type === 'I3') ref4.current.focus();
    else if (type === 'I4') ref5.current.focus();
    else if (type === 'I5') ref6.current.focus();
  };
  const _onSubmit = () => {
    const _otp = `${textField.I1}${textField.I2}${textField.I3}${textField.I4}${
      textField.I5
    }${textField.I6}`;
    setText({
      I1: '',
      I2: '',
      I3: '',
      I4: '',
      I5: '',
      I6: '',
    });
    onSubmit(_otp);
  };
  return (
    <React.Fragment>
      {isVisible && (
        <React.Fragment>
          <CommonView style={[commonStyles.container, commonStyles.row]}>
            <CustomText isBold isInfo>
              {text}
            </CustomText>
          </CommonView>
          <CommonView style={[commonStyles.mainContainer, commonStyles.row]}>
            <OtpText
              key="1"
              ref={ref1}
              value={textField.I1}
              onSubmitEditing={_focusToNext('I1')}
              onChangeText={_onChange('I1')}
              blurOnSubmit={false}
            />
            <OtpText
              key="2"
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  ref1.current.focus();
                }
              }}
              ref={ref2}
              value={textField.I2}
              onSubmitEditing={_focusToNext('I2')}
              onChangeText={_onChange('I2')}
              blurOnSubmit={false}
            />
            <OtpText
              key="3"
              ref={ref3}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  ref2.current.focus();
                }
              }}
              value={textField.I3}
              onSubmitEditing={_focusToNext('I3')}
              onChangeText={_onChange('I3')}
              blurOnSubmit={false}
            />
            <OtpText
              key="4"
              ref={ref4}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  ref3.current.focus();
                }
              }}
              value={textField.I4}
              onSubmitEditing={_focusToNext('I4')}
              onChangeText={_onChange('I4')}
              blurOnSubmit={false}
            />
            <OtpText
              key="5"
              ref={ref5}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  ref4.current.focus();
                }
              }}
              value={textField.I5}
              onSubmitEditing={_focusToNext('I5')}
              onChangeText={_onChange('I5')}
              blurOnSubmit={false}
            />
            <OtpText
              key="6"
              ref={ref6}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  ref5.current.focus();
                }
              }}
              value={textField.I6}
              onSubmitEditing={_focusToNext('I6')}
              onChangeText={_onChange('I6')}
              blurOnSubmit={false}
            />
          </CommonView>
          <CommonView>
            <Button
              title={constants.SUBMIT}
              style={commonStyles.buttonThird}
              onPress={_onSubmit}
              isInactive={
                textField.I1 === '' ||
                textField.I2 === '' ||
                textField.I3 === '' ||
                textField.I4 === '' ||
                textField.I5 === '' ||
                textField.I6 === ''
              }
            />
          </CommonView>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default OTP;
