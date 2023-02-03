import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Fontisto, Feather } from '@expo/vector-icons';


export default function Support() {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.support}>
            <View style={styles.text}>
                <Fontisto name="telegram" size={60} color="black" />
                <View style={styles.text_tg}>
                    <Text style={{fontSize: 20}} >tg: </Text>
                    <Text selectable={true} style={{fontSize: 20}}>@ahowI</Text>
                </View>
            </View>
            <View style={styles.text}>
                <View style={styles.chto}>
                    <Feather name="mail" size={60} color="black" />
                    <Text selectable={true} style={{fontSize: 20, position: 'relative', top: '6%', left: 20}}> delivery_cht@mail.ru</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        marginTop: 20
    },
    support: {
        marginStart: 20,
        marginEnd: 20, 
    },
    text: {
        flexDirection: 'row',
        marginBottom: 30
    },
    text_tg: {
        flexDirection: 'row',
        position: "relative",
        top: '25%',
        left: 20,
    },
    chto: {
        flexDirection: 'row',
    },

});