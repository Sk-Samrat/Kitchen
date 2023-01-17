import React, {useState, useEffect} from 'react';
//import {getData, storeData} from '../../common/components/helper';
import localKey from '../../utils/localStorage';
import {View} from 'react-native';
import {
  TouchableIcon,
  SmallDropDown,
  CustomText,
} from '../components/customComponents';
import icons from '../components/icons';
import commonStyles from '../components/commonStyles';
import {dynamicSize} from './responsive';
import constants from '../../utils/constants';
var Events = require('react-native-simple-events');
import LinearGradient from 'react-native-linear-gradient';
const Header = props => {
  const {
    isBack,
    secondLabel,
    isProfile,
    isEdit,
    navigation,
    isDrawer,
    firstLabel,
    isSecondLabel,
    style,
    isLogout,
    isAdd,
    onAddPress,
    onEditPress,
    isSearch,
    onSearchPress,
    isSave,
    onSavePress,
    isCall,
    onCallPress,
    isLanguage,
    isPayment,
    onPayment,
    isAddUser,
    onAddUser,
    isNotification,
    onNotificationPress,
    isPdf,
    onPDFPress,
  } = props;
  const [user, setUser] = useState({});
  const [allLanguages, setLanguages] = useState([]);
  useEffect(() => {
    // const GetUser = async () => {
    //   const userId = await getData(localKey.USER_ID);
    //   const userName = await getData(localKey.USER_NAME);
    //   const roleId = await getData(localKey.ROLE_ID);
    //   const regAdd = await getData(localKey.REG_ADD);
    //   const lang = await getData(localKey.USER_LANGUAGE);
    //   const allLang = await getData(localKey.ALL_LANGUAGES);
    //   setLanguages(JSON.parse(allLang));
    //   setUser({
    //     userId: userId,
    //     userName: userName,
    //     roleId: roleId,
    //     regAdd: regAdd,
    //     lang: lang ? JSON.parse(lang) : {},
    //   });
    // };
    // GetUser();
  }, []);
  const triggerLanguageChangeEvent = lang => {
    Events.trigger('LanguageChanged', lang);
  };
  const goBack = () => navigation.goBack();
  const openDrawer = () => navigation.toggleDrawer();
  const profileOnPress = () => {
    navigation.navigate({
      routeName: 'profileOption',
      params: {
        user: user,
      },
    });
  };
  const editOnPress = () => {
    navigation.navigate({
      routeName: 'editProfile',
      params: {
        user: user,
      },
    });
  };
  const onLanguageChange = value => {
    storeData(
      localKey.USER_LANGUAGE,
      JSON.stringify(allLanguages.find(e => e.value === value)),
    );
    triggerLanguageChangeEvent(allLanguages.find(e => e.value === value));
  };
  const onLocalNotificationPress = () => {
    navigation.navigate({
      routeName: 'Notification',
      params: {
        user: user,
      },
    });
  };
  return (
    <LinearGradient
      style={[commonStyles.appHeaderContainer, style]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#7d2657', '#3b5998']}>
      {isBack && (
        <TouchableIcon
          onPress={goBack}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', left: 0},
          ]}
          icon={icons.backIcon}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      <CustomText isBold style={commonStyles.appHeaderNameStyle}>
        {`${firstLabel} ${isSecondLabel ? '- '.concat(secondLabel) : ''}`}
      </CustomText>
      {isDrawer && (
        <TouchableIcon
          onPress={openDrawer}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', left: 0},
          ]}
          icon={icons.drawerIcon}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isEdit && (
        <TouchableIcon
          onPress={onEditPress ? onEditPress : editOnPress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: 0},
          ]}
          icon={icons.editIcon}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isProfile && (
        <TouchableIcon
          onPress={profileOnPress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: 0},
          ]}
          icon={icons.profile}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isLogout && (
        <TouchableIcon
          onPress={() => navigation.navigate('logOut')}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: 0},
          ]}
          icon={icons.logout}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isAdd && (
        <TouchableIcon
          onPress={onAddPress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: 0},
          ]}
          icon={icons.addIcon}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isCall && (
        <TouchableIcon
          onPress={onCallPress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: 0},
          ]}
          icon={icons.phone}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isPdf && (
        <TouchableIcon
          onPress={onPDFPress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: isCall ? dynamicSize(50) : 0},
          ]}
          icon={icons.pdf}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isSearch && (
        <TouchableIcon
          onPress={onSearchPress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {
              position: 'absolute',
              right: isAdd || isProfile ? dynamicSize(50) : 0,
            },
          ]}
          icon={icons.searchIcon}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isSave && (
        <TouchableIcon
          onPress={onSavePress}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: isAdd ? dynamicSize(100) : 0},
          ]}
          icon={icons.save_alt}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isLanguage && (
        <SmallDropDown
          isHeader
          label={constants.SELECT_SEARCH_LANGUAGE}
          value={user.lang?.value}
          data={allLanguages}
          onChange={onLanguageChange}
          style={[{position: 'absolute', right: 0, alignSelf: 'center'}]}
          placeholder={constants.SELECT}
        />
      )}
      {isPayment && user && parseInt(user.roleId) === 2 && (
        <TouchableIcon
          onPress={onPayment}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {
              position: 'absolute',
              right: isAddUser ? dynamicSize(100) : 0,
            },
          ]}
          icon={icons.payment}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isAddUser && user && parseInt(user.roleId) === 2 && (
        <TouchableIcon
          onPress={onAddUser}
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {
              position: 'absolute',
              right: isSearch ? dynamicSize(50) : 0,
            },
          ]}
          icon={icons.addUser}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
      {isNotification && (
        <TouchableIcon
          onPress={
            onNotificationPress ? onNotificationPress : onLocalNotificationPress
          }
          containerStyle={[
            commonStyles.appHeaderLeftView,
            {position: 'absolute', right: isProfile ? dynamicSize(50) : 0},
          ]}
          icon={icons.bell}
          imageStyle={commonStyles.appHeaderIconStyle}
        />
      )}
    </LinearGradient>
  );
};
export default Header;
