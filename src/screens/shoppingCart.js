import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, ScrollView, TextInput, Alert, Button, FlatList, SectionList, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartItemsContainer from './cart';
import { clearCart, getTotals, getTotalPrice } from '../../reducers/cartItems';
import { clearMyProducts, removeQty } from '../../reducers/MyProductSlice';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { getOrderId } from '../../data/apiData';
import { getData } from "../action/action";
import localKey from "../utils/localStorage";
// import { cartTotalPriceSelector } from '../reducers/selectors';

export default function ShoppingCart({ navigation }) {

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const myProducts = useSelector((state) => state.product);

    //const cartItemId = useSelector((state) => state.cart.cartItems.item.id);

    const cartQuantity = useSelector((state) => state.cart.cartItems.length);
    //const { cartTotalQuantity } = useSelector((state) => state.cart);

    const [apiOrderId, setApiOrderId] = useState(0)

    useEffect(() => {
        dispatch(getTotalPrice());
    }, [cart, dispatch]);

    useEffect(() => {
        getOrderId();
        setOrderId();
    });

    const setOrderId = async () => {
        try {
            const jsonValue = await getData(localKey.ORDER_ID);
            //alert(jsonValue);
            const orderId = parseInt(JSON.parse(jsonValue));
            setApiOrderId(orderId);
            console.log('Order Id: ', apiOrderId);
        } catch (e) {
            console.log(e);
        }
    }

    // const onPressPlaceOrder = () => {
    //     // let productId = JSON.parse(cart.cartItems.item.id);
    //     // let quantity = JSON.parse(cart.cartItems.itemQuantity);
    //     // console.log(productId);
    //     // console.log(quantity);
    //     // alert(JSON.parse(cart.cartItems.item.id));
    //     const orderItemId = [];
    //     const orderItemQuantity = [];
    //     const productName = [];
    //     cart.cartItems.map((item) => {
    //         //console.log(item.itemQuantity);
    //         //console.log(item.item.id);
    //         orderItemId.push(item.item.product_id);
    //         productName.push(item.item.product_name);
    //         orderItemQuantity.push(parseInt(item.itemQuantity, 10));
    //     });
    //     console.log('Order Item Id', orderItemId);
    //     console.log('Order Item Name', productName);
    //     console.log('Order Item Quantity', orderItemQuantity);
    //     // console.log(JSON.stringify({ order_id: orderItemId, order_quantity: orderItemQuantity }))
    //     //console.log(cart.cartItems[0].item.id);
    //     try {
    //         axios({
    //             method: 'post',
    //             url: 'http://10.0.2.2:8000/orderitem',
    //             data: {
    //                 order_id: orderItemId,
    //                 product_name: productName,
    //                 order_quantity: orderItemQuantity
    //             },
    //         }).then((response) => {
    //             console.log(response.data);
    //             //alert(JSON.stringify(response.data));
    //             alert('ORDER PLACED SUCCESSFULLY!');
    //             //let getApiData = response.data;
    //             //let getObjectData = JSON.parse(getApiData);
    //             //setApiData(getApiData);
    //         })
    //             .catch(function (error) {
    //                 // handle error
    //                 alert(error.message);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const onPressOrder = () => {
        // let productId = JSON.parse(cart.cartItems.item.id);
        // let quantity = JSON.parse(cart.cartItems.itemQuantity);
        // console.log(productId);
        // console.log(quantity);
        // alert(JSON.parse(cart.cartItems.item.id));
        // const orderItemId = [];
        // const orderItemQuantity = [];
        const orderItems = [];
        const orderList = [];
        let order_id = `ORDID0000000${apiOrderId}`;
        let product_id = 0;
        let product_name = 0;
        let order_quantity = 0;
        let unit_price = 0;
        let product_uom = '';
        const total_price = cart.cartTotalAmount;

        cart.cartItems.map((item) => {
            //console.log(item.itemQuantity);
            //console.log(item.item.id);
            // order_id.push(item.item.product_id);
            // product_name.push(item.item.product_name);
            // order_quantity.push(parseInt(item.itemQuantity, 10));
            product_id = item.item.product_id;
            product_name = item.item.product_name;
            order_quantity = parseInt(item.itemQuantity);
            unit_price = item.item.product_price;
            product_uom = item.item.product_uom;
            price = unit_price * order_quantity;
            // const orderProduct = { order_id: order_id, total_price: total_price };
            const tempProduct = { order_id: order_id, product_id: product_id, product_name: product_name, order_quantity: order_quantity, unit_price: unit_price, product_uom: product_uom, total_price: price };
            // console.log(orderList.push(orderProduct));
            console.log(orderItems.push(tempProduct));
        });
        const orderProduct = { order_id: order_id, total_price: total_price };
        console.log(orderList.push(orderProduct));
        // console.log('Order Item Id');
        // console.log('Order Item Quantity');
        // console.log(JSON.stringify({order_id:orderItemId,order_quantity:orderItemQuantity}))
        //console.log(cart.cartItems[0].item.id);
        console.log('orderItems ', orderItems);
        console.log('orderList ', orderList);
        try {
            axios({
                method: 'post',
                url: 'http://10.0.2.2:8000/order',
                data: orderList,
            }).then((response) => {
                console.log(response.data);
                axios({
                    method: 'post',
                    url: 'http://10.0.2.2:8000/orderitem',
                    data: orderItems,
                }).then((response) => {
                    console.log(response.data);

                    //alert(JSON.stringify(response.data));
                    alert('ORDER PLACED SUCCESSFULLY!');
                    dispatch(clearCart());
                    //dispatch(clearMyProducts());
                    orderItems.map((item) => {
                        dispatch(removeQty(item.product_id));
                    })
                    // console.log('List of Updated products: ',myProducts);
                    //navigation.navigate('Home');
                    //let getApiData = response.data;
                    //let getObjectData = JSON.parse(getApiData);
                    //setApiData(getApiData);
                }).catch(function (error) {
                    // handle error
                    alert(error.message);
                });
                //alert(JSON.stringify(response.data));
                // alert('ORDER PLACED SUCCESSFULLY!');
                // dispatch(clearCart());
                //dispatch(clearMyProducts());
                // orderItems.map((item) => {
                //     dispatch(removeQty(item.order_id));
                // })
                //navigation.navigate('Home');
                //let getApiData = response.data;
                //let getObjectData = JSON.parse(getApiData);
                //setApiData(getApiData);
            }).catch(function (error) {
                // handle error
                alert(error.message);
            });
        } catch (error) {
            console.log(error);
        }
    }

    // const onPressHandler = async () => {
    //     //navigation.navigate('Home');
    //     // const productId = cart.cartItems.item.id;
    //     // const quantity = cart.cartItems.itemQuantity
    //     // console.log(productId);
    //     // console.log(quantity);
    //     // const orderItemId = [];
    //     // const orderItemQuantity = [];
    //     let orderItemId = 0;
    //     let orderItemQuantity = 0;
    //     cart.cartItems.map((item) => {
    //         //console.log(item.itemQuantity);
    //         //console.log(item.item.id);
    //         // orderItemId.push(item.item.id);
    //         // orderItemQuantity.push(parseInt(item.itemQuantity,10));
    //         orderItemId = item.item.id;
    //         orderItemQuantity = parseInt(item.itemQuantity, 10);
    //     });
    //     console.log('Order Item Id');
    //     console.log(orderItemId);
    //     console.log('Order Item Quantity');
    //     console.log(orderItemQuantity);
    //     try {
    //         // AsyncStorage.getItem('token')
    //         //     .then(value => {
    //         //         if (value != null) {
    //         //             let userToken = JSON.parse(value);
    //         //setTokenKey(userToken);
    //         axios({
    //             method: 'post',
    //             url: 'http://10.0.2.2:8000/order',
    //             data: {
    //                 product_id: orderItemId,
    //                 quantity: orderItemQuantity
    //             },
    //             // headers: {
    //             //     //"Authorization": "Token ef809c2cc06799774427ff6397a0c568c6f6767e",
    //             //     "Authorization": "Token " + userToken,
    //             //     //"Authorization": "Token " +getData(),
    //             // },
    //         }).then((response) => {
    //             console.log(response.data);
    //             //alert(JSON.stringify(response.data));
    //             alert('ORDER PLACED SUCCESSFULLY!');
    //             //let getApiData = response.data;
    //             //let getObjectData = JSON.parse(getApiData);
    //             //setApiData(getApiData);
    //         })
    //             .catch(function (error) {
    //                 // handle error
    //                 alert(error.message);
    //             });
    //         //     }
    //         // })
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    // const removeData = async () => {
    //   try {
    //     await AsyncStorage.clear();
    //     navigation.navigate('GetStarted');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // React.useLayoutEffect(() => {
    //   navigation.setOptions({
    //     headerRight: () => (
    //       <View style={{ flexDirection: "row", }}>
    //         <Button onPress={removeData} title="Log Out" />
    //       </View>
    //     ),
    //   });
    // }, []);

    const AlertItem = () => {
        Alert.alert(
            "Are you sure you want to clear the cart?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => dispatch(clearCart()),
                    //dispatch(clearCart())
                    //onPress: { handleClearCart }
                },
            ],
            { cancelable: false }
        );
    };

    if (cartQuantity < 1) {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80%",
                }}
            >
                <Icon name="cart" size={50} />
                <Text style={styles.emptyCart}>Your cart is empty</Text>
            </View>
        );
    }

    return (
        <View style={styles.cartContainer}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.cartTitle}>My Cart</Text>
                <TouchableOpacity onPress={AlertItem} style={styles.clearCart}>
                    <Text style={styles.clearCartText}>Clear Cart</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cartItems}>
                {/* {cart.cartItems.map((item) => ( */}
                {/* <cartItemsContainer key={item.item.id} item={item} {...item} /> */}
                <CartItemsContainer />
                {/* ))} */}
            </View>
            <View style={styles.cartTotal}>
                <Text style={styles.cartTotalTitle}>Total Price</Text>
                <Text style={[{ marginLeft: 30 }, styles.cartTotalTitle]}>: ${cart.cartTotalAmount}</Text>
            </View>
            <TouchableOpacity onPress={onPressOrder} style={styles.placeOrder}>
                <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
            {/* <View style={{ height: 100 }} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    cartContainer: {
        backgroundColor: "#fff",
    },
    cartItems: {},
    cartTotal: {
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: "row",
        padding: 20,
        borderTopColor: "#eee",
        borderTopWidth: 1,
    },
    clearCart: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: "coral",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    clearCartText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    cartTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    emptyCart: {
        fontSize: 20,
        fontWeight: "bold",
    },
    cartTotalTitle: {
        color: '#00f00f',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeOrder: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#694fad',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    placeOrderText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
});