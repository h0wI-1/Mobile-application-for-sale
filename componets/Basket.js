import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function Basket({ navigation }) {
  React.useEffect(() => {
    axios.get('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/basket')
    .then(({ data }) => {
      setValue(data);
      setCard(data[0])
    }).catch((err) => {
      console.log(err);
      Alert.alert('Ошибка', 'не удалось загрузить корзину')
    })
  }, [])
  let summ = 0
  const [data, setValue] = useState([{"card": [{"name_product": {"price": "  "}}]}]);
  var len = data[0].card.length

  for (let i = 0; i < len; i++){
    summ = summ + Number(data[0].card[i].name_product.price.slice(0, -2))
  }
  const [card, setCard]= useState('')
  var data_2 = data[0].card
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{fontWeight:'bold', fontSize: 25, textAlign:'center'}}>Содержимое корзины</Text>
      <FlatList data={data_2} renderItem={({item}) => (
        <View style={styles.block}>
          <Text style={{fontWeight:'bold', fontSize: 20}}>{item.name_product.name_product}</Text>
          <Text style={styles.text_2}>{item.name_product.price}</Text>
        </View>
      )}/>
      <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
        <Text style={styles.summ}>Итого: {summ} ₽</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Pay_order', { price: summ, value: card })}>
          <Text style={styles.summ}>Перейти к оплате</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(239, 239, 239, 1)',
    marginHorizontal: '5%'
  },
  block: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      borderRadius: 15,
      backgroundColor: 'rgba(185, 185, 185, 1)',
      padding: 15,
      marginBottom: 20
  },
  text_2: {
    fontSize: 20,
    marginBottom: 10,
    position: 'relative',
    top: '0.5%'
  },
  summ: {
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(185, 185, 185, 1)',
    padding: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
});