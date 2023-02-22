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
import globalStyle from '../common/components/globalStyle';
import { CardPopular, CardPopularList } from '../common/uiComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const widthCategory = Dimensions.get('window').width / 3 - responsiveHeight(2);
const heightHomeUpperContent = Dimensions.get('window').height / responsiveHeight(1.5);
const widthPopular = Dimensions.get('window').width / 2 - responsiveWidth(3);

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const PopularFood = ({ route, navigation }) => {

    const myProducts = useSelector((state) => state.product);

    // const itemCategory = route.params.item_category;

    const [categoryIndex, setCategoryIndex] = useState(0);
    const [foodCategory, setFoodCategory] = useState('Food');

    const categories = ['Food', 'Vegetable', 'Fruit', 'Meat', 'Fish', 'Beverage'];

    // const apiItemData = myProducts.filter(x => x.product_category === itemCategory);

    const apiItemData = myProducts.filter(x => x.product_category === foodCategory);

    const [filteredDataSource, setFilteredDataSource] = useState(apiItemData);
    // const [masterDataSource, setMasterDataSource] = useState(apiItemData);

    useEffect(() => {
        // dispatch(getTotals());
        // console.log('category: ', foodCategory);
        // console.log('width: ', widthScreen);
        // console.log('height: ', heightScreen);
        // setFilteredDataSource(myProducts);
        // setFoodCategory();
        console.log("My Products in redux toolkit: ", myProducts);
        console.log("My Filtered Products from redux toolkit: ", filteredDataSource);
        onPressHandler();
    }, [foodCategory]);

    // useEffect(() => {
    //     getData();
    // }, []);

    // const getData = async () => {
    //     try {
    //       const jsonValue = await AsyncStorage.getItem('@storage_Key')
    //       //return jsonValue != null ? JSON.parse(jsonValue) : null;
    //       const productList = JSON.parse(jsonValue)
    //       console.log('Product List: ',productList)
    //     //   setFilteredDataSource(productList)
    //     } catch(e) {
    //       // error reading value
    //     }
    //   }

    const onPressHandler = () => {
        const newData = myProducts.filter(x => x.product_category === foodCategory);
        //const newData = filteredDataSource.filter(x => x.product_category === foodCategory);
        setFilteredDataSource(newData);
    }

    const CategoryList = () => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={globalStyle.categoryContainer}>
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
                                    <Text style={globalStyle.categoryTextSelected}>{item}</Text>
                                </View>) :
                                (<View style={{ width: widthCategory, alignItems: 'center', }}>
                                    <Text style={globalStyle.categoryText}>{item}</Text>
                                </View>)
                            }
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

        );
    };

    const onPressCardPopular = (item) => {
        navigation.navigate('PopularFood', {
            item_category: item.product_category,
        });
    }

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
                <View style={{ flex: 1, marginBottom: responsiveHeight(1), marginHorizontal: 20, }}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        showsVerticalScrollIndicator={false}
                        // showsHorizontalScrollIndicator={false}
                        vertical
                        // horizontal
                        contentContainerStyle={{
                            marginTop: responsiveHeight(1),
                            // backgroundColor: colors.badRed,
                            // paddingBottom: 10,
                            //flex:0,
                        }}
                        numColumns={2}
                        data={filteredDataSource}
                        renderItem={({ item }) => {
                            return <CardPopularList item={item} onPressItem={onPressCardPopular} style={{marginBottom:responsiveHeight(1)}}/>;
                        }}
                    />
                </View>
                {/* </ScrollView> */}
            </View>
        </SafeAreaView>
    )
}

export default PopularFood;