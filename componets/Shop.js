import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';

export default function  Shop({ route, navigation }) {
    const { id, img, products, name } = route.params;
    React.useEffect(() => {
        axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/shop/' + id)
        .then(({ data }) => {
          setValue(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить магазин')
        })
      }, [])

    React.useEffect(() => {
        axios.get('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/basket/1')
        .then(({ data }) => {
          setData(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить магазин')
        })
    }, [])

    const [data_2, setData] = useState([{"card": [{"name_product": {"price": "  "}}]}])
    const [data, setValue] = useState();
    const [basket, setBasket] = useState('')
    const addBasket= (name_product, name, num, price) => {
        setBasket((list) => {
            return[
                {name_product: name_product, name: name, num: num, price: price},
                ...list
            ]
        })
    }
    console.log(data_2.card)
    console.log(basket)
    const  setBasket_end = (() => {
        if (data_2.card != undefined){
            mass = [...name_product, name]
            console.log("отправка: ", basket[0])
        }
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
        <Image style={styles.url} source={{uri: img}}></Image>
        <View style={styles.block}>
            <FlatList data={products} numColumns={2} style={styles.flat} renderItem={({item}) => (
                <SafeAreaView style={styles.card_2}>
                    <Image style = {styles.img} source={{uri: item.img_p}}/>
                    <Text style={{marginTop: 10}}>{item.price}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name_product}</Text>
                    <TouchableOpacity onPressOut={() => addBasket({name_product: item.name_product, name: name, num: item.num, price: item.price})}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', padding: 5, borderRadius: 15, backgroundColor: 'rgba(217, 217, 217, 1)', position: 'relative', top: '50%'}}>+  Добавить</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}/>
            <TouchableOpacity onPressOut={LoadScene_Basket} onPress={() => setBasket_end()}>
                <Text style={[styles.block_2, {fontSize: 22, fontWeight:'bold', textAlign:'center'}]}>Перейти в корзину</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginHorizontal: 10,
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
    }
});