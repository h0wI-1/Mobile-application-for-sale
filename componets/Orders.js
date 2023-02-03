import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';



export default function Orders({ navigation }) {
    React.useEffect(() => {
        axios.get('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/orders')
        .then(({ data }) => {
          setValue(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить заказы')
        })
      }, [])
    const [value, setValue] = useState();
  return (
    <SafeAreaView style={styles.container}>
         <StatusBar visible={true} transparent={true}></StatusBar>
        <FlatList data={value} renderItem={({item}) => (
            <View style={styles.orders}>
                <TouchableOpacity onPress={() => navigation.navigate('Finish_order', { id: item.id, price: item.price_2, products: item.products})} style={styles.block}>
                    <View>
                        <Text style={styles.name}>{item.products.card[0].name_product.name}</Text>
                        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                    </View>
                    <Text style={styles.price}>{item.price_2} ₽</Text>
                </TouchableOpacity>
            </View>
        )}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginTop: 20
    },
    orders: {
        marginStart: 20,
        marginEnd: 20, 
    },
    block: {
        backgroundColor: 'rgba(217, 217, 217, 1)',
        marginBottom: 25,
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    date: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    price: {
        position: 'absolute',
        top: '50%',
        left: '85%', 
        fontSize: 20,
        fontWeight: 'bold'
    },
    modal_2: {
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    modal: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
      modal_2: {
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
      modal_inside: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        padding: 20,
        paddingStart: 50,
        paddingEnd: 70,
        backgroundColor: 'rgba(239, 239, 239, 1)',
        height: '50%',
        borderRadius: 15
    },
});