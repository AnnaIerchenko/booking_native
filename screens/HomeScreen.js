import { View, Text, ScrollView, Pressable, Button, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {AntDesign, Ionicons, Feather} from '@expo/vector-icons'
import  Header from '../components/Header'
import DatePicker from 'react-native-date-ranges'
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [selectedDates, setSelectedDates] = useState()
  // console.log(selectedDates)
  const [rooms,setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children,setChildren] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

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

  const customButton = (onConfirm) => {
    return (
      <Button 
        onPress={onConfirm}
        style={{
          container:{width:"80%",marginHorizontal:"3%"},
          text:{fontSize:20},
        }}
        primary
        title="Submit"
      />
    )
  }
  return (
    <>
    <View>
      <Header />
      <ScrollView>
        <View style={{margin:20,borderColor:"ffc72c",borderWidth:0,borderRadius:16}}>
          {/* destination */}
          <Pressable
            style={{
              flexDirection:"row",
              alignItems:"center",
              gap:10,
              paddingHorizontal:10,
              borderColor:"#ffc72c",
              borderWidth:2,
              paddingVertical:15
          }}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput placeholderTextColor="black" placeholder="Enter your destination"/>
          </Pressable>

          {/* selected Dates */}
          <Pressable
             style={{
              flexDirection:"row",
              alignItems:"center",
              gap:10,
              paddingHorizontal:10,
              borderColor:"#ffc72c",
              borderWidth:2,
              paddingVertical:15
          }}
          >
            <Feather name="calendar" size={24} color="black"/>
            <DatePicker 
              style={{width:350, height:30,borderRadius:0,borderWidth:0,borderColor:"yellow"}}
              customStyles={{
                placeholderText:{
                  fontSize:15, 
                  flexDirection:"row",
                  alignItems:"center",
                  marginRight:"auto"
                },
                headerStyle:{
                  backgroundColor:"#003580"
                },
                contentText:{
                  fontSize:15, 
                  flexDirection:"row",
                  alignItems:"center",
                  marginRight:"auto"},
              }}
              selectedBgColor="#0047ab"
              customButton={(onConfirm) => customButton(onConfirm)}
              onConfirm={(startDate, endDate) => setSelectedDates(startDate, endDate)} 
              allowFontScaling={false}
              placeholder={"Apr 27, 2018 - Jul 10, 2018"}
              mode={"range"}
            />
          </Pressable>

          {/* rooms and guests */}
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection:"row",
              alignItems:"center",
              gap:10,
              paddingHorizontal:10,
              borderColor:"#ffc72c",
              borderWidth:2,
              paddingVertical:15
          }}
          >
            <Ionicons name="person-outline" size={24} color="black"/>
            <TextInput placeholderTextColor="red" placeholder={` ${rooms} room * ${adults} adults * ${children} Children`}/>
          </Pressable>

          {/* search button */}
          <Pressable
              style={{
              gap:10,
              paddingHorizontal:10,
              borderColor:"#ffc72c",
              borderWidth:2,
              paddingVertical:15,
              backgroundColor:"#2e52be"
          }}
          >
            <Text style={{textAlign:"center",fontSize:15,fontWeight:"500",color:"white"}}>Search</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>

{/* bottom modal */}
    <BottomModal 
      swipeThreshold={200} 
      onBackdropPress={() => setModalVisible(!modalVisible)}
      swipeDirection={['up','down']}
      footer={
        <ModalFooter>
          <ModalButton 
            text="Apply" 
            style={{
              marginBottom:20,color:"white",backgroundColor:"#003580"
          }}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </ModalFooter>
      }
      modalTitle={<ModalTitle title="Select rooms and quests "/>}
      modalAnimation={new SlideAnimation({
        slideFrom:"bottom"
      })}
      onHardwareBackPress={() => setModalVisible(!modalVisible)}
      visible={modalVisible}
      onTouchOutside={() => setModalVisible(!modalVisible)}
    >
      {/* modal content */}
      <ModalContent style={{width:"100%",height:310}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:15}}>
          <Text style={{fontSize:16,fontWeight:"500"}}>Rooms</Text>
          <Pressable 
            style={{
              flexDirection:"row",
              alignItems:"center",
              gap:10
            }}>
            <Pressable
            onPress={() => setRooms(Math.max(1, rooms - 1))}
              style={{
                width:26,
                height:26,
                borderRadius:13,
                borderColor:"#bebebe",
                backgroundColor:"#e0e0e0"
              }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontSize:20,
                  fontWeight:"600",
                  paddingHorizontal:6
              }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  textAlign:"center",
                  fontSize:18,
                  fontWeight:"500",
                  paddingHorizontal:6
                }}
              >
                {rooms}
              </Text>
            </Pressable>

            <Pressable
            onPress={() => setRooms((el) => el + 1)}
              style={{
              width:26,
              height:26,
              borderRadius:13,
              borderColor:"#bebebe",
              backgroundColor:"#e0e0e0"
            }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontSize:20,
                  fontWeight:"600",
                  paddingHorizontal:6
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:15}}>
          <Text style={{fontSize:16,fontWeight:"500"}}>Adults</Text>
          <Pressable style={{flexDirection:"row",alignItems:"center",gap:10}}>
            <Pressable
              onPress={() => setAdults(Math.max(1, adults - 1))}
              style={{
                width:26,
                height:26,
                borderRadius:13,
                borderColor:"#bebebe",
                backgroundColor:"#e0e0e0"
              }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontSize:20,
                  fontWeight:"600",
                  paddingHorizontal:6
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  textAlign:"center",
                  fontSize:18,
                  fontWeight:"500",
                  paddingHorizontal:6
                }}
              >{adults}</Text>
            </Pressable>

            <Pressable
            onPress={() => setAdults((el) => el + 1)}
              style={{
              width:26,
              height:26,
              borderRadius:13,
              borderColor:"#bebebe",
              backgroundColor:"#e0e0e0"
            }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontSize:20,
                  fontWeight:"600",paddingHorizontal:6}}>+</Text>
            </Pressable>
          </Pressable>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:15}}>
          <Text style={{fontSize:16,fontWeight:"500"}}>Children</Text>
          <Pressable 
            style={{
              flexDirection:"row",
              alignItems:"center",
              gap:10
            }}
          >
            <Pressable
            onPress={() => setChildren(Math.max(0, children - 1))}
              style={{
                width:26,
                height:26,
                borderRadius:13,
                borderColor:"#bebebe",
                backgroundColor:"#e0e0e0"
              }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontSize:20,
                  fontWeight:"600",
                  paddingHorizontal:6
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  textAlign:"center",
                  fontSize:18,
                  fontWeight:"500",
                  paddingHorizontal:6
                }}
              >{children}</Text>
            </Pressable>

            <Pressable
            onPress={() => setChildren((el) => el + 1)}
              style={{
              width:26,
              height:26,
              borderRadius:13,
              borderColor:"#bebebe",
              backgroundColor:"#e0e0e0"
            }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontSize:20,
                  fontWeight:"600",
                  paddingHorizontal:6
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </View>
      </ModalContent>
    </BottomModal>
    </>
  )
}

export default HomeScreen