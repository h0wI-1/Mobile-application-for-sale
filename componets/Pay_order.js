import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import axios from 'axios';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';



export default function Pay_order({ route, navigation }) {
    const { price, value} = route.params;
    const [bomb, setBomb] = useState()
    const [data, setData] = useState([{"name": ""}])
    React.useEffect(() => {
        axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/card')
        .then(({ data }) => {
          setData(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить карты')
        })
      }, []) 

    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const changeModalVisibility = (bool) => {
        setIsModalVisible2(bool)
    }
    const [count, setCount] = useState(0)
    const [n_address, set_address] = useState();
    const [n_flat, set_flat] = useState();
    const [n_intercom, set_intercom] = useState();
    const [n_floor, set_floor] = useState();
    const [n_date, set_date] = useState();
    const [n_price, set_price] = useState();
    const LoadScene_Order = () =>{
        navigation.navigate('Order')
    }
    var drix = 0
    var drixx = 0
    var c = ''
    console.log(value)
    console.log("длина списка", data.length)
    const addArticle = () => {
        setBomb((list) => {
            if (c == n_address){
                Alert.alert('Ошибка', 'Введите все данные')
                set_address('')
                set_flat('')
                set_intercom('')
                set_floor('')
                return [
                    ...list
                ]
            } else if (c == n_flat){
                Alert.alert('Ошибка', 'Введите все данные')
                set_address('')
                set_flat('')
                set_intercom('')
                set_floor('')
                return [
                    ...list
                ]
            } else if (c == n_intercom){
                Alert.alert('Ошибка', 'Введите все данные')
                set_address('')
                set_flat('')
                set_intercom('')
                set_floor('')
                return [
                    ...list
                ]
             } else if (c == n_floor) {
                Alert.alert('Ошибка', 'Введите все данные')
                set_address('')
                set_flat('')
                set_intercom('')
                set_floor('')
                return [
                    ...list
                ]
             } else{ 
                if (drix == 0) {
                    axios.delete('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/basket/1')
                    .then(function (response) {
                        console.log(response);
                        })
                        .catch(function (error) {
                        console.log(error);
                        })
                        drixx = drixx + 1
                    



                    console.log(drixx)
                    axios.post('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/orders', {
                        address: n_address,
                        flat: n_flat,
                        intercom: n_intercom,
                        floor: n_floor,
                        price_2: n_price,
                        products: n_date, 
                        card: count
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    drix = drix + 1 
                    return[
                        ...list
                    ]   
                } 
        }});
        axios.post('https://638775b7e399d2e473ffc70b.mockapi.io/api/v2/basket')
        .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            })
        drix = 0
        LoadScene_Order()
        drixx = 0
    }
  return (  
    <SafeAreaView style={styles.container}>
        <Formik initialValues={{address: '', flat: '', intercom: '', floor: ''}} onSubmit={(values, action) => {
            addArticle(values);
            action.resetForm();
        }}>
            {(props) => (
                <View>
                    <TextInput value={props.values.address} placeholder='Адрес' style={styles.input} onChangeText={set_address} onChange={props.handleChange('address')}></TextInput>
                    <TextInput keyboardType='numeric' value={props.values.flat} placeholder='Квартира' style={styles.input} onChangeText={set_flat} onChange={props.handleChange('flat')}></TextInput>
                    <TextInput value={props.values.intercom} placeholder='Домофон' style={styles.input} onChangeText={set_intercom} onChange={props.handleChange('intercom')}></TextInput>
                    <TextInput keyboardType='numeric' value={props.values.floor} placeholder='Этаж' style={styles.input} onChangeText={set_floor} onChange={props.handleChange('floor')}></TextInput>
                    <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                        <View style={styles.card}>
                            <AntDesign name="creditcard" size={30} color="black" style={{marginEnd: 20}} />
                            <Text style={{fontSize: 22}}>{data[count].name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.all}>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: 15, borderRadius: 15, backgroundColor: 'rgba(217, 217, 217, 1)'}}>Итого: {price} ₽</Text>
                        <TouchableOpacity onPressOut={[set_date(value), set_price(price)]}>
                            <Text onPress={props.handleSubmit} style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: 15, borderRadius: 15, backgroundColor: 'rgba(217, 217, 217, 1)'}}>Оплатить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            </Formik>
            <Modal visible={isModalVisible2} animationType={'fade'} transparent={true} onRequestClose={() => changeModalVisibility(false)}>
                <TouchableOpacity onPress={() => changeModalVisibility(false)} style={styles.modal_2} ></TouchableOpacity>
                <View style={styles.modal}>
                    <View style={styles.modal_inside}>
                        <StatusBar visible={true} transparent={true} backgroundColor={'rgba(52, 52, 52, 0.6)'}></StatusBar>
                        <FlatList data={data} renderItem={({item}) => (
                            <TouchableOpacity onPress={() => setCount(item.id - 1)} onPressOut={() => changeModalVisibility(false)}>
                                <View style={styles.obj}>
                                    <AntDesign name="creditcard" size={30} color="black" style={styles.png}/>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginHorizontal: '5%'
    },
    order: {
        marginStart: 20,
        marginEnd: 20, 
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
    text: {
        flexDirection: 'column',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        position: 'relative',
        top:"33%"
    },
    text_2: {
        fontSize: 20,
        marginBottom: 10,
        position: 'relative',
        top: '0.5%'
    },
    input: {
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 15
    },
    all: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modal_2: {
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    png: {
        paddingBottom: 10,
        top: 16,
        left: 10,
        position: 'absolute'
    },
    obj: {
        borderBottomWidth: 1, 
        marginBottom: 35
    },
    modal: {
        position: 'absolute',
        width: '100%',
        height: '100%',
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
      card:{
        fontSize: 20,
        paddingVertical: 15,
        paddingHorizontal: '10%',
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 15, 
        marginBottom: 20,
        marginTop: 15,
        flexDirection: 'row'
      }
});