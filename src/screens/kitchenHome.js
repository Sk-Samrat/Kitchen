import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList,
    Image,
    ActivityIndicator,
    PixelRatio
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-community/voice';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import Header from "../common/components/headerBar";
import colors from "../common/components/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyData } from "../../data/data";
import Carousel from "../common/components/carousel";
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";

const heightHomeUpperContent = Dimensions.get('window').height / 5;
const heightCard = Dimensions.get('window').height;

const width = Dimensions.get('window').width / 3 - 50;
const totalWidth = Dimensions.get('window').width;

const widthPopular = Dimensions.get('window').width / 2 - 60;
const heightPopular = Dimensions.get('window').height / 8;

const widthPopularSize = PixelRatio.getPixelSizeForLayoutSize(widthPopular);

const heightPopularSize = PixelRatio.getPixelSizeForLayoutSize(heightCard);

let apidata = [{
    product_name: 'Food',
    product_price: 25,
    main_image: 'food-1.png',
    product_id: '1',
    product_category: 'Food'
}, {
    product_name: 'Vegetable',
    product_price: 25,
    main_image: 'vegetables-1.png',
    product_id: '2',
    product_category: 'Veg'
}, {
    product_name: 'Fruit',
    product_price: 25,
    main_image: 'fruits-1.png',
    product_id: '3',
    product_category: 'Fruit'
}, {
    product_name: 'Meat',
    product_price: 25,
    main_image: 'meat-1.png',
    product_id: '4',
    product_category: 'Meat'
}, {
    product_name: 'Fish',
    product_price: 25,
    main_image: 'fish-1.png',
    product_id: '5',
    product_category: 'Fish'
}, {
    product_name: 'Bevarage',
    product_price: 25,
    main_image: 'drinks-1.png',
    product_id: '6',
    product_category: 'Bevarage'
}];

// let offerdata = [{
//   offer_name: 'Food',
//   offer_id: '11'
// }, {
//   offer_name: 'Food',
//   offer_id: '12'
// }, {
//   offer_name: 'Food',
//   offer_id: '13'
// }, {
//   offer_name: 'Food',
//   offer_id: '14'
// }]

const imagesIcon = {
    imageObject: {
        '1': require('../assets/images/food-1.png'),
        '2': require('../assets/images/vegetables-4.png'),
        '3': require('../assets/images/fruits-1.png'),
        '4': require('../assets/images/meat-2.png'),
        '5': require('../assets/images/fish-1.png'),
        '6': require('../assets/images/drinks-2.png'),
        '11': require('../assets/images/offer-1.jpg'),
        '12': require('../assets/images/offer-2.jpg'),
        '13': require('../assets/images/offer-3.jpg'),
        '14': require('../assets/images/food-coupons.jpg'),
    }
}

