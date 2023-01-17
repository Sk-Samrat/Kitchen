import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import commonStyles from '../common/components/commonStyles';
import Header from '../common/components/header';
import {
  CustomText,
  CustomDropDown,
  Input,
  CommonView,
  CommonViewNoPadding,
  Button,
  ImageWithLabel,
  Loader,
  CollapsableHeader,
} from '../common/components/customComponents';
import {CustomAlert} from '../common/components/customAlert';
import {ProfileAction, EditProfileAction} from '../common/action/actions';
import constants from '../utils/constants';
import icons from '../common/components/icons';
import {useDispatch, useSelector} from 'react-redux';
import {apiKeys} from '../services/serviceConstants';
import {getProductCategories, userLog} from '../common/action/actions';
import {
  validateName,
  validateEmail,
  validateAge,
  validateDistance,
} from '../common/components/validation';
import {
  getData,
  ShowToast,
  ShowErrorToast,
  storeData,
} from '../common/components/helper';
import localKey from '../utils/localStorage';
import {ScrollView} from 'react-native-gesture-handler';
const MODULE_NAME = 'EditProfile';
const EditProfile = ({navigation}) => {
  const userDetails = useSelector(state => {
    return state.profileReducer.userDetails;
  });
  const dispatch = useDispatch();

  const fnameRef = useRef('fname');
  const lnameRef = useRef('lname');
  const emailRef = useRef('email');
  const ageRef = useRef('age');
  const heightRef = useRef('height');
  const weightRef = useRef('weight');
  const distanceRef = useRef('distanceRef');

  const [userID, setUserId] = useState(0);
  const [roleID, setRole] = useState(0);
  const [loader, setLoader] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    age: '',
    distance: '',
    firstNameStatus: true,
    lastNameStatus: true,
    emailIdStatus: true,
    ageStatus: true,
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
    gender: '',
    language: '',
    distance: '',
  });
  const [helpInDelivery, setDeliveryHelp] = useState(true);
  const [isActive, setActive] = useState(true);
  const [allCategories, setCategories] = useState([]);
  const [isPIICollapsed, setPIICollapsed] = useState(false);
  const [isCatCollapsed, setCatCollapsed] = useState(true);
  const [isBCollapsed, setBCollapsed] = useState(true);
  const [warning, setWarning] = useState({text: '', isWarning: false});
  useEffect(() => {
    fetchUserProfile();
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const _userID = await getData(localKey.USER_ID);
      const _roleID = await getData(localKey.ROLE_ID);
      let _lang = await getData(localKey.USER_LANGUAGE);
      _lang = _lang ? parseInt(JSON.parse(_lang)?.value) : null;
      let _country = await getData(localKey.USER_COUNTRY);
      _country = _country ? parseInt(JSON.parse(_country)?.value) : null;
      let param = {
        [apiKeys.GET_CATEGORY_PARAMS.USER_ID]: parseInt(_userID),
        [apiKeys.GET_CATEGORY_PARAMS.LANGUAGE_ID]: _lang,
        [apiKeys.GET_CATEGORY_PARAMS.COUNTRY_ID]: _country,
        [apiKeys.GET_CATEGORY_PARAMS.SELLER_MOBILE]: parseInt(_userID),
      };
      if (parseInt(_roleID) === 2) {
        const response = await getProductCategories(param);
        if (
          response.status &&
          response.data &&
          response.data.results &&
          response.data.results.length > 0
        ) {
          setCategories(response.data.results);
          setLoader(false);
        } else {
          setLoader(false);
        }
      }
    } catch (error) {
      await userLog(error.toString(), MODULE_NAME, 'itemlist/getcategory');
      setLoader(false);
    }
  };
  const populateDetails = (userId, userDetails) => {
    setText({
      firstName: userDetails?.firstName
        ? userDetails?.firstName.toString()
        : '',
      lastName: userDetails?.lastName ? userDetails?.lastName.toString() : '',
      mobile: userId.toString(),
      gender: userDetails?.gender ? userDetails?.gender : '',
      emailId:
        userDetails?.email && userDetails?.email !== 'null'
          ? userDetails?.email.toString()
          : '',
      age: userDetails?.age ? userDetails?.age.toString() : '',
      habbit: userDetails?.foodHabbit ? userDetails?.foodHabbit : '',
      height: userDetails?.height ? userDetails?.height.toString() : '',
      weight: userDetails?.weight ? userDetails?.weight.toString() : '',
      language: userDetails?.languageID ? userDetails?.languageID : '',
      distance: userDetails?.deliveryDistance
        ? userDetails?.deliveryDistance.toString()
        : '',
    });
    setDeliveryHelp(
      userDetails && userDetails.doDelivery
        ? userDetails.doDelivery * 1 === 1
          ? true
          : false
        : false,
    );
    setActive(
      userDetails && userDetails?.isShopOpen
        ? userDetails?.isShopOpen * 1 === 1
          ? true
          : false
        : false,
    );
  };
  const fetchUserProfile = async () => {
    try {
      setLoader(true);
      const _userID = await getData(localKey.USER_ID);
      const _roleID = await getData(localKey.ROLE_ID);
      const _langs = await getData(localKey.ALL_LANGUAGES);
      setLanguages(
        _langs
          ? JSON.parse(_langs)?.length > 0
            ? JSON.parse(_langs)
            : []
          : [],
      );
      setUserId(parseInt(_userID)), setRole(parseInt(_roleID));
      if (
        userDetails &&
        userDetails.firstName &&
        userDetails.firstName !== ''
      ) {
        populateDetails(parseInt(_userID), userDetails);
        setLoader(false);
      } else {
        const param = {
          [apiKeys.PROFILE_VIEW_PARAMS.USER_ID]: parseInt(_userID),
          [apiKeys.PROFILE_VIEW_PARAMS.ROLE_ID]: parseInt(_roleID),
        };
        const response = await ProfileAction(param, dispatch);
        if (response.status) {
          const {data} = response;
          if (data) {
            populateDetails(parseInt(_userID), data);
            setLoader(false);
          }
        } else {
          setLoader(false);
          ShowErrorToast(response.message);
        }
      }
    } catch {
      await userLog(error.toString(), MODULE_NAME, 'user/profileview');
      setLoader(false);
      navigation.popToTop();
    }
  };
  const _focusToNext = type => () => {
    if (type === 'age') fnameRef.current.focus();
    else if (type === 'fname') lnameRef.current.focus();
    else if (type === 'lname') emailRef.current.focus();
    else if (type === 'email')
      roleID === 2 ? distanceRef.current.focus() : heightRef.current.focus();
    else if (type === 'height') weightRef.current.focus();
  };
  const _onChange = type => text => {
    if (type === 'fname') {
      setText({...textField, firstName: text});
      const _validateFirstName = validateName(text);
      if (_validateFirstName['status'])
        setError({...error, firstName: '', firstNameStatus: true});
      else
        setError({
          ...error,
          firstName: _validateFirstName['error'],
          firstNameStatus: false,
        });
    } else if (type === 'lname') {
      setText({...textField, lastName: text});
    } else if (type === 'age') {
      const _validateAge = validateAge(text);
      if (_validateAge['status'] || text.trim() === '')
        setError({...error, age: '', ageStatus: true});
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
      setText({...textField, emailId: text});
      const _validateEmail = validateEmail(text);
      if (_validateEmail['status'] || text.trim() === '')
        setError({...error, emailId: '', emailIdStatus: true});
      else
        setError({
          ...error,
          emailId: _validateEmail['error'],
          emailIdStatus: false,
        });
    } else if (type === 'height') {
      setText({...textField, height: text});
    } else if (type === 'weight') {
      setText({...textField, weight: text});
    } else if (type === 'distance') {
      const _validateDistance = validateDistance(text);
      if (
        _validateDistance['status'] ||
        (text.trim() === '' && !helpInDelivery)
      )
        setError({...error, distance: '', distanceStatus: true});
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
  const _onChangeDropDown = type => (value, index, data) => {
    if (type === 'gender') {
      setText({...textField, gender: value});
    } else if (type === 'age') {
      setText({...textField, age: value});
    } else if (type === 'habbit') {
      setText({...textField, habbit: value});
    } else if (type === 'language') {
      setText({...textField, language: value});
    }
  };
  const _toggleRadio = type => {
    if (type === 'delivery') {
      !helpInDelivery
        ? setError({
            ...error,
            distanceStatus: false,
            distance: constants.WARNING.DISTANCE_INV,
          })
        : setError({
            ...error,
            distanceStatus: true,
            distance: '',
          });
      setDeliveryHelp(helpInDelivery ? false : true);
    } else if (type === 'active') setActive(isActive ? false : true);
  };
  const _validate = () => {
    error.firstNameStatus
      ? error.emailIdStatus
        ? error.ageStatus
          ? error.distanceStatus
            ? _onSave()
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
  const _onSave = async () => {
    try {
      let _cat = [];
      allCategories.forEach(e => {
        if (e.isUserCategory === 1) {
          _cat.push(e.categoryID);
        }
      });
      if (roleID === 2 && _cat.length < 1) {
        setWarning({text: constants.WARNING.CATEGORY, isWarning: true});
        return;
      }
      setLoader(true);
      let param = {
        [apiKeys.UPDATE_PROFILE_PARAMS.USER_ID]: userID,
        [apiKeys.UPDATE_PROFILE_PARAMS.ROLE_ID]: roleID,
        [apiKeys.UPDATE_PROFILE_PARAMS.FIRST_NAME]: textField.firstName,
        [apiKeys.UPDATE_PROFILE_PARAMS.LAST_NAME]: textField.lastName,
        [apiKeys.UPDATE_PROFILE_PARAMS.GENDER]: textField.gender,
        [apiKeys.UPDATE_PROFILE_PARAMS.EMAIL]: textField.emailId,
        [apiKeys.UPDATE_PROFILE_PARAMS.FOOD_HABBIT]: textField.habbit,
        [apiKeys.UPDATE_PROFILE_PARAMS.HEIGHT]:
          textField.height && textField.height !== ''
            ? parseInt(textField.height)
            : 0,
        [apiKeys.UPDATE_PROFILE_PARAMS.WEIGHT]:
          textField.weight && textField.weight !== ''
            ? parseInt(textField.weight)
            : 0,
        [apiKeys.UPDATE_PROFILE_PARAMS.AGE]:
          textField.age && textField.age !== '' ? parseInt(textField.age) : 0,
        [apiKeys.UPDATE_PROFILE_PARAMS.DO_DELIVERY]: helpInDelivery ? 1 : 0,
        [apiKeys.UPDATE_PROFILE_PARAMS.SHOP_NAME]:
          roleID === 2 ? userDetails.shopName : null,
        [apiKeys.UPDATE_PROFILE_PARAMS.LANGUAGE_ID]:
          languages.length > 0
            ? parseInt(textField.language)
            : parseInt(userDetails.language),
        [apiKeys.UPDATE_PROFILE_PARAMS.PROMOCODE]: userDetails.promoCode,
        [apiKeys.UPDATE_PROFILE_PARAMS.IS_SHOP_OPEN]: isActive ? 1 : 0,
        [apiKeys.UPDATE_PROFILE_PARAMS.DEL_DISTANCE]:
          roleID === 2 ? parseInt(textField.distance) : 0,
        [apiKeys.UPDATE_PROFILE_PARAMS.CATEGORIES]:
          roleID === 2 && _cat && _cat.length > 0 ? JSON.stringify(_cat) : null,
      };
      const response = await EditProfileAction(param, dispatch);
      if (response.status) {
        storeData(
          localKey.USER_NAME,
          textField.firstName.concat(' ').concat(textField.lastName),
        );
        setLoader(false);
        ShowToast(response.message), navigation.pop();
      } else {
        setLoader(false);
        ShowErrorToast(response.message);
      }
    } catch (error) {
      await userLog(error.toString(), MODULE_NAME, 'user/profileupdate');
    }
  };
  const _renderPersonal = () => {
    return (
      <React.Fragment>
        <View style={commonStyles.row}>
          <Input
            value={textField.mobile}
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

        <View style={commonStyles.row}>
          <Input
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
        <Input
          ref={emailRef}
          value={textField.emailId}
          onSubmitEditing={_focusToNext('email')}
          placeholder={constants.EMAIL}
          onChangeText={_onChange('email')}
          keyboardType="email-address"
          blurOnSubmit={false}
          errorMessage={error['emailId']}
        />
        {languages.length > 0 ? (
          <CustomDropDown
            data={languages}
            label="Languages"
            value={
              languages.find(e => e.value * 1 === textField.language * 1)?.value
            }
            onChange={_onChangeDropDown('language')}
          />
        ) : null}
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
            twoElement={roleID === 1}
          />
          {roleID === 1 ? (
            <CustomDropDown
              data={constants.AVAILABLE_MEALS}
              value={
                constants.AVAILABLE_MEALS.find(
                  e => e.value === textField.habbit,
                )?.value
              }
              onChange={_onChangeDropDown('habbit')}
              label="Food Habbit"
              twoElement
            />
          ) : null}
        </View>
        {roleID === 1 ? (
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
        {userDetails?.promoCode ? (
          <Input
            value={userDetails?.promoCode}
            placeholder={constants.PROMOCODE}
            readonly
          />
        ) : null}
      </React.Fragment>
    );
  };
  const _renderShop = () => {
    return (
      <React.Fragment>
        <CommonView keyboardShouldPersistTaps={'handled'}>
          <View
            style={[
              commonStyles.cardRowContainer,
              commonStyles.flatListContainer,
            ]}>
            <View style={[commonStyles.cardRowDataContainer, {flex: 3}]}>
              <CustomText isBold>{constants.NEED_HELP}</CustomText>
            </View>
            <View style={[commonStyles.cardRowCenterContainer, {flex: 0.02}]}>
              <CustomText>:</CustomText>
            </View>
            <View style={[commonStyles.cardRowDataContainer, {flex: 1}]}>
              <ImageWithLabel
                onPress={() => _toggleRadio('delivery')}
                source={helpInDelivery ? icons.checkBox : icons.unCheckBox}
              />
            </View>
          </View>
          <View
            style={[
              commonStyles.cardRowContainer,
              commonStyles.flatListContainer,
            ]}>
            <View style={[commonStyles.cardRowDataContainer, {flex: 3}]}>
              <CustomText isBold>{constants.ACCEPT_ORDER}</CustomText>
            </View>
            <View style={[commonStyles.cardRowCenterContainer, {flex: 0.02}]}>
              <CustomText>:</CustomText>
            </View>
            <View style={[commonStyles.cardRowDataContainer, {flex: 1}]}>
              <ImageWithLabel
                onPress={() => _toggleRadio('active')}
                source={isActive ? icons.checkBox : icons.unCheckBox}
              />
            </View>
          </View>

          <Input
            value={userDetails?.shopName}
            placeholder={constants.SHOP_NAME}
            readonly
          />
          <Input
            isRequired={helpInDelivery}
            ref={distanceRef}
            value={textField.distance}
            placeholder={constants.DEL_DIST}
            onSubmitEditing={_focusToNext('distance')}
            onChangeText={_onChange('distance')}
            keyboardType="numeric"
            blurOnSubmit={false}
            errorMessage={error.distance}
          />
        </CommonView>
      </React.Fragment>
    );
  };
  const _seperator = () => {
    return <View style={commonStyles.productCardSeparator} />;
  };
  const _toggleCategory = item => {
    if (item.categoryID != constants.SELLER_CAT_NO) {
      let _allCats = [...allCategories];
      let _index = _allCats.findIndex(e => e.categoryID === item.categoryID);
      _allCats[_index].isUserCategory =
        _allCats[_index].isUserCategory === 0 ? 1 : 0;
      setCategories(_allCats);
    } else {
      ShowToast(constants.WARNING.CATEGORY_OWN);
    }
  };
  const _renderEachCategories = ({item, index}) => {
    return (
      <View style={commonStyles.categoryCheckContainer}>
        <ImageWithLabel
          onPress={() => _toggleCategory(item)}
          source={
            item.isUserCategory && item.isUserCategory.toString() === '1'
              ? icons.checkBox
              : icons.unCheckBox
          }
          label={item.category}
          textStyle={commonStyles.commonText}
        />
      </View>
    );
  };
  const _renderCategories = () => {
    return (
      <React.Fragment>
        <FlatList
          data={allCategories}
          key={'searchResult'}
          contentContainerStyle={commonStyles.flatListContainer}
          //ItemSeparatorComponent={_seperator}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={_renderEmpty}
          renderItem={_renderEachCategories}
          keyExtractor={_keyExtractor}
          columnWrapperStyle={commonStyles.spaceBetweenCard}
        />
      </React.Fragment>
    );
  };
  const _renderEmpty = () => {
    return <CustomText isInfo>{constants.NO_SELLER}</CustomText>;
  };
  const _keyExtractor = (item, index) => index.toString();
  return (
    <React.Fragment>
      <Loader isLoading={loader} />
      <CustomAlert
        isModalVisible={warning.isWarning}
        isCancelHidden
        onOkPress={() => {
          setWarning({text: '', isWarning: false});
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
          {roleID === 2 && (
            <React.Fragment>
              <CollapsableHeader
                label={constants.BUSINESS_INFO}
                isCollapsed={false}
              />
              {_renderShop()}
              <CollapsableHeader
                label={constants.CAT_INFO}
                isCollapsed={false}
              />
              {_renderCategories()}
            </React.Fragment>
          )}
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
  return (
    <React.Fragment>
      <Loader isLoading={loader} />
      <CustomAlert
        isModalVisible={warning.isWarning}
        isCancelHidden
        onOkPress={() => {
          setWarning({text: '', isWarning: false});
        }}
        text={warning.text}
      />
      {!loader && roleID !== 0 && (
        <View style={[commonStyles.container, {paddingHorizontal: null}]}>
          <CollapsableHeader
            label={constants.PERSONAL_INFO}
            isCollapsed={isPIICollapsed}
            onPress={() => {
              if (isPIICollapsed) {
                setCatCollapsed(true);
                setBCollapsed(true);
              }
              setPIICollapsed(isPIICollapsed ? false : true);
            }}
          />
          {!isPIICollapsed && _renderPersonal()}
          {roleID === 2 && (
            <CollapsableHeader
              label={constants.BUSINESS_INFO}
              isCollapsed={isBCollapsed}
              onPress={() => {
                if (isBCollapsed) {
                  setPIICollapsed(true);
                  setCatCollapsed(true);
                }
                setBCollapsed(isBCollapsed ? false : true);
              }}
            />
          )}
          {!isBCollapsed && _renderShop()}
          {roleID === 2 && (
            <CollapsableHeader
              label={constants.CAT_INFO}
              isCollapsed={isCatCollapsed}
              onPress={() => {
                if (isCatCollapsed) {
                  setPIICollapsed(true);
                  setBCollapsed(true);
                }
                setCatCollapsed(isCatCollapsed ? false : true);
              }}
            />
          )}
          {!isCatCollapsed && _renderCategories()}
          <Button
            isGreen
            title={constants.UPDATE}
            style={commonStyles.buttonThird}
            onPress={_validate}
          />
        </View>
      )}
    </React.Fragment>
  );
};

EditProfile.navigationOptions = ({navigation}) => {
  const {state} = navigation;
  const params = state.params || {};
  return {
    header: () => (
      <Header
        isBack={true}
        firstLabel={constants.HEAD_PROFILE_UPDATE}
        navigation={navigation}
      />
    ),
  };
};

export default EditProfile;
