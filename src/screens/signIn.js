import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import colors from '../common/components/colors';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const SignIn = ({ navigation }) => {

    const widthCategory = Dimensions.get('window').width / 3 + 20;

    const [categoryIndex, setCategoryIndex] = useState(0);
    const [foodCategory, setFoodCategory] = useState('Sign In');

    const categories = ['Sign In', 'Sign Up'];

    const [text, onChangeText] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    useEffect(() => {
        GoogleSignin.configure()
    }, []);

    const onChangePhone = (number) => {
        setPhoneNumber(number)
    }

    const onChangePassword = (text) => {
        setPassword(text)
    }

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!text.trim()) {
            alert('Please enter the username');
            return;
        }
        //Check for the Email TextInput
        if (!password.trim()) {
            alert('Please enter password');
            return;
        }
        //Checked Successfully
        //Do whatever you want
        //alert('Success');
        navigation.navigate('Home');
    };

    const checkTextInputPhone = () => {
        let num = password.replace(".", '');
        if (isNaN(num)) {
            alert('This is not a number')// Its not a number
            return;
        }
        else if (!phonenumber.trim()) {
            alert('Please enter the phone number')
            return;
        }
        alert('Success');
        navigation.navigate('OTPScreen', { param: 'create' })
    }

    const CategoryList = () => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.categoryContainer}>
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            // style={{ marginRight: 10 }}
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => {
                                setCategoryIndex(index);
                                setFoodCategory(item);
                            }}
                        >
                            {categoryIndex === index ?
                                (<View style={{ width: widthCategory, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: colors.violet, }}>
                                    <Text style={styles.categoryTextSelected}>{item}</Text>
                                </View>) :
                                (<View style={{ width: widthCategory, alignItems: 'center', }}>
                                    <Text style={styles.categoryText}>{item}</Text>
                                </View>)
                            }
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

        );
    };

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();
            // this.setState({ userInfo });
            console.log({userInfo})   
            navigation.navigate('Home');     
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(error);
            } else {
                // some other error happened
                console.log(error);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            {/* <ScrollView> */}
            {/* <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'height'}
                style={styles.containerAvoidingView}
            > */}
            <View style={styles.imageContainer}>
                {foodCategory == 'Sign In' ?
                    <Image
                        source={require('../assets/images/fastfood-3-removebg.png')}
                        style={styles.imageIconSignIn}
                    />
                    : <Image
                        source={require('../assets/images/fastfood-3-removebg.png')}
                        style={styles.imageIconSignUp}
                    />}
            </View>

            {/* <View style={{ flex: 1 }}> */}
            <View style={{ flex: 1.5 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: widthScreen }}>
                    <CategoryList />
                </View>
                {foodCategory == 'Sign In' ?
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 17, marginHorizontal: 10, color: colors.black, marginVertical: 5, }}>Username</Text>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder='Enter UserName'
                            />
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 17, marginHorizontal: 10, color: colors.black, marginVertical: 5, }}>Password</Text>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder='Enter Password'
                                // keyboardType='visible-password'
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-end', marginHorizontal: 10, marginTop: 10 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { navigation.navigate('ForgetPasswordScreen'); }}
                            //style={{ alignItems: 'flex-end', marginHorizontal: 10, marginTop: 10 }}
                            >
                                <Text>Forget Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={checkTextInput}
                                style={{ backgroundColor: colors.violet, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, elevation: 10, width: 200, }}
                            >
                                <Text style={{ color: colors.white, fontSize: 17, fontWeight: '800' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        {/* <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 17, marginHorizontal: 10, color: colors.black, marginVertical: 5, }}>Username</Text>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                    placeholder='Enter UserName'
                                />
                            </View> */}
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 17, marginHorizontal: 10, color: colors.black, marginVertical: 5, }}>Phone Number</Text>
                        <View style={styles.searchContainer}>
                            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: colors.white }}>
                                <Text style={{ paddingHorizontal: 10 }}>{"+ 91"}</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                keyboardType="number-pad"
                                onChangeText={onChangePhone}
                                value={phonenumber}
                                placeholder='Enter Contact Number'
                            />
                        </View>
                        {/* <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { }}
                                style={{ alignItems: 'flex-end', marginHorizontal: 10 }}
                            >
                                <Text>Forget Password?</Text>
                            </TouchableOpacity> */}
                        {/* <View
                                style={{ alignItems: 'flex-end', marginHorizontal: 10, marginTop: 10 }}
                            >
                                <Text></Text>
                            </View> */}
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={checkTextInputPhone}
                                // onPress={() => { navigation.navigate('OTPScreen'); }}
                                style={{ backgroundColor: colors.violet, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, elevation: 10, width: 200 }}
                            >
                                <Text style={{ color: colors.white, fontSize: 17, fontWeight: '800' }}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                <View style={{ flex: 0.5 }}>
                    {/* <View style={{ width: widthScreen, height: heightScreen / 4 }}> */}
                    <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: colors.lightGrey, width: widthScreen / 2 - 40 }}></View>
                        <Text style={{ color: colors.black, fontSize: 17, marginHorizontal: 10, top: 8, fontWeight: '800' }}>OR</Text>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: colors.lightGrey, width: widthScreen / 2 - 20 }}></View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={{ fontSize: 17, color: colors.black, fontWeight: '500' }}>Sign Up using</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ width: 50, height: 50, borderRadius: 20, elevation: 10 }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={googleSignIn}
                            >
                                <Image
                                    source={require('../assets/images/google-logo.png')}
                                    style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 20, elevation: 10 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 20, width: 50, height: 50, borderRadius: 20, elevation: 10 }}>
                            <Image
                                source={require('../assets/images/facebook-logo.png')}
                                style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 20, elevation: 10 }}
                            />
                        </View>
                        <View style={{ width: 50, height: 50, borderRadius: 20, elevation: 10 }}>
                            <Image
                                source={require('../assets/images/twitter-logo.png')}
                                style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 20, elevation: 10 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
            {/* </View> */}
            {/* </KeyboardAvoidingView> */}
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        // width: widthScreen,
        // height: heightScreen / 4 - 20,
        // backgroundColor: colors.smoke,
        flex: 0.5,
        //backgroundColor: colors.badRed
    },
    imageIconSignIn: {
        // flex: 1,
        width: widthScreen,
        height: heightScreen / 4 + 40,
        resizeMode: "contain",
        top: -50,
        left: -150,
    },
    imageIconSignUp: {
        //flex: 1,
        width: widthScreen,
        height: heightScreen / 4 + 40,
        resizeMode: "contain",
        top: -50,
        right: -130,
    },
    categoryContainer: {
        flexDirection: 'row',
        // marginTop: 20,
        // marginBottom: 0,
        justifyContent: 'space-between',
        width: widthScreen,
        // backgroundColor: 'red'
        // alignItems: 'baseline',
        paddingHorizontal: 50,
        //marginLeft: 10,
        //flex: 1,
        // backgroundColor: colors.badRed,
    },
    categoryText: {
        fontSize: 17,
        color: 'grey',
        fontFamily: 'FredokaOne-Regular',
        // marginHorizontal: 20,
        // backgroundColor: 'yellow',
        //justifyContent: 'space-between',
    },
    categoryTextSelected: {
        color: colors.violet,
        paddingBottom: 5,
        // borderBottomWidth: 2,
        // borderColor: colors.violet,
        fontFamily: 'FredokaOne-Regular',
        fontSize: 20,
        // marginHorizontal: 20,
    },
    // input: {
    //     height: 40,
    //     marginHorizontal: 10,
    //     // borderWidth: 1,
    //     padding: 10,
    //     elevation: 1,
    //     // borderRadius: 5,
    // },
    searchContainer: {
        height: 50,
        backgroundColor: colors.lightGreyWhite,
        borderRadius: 5,
        // flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        // elevation: 2,
        // shadowColor: colors.lightGrey,
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    input: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        color: colors.black,
        marginHorizontal: 10,
        // marginVertical:10,
        padding: 10,
        borderRadius: 5,
    },
    containerAvoidingView: {
        flex: 1,
        // padding: 10,
        // alignItems: 'center',
        backgroundColor: colors.badRed
    },
});

export default SignIn;