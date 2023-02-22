import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import React from 'react';
import colors from './colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import globalStyle from './globalStyle';

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
    const translateYImage = new Animated.Value(40);

    Animated.timing(translateYImage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
    }).start();

    return (
        <View style={globalStyle.sliderContainer}>
            <View style={{ height: height / 4, width: '100%', backgroundColor: 'yellow' }}>
                <Animated.Image
                    source={{ uri: item.url }}
                    // resizeMode="contain"
                    style={[
                        globalStyle.imageSlider,
                        {
                            transform: [
                                {
                                    translateY: translateYImage,
                                },
                            ],
                        },
                    ]}
                />
            </View>

            {/* <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View> */}
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <View>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2), color: colors.black }}>{item.title}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2), color: colors.black, }}>{'\u20B9'}{item.price}</Text>
                        <View style={{ flexDirection: 'row', backgroundColor: colors.violet, borderRadius: 5, padding: 5 }}>
                            <Icon name="remove-outline" size={responsiveWidth(4)} color={colors.white} />
                            <Text style={{ color: colors.white, marginHorizontal: 10, fontSize: responsiveFontSize(1.5) }}>1</Text>
                            <Icon name="add-outline" size={responsiveWidth(4)} color={colors.white} />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', marginBottom: 2, fontSize: responsiveFontSize(1.5), color: colors.black }}>Description</Text>
                        <Text style={{ fontWeight: '500', marginBottom: 5, fontSize: responsiveFontSize(1.5), color: colors.black }}>{item.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    // sliderContainer: {
    //     width,
    //     height: '75%',
    //     // alignItems: 'center',
    //     backgroundColor: colors.shadow,
    // },
    // imageSlider: {
    //     // flex: 0.6,
    //     height: height / 4,
    //     width: '100%',
    // },
    // content: {
    //     // flex: 0.4,
    //     height: height / 4,
    //     width: '100%',
    //     // alignItems: 'center',
    //     backgroundColor: 'violet',
    // },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#333',
    // },
    // description: {
    //     fontSize: 18,
    //     marginVertical: 12,
    //     color: '#333',
    // },
    // price: {
    //     fontSize: 32,
    //     fontWeight: 'bold',
    // },
});