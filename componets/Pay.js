import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Alert, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';


export default function Pay({}) {
    React.useEffect(() => {
        axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/card')
        .then(({ data }) => {
          setValue(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить карты')
        })
      }, [])
    const [value, setValue] = useState();
    var c = ''
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const changeModalVisibility = (bool) => {
        setIsModalVisible2(bool)
    };
    const [n_num, set_num] = useState('');
    const [n_cvc, set_cvc] = useState('');
    const [n_date, set_date] = useState('');
    var count = 0

    const addArticle = (article) => {
        setValue((list) => {
            if (c == n_num){
                Alert.alert('Ошибка', 'Введите все данные')
                set_num('')
                set_cvc('')
                set_date('')
                return [
                    ...list
                ]
            } else if (c == n_cvc){
                Alert.alert('Ошибка', 'Введите все данные')
                set_num('')
                set_cvc('')
                set_date('')
                return [
                    ...list
                ]
            } else if (c == n_date){
                Alert.alert('Ошибка', 'Введите все данные')
                set_num('')
                set_cvc('')
                set_date('')
                return [
                    ...list
                ]
             } else{
                    var b = n_num
                if (b[0] == 2) {
                    article.name = 'MIR ** ' +b[12]+b[13]+b[14]+b[15]
                } else if (b[0] == 4) {
                    article.name = 'VISA ** ' +b[12]+b[13]+b[14]+b[15]
                } else if (b[0] == 5) {
                    article.name = 'MasterCard ** ' +b[12]+b[13]+b[14]+b[15]
                } else {
                    article.name = 'Maestro ** ' +b[12]+b[13]+b[14]+b[15]
                };

                if (count == 0){
                axios.post('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/card', {
                    name: article.name,
                    cvc: n_cvc,
                    date: n_date,
                    number: n_num

                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                count = count + 1
                }
                set_num('')
                set_cvc('')
                set_date('')
                console.log('10')
                return [
                    article,
                    ...list
                ]
            }
        });
        count = 0
        setIsModalVisible2(false)
    }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.pay}>
            <FlatList data={value} renderItem={({item}) => (
                <View style={styles.obj}>
                    <AntDesign name="creditcard" size={30} color="black" style={styles.png}/>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            )}/>
            <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                <View style={styles.obj}>
                    <AntDesign name="creditcard" size={30} color="black" style={styles.png}/>
                    <Text style={styles.text}>Привязать новую карту</Text>
                </View>
            </TouchableOpacity>
            <StatusBar visible={true} transparent={true}></StatusBar>
            <Modal visible={isModalVisible2} animationType={'fade'} transparent={true} onRequestClose={() => changeModalVisibility(false)}>
                <TouchableOpacity onPress={() => changeModalVisibility(false)} style={styles.modal_2} ></TouchableOpacity>
                <View style={styles.modal}>
                    <View style={styles.modal_inside}>
                        <StatusBar visible={true} transparent={true} backgroundColor={'rgba(52, 52, 52, 0.6)'}></StatusBar>
                            <Formik initialValues={{number: '', cvc: '', date: ''}} onSubmit={(values, action) => {
                                addArticle(values);
                                action.resetForm();
                            }}>
                                {(props) => (
                                    <View>
                                        <TextInput maxLength={16} keyboardType='numeric' value={props.values.number} placeholder='Введите номер карты' style={[styles.input, {marginTop: 20, marginBottom: 25}]} onChangeText={set_num} onChange={props.handleChange('number')}></TextInput>
                                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                                            <TextInput keyboardType='numeric' maxLength={4} value={props.values.date} placeholder='ММ/ГГ' style={styles.input} onChangeText={set_date} onChange={props.handleChange('date')}></TextInput>
                                            <TextInput keyboardType='numeric'  maxLength={3} value={props.values.cvc} placeholder='CVC' style={styles.input} onChangeText={set_cvc} onChange={props.handleChange('cvc')}></TextInput>
                                        </View>
                                        <TouchableOpacity>
                                            <Text onPress={props.handleSubmit} style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: 15, borderRadius: 15, backgroundColor: 'rgba(217, 217, 217, 1)', position: 'relative', top: '50%'}}>Добавить</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                    </View>
                </View>
            </Modal>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginTop: 20
    },
    profil: {
        marginStart: 20,
        marginEnd: 20, 
    },
    pay: {
        marginStart: 20,
        marginEnd: 20,
    },
    text: {
        marginTop: 10,
        padding: 10,
        fontSize: 20,
        marginStart: 40
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
    input: {
    borderRadius: 15,
    marginBottom: 20
    }
});