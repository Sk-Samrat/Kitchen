import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons'
// import { useDispatch, useSelector } from "react-redux";
//import { cartTotalSelector } from "../redux/selectors";
// import { getTotals } from '../reducers/cartItems';
import colors from "./colors";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

const Header = (props) => {
    //   const total = useSelector(cartTotalSelector);
    // const total = 0;

    const cartTotalQuantity = 0;

    // const { cartTotalQuantity } = useSelector((state) => state.cart);

    return (
        //<View style={styles.header}>
        <View style={styles.headerContainer}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={props.onPressBack}
                >
                    <Icon name="chevron-back-outline" size={responsiveWidth(5)} color='#694fad' />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ color: '#694fad', fontWeight: 'bold', fontSize: responsiveFontSize(2), }}>{props.title}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'flex-end'}}>
                {/* <TouchableOpacity
                    style={{ flexDirection: "row", flex: 1.5, justifyContent: 'flex-end', }}
                // onPress={props.onPressLogout}
                >
                    <Icon name="log-out-outline" size={30} color='#694fad' />
                </TouchableOpacity> */}
                {cartTotalQuantity == 0 ?
                    (<TouchableOpacity
                        style={{ flexDirection: "row", justifyContent: 'flex-end', }}
                    // onPress={props.onPressCart}
                    >
                        <Icon name="heart-outline" size={responsiveWidth(5)} color='#694fad' />
                        <View
                            style={{
                                flexDirection: "column",
                                // backgroundColor: "yellow",
                                height: 20,
                            }}
                        >
                            <Text style={{ color: '#694fad', fontSize: responsiveFontSize(1) }}>{cartTotalQuantity}</Text>
                        </View>
                    </TouchableOpacity>) :
                    (<TouchableOpacity
                        style={{ flexDirection: "row", justifyContent: 'flex-end' }}
                    // onPress={props.onPressCart}
                    >
                        <Icon name="heart" size={responsiveWidth(5)} color='#694fad' />
                        <View
                            style={{
                                flexDirection: "column",
                                // backgroundColor: "yellow",
                                height: 20,
                            }}
                        >
                            <Text style={{ color: '#694fad', fontSize: responsiveFontSize(1) }}>{cartTotalQuantity}</Text>
                        </View>
                    </TouchableOpacity>)
                }
            </View>
        </View>
        //</View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        // backgroundColor: colors.violet,
        backgroundColor: colors.white,
        alignItems: 'center',
        //flex: 1,
    }
});