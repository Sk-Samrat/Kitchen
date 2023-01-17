import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import Video from 'react-native-video';

import colors from '../common/components/colors';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const heightScreen = Dimensions.get('window').height;

const widthScreen = Dimensions.get('window').width;

const GetStarted = ({ navigation }) => {

    const videoRef = useRef();

    return (
        <View style={styles.videoView}>
            <Video
                // source={{ uri: 'https://media.istockphoto.com/id/1350407001/video/healthy-grocery-shopping.mp4?s=mp4-640x640-is&k=20&c=9FcIoqDJtZuWviBNAYBexgF2-_-zQndFACAMF3_e9Hw=' }}   // Can be a URL or a local file.
                // source={{ uri: 'https://media.istockphoto.com/id/1149454102/video/bag-of-different-fresh-vegetables.mp4?s=mp4-640x640-is&k=20&c=6YGo6xcLqsEpiSN8Ej1juYbJ3XgvzRumbTgWie9Q6Jg=' }}   // Can be a URL or a local file.
                // source={require('../assets/images/pexels-grocery2.mp4')}   // Can be a URL or a local file.
                source={{ uri: 'https://player.vimeo.com/external/504244509.hd.mp4?s=a930e26b341c88fb8156bf43e915f4a2588e5509&profile_id=174&oauth2_token_id=57447761' }} // Can be a URL or a local file.
                ref={videoRef}                                    // Store reference
                onBuffer={() => { }}                // Callback when remote video is buffering
                onError={() => { }}               // Callback when video cannot be loaded
                style={styles.backgroundVideo}
                resizeMode={'cover'}
                repeat={true}
            />
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ alignItems: 'center', marginTop: 30, }}>
                    <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 25, color: colors.white }}>
                        Welcome to <Text style={{ color: colors.violet }}>Cloud Kitchen</Text>
                    </Text>
                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 20, color: colors.darkGrey, marginTop: 10, paddingHorizontal: 50, }}>
                        Tasty meals delivered to your
                    </Text>
                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 20, color: colors.darkGrey , }}>
                        doorstep 
                    </Text>
                </View>
                <View style={styles.textView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('SignInSignUp');
                        }}
                        style={styles.textButton}
                    >
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 20, color: colors.white }}>Let's Get Started</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        // width: widthScreen,
        // height: heightScreen,
        // backgroundColor: '#000',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    videoView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    textView: {
        // justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
        // flex:0.4,
        marginBottom: 70,
        // elevation: 20,
        flexDirection: 'column-reverse',
        flex: 1,
    },
    textButton: {
        backgroundColor: colors.violet,
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 50,
    }
});

export default GetStarted;