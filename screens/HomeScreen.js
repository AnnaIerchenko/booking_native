import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import { Header } from 'react-native/Libraries/NewAppScreen'

const HomeScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:true,
      title:"Booking.com",
      headerTitleStyle:{
        fontSize:20,
        fontWeight:"bold",
        color:"white"
      },
      headerStyle:{
        backgroundColor:"#003580",
        height:100,
        borderBottomColor:"transparent",
        shadowColor:"transparent"
      },
      headerRight:() => (
        <Ionicons name="notifications-outline" size={24} color="white" style={{marginRight:12}}/>
      )
    })
  },[])
  return (
    <View>
      <Header />
    </View>
  )
}

export default HomeScreen