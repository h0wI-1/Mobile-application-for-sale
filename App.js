import { StyleSheet } from 'react-native';
import MainStack from "./navigate"


export default function App() {
  return (
    <MainStack style={styles.main} />
 );
}

const styles = StyleSheet.create({
  main:{
    backgroundColor: 'EFEFEF'
  }
});