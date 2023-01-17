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

const ChangePassword = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        password: '',
        confirmpassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 8) {
            handleError('Min password length of 8', 'password');
            isValid = false;
        } else if (!strongRegex.test(inputs.password)) {
            handleError('Please enter a password with symbols,numbers and one capital letter', 'password');
            isValid = false;
        }

        if (!inputs.confirmpassword) {
            handleError('Please input password', 'confirmpassword');
            isValid = false;
        } else if (inputs.password !== inputs.confirmpassword) {
            handleError('Password mismatch', 'confirmpassword');
            isValid = false;
        }

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
                navigation.navigate('SignInSignUp');
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
                {/* <Text style={{ color: colors.black, fontSize: 40, fontWeight: 'bold' }}>
                    Register
                </Text> */}
                <Text style={{ color: colors.grey, fontSize: 18, marginVertical: 10 }}>
                    Enter new password
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'confirmpassword')}
                        onFocus={() => handleError(null, 'confirmpassword')}
                        iconName="lock-outline"
                        label="Confirm Password"
                        placeholder="Enter your password"
                        error={errors.confirmpassword}
                        password
                    />
                    <Button title="Register" onPress={validate} />
                    {/* <Text
                        onPress={() => navigation.navigate('SignInSignUp')}
                        style={{
                            color: colors.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Already have account ?Login
                    </Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangePassword;