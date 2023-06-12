import { View, Text, SafeAreaView, ScrollView, Pressable, Image } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { pixelNormalize } from '../components/Normalize'
import {MaterialIcons} from '@expo/vector-icons'

const PropertyInfoScreen = () => {
  const route = useRoute()
  // console.log(route.params)
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
      headerTitleStyle: {
        fontSize:20,
        fontWeight:"bold",
        color:"white"
      },
      headerStyle: {
        backgroundColor:"#003580",
        height:110,
        borderBottomColor:"transparent",
        shadowColor:"transparent"
      }
    })
  }, [])

  const difference = route.params.oldPrice - route.params.newPrice
  const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100
  return (
    <SafeAreaView>
      <ScrollView>
        <Pressable style={{flexDirection:"row",flexWrap:"wrap",margin:10}}>
          {route.params.photos?.slice(0,5).map((photo) => (
            <View style={{margin:6}}>
              <Image 
                src={{url:photo.image}}
                style={{
                  width:120, 
                  height:pixelNormalize(80),
                  borderRadius:pixelNormalize(4)
                }}
              />
            </View>
          ))}
          <Pressable style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{textAlign:"center",marginLeft:20}}>Show More</Text>
          </Pressable>
        </Pressable>

        <View style={{marginHorizontal:12,marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <View>
            <Text style={{fontSize:25,fontWeight:"bold"}}>{route.params.name}</Text>
            <View
              style={{
                flexDirection:"row",
                alignItems:"center",
                gap:6,
                marginTop:7
              }}
            >
              <MaterialIcons name="stars" size={24} color="green"/>
              <Text>{route.params.rating}</Text>
              <View
                style={{
                  backgroundColor:"#003580",
                  paddingVertical:3,
                  borderRadius:5,
                  width:100
                }}
              >
                <Text style={{textAlign:"center",color:"white",fontSize:15}}>
                  Genius Level
                </Text>
              </View>
            </View>
          </View>

          <View 
            style={{
            backgroundColor:"#17b169",paddingHorizontal:6,
            paddingVertical:4,
            borderRadius:6
        }}>
          <Text style={{colo:"white",fontSize:12}}>Travel sustainable</Text>
          </View>
        </View>

        <Text style={{
          borderColor:"#e0e0e0",borderWidth:3,height:1,marginTop:10}}/>

        <Text 
        style={{
          marginTop:20, fontSize:17, fontWeight:"500",marginHorizontal:12}}>
          Price for 1 Night and {route.params.adults} adults
        </Text>
        <View 
          style={{
            marginTop:4,
            flexDirection:"row",
            alignItems:"center",
            marginHorizontal:12,
            gap:8
           }}
        >
          <Text
            style={{
              color:"red",
              fontSize:28,
              textDecorationLine:"line-through"
            }}
          >
            {route.params.oldPrice * route.params.adults}
          </Text>
          <Text style={{fontSize:20}}>
            ${route.params.newPrice * route.params.adults}
          </Text>     
        </View>

        <View 
          style={{
            marginHorizontal:12,
            marginTop:4,
            backgroundColor:"green",
            paddingHorizontal:4,
            paddingVertical:5,
            width:70,
            borderradius:4
          }}
        >
          <Text>{offerPrice.toFixed(0)}</Text>
        </View>
{/* border */}
        <Text 
          style={{
            borderColor:"#e0e0e0",
            borderWidth:3,
            height:1,
            marginTop:15
          }}
        />
        <View style={{margin:12,flexDirection:"row",alignItems:"center",gap:60}}>
          <View>
            <Text 
              style={{
                fontSize:16,fontWeight:"600"
              }}>Check In</Text>
            <Text style={{fontSize:15,fontWeight:"bold",color:"#007fff"}}>{route.params.selectedDates.startDate}</Text>
          </View>

          <View>
          <Text 
            style={{
              fontSize:16,fontWeight:"600",margnBottom:3
            }}>Check Out</Text>
            <Text
              style={{fontSize:15,fontWeight:"bold",color:"#007fff"}}
            >{route.params.selectedDates.endDate}</Text>
          </View>
        </View>

        <View style={{margin:12,}}>
          <Text style={{fontSize:15,fontWeight:"600",marginBottom:3}}>Rooms and Guests</Text>
          <Text style={{fontSize:15,fontWeight:"bold",color:"#007fff"}}>{route.params.room} rooms {route.params.adults} adults {route.params.children} children</Text>
        </View>

        {/* border */}
        <Text 
          style={{
            borderColor:"#e0e0e0",
            borderWidth:3,
            height:1,
            marginTop:15
          }} 
        />
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default PropertyInfoScreen