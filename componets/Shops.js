import { StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';



export default function  Shops({ navigation }) {
    React.useEffect(() => {
        axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/shop')
        .then(({ data }) => {
          setMenu(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить магазины')
        })
      }, [])
    const [value, setMenu] = useState();
  return (
    <ScrollView style={styles.container}>
        <FlatList data={value} renderItem={({item}) => (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Shop', {id: item.id, img: item.img, products: item.products, name: item.name})}>
                    <Image style = {styles.image} source={{uri: item.img}}/>
                </TouchableOpacity>
                <Text style={{marginBottom: 20, fontSize: 16, fontWeight: 'bold', position: 'relative', left: '9%'}}>{item.name}</Text>
            </View>
        )}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginHorizontal: 10
    },
    image: {
        width: "80%",
        height: 165,
        marginBottom: 20,
        borderRadius: 15,
        position: 'relative',
        left: '9%'
      }
});