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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-community/voice';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";

import Header from "../common/components/headerBar";
import colors from "../common/components/colors";
import Icon from 'react-native-vector-icons/Ionicons';
// import { dummyData } from "../../data/data";
import Carousel from "../common/components/carousel";
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";
import { imagesIcon } from "../../data/data";
import { apidata } from "../../data/data";
import { Card, CardPopular, CardPopularList } from "../common/uiComponent";
import globalStyle from "../common/components/globalStyle";
import { getProductCategory, getProductOffer, getProductList } from "../../data/apiData";
import localKey from "../utils/localStorage";
import { getData } from "../action/action";
import { addMyProducts } from "../../reducers/MyProductSlice";

// const heightHomeUpperContent = Dimensions.get('window').height / 5;
const heightCard = Dimensions.get('window').height;

// const width = Dimensions.get('window').width / 3 - 50;
const totalWidth = Dimensions.get('window').width;

const widthPopular = Dimensions.get('window').width / 2 - 60;
// const heightPopular = Dimensions.get('window').height / 8;

const widthPopularSize = PixelRatio.getPixelSizeForLayoutSize(widthPopular);

const heightPopularSize = PixelRatio.getPixelSizeForLayoutSize(heightCard);


const Home = ({ navigation }) => {

    // const myProducts = useSelector((state) => state.product);

    const dispatch = useDispatch();

    const [result, setResult] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [apiProductOffer, setApiProductOffer] = useState('')
    const [apiProductCategory, setApiProductCategory] = useState('')
    const [apiProductList, setApiProductList] = useState('')

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])

    useEffect(() => {
        getProductOffer();
        getProductCategory();
        getProductList();
        // fetch('http://10.0.2.2:8000/productoffer', {
        //     method: "GET"
        // })
        //     .then(resp => resp.json())
        //     .then(data => {
        //         console.log(data)
        //     })
        //     .catch(error => console.log("error"))
        setProductCategoryData();
        setProductOfferData();
        setProductListData();
        // console.log('My Products: ',myProducts);
        // setApiProductList(myProducts);
        // apiProductList.map(item => {
        //     dispatch(addMyProducts(item))
        // })
    }, [])

    const setProductCategoryData = async () => {
        try {
            const jsonValue = await getData(localKey.PRODUCT_CATEGORY);
            //alert(jsonValue);
            const productList = JSON.parse(jsonValue);
            //console.log('Product List: ', productList);
            setApiProductCategory(productList);
        } catch (e) {
            console.log(e);
        }
    }

    const setProductOfferData = async () => {
        try {
            // const productList = JSON.parse(jsonValue)
            // console.log('Product List: ', productList)
            //   setFilteredDataSource(productList)
            const jsonValue = await getData(localKey.PRODUCT_OFFER);
            //alert(jsonValue);
            const offerList = JSON.parse(jsonValue);
            //console.log('Product Offer: ', offerList);
            setApiProductOffer(offerList);
        } catch (e) {
            console.log(e);
        }
    }

    const setProductListData = async () => {
        try {
            // const jsonValue = await AsyncStorage.getItem('@storage_Key')
            //return jsonValue != null ? JSON.parse(jsonValue) : null;
            // const productList = JSON.parse(jsonValue)
            // console.log('Product List: ', productList)
            //   setFilteredDataSource(productList)
            const jsonValue = await getData(localKey.PRODUCT_LIST);
            //alert(jsonValue);
            const productList = JSON.parse(jsonValue);
            //console.log('Product List: ', productList);
            setApiProductList(productList);
            productList.map(item => {
                dispatch(addMyProducts(item))
            })
            // const myProducts = useSelector((state) => state.product);
            // console.log("My Products in redux toolkit: ", myProducts);
        } catch (e) {
            console.log(e);
        }
    }

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

    const onPressHandler = (item) => {
        navigation.navigate('FoodItem', {
            item_category: item.product_category,
            // item_category: 'Food',
            item_name: item.product_name,
            // item_name: 'fish',
        });
    }

    const onPressCardPopular = (item) => {
        navigation.navigate('PopularFood', {
            item_category: item.product_category,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <Header title="Home"
                onPressMenu={() => navigation.getParent('LeftDrawer').openDrawer()}
            />
            <View style={{ flex: 1 }}>
                <View style={{ height: responsiveHeight(23), marginHorizontal: 20, }}>
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
                        <View style={globalStyle.searchContainer}>
                            <Icon name="search-outline" size={responsiveWidth(6)} style={{ marginLeft: 10 }} />
                            {/* <FontAwesomeIcon icon="fa-thin fa-magnifying-glass" size={25} style={{ marginLeft: 20 }}/> */}
                            <TextInput
                                style={globalStyle.input}
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
                        <View style={globalStyle.sortBtn}>
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
                                data={apiProductCategory}
                                renderItem={({ item }) => {
                                    return <Card item={item} onPressItem={() => onPressHandler(item)} />;
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
                                    <Carousel data={apiProductOffer} />
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
                                data={apiProductList}
                                renderItem={({ item }) => {
                                    return <CardPopularList item={item} onPressItem={() => onPressCardPopular(item)} />;
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;