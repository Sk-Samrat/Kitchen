import axios from 'axios';
import localKey from "../src/utils/localStorage";
import { storeData } from "../src/action/action";

export const BASE_URL = 'http://10.0.2.2:8080';
export const GET_OFFER = `${BASE_URL}/productoffer`;
export const GET_CATEGORY = `${BASE_URL}/productcategory`;
export const GET_PRODUCT = `${BASE_URL}/product`;
export const GET_ORDERID = `${BASE_URL}/orderid`;
export const GET_ALL_ORDER = `${BASE_URL}/order`;
export const GET_ORDER_DETAILS = `${BASE_URL}/orderitem`;

export const getProductOffer = () => {
    try {
        axios({
            method: 'get',
            url: GET_OFFER,
            //url: 'http://10.0.2.2:8000/productoffer',
            // url: 'http://127.0.0.1:8000/productoffer',
        }).then((response) => {
            // handle response
            storeData(localKey.PRODUCT_OFFER, JSON.stringify(response.data));
        }).catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getProductCategory = () => {
    try {
        axios({
            method: 'get',
            url: GET_CATEGORY,
            // url: 'http://10.0.2.2:8000/productcategory',
            // url: 'http://127.0.0.1:8000/productoffer',
        }).then((response) => {
            // handle response
            storeData(localKey.PRODUCT_CATEGORY, JSON.stringify(response.data));
        }).catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getProductList = async () => {
    try {
        axios({
            method: 'get',
            url: GET_PRODUCT,
            // url: 'http://10.0.2.2:8000/product',
            // url: 'http://127.0.0.1:8000/product',
        }).then((response) => {
            // handle response
            console.log("Api Product List: ", response.data);
            storeData(localKey.PRODUCT_LIST, JSON.stringify(response.data));
        }).catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getOrderId = async () => {
    try {
        axios({
            method: 'get',
            url: GET_ORDERID,
            // url: 'http://10.0.2.2:8000/orderid',
            // url: 'http://127.0.0.1:8000/product',
        }).then((response) => {
            // handle response
            console.log("Order Id: ", response.data);
            storeData(localKey.ORDER_ID, JSON.stringify(response.data));
        }).catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getallOrder = async () => {
    try {
        axios({
            method: 'get',
            url: GET_ALL_ORDER,
            // url: 'http://10.0.2.2:8000/order',
            // url: 'http://127.0.0.1:8000/product',
        }).then((response) => {
            // handle response
            console.log("Order : ", response.data);
            storeData(localKey.ORDER_All, JSON.stringify(response.data));
        }).catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getOrderDetails = async () => {
    try {
        axios({
            method: 'get',
            // url: GET_ORDER_DETAILS,
            url: 'http://10.0.2.2:8000/orderitem',
            // url: 'http://127.0.0.1:8000/product',
        }).then((response) => {
            // handle response
            console.log("Order Details :", response.data);
            //alert(JSON.stringify(response.data));
            storeData(localKey.ORDER_DETAILS, JSON.stringify(response.data));
        }).catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error);
    }
}