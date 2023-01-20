import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import Header from '../common/components/headerAll';
import colors from '../common/components/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";
import { useSelector } from "react-redux";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const widthCategory = Dimensions.get('window').width / 3 - 20;
const heightHomeUpperContent = Dimensions.get('window').height / 14;
const widthPopular = Dimensions.get('window').width / 2 - 30;

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const PopularFood = ({ route, navigation }) => {

    const myProducts = useSelector((state) => state.product);

    // const itemCategory = route.params.item_category;

    const [categoryIndex, setCategoryIndex] = useState(0);
    const [foodCategory, setFoodCategory] = useState('Food');

    const categories = ['Food', 'Vegetables', 'Fruits', 'Meat', 'Fish', 'Beverage'];

    // const apiItemData = myProducts.filter(x => x.product_category === itemCategory);

    const apiItemData = myProducts.filter(x => x.product_category === foodCategory);

    const [filteredDataSource, setFilteredDataSource] = useState(apiItemData);
    // const [masterDataSource, setMasterDataSource] = useState(apiItemData);

    useEffect(() => {
        // dispatch(getTotals());
        console.log('category: ', foodCategory);
        console.log('width: ', widthScreen);
        console.log('height: ', heightScreen);
        // setFilteredDataSource(myProducts);
        // setFoodCategory();
        onPressHandler();
    }, [foodCategory]);

    const onPressHandler = () => {
        const newData = myProducts.filter(x => x.product_category === foodCategory);
        setFilteredDataSource(newData);
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
                            style={{ marginRight: 10 }}
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

    const CardPopular = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('PopularFood', {
                        item_category: item.product_category,
                        // item_category: 'food',
                        item_name: item.product_name,
                        // item_name: 'fish',
                    });
                }}
            >
                <View style={styles.cardPopular}>
                    <View
                        style={{
                            // height: heightScreen / 4,
                            // height: 350,
                            flex: 1,
                            // height: responsiveHeight(15),
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                        <Image
                            //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                            // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
                            // source={require('../assets/images/food-1.png')}
                            source={images.imageObject[item.product_code]}
                            style={styles.iconPopular}
                        //style={{ flex: 1, resizeMode: 'contain' }}
                        />
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Icon name="heart-outline" size={responsiveWidth(5)} color='#694fad' />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 17, color: colors.black, }}>
                            {item.product_name}
                        </Text>
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 17, color: colors.black, }}>
                            {'\u20B9'}{item.product_price}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <Header
                title="Popular"
                onPressBack={() => navigation.goBack()}
            />
            <View style={{ height: heightHomeUpperContent, marginHorizontal: 20 }}>
                <CategoryList />
            </View>
            <View style={{ flex: 1, backgroundColor: colors.smoke, }}>
                {/* <ScrollView > */}
                <View style={{ flex: 1, marginBottom: 10, marginHorizontal: 20, }}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        showsVerticalScrollIndicator={false}
                        // showsHorizontalScrollIndicator={false}
                        vertical
                        // horizontal
                        contentContainerStyle={{
                            marginTop: 10,
                            // backgroundColor: '#000',
                            // paddingBottom: 10,
                            //flex:0,
                        }}
                        numColumns={2}
                        data={filteredDataSource}
                        renderItem={({ item }) => {
                            return <CardPopular item={item} />;
                        }}
                    />
                </View>
                {/* </ScrollView> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        //marginTop: 20,
        // marginBottom: 0,
        justifyContent: 'space-between',
        // backgroundColor: 'red'
        // alignItems: 'baseline',
        //paddingHorizontal: 20,
        //marginLeft: 10,
        //flex: 1,
        alignSelf: 'flex-end'
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
    cardPopular: {
        // height: 170,
        //flex: 1,
        height: responsiveHeight(30),
        width: responsiveWidth(40),
        backgroundColor: colors.white,
        //width: widthPopular,
        marginVertical: 5,
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
    },
    iconPopular: {
        flex: 1,
        width: widthPopular,
        resizeMode: "contain",
    },
});

export default PopularFood;