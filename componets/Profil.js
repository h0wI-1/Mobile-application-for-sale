import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { Formik } from 'formik';


export default function Profil({ navigation }) {
    const LoadScene_Pay = () => {
        navigation.navigate('Pay')
    }
    React.useEffect(() => {
        axios.get('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/profil')
        .then(({ data }) => {
          setValue(data);
        }).catch((err) => {
          console.log(err);
          Alert.alert('Ошибка', 'не удалось загрузить профиль')
        })
      }, [])
    const [value, setValue] = useState([{name:'Имя', mail:'Электронная почта', phone: 'Номер телефона'}]);
    const name__2 = value[0]
    console.log(value)
    const [n_name, set_name] = useState(name__2.name);
    const [n_mail, set_mail] = useState(name__2.mail);
    const [n_phone, set_phone] = useState(name__2.phone);
    const addArticle = () => {
        setValue((list) => {
            if ("Имя" == n_name){
                Alert.alert('Ошибка', 'Введите все данные')
                set_name('')
                return [
                    ...list
                ]
            } else if ("Электронная почта" == n_mail){
                Alert.alert('Ошибка', 'Введите все данные')
                set_mail('')
                return [
                    ...list
                ]
            } else if ("Номер телефона" == n_phone){
                Alert.alert('Ошибка', 'Введите все данные')
                set_phone('')
                return [
                    ...list
                ]
             } else{        
                axios.put('https://638772d5e399d2e473ff6cd0.mockapi.io/api/v1/profil/1', {
                    id: "1",
                    name: n_name,
                    mail: n_mail,
                    phone: n_phone
                })
                .then(function (response) {
                    console.log(response);
                    console.log(n_name)
                    console.log(n_mail)
                    console.log(n_phone)
                })
                .catch(function (error) {
                    console.log(error);
                })
                return[
                    ...list
                ]
        }});
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.profil}>
        <Formik initialValues={{name:'', mail: '', phone: ''}} onSubmit={(values) => {
                                addArticle(values);
                            }}>
                                {(props) => (
                                    <>
                                        <FlatList data={value} renderItem={({item}) =>(
                                            <>
                                                <TextInput onChangeText={set_name} value={props.values.name} placeholder={item.name} style={styles.input} onChange={props.handleChange('name')}></TextInput>
                                                <TextInput onChangeText={set_mail} value={props.values.mail} placeholder={item.mail} style={styles.input} onChange={props.handleChange('mail')}></TextInput>
                                                <TextInput maxLength={15} onChangeText={set_phone}value={props.values.phone} placeholder={item.phone} keyboardType='numeric' style={styles.input } onChange={props.handleChange('phone')}></TextInput>
                                            </>
                                            )}>
                                        </FlatList>
                                        <TouchableOpacity style={{flexDirection: 'row', borderBottomWidth: 1, justifyContent:'space-between' }} onPress={LoadScene_Pay}>
                                            <Text style={styles.pay}>Способ оплаты</Text>
                                            <AntDesign name="rightcircleo" size={15} color="black" style={{ paddingBottom: 10, position: 'relative', top: 40}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={props.handleSubmit} style={styles.btn}>
                                            <Text  style={styles.btn_2}>Сохранить</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Formik>
        </View>
    </SafeAreaView>
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
    input: {
        marginTop: 10,
        borderBottomWidth: 1,
        marginBottom: 30,
        padding: 10,
        color: 'rgba(0, 0, 0, 0.40)',
    },
    input_2: {
        marginTop: 10,
        borderBottomWidth: 1,
        marginBottom: 30,
        padding: 10,
        color: 'rgba(0, 0, 0, 0.40)',
    },
    pay: {
        marginTop: 30,
        fontSize: 16,
        paddingBottom: 10,
        paddingEnd: 190
    },
    btn: {
        marginTop: 50,
    },
    btn_2: {
        fontSize: 24,
        paddingStart: 60,
        paddingEnd: 60,
        paddingVertical: 15,
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 15,
        alignSelf: 'center',
    }
});