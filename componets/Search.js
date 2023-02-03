import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity, ScrollView , Modal, Alert, SafeAreaView} from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons'; 

const filter_products = (searchText, listOfProduct) => {
    if (!searchText) {
        return listOfProduct;
    }
    return listOfProduct.filter(({ name_product }) => 
        name_product.toLowerCase().includes(searchText.toString().toLowerCase())
    );
}

export default function Search({ navigation }) {

        React.useEffect(() => {
            axios.get('https://63dc33d0b8e69785e493a401.mockapi.io/pox/products')
            .then(({ data }) => {
            setData_2(data);
            setProductsList(data);
            }).catch((err) => {
            console.log("ужас")
            console.log(err);
            Alert.alert('Ошибка', 'не удалось загрузить магазины')
            })
        }, []);
        const [data_2, setData_2] = useState([])
        const [productsList, setProductsList] = useState([]);
        const [searchTerm, setSearchTerm] = useState('')

        useEffect(() => {
            const Debounce = setTimeout(() => {
                const filtered_product = filter_products(searchTerm, data_2);
                setProductsList(filtered_product);
            }, 300);

            return () => clearTimeout(Debounce);
        }, [searchTerm]);
        const [basket, setBasket] = useState('')
        const addBasket= (name_product, name, num, price) => {
            setBasket((list) => {
                return[
                    {name_product: name_product, name: name, num: num, price: price},
                    ...list
                ]
            })
        }

        const  setBasket_end = (() => {
            if (basket == 0){
                console.log("корзинка пустая")
            } else {
            axios.put('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/basket/1', {
            card: basket
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            }
        })
        const LoadScene_Basket = () => {
            navigation.navigate('Basket')
          }
    return (
        <ScrollView style={styles.container}>
            <View style = {styles.box}>
                <TextInput placeholder='Поиск по всем Магазинам' onChangeText={setSearchTerm} style={styles.input}></TextInput>
                <TouchableOpacity onPressOut={LoadScene_Basket} onPress={() => setBasket_end()}>
                    <FontAwesome5 name="shopping-basket" size={45} color="black" style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <FlatList data={productsList} numColumns={2} style={styles.flat} renderItem={({item}) => (
                <SafeAreaView style={styles.card_2}>
                    <Image style = {styles.img} source={{uri: item.img_p}}/>
                    <Text style={{marginTop: 10}}>{item.price}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name_product}</Text>
                    <TouchableOpacity onPressOut={() => addBasket({name_product: item.name_product, name: item.name, num: item.num, price: item.price})}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', padding: 5, borderRadius: 15, backgroundColor: 'rgba(217, 217, 217, 1)', position: 'relative', top: '50%'}}>+  Добавить</Text>
                        </TouchableOpacity>
                </SafeAreaView>
            )}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
      },
    block: {
        marginHorizontal: 15
    },
    url: {
        width: '100%',
        height: 250,
        borderRadius: 15, 
        marginBottom: 30
      },
    name: {
        position: 'relative',
        top: -70,
        left: 20,
        fontSize: 25,
        fontWeight: 'bold'
    },
    card: {
        paddingHorizontal: 50,
        paddingVertical: 60, 
        justifyContent: 'space-around',
        flexDirection:'column',
        backgroundColor: 'rgba(185, 185, 185, 1)'
    },
    img: {
        width: "100%",
        height: 120,
        borderRadius: 15
    },
    card_2: {
       backgroundColor: 'rgba(217, 217, 217, 1)' ,
       borderRadius: 15,
       padding: 20,
       marginLeft: '6%',
       marginBottom: 30,
       flex: 1
    },
    flat: {
        position: 'relative',
        left: '-3%'
    },
    block_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(185, 185, 185, 1)',
        padding: 15,
        marginBottom: 20
    },
    input:{
        paddingStart: 45,
        paddingEnd: 40,
        backgroundColor: 'rgba(217, 217, 217, 1)',
        color: 'rgb(128,128,128)',
        borderRadius: 15,
        position: "relative", 
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 55,
        paddingRight: 70,
        marginHorizontal: 20,
        marginBottom: 20
    },
    box: {
        flexDirection: 'row'
    },
    icon: {
        position: 'relative',
        top: "7%"
    }
});