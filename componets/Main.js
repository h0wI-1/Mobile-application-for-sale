import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView , Modal, Alert} from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';



export default function Main({ navigation }) {
    React.useEffect(() => {
      axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/shop')
      .then(({ data }) => {
        setValue(data);
      }).catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'не удалось загрузить магазины')
      })
    }, [])
    React.useEffect(() => {
      axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/sale_shop')
      .then(({ data }) => {
        setValue_2(data);
      }).catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'не удалось загрузить магазины')
      })
    }, [])

    const LoadScene_Shops = () => {
      navigation.navigate('Shops')
    }

    const LoadScene_Profil = () => {
      navigation.navigate('Profil')
    }

    const LoadScene_Orders = () => {
      navigation.navigate('Orders')
    }

    const LoadScene_Search = () => {
      navigation.navigate('Search')
    }

    const LoadScene_Support = () => {
      navigation.navigate('Support')
    }

    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const changeModalVisibility = (bool) => {
        setIsModalVisible2(bool)
    }

    const [value, setValue] = useState([]);
    const [value_2, setValue_2] = useState([]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar visible={true} transparent={true}></StatusBar>
      <Modal visible={isModalVisible2} animationType={'fade'} transparent={true} onRequestClose={() => changeModalVisibility(false)}>
        <TouchableOpacity onPress={() => changeModalVisibility(false)} style={styles.modal_2} ></TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.modal_inside}>
          <StatusBar visible={true} transparent={true} backgroundColor={'rgba(52, 52, 52, 0.6)'}></StatusBar>
            <Text style={styles.modal_logo}>Лучшая доставка</Text>
            <View style = {styles.modal_app}>
            <FontAwesome name="user" size={30} color="black" style={[{flex: 1, marginLeft: -6}]}/>
            <TouchableOpacity onPress={LoadScene_Profil} onPressOut={() => changeModalVisibility(false)}>
              <Text style={{fontSize: 25, marginLeft: -2, position: 'relative', left: -27}}>Профиль</Text>
            </TouchableOpacity>
            </View>
            <View style = {styles.modal_app}>
            <AntDesign name="bars" size={30} color="black" style={{marginLeft: -10, marginEnd: 19}} />
            <TouchableOpacity onPress={LoadScene_Orders} onPressOut={() => changeModalVisibility(false)}>
              <Text style={{fontSize: 25}}>Заказы</Text>
            </TouchableOpacity>
            </View>
            <View style = {styles.modal_app}>
            <Entypo name="chat" size={30} color="black" style={{marginLeft: -10, marginEnd: 5}} />
            <TouchableOpacity onPress={LoadScene_Support} onPressOut={() => changeModalVisibility(false)}>
              <Text style={{fontSize: 25, marginLeft: 12}}>Поддержка</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
       <View style = {styles.box}>
      <TouchableOpacity style = {{marginEnd: 20}} onPress={() => changeModalVisibility(true)}>
        <FontAwesome name="user" size={40} color="black" style={[{flex: 1}]}/>
       </TouchableOpacity>
       <TouchableOpacity onPressOut={LoadScene_Search}>
        <Text style={[styles.textinput, {flex: 2}]}> Поиск по всем Магазинам</Text>
       </TouchableOpacity>
       </View>
       <View style={{ borderBottomColor: 'rgba(217, 217, 217, 1)', borderBottomWidth: 1, marginTop: 5}}/>
       <View style={[styles.box]}>
        <Text style={{fontSize: 36, fontWeight: 'bold', marginEnd: 120}}>Магазины</Text>
        <Text title='все' style={{height: 25, width: 25, position: 'static', marginTop:20 } } onPress={LoadScene_Shops}>все</Text>
       </View>
       <View style={[styles.magaz, {marginTop: 20}]}>
        <FlatList data={value} horizontal renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Shop', {id: item.id, img: item.img, products: item.products, name: item.name})}>
                <Image style = {styles.image} source={{uri: item.img}}/>
            </TouchableOpacity>
        )}/>
       </View>
       <View style={[styles.box, {marginTop: 10, marginBottom: 10 }]}>
        <Text style={{fontSize: 36, fontWeight: 'bold', marginEnd: 180}}>Акции</Text>
       </View>
        <FlatList data={value_2}  renderItem={({item}) => (
            <TouchableOpacity style = {styles.sales} onPress={() => navigation.navigate('Shop', {id: item.id, img: item.img, products: item.products, name: item.name})}>
                <Image style = {styles.sale} source={{uri: item.img}}/>
                <Text style={{marginBottom: 20, fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
            </TouchableOpacity>
        )}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(239, 239, 239, 1)',
  },
  magaz: {
    flexDirection: 'row',
    marginStart: 20,
    marginEnd: 20
  },
  image: {
    width: 100,
    height: 100,
    marginEnd: 15,
    borderRadius: 15
  },
  box: {
    flexDirection: 'row',
    height: 50,
    marginStart: 20,
    marginEnd: 20
  },
  textinput: {
    paddingStart: 45,
    paddingEnd: 40,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    color: 'rgb(128,128,128)',
    borderRadius: 15,
    position: "relative", 
    paddingBottom: 0,
    paddingTop: 15,
    paddingLeft: 55,
    paddingRight: 70
  },
  img: {
    height: 100,
    width: 100
  },
  sale: {
    width: '100%',
    height: 165,
    marginBottom: 5,
    borderRadius: 15
  },
  sales: {
    width: 300,
    marginStart: '8%',
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
    padding: 20,
    paddingEnd: 70,
    backgroundColor: 'rgba(239, 239, 239, 1)',
    height: '97%',
    borderRadius: 15
  },
  modal_logo: {
    fontSize: 40,
    marginBottom: 60
  },
  modal_app: {
    flexDirection: 'row',
    height: 50,
    marginStart: 20,
    marginEnd: 20, 
  }
});