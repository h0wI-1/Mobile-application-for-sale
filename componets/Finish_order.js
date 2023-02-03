import { StyleSheet, Text, View} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


export default function Finish_order({ route }) {
    const { products, price } = route.params;
    var data_2 = products.card
  return (
    <ScrollView style={styles.container}>
        <FlatList data={data_2} renderItem={({item}) => (
            <View style={styles.block}>
                <View style={styles.text_1}>
                    <Text style={{fontWeight:'bold', fontSize: 20}}>{item.name_product.name_product}</Text>
                </View>
                <Text style={styles.text_2}>{item.name_product.price}</Text>
            </View>
        )}>
        </FlatList>
        <Text style={[styles.block, {fontSize: 22, fontWeight:'bold', textAlign:'center'}]}>Итого: {price} ₽</Text>
    </ScrollView>
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
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
    text_2: {
        fontSize: 20,
        marginBottom: 10,
        position: 'relative',
        top: '0.5%'
    }
});