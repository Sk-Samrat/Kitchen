import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputLayout } from 'rn-textinputlayout';
import { Dropdown } from 'react-native-material-dropdown';
//import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import icons from './icons';
import colors from './colors';
import constants from '../../utils/constants';
import { dynamicSize, getFontSize } from './responsive';
import commonStyles, {
  primaryColor,
  removedOrderColor,
  primaryBackgroundColor,
  secondaryColor,
  inactiveColor,
  cardBackgroundColor,
  colorGreen,
  colorRed,
  commonTextSize,
} from './commonStyles';
const { width } = Dimensions.get('window');

export const CustomText = props => {
  const {
    isBold,
    isItalic,
    isInverse,
    isLink,
    isInfo,
    isError,
    children,
    style,
    onPress,
    isCut,
  } = props;
  return (
    <Text
      onPress={onPress}
      style={[
        commonStyles.commonText,
        isBold
          ? commonStyles.boldText
          : isItalic
            ? commonStyles.italicText
            : isLink
              ? commonStyles.linkText
              : commonStyles.commonText,
        {
          color: isInfo
            ? primaryColor
            : isError
              ? colors.red
              : isInverse && colors.white,
          alignSelf: isInfo && 'center',
          textDecorationLine: isCut ? 'line-through' : null,
          textDecorationStyle: isCut ? 'solid' : null,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const Button = props => {
  const {
    title,
    style,
    textStyle,
    onPress,
    isInverseStyle,
    isInactive,
    isRed,
    isGreen,
  } = props;
  const buttonColor = () => {
    return isInverseStyle
      ? { backgroundColor: secondaryColor }
      : isInactive
        ? { backgroundColor: inactiveColor }
        : isRed
          ? { backgroundColor: colors.red }
          : isGreen
            ? { backgroundColor: colors.green }
            : null;
  };
  return (
    <TouchableOpacity
      style={[commonStyles.buttonContainer, buttonColor(), style]}
      onPress={isInactive ? () => { } : onPress}>
      <CustomText
        isBold
        style={[
          commonStyles.buttonText,
          isInverseStyle ? { color: primaryColor } : null,
          isInactive ? { color: secondaryColor } : null,
          textStyle,
        ]}>
        {title || constants.SUBMIT.toUpperCase()}
      </CustomText>
    </TouchableOpacity>
  );
};

export const SplashButton = props => {
  const {
    title,
    style,
    textStyle,
    onPress,
    isInverseStyle,
    isInactive,
    isRed,
    isGreen,
    isTrans,
  } = props;
  const buttonColor = () => {
    return isInverseStyle
      ? { backgroundColor: secondaryColor }
      : isInactive
        ? { backgroundColor: inactiveColor }
        : isRed
          ? { backgroundColor: colors.red }
          : isGreen
            ? { backgroundColor: 'rgba(0, 100, 0, 0.5)' }
            : isTrans
              ? { backgroundColor: 'rgba(52, 52, 52, 0.5)' }
              : null;
  };
  return (
    <TouchableOpacity
      style={[commonStyles.splashButtonContainer, buttonColor(), style]}
      onPress={isInactive ? () => { } : onPress}>
      <CustomText
        isBold
        style={[
          commonStyles.splashButtonText,
          isInverseStyle ? { color: primaryColor } : null,
          isInactive ? { color: secondaryColor } : null,
          textStyle,
        ]}>
        {title || constants.SUBMIT.toUpperCase()}
      </CustomText>
    </TouchableOpacity>
  );
};

export const Input = React.forwardRef((props, ref) => {
  const {
    placeholder,
    maxLength,
    autoFocus,
    returnKeyType,
    returnTypeLabel,
    keyboardType,
    layoutStyle,
    viewStyle,
    errorMessage,
    readonly,
    twoElement,
    threeElement,
    isModal,
    isBGColor,
    isRequired,
    isWithIcon,
    isLogin,
  } = props;
  return (
    <View
      style={[
        {
          width:
            width -
            (twoElement
              ? dynamicSize(205)
              : threeElement
                ? dynamicSize(270)
                : isModal
                  ? dynamicSize(50)
                  : isWithIcon
                    ? dynamicSize(70)
                    : isLogin
                      ? dynamicSize(40)
                      : dynamicSize(35)),
          alignSelf: 'center',
          paddingStart: dynamicSize(15),
          paddingEnd: dynamicSize(15),
        },
        viewStyle,
      ]}>
      <TextInputLayout
        style={[
          commonStyles.inputView,
          {
            width: '100%',
            backgroundColor: isBGColor ? isBGColor : null,
          },
          layoutStyle,
        ]}
        focusColor={isLogin ? colors.black : '#a0a0a0'}
        hintColor={isRequired ? colorRed : isLogin ? colors.black : null}
        errorColor={colorRed}>
        <TextInput
          style={isLogin ? commonStyles.loginInputText : commonStyles.boldText}
          {...props}
          ref={ref}
          keyboardType={keyboardType || 'default'}
          placeholder={
            placeholder && isRequired ? placeholder.concat(' *') : placeholder
          }
          autoCorrect={false}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType || 'next'}
          returnKeyLabel={returnTypeLabel || 'next'}
          editable={!readonly}
          maxLength={maxLength}
        />
      </TextInputLayout>
      <React.Fragment>
        {!threeElement && (
          <CustomText style={commonStyles.errorText}>{errorMessage}</CustomText>
        )}
      </React.Fragment>
    </View>
  );
});

export const CommonView = ({ children, style }) => {
  const disableKeyboard = () => {
    Keyboard.dismiss;
  };
  return (
    <View style={commonStyles.mainContainer}>
      <TouchableWithoutFeedback onPress={disableKeyboard}>
        <KeyboardAwareScrollView
          contentContainerStyle={[commonStyles.keyboardContainer, style]}
        //showsVerticalScrollIndicator={false}
        >
          {children}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const ImageWithLabel = props => {
  const { source, label, onPress, style, textStyle, children, isInverse } = props;
  return (
    <TouchableOpacity
      style={[commonStyles.imageContainer, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Image
        source={source}
        resizeMode="contain"
        style={[
          isInverse ? commonStyles.inverseImageTheme : commonStyles.imageTheme,
          style,
        ]}
      />
      {label && (
        <CustomText
          isInverse={isInverse}
          style={[commonStyles.imageLabel, textStyle]}>
          {label}
        </CustomText>
      )}
      {children}
    </TouchableOpacity>
  );
};

export const CustomDropDown = props => {
  const {
    data,
    label,
    value,
    error,
    onChange,
    style,
    twoElement,
    isModal,
    isLogin,
  } = props;
  return (
    <Dropdown
      placeholderTextColor={isLogin ? colors.black : '#C7C7CD'}
      value={value}
      containerStyle={[
        commonStyles.dropDownContainer,
        {
          paddingEnd: dynamicSize(15),
          paddingStart: dynamicSize(15),
          alignSelf: 'center',
          width:
            width -
            (twoElement
              ? dynamicSize(205)
              : isModal
                ? dynamicSize(50)
                : dynamicSize(35)),
        },
        style,
      ]}
      style={commonStyles.boldText}
      fontSize={isLogin ? getFontSize(15) : getFontSize(12)}
      error={error}
      label={label ? label : ''}
      data={data}
      placeholder={constants.PLEASE_SELECT}
      onChangeText={onChange}
    />
  );
};

export const TouchableIcon = ({
  onPress,
  icon,
  containerStyle,
  imageStyle,
  label,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image source={icon} resizeMode="contain" style={imageStyle} />
      {label && (
        <View>
          <CustomText style={textStyle}>{label}</CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const Loader = props => {
  const { isLoading } = props;
  return (
    <CustomModal isModalVisible={isLoading}>
      <ActivityIndicator size={'large'} color={primaryColor} />
    </CustomModal>
  );
};

export const CustomModal = props => {
  const { isModalVisible, children, onRequestClose } = props;
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </View>
    </Modal>
  );
};

export const SmallDropDown = props => {
  const {
    data,
    label,
    value,
    error,
    onChange,
    style,
    isHeader,
    placeholder,
  } = props;
  return (
    <Dropdown
      placeholderTextColor={'#C7C7CD'}
      value={value}
      dropdownPosition={0}
      containerStyle={[
        commonStyles.dropDownContainer,
        {
          paddingEnd: dynamicSize(5),
          width: width - (isHeader ? dynamicSize(250) : dynamicSize(300)),
        },
        style,
      ]}
      style={[
        isHeader ? commonStyles.inverseBoldText : commonStyles.commonText,
        { fontSize: isHeader ? getFontSize(16) : getFontSize(13) },
      ]}
      itemColor={primaryColor}
      selectedItemColor="green"
      fontSize={isHeader ? getFontSize(16) : getFontSize(13)}
      error={error}
      label={label ? label : ''}
      data={data}
      placeholder={placeholder ? placeholder : constants.PLEASE_SELECT}
      onChangeText={onChange}
      baseColor={isHeader ? secondaryColor : primaryColor}
    />
  );
};

export const OtpText = React.forwardRef((props, ref) => {
  const { onFocus, onBlur, returnKeyType, returnTypeLabel, autoFocus } = props;
  return (
    <View style={commonStyles.optContainer}>
      <TextInput
        {...props}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        style={commonStyles.otpTextStyle}
        keyboardType="number-pad"
        maxLength={1}
        returnKeyType={returnKeyType || 'next'}
        returnKeyLabel={returnTypeLabel || 'next'}
      />
    </View>
  );
});

export const CollapsableHeader = props => {
  const { onPress, isCollapsed, label } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        commonStyles.tableHeader,
        {
          backgroundColor: primaryColor,
        },
      ]}>
      {onPress && (
        <TableCell
          onPress={onPress}
          textStyle={commonStyles.commonText}
          style={{ ...commonStyles.row, flex: 0.1 }}>
          <TouchableIcon
            containerStyle={{ alignSelf: 'center' }}
            onPress={onPress}
            icon={isCollapsed ? icons.downArrow : icons.nextArrow}
            imageStyle={{ alignSelf: 'center', tintColor: secondaryColor }}
          />
        </TableCell>
      )}
      <TableCell
        text={label}
        textStyle={[
          commonStyles.boldText,
          commonStyles.secondaryColor,
          { alignSelf: 'flex-start' },
        ]}
        style={{ flex: onPress ? 0.9 : 1 }}
        onPress={onPress && onPress}
      />
    </TouchableOpacity>
  );
};

export const TableCell = props => {
  const { text, style, textStyle, children, onPress } = props;
  return (
    <TouchableOpacity
      style={[commonStyles.singleCell, style]}
      onPress={onPress}>
      {text !== null && (
        <CustomText isBold style={[commonStyles.tableheaderText, textStyle]}>
          {text}
        </CustomText>
      )}
      {children}
    </TouchableOpacity>
  );
};

export const TabImage = props => {
  const {
    focused,
    icon,
    deFocusColor,
    deFocusIcon,
    styles,
    isCartFilled,
  } = props;
  return (
    <Image
      source={focused ? icon : deFocusIcon ? deFocusIcon : icon}
      resizeMode="contain"
      style={[
        styles,
        {
          tintColor: isCartFilled
            ? colors.green
            : focused
              ? colors.blue
              : deFocusColor
                ? deFocusColor
                : colors.blue,
        },
      ]}
    />
  );
};
export const DrawerTile = props => {
  const { title, onPress, source, style } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[commonStyles.drawerTileContainer, style]}>
      {source ? (
        <Image
          source={source}
          resizeMode="contain"
          style={commonStyles.drawerTileIcon}
        />
      ) : null}
      <CustomText
        isBold
        style={[
          commonStyles.drawerTileText,
          { marginHorizontal: source ? 0 : dynamicSize(15) },
        ]}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};
// class Example extends Component {
//   render() {
//     let data = [{
//       value: 'Banana',
//     }, {
//       value: 'Mango',
//     }, {
//       value: 'Pear',
//     }];

//     return (
//       <Dropdown
//         label='Favorite Fruit'
//         data={data}
//       />
//     );
//   }
// }