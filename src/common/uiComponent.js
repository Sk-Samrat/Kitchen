import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/Ionicons';

// import { imagesIcon } from '../../data/data';
import globalStyle from './components/globalStyle';
import colors from './components/colors';
import { images } from '../../data/data';

export const Card = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPressItem}
        >
            <View style={globalStyle.card}>
                <View
                    style={{
                        // height: 80,
                        // height: heightCard / 15,
                        height: responsiveHeight(8),
                        alignItems: 'center',
                    }}>
                    <Image
                        //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                        source={{ uri: `http://10.0.2.2:8000/${props.item.main_image}` }}
                        // source={require('../assets/images/food-1.png')}
                        // source={imagesIcon.imageObject[props.item.product_id]}
                        style={globalStyle.icon}
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
                    {props.item.product_name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

// export const CardPopular = (props) => {
//     return (
//         <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={props.onPressItem}
//         >
//             <View style={[globalStyle.cardPopular, { ...props.style }]}>
//                 <View
//                     style={{
//                         // height: 300,
//                         // height: heightCard / 6,
//                         flex: 1,
//                         // height: heightPopularSize,
//                         // height: responsiveHeight(15),
//                         //alignItems: 'center',
//                         flexDirection: 'row',
//                         // backgroundColor: colors.badRed,
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}>
//                     <Image
//                         // source={{ uri: 'http://10.0.2.2:8000/Photos/Photos/watermelon.png' }}
//                         source={{ uri: `http://10.0.2.2:8000/${props.item.main_image}` }}
//                         // source={{ uri: 'http://10.0.2.2:8000'+ props.item.main_image }}
//                         // source={{uri: 'http://127.0.0.1:8000/Photos/Photos/watermelon.png'}}
//                         // source={require('../assets/images/food-1.png')}
//                         // source={images.imageObject[props.item.product_code]}
//                         // resizeMode='contain'
//                         // style={styles.iconPopular}
//                         style={{ flex: 1, resizeMode: 'contain' }}
//                     />
//                     <View style={{ alignSelf: 'flex-start' }}>
//                         <Icon name="heart-outline" size={responsiveWidth(5)} color='#694fad' />
//                     </View>
//                 </View>
//                 <View style={{ alignItems: 'center', }}>
//                     <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, }}>
//                         {props.item.product_name}
//                     </Text>
//                     <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, }}>
//                         {'\u20B9'}{props.item.product_price}
//                     </Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

export const CardItem = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPressItem}
        >
            {props.item.product_category === props.itemCategory ? (
                <View style={globalStyle.cardWithImage}>
                    <View
                        style={{
                            // height: 120,
                            alignItems: 'flex-start',
                            flexDirection: "row",
                            // flexDirection: "column",
                            // backgroundColor: '#ff0',
                            // width: width,
                            // borderRadius: 10,
                        }}>
                        <View style={{ flex: 0.8, flexDirection: "column", alignItems: 'center', padding: 5, }}>
                            <View style={{ elevation: 10, shadowColor: colors.black, }}>
                                <Image
                                    //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                                    source={{ uri: `http://10.0.2.2:8000/${props.item.main_image}` }}
                                    // source={require('../assets/images/food-1.png')}
                                    // source={images.imageObject[props.item.product_code]}
                                    style={globalStyle.iconItem}
                                //style={{ flex: 1, resizeMode: 'contain' }}
                                />
                            </View>
                            {props.item.product_quantity == 0
                                ? (<View style={{ backgroundColor: colors.lightGreyWhite, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginTop: -25, elevation: 10, shadowColor: colors.black, }}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={props.onPressAdd}
                                    >
                                        <Text style={{ fontSize: responsiveFontSize(1.5), color: colors.deepBlue, fontFamily: 'Roboto-Regular' }}>Add</Text>
                                    </TouchableOpacity>
                                </View>)
                                : (<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightGreyWhite, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, marginTop: -25, elevation: 10, shadowColor: colors.black, }}>
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={props.onPressRemove}
                                        >
                                            <Icon name="remove-outline" size={responsiveWidth(4)} color={colors.deepBlue} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(1.5), color: colors.deepBlue }}>{props.item.product_quantity}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={props.onPressIncrease}
                                        >
                                            <Icon name="add-outline" size={responsiveWidth(4)} color={colors.deepBlue} />
                                        </TouchableOpacity>
                                    </View>
                                </View>)}
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, }}>
                            <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(2), marginTop: 10, fontFamily: 'Roboto-Medium', color: '#000', }}>
                                {props.item.product_name}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', }}>
                                {props.item.product_uom}
                            </Text>
                            <Text style={{ color: colors.deepBlue, fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', }}>
                                {'\u20B9'}{props.item.product_price}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : null
            }
        </TouchableOpacity >
    );
};

export const CardPopularList = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPressItem}
        >
            <View style={[globalStyle.cardPopular, { ...props.style }]}>
                <View
                    style={{
                        // height: 80,
                        // height: heightCard / 15,
                        //height: responsiveHeight(8),
                        flex: 1,
                        alignItems: 'center',
                        // backgroundColor: colors.badRed,
                        flexDirection: 'row',
                    }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                            source={{ uri: `http://10.0.2.2:8000/${props.item.main_image}` }}
                            // source={require('../assets/images/food-1.png')}
                            // source={imagesIcon.imageObject[props.item.product_id]}
                            // style={globalStyle.icon}
                            style={{ flex: 1, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Icon name="heart-outline" size={responsiveWidth(5)} color='#694fad' />
                    </View>
                </View>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, }}>
                        {props.item.product_name}
                    </Text>
                    <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, }}>
                        {'\u20B9'}{props.item.product_price}
                    </Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

export const OrderItem = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPressItem}
        >
            <View style={globalStyle.ordercard}>
                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, }}>
                    <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.5), marginTop: 10, fontFamily: 'Roboto-Medium', color: '#000', }}>
                        Order ID: {props.item.order_id}
                    </Text>
                    <Text style={{ fontWeight: '400', fontSize: responsiveFontSize(1.5), marginTop: 10, fontFamily: 'Roboto-Regular' }}>
                        Seller: {props.item.seller_name}
                    </Text>
                    <Text style={{ fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', }}>
                        Order Date: {props.item.order_date}
                    </Text>
                    <Text style={{ color: colors.deepBlue, fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', }}>
                        Total Price: {'\u20B9'}{props.item.total_price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    );
};

export const OrderList = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            //onPress={props.onPressItem}
        >
            <View style={globalStyle.ordercard}>
                <View style={{ flex: 1, flexDirection: 'column', padding:10}}>
                    <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Medium', color: '#000', }}>
                        Product: {props.item.product_name}
                    </Text>
                    <Text style={{ fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', marginTop: 10 }}>
                        Unit Price: {'\u20B9'}{props.item.unit_price}
                    </Text>
                    <Text style={{ fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', marginVertical:1 }}>
                        Quantity: {props.item.order_quantity} {props.item.product_uom}
                    </Text>
                    <Text style={{ color: colors.deepBlue, fontWeight: '400', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular', }}>
                        Total Price: {'\u20B9'}{props.item.total_price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    );
};