const Home = ({ navigation }) => {

    const [result, setResult] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])

    useEffect(() => {
        console.log("Height :", heightCard);
        console.log("Total Width :", totalWidth);
        console.log("WidthPopular :", widthPopular);
        console.log("widthPopularSize :", widthPopularSize);
        console.log("heightPopularSize :", heightPopularSize);
    }, [])

    const onSpeechStartHandler = (e) => {
        console.log("start handler==>>>", e);
    }
    const onSpeechEndHandler = (e) => {
        setLoading(false)
        console.log("stop handler", e);
    }

    const onSpeechResultsHandler = (e) => {
        let text = e.value[0];
        setResult(text);
        console.log("speech result handler", e);
    }

    const startRecording = async () => {
        setLoading(true);
        try {
            await Voice.start('en-Us');
        } catch (error) {
            console.log("error raised", error);
        }
    }

    const stopRecording = async () => {
        setLoading(false);
        try {
            await Voice.stop();
        } catch (error) {
            console.log("error raised", error);
        }
    }

    const Card = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('FoodItem', {
                        item_category: item.product_category,
                        // item_category: 'food',
                        item_name: item.product_name,
                        // item_name: 'fish',
                    });
                }}
            >
                <View style={styles.card}>
                    <View
                        style={{
                            // height: 80,
                            // height: heightCard / 15,
                            height:responsiveHeight(8),
                            alignItems: 'center',
                        }}>
                        <Image
                            //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                            // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
                            // source={require('../assets/images/food-1.png')}
                            source={imagesIcon.imageObject[item.product_id]}
                            style={styles.icon}
                        //style={{ flex: 1, resizeMode: 'contain' }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        // height: 25,
                        // width: 25,
                        // backgroundColor: colors.green,
                        // borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                    }}>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: responsiveFontSize(2), color: colors.black, }}>
                        {item.product_name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const CardPopular = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('PopularFood', {
                        item_category: item.product_category,
                    });
                }}
            >
                <View style={styles.cardPopular}>
                    <View
                        style={{
                            // height: 300,
                            // height: heightCard / 6,
                            flex: 1,
                            // height: heightPopularSize,
                            // height: responsiveHeight(15),
                            alignItems: 'center',
                            flexDirection: 'row',
                            // backgroundColor: colors.badRed,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <Image
                            //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                            // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
                            // source={require('../assets/images/food-1.png')}
                            source={images.imageObject[item.product_code]}
                            //resizeMode='contain'
                            // style={styles.iconPopular}
                            style={{ flex: 1, resizeMode: 'contain'}}
                        />
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Icon name="heart-outline" size={responsiveWidth(5)} color='#694fad' />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, }}>
                            {item.product_name}
                        </Text>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, }}>
                            {'\u20B9'}{item.product_price}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <Header title="Home"
                onPressMenu={() => navigation.getParent('LeftDrawer').openDrawer()}
            />
            <View style={{ flex: 1 }}>
                <View style={{ height:responsiveHeight(21) ,marginHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2.5), color: colors.black }}>Hi </Text>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2.5), color: colors.black }}>Samrat,</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => { navigation.getParent('RightDrawer').openDrawer(); }}
                            >
                                <Icon name="person-circle-sharp" size={responsiveWidth(7)} color={colors.darkGrey} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text
                            style={{ fontFamily: 'DynaPuff-SemiBold', fontSize: responsiveFontSize(3), }}
                        >
                            What would you like to <Text style={{ color: colors.violet }}>eat</Text> today?
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={styles.searchContainer}>
                            <Icon name="search-outline" size={responsiveWidth(6)} style={{ marginLeft: 10 }} />
                            {/* <FontAwesomeIcon icon="fa-thin fa-magnifying-glass" size={25} style={{ marginLeft: 20 }}/> */}
                            <TextInput
                                style={styles.input}
                                value={result}
                                placeholder="Search for resturant, item and more"
                                onChangeText={text => setResult(text)}
                            />
                            {isLoading ? (<ActivityIndicator size="large" color="red" />) :
                                (<TouchableOpacity
                                    activeOpacity={0.8}
                                    // style={{backgroundColor:'red',alignItems:'center',justifyContent:'center'}}
                                    onPress={startRecording}
                                >
                                    <Icon name="mic-outline" size={responsiveWidth(6)} style={{ marginRight: 20 }} />
                                </TouchableOpacity>)}
                        </View>
                        <View style={styles.sortBtn}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={stopRecording}
                            >
                                <Icon name="filter-outline" size={responsiveWidth(6)} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 3, backgroundColor: colors.smoke }}>
                    <ScrollView >
                        <View style={{ flex: 1, marginBottom: 10, marginHorizontal: 20, }}>
                            <FlatList
                                // columnWrapperStyle={{ justifyContent: 'space-between' }}
                                // showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                //vertical
                                horizontal
                                contentContainerStyle={{
                                    marginTop: 10,
                                    // backgroundColor: '#000',
                                    // paddingBottom: 10,
                                    //flex:0,
                                }}
                                // numColumns={3}
                                data={apidata}
                                renderItem={({ item }) => {
                                    return <Card item={item} />;
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2.5), color: colors.black, marginHorizontal: 20, }}>Today's Special Offer</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                // onPress={() => navigation.navigate('OfferItem')}
                                onPress={() => {
                                    navigation.navigate('OfferItem', {
                                        item_id: '1',
                                    });
                                }}
                            >
                                <View style={{ marginTop: 20, }}>
                                    <Carousel data={dummyData} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2.5), color: colors.black, marginHorizontal: 20, }}>Popular Now</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('PopularFood')}
                            >
                                <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(2), color: colors.violet, marginHorizontal: 20, }}>See Full Menu</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10, marginHorizontal: 20, }}>
                            <FlatList
                                // columnWrapperStyle={{ justifyContent: 'space-between' }}
                                // showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                //vertical
                                horizontal
                                contentContainerStyle={{
                                    marginTop: 10,
                                    // backgroundColor: '#000',
                                    // paddingBottom: 10,
                                    //flex:0,
                                }}
                                // numColumns={3}
                                data={dummyFoodItemData}
                                renderItem={({ item }) => {
                                    return <CardPopular item={item} />;
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        height: 50,
        backgroundColor: colors.lightGreyWhite,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        shadowColor: colors.black,
    },
    input: {
        fontSize: responsiveWidth(3.5),
        fontWeight: 'bold',
        flex: 1,
        color: colors.black,
        marginLeft: 10,
    },
    sortBtn: {
        marginLeft: 5,
        height: 50,
        width: 50,
        borderRadius: 5,
        backgroundColor: colors.violet,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: colors.black,
    },
    card: {
        //height: 225,
        backgroundColor: colors.white,
        // width: totalWidth / 5,
        width: responsiveWidth(25),
        marginHorizontal: 5,
        borderRadius: 30,
        // borderBottomEndRadius: 50,
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25,
        marginBottom: 2,
        paddingTop: 5,
        // paddingHorizontal: 30,
        // padding: 15,
        shadowColor: colors.black,
        elevation: 1,
    },
    icon: {
        flex: 1,
        //width,
        width: responsiveWidth(20),
        resizeMode: "contain",
    },
    cardPopular: {
        // height: 160,
        // flex: 1,
        height: responsiveHeight(30),
        backgroundColor: colors.white,
        // width: widthPopular,
        width: responsiveWidth(40),
        marginHorizontal: 5,
        borderRadius: 5,
        // borderBottomEndRadius: 50,
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25,
        // marginBottom: 2,
        // paddingTop: 5,
        // paddingHorizontal: 30,
        padding: 15,
        // shadowColor: colors.black,
        elevation: 10,
        // alignItems:'center',
        // justifyContent:'center'
    },
    iconPopular: {
        flex: 1,
        // width: widthPopular,
        // width:responsiveWidth(20),
        // width: responsiveWidth(100),
        // height:responsiveHeight(100),
        resizeMode: "contain",
        backgroundColor: colors.goodGreen
    },
});

export default Home;