import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

import colors from '../common/components/colors';

const widthScreen = Dimensions.get('window').width;

const heightScreen = Dimensions.get('window').height;

const OtpDetails = ({ navigation,route }) => {

    const status = route.params.param;

    let clockCall = null;
    const defaultCountdown = 30;
    const [countdown, setCountdown] = useState(defaultCountdown);
    const [enableResend, setEnableResend] = useState(false);

    useEffect(() => {
        console.log('param ',status);
    },[]);

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    });

    const decrementClock = () => {
        if (countdown === 0) {
            setEnableResend(true)
            setCountdown(0)
            clearInterval(clockCall)
        } else {
            setCountdown(countdown - 1);
        }
    }

    const pin1ref = useRef('null');
    const pin2ref = useRef('null');
    const pin3ref = useRef('null');
    const pin4ref = useRef('null');
    const pin5ref = useRef('null');
    const pin6ref = useRef('null');

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');
    const [pin6, setPin6] = useState('');

    const onResendOTP = () => {
        if (enableResend) {
            setCountdown(defaultCountdown);
            setEnableResend(false);
            clearInterval(clockCall);
            clockCall = setInterval(() => {
                decrementClock()
            }, 1000)
        }
    }

    const onPressHandler =()=>{
        if(status!=='forget'){
            navigation.navigate('Profile');
        }else{
            navigation.navigate('ChangePasswordScreen');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={{ marginVertical: 50, fontSize: 16, fontWeight: '600', color: colors.black }}>{"Enter the OTP send via SMS"}</Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center', width: widthScreen, backgroundColor: colors.goodGreen }}>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={pin1ref}
                            keyboardType='number-pad'
                            maxLength={1}
                            onChangeText={(pin1) => {
                                setPin1(pin1);
                                if (pin1 != '') {
                                    pin2ref.current.focus();
                                }
                            }}
                            style={styles.textInputText}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={pin2ref}
                            keyboardType='number-pad'
                            maxLength={1}
                            onChangeText={(pin2) => {
                                setPin2(pin2);
                                if (pin2 != '') {
                                    pin3ref.current.focus();
                                }
                            }}
                            style={styles.textInputText}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={pin3ref}
                            keyboardType='number-pad'
                            maxLength={1}
                            onChangeText={(pin3) => {
                                setPin3(pin3);
                                if (pin3 != '') {
                                    pin4ref.current.focus();
                                }
                            }}
                            style={styles.textInputText}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={pin4ref}
                            keyboardType='number-pad'
                            maxLength={1}
                            onChangeText={(pin4) => {
                                setPin4(pin4);
                                if (pin4 != '') {
                                    pin5ref.current.focus();
                                }
                            }}
                            style={styles.textInputText}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={pin5ref}
                            keyboardType='number-pad'
                            maxLength={1}
                            onChangeText={(pin5) => {
                                setPin5(pin5);
                                if (pin5 != '') {
                                    pin6ref.current.focus();
                                }
                            }}
                            style={styles.textInputText}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            ref={pin6ref}
                            keyboardType='number-pad'
                            maxLength={1}
                            onChangeText={(pin6) => {
                                setPin6(pin6);
                            }}
                            style={styles.textInputText}
                        />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity>
                        <View style={styles.btnChangeNumber}>
                            <Text style={styles.textChange}>Change Number</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.btnResend}>
                            <Text style={styles.textResend}>Resend OTP(24)</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            {/* <View style={{ flex: 1 }}> */}
            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.black, textAlign: 'center', marginVertical: 50 }}>{"Enter the OTP send via SMS"}</Text>
            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={pin1ref}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(pin1) => {
                            setPin1(pin1);
                            if (pin1 != '') {
                                pin2ref.current.focus();
                            }
                        }}
                        style={styles.textInputText}
                    />
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={pin2ref}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(pin2) => {
                            setPin2(pin2);
                            if (pin2 != '') {
                                pin3ref.current.focus();
                            }
                        }}
                        style={styles.textInputText}
                    />
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={pin3ref}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(pin3) => {
                            setPin3(pin3);
                            if (pin3 != '') {
                                pin4ref.current.focus();
                            }
                        }}
                        style={styles.textInputText}
                    />
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={pin4ref}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(pin4) => {
                            setPin4(pin4);
                            if (pin4 != '') {
                                pin5ref.current.focus();
                            }
                        }}
                        style={styles.textInputText}
                    />
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={pin5ref}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(pin5) => {
                            setPin5(pin5);
                            if (pin5 != '') {
                                pin6ref.current.focus();
                            }
                        }}
                        style={styles.textInputText}
                    />
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={pin6ref}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(pin6) => {
                            setPin6(pin6);
                        }}
                        style={styles.textInputText}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center',}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={() => { navigation.navigate('Profile'); }}
                    onPress={onPressHandler}
                    style={{ backgroundColor: colors.violet, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, elevation: 10, width: 200, }}
                >
                    <Text style={{ color: colors.white, fontSize: 17, fontWeight: '800' }}>Verify</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
                {/* <View style={{ backgroundColor: colors.blue }}> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.goBack(); }}
                    style={{ marginLeft: 20, }}
                >
                    <Text style={styles.textChange}>{"Change Number"}</Text>
                </TouchableOpacity>
                {/* </View> */}
                {/* <View style={{ backgroundColor: colors.darkGrey }}> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onResendOTP}
                    style={{ marginRight: 20, }}
                >
                    <Text style={[styles.textResend, { color: enableResend ? colors.violet : colors.darkGrey }]}>Resend OTP({countdown})</Text>
                </TouchableOpacity>
                {/* </View> */}
            </View>
            {/* <View style={styles.bottomView}>
                    <TouchableOpacity>
                        <View style={styles.btnChangeNumber}>
                            <Text style={styles.textChange}>Change Number</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.btnResend}>
                            <Text style={styles.textResend}>Resend OTP(24)</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            {/* </View> */}
            {/* </KeyboardAvoidingView> */}
        </View>
    );
};

const styles = StyleSheet.create({
    textInputView: {
        // borderWidth: 1,
        width: 50,
        backgroundColor: colors.white,
        elevation: 10,
        borderRadius: 5,
        // textAlign: 'center',
        alignItems: 'center',
        // justifyContent:'center'
    },
    textInputText: {
        fontSize: 17,
        textAlign: 'center'
    },
    containerAvoidingView: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.badRed
    },
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 50,
        alignItems: 'flex-end',
        backgroundColor: colors.red
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textChange: {
        color: colors.violet,
        alignItems: 'center',
        fontSize: 16
    },
    btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textResend: {
        alignItems: 'center',
        fontSize: 16
    }
})

export default OtpDetails;