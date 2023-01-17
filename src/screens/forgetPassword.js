import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native';

import colors from '../common/components/colors';
import Button from '../common/components/button';
import Input from '../common/components/input';
import Loader from '../common/components/loader';

const ForgetPassword = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        // if (!inputs.email) {
        //     handleError('Please input email', 'email');
        //     isValid = false;
        // } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        //     handleError('Please input a valid email', 'email');
        //     isValid = false;
        // }

        // if (!inputs.fullname) {
        //     handleError('Please input fullname', 'fullname');
        //     isValid = false;
        // }

        if (!inputs.phone) {
            handleError('Please input phone number', 'phone');
            isValid = false;
        } else if (inputs.phone.length < 10 || inputs.phone.length > 10) {
            handleError('Please enter a valid phone number', 'phone');
            isValid = false;
        }

        // if (!inputs.password) {
        //     handleError('Please input password', 'password');
        //     isValid = false;
        // } else if (inputs.password.length < 8) {
        //     handleError('Min password length of 8', 'password');
        //     isValid = false;
        // } else if (!strongRegex.test(inputs.password)) {
        //     handleError('Please enter a password with symbols,numbers and one capital letter', 'password');
        //     isValid = false;
        // }

        if (isValid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                AsyncStorage.setItem('userData', JSON.stringify(inputs));
                navigation.navigate('OTPScreen', { param: 'forget' });
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    return (
        <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: colors.black, fontSize: 40, fontWeight: 'bold' }}>
                    Forget Password
                </Text>
                {/* <Text style={{ color: colors.grey, fontSize: 18, marginVertical: 10 }}>
                    Enter Your Details to Register
                </Text> */}
                <View style={{ marginVertical: 20 }}>
                    {/* <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'fullname')}
                        onFocus={() => handleError(null, 'fullname')}
                        iconName="account-outline"
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={errors.fullname}
                    /> */}

                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'phone')}
                        onFocus={() => handleError(null, 'phone')}
                        iconName="phone-outline"
                        label="Phone Number"
                        placeholder="Enter your phone no"
                        error={errors.phone}
                    />
                    {/* <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    /> */}
                    <Button title="Register" onPress={validate} />
                    <Text
                        onPress={() => navigation.navigate('SignInSignUp')}
                        style={{
                            color: colors.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Already have account ?Login
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgetPassword;