import React from "react";
import { View, Button, Text, StyleSheet, Dimensions, SafeAreaView, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import colors from "../common/components/colors";
import Icon from 'react-native-vector-icons/Ionicons';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Carousel from "../common/components/carousel";
import { dummyData } from "../../data/data"
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get('window').width / 3 - 25;

const widthOffer = Dimensions.get('window').width / 1;

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

const images = {
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
              height: 80,
              alignItems: 'center',
            }}>
            <Image
              //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
              // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
              // source={require('../assets/images/food-1.png')}
              source={images.imageObject[item.product_id]}
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
          <Text style={{ fontWeight: "400", fontSize: 15, color: colors.black, }}>
            {item.product_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const Offer = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.8}
  //     // onPress={() => navigation.navigate('Order', item)}
  //     >
  //       <View style={styles.cardOffer}>
  //         <View
  //           style={{
  //             height: 250,
  //             // widthOffer,
  //             // alignItems: 'center',
  //           }}>
  //           <Image
  //             //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
  //             // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
  //             // source={require('../assets/images/offer-1.jpg')}
  //             source={images.imageObject[item.offer_id]}
  //             style={styles.iconOffer}
  //           //style={{ flex: 1, resizeMode: 'contain' }}
  //           />
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView>
        {/* <Header
                title="Home"
                // headerIcon="menu-sharp"
                onPressLogout={removeData}
                onPressCart={() => navigation.navigate("Cart")}
            /> */}
        <View style={{ flex: 1, paddingHorizontal: 10, }}>
          <View style={0.5}>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 25, fontFamily: 'BerkshireSwash-Regular' }}>Welcome to</Text>
              <Text style={{ fontSize: 38, color: colors.green, fontFamily: 'FredokaOne-Regular' }}>
                Cloud Kitchen
              </Text>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', }}>
              <View style={styles.searchContainer}>
                {/* <Icon name="search-outline" size={20} style={{ marginLeft: 20 }} /> */}
                {/* <FontAwesomeIcon icon="fa-thin fa-magnifying-glass" size={25} style={{ marginLeft: 20 }}/> */}
                <TextInput placeholder="Search for resturant, item and more" style={styles.input} />
                <Icon name="search-outline" size={20} style={{ marginRight: 20 }} />
              </View>
              {/* <View style={styles.sortBtn}>
                            <Icon name="filter-outline" size={30} color={colors.white} />
                        </View> */}
            </View>
            {/* <CategoryList /> */}
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
              //vertical
              contentContainerStyle={{
                marginTop: 20,
                // backgroundColor: '#000',
                // paddingBottom: 10,
                //flex:0,
              }}
              numColumns={3}
              data={apidata}
              renderItem={({ item }) => {
                return <Card item={item} />;
              }}
            />
            {/* <FlatList
            // columnWrapperStyle={{ justifyContent: 'space-between' }}
            // showsVerticalScrollIndicator={false}
            //vertical
            horizontal
            contentContainerStyle={{
              // marginTop: 20,
              paddingBottom: 50,
              // justifyContent: 'space-between',
              //flex:0,
            }}
            // numColumns={3}
            data={offerdata}
            renderItem={({ item }) => {
              return <Offer item={item} />;
            }}
          /> */}
          </View>
          {/* <View>
          <Carousel data={dummyData} />
        </View> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OfferItem')}
        >
          <View style={{ marginTop: 20, }}>
            <Carousel data={dummyData} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
    // alignItems: 'baseline',
    //paddingHorizontal: 20,
    //marginLeft: 10,
    //flex: 1,
  },
  categoryText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    //justifyContent: 'space-between',
  },
  categoryTextSelected: {
    color: colors.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: colors.green,
  },
  card: {
    //height: 225,
    backgroundColor: colors.lightGreyWhite,
    width,
    marginHorizontal: 2,
    borderRadius: 25,
    // borderBottomEndRadius: 50,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    marginBottom: 5,
    paddingTop: 5,
    // paddingHorizontal: 30,
    // padding: 15,
    shadowColor: colors.black,
    elevation: 1,
  },
  cardOffer: {
    //height: 225,
    // backgroundColor: '#f0f',
    // widthOffer,
    // justifyContent: 'space-between',
    width: widthOffer,
    marginHorizontal: 10,
    // borderRadius: 25,
    // marginBottom: 5,
    // paddingTop: 5,
    // paddingHorizontal: 30,
    // padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: colors.lightGreyWhite,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    color: colors.black,
    // backgroundColor: colors.light,
    marginLeft: 20,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    width,
    resizeMode: "contain",
  },
  iconOffer: {
    flex: 1,
    width: widthOffer,
    borderRadius: 20,
    // justifyContent: "space-between",
    // resizeMode: "contain",
    resizeMode: "stretch",
    // backgroundColor: '#000'
  },
});

export default Home;