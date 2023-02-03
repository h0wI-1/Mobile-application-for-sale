import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 


export default function Order({ navigation }) {
    const [value, setPhone] = useState([
        "......."
    ]);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.order}>
            <Text style={styles.text}>Заказ в пути</Text>
            <AntDesign name="check" size={120} color="green" style={{textAlign: 'center', marginBottom: 30}}/>
            <View>
                <Text style={styles.text_2}>Номер телефона курьера</Text>
                <TouchableOpacity><Text selectable={true}>{value}</Text></TouchableOpacity>
                <View style={{borderBottomWidth: 0.5, marginTop: 10}}></View>
            </View>
            <View style={styles.block}>
                <Text style={styles.time}>
                    Примерное прибытие через
                </Text>
                <Text style={styles.time}> 30 минут</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', padding: 20, borderRadius: 15, backgroundColor: 'rgba(217, 217, 217, 1)', marginTop: 40}}>На главную</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginTop: 20
    },
    order: {
        marginStart: 20,
        marginEnd: 20, 
    },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    text: {
        flexDirection: 'column',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
    text_2: {
        fontSize: 20,
        marginBottom: 10
    },
    phone: {
        color: 'rgba(0, 0, 0, 0.5)',
        paddingBottom: 5,
    }, 
    time: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});