import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles';

const Details = ({route,navigation}) => {
    const {todo} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{...styles.text,color:"black"}}>{todo.title}</Text>
      <Text style={{...styles.text,color:"black"}}>{todo.status}</Text>
    </SafeAreaView>
  )
}

export default Details