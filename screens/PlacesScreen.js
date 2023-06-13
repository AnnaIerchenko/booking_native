import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Octicons, Ionicons, FontAwesome5, Entypo, FontAwesome} from '@expo/vector-icons'
import hotels from '../data'
import PropertyCard from '../components/PropertyCard'
import { BottomModal, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const PlacesScreen = () => {
  const data = hotels
  const route = useRoute()
  // console.log(route.params)
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedFilter,setSelectedFilter] = useState([])

  const [sortedData, setSortedData] = useState(items)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:true,
      title:"Popular Places",
      headerTitleStyle:{
        fontSize:20,
        fontWeight:"bold",
        color:"white"
      },
      headerStyle:{
        backgroundColor:"#003580",
        height:70,
        borderBottomColor:"transparent",
        shadowColor:"transparent"
      },
    })
  },[])

  const filters = [
    {
      id: "0",
      filter: "cost:Low to High"
    },
    {
      id: "1",
      filter: "cost:High to Low"
    }
  ]

  const searchPlaces = data?.filter((item) => item.place === route.params.place)
  // console.log(searchPlaces)
  const compare = (a,b) => {
    if(a.newPrice > b.newPrice){
      return -1
    }
    if(a.newPrice < b.newPrice){
      return 1
    }
    return 0
  }
  const comparision = (a,b) => {
   if(a.newPrice < b.newPrice){
      return -1
    }
    if(a.newPrice > b.newPrice){
      return 1
    }
    return 0
  }
  const applyFilter = (filter) => {
    setModalVisible(false)
    switch(filter){
      case "cost:High to Low ":
        searchPlaces.map((val) => val.properties.sort(compare))
        setSortedData(searchPlaces)
        break;
      case "cost:Low to Hight":
        searchPlaces.map((val) => val.properties.sort(comparision))
        setSortedData(searchPlaces)
        break;
    }
  }

  useEffect(() => {
    if(items.length > 0) return
    setLoading(true)
  
    const fetchProducts = async () => {
      const colRef = collection(db,"places")
      const docsSnap = await getDocs(colRef)
      docsSnap.forEach((doc) => {
        items.push(doc.data())
      })
      setLoading(false)
    }
    fetchProducts()
  }, [])
  
  // console.log(items)
  return (
    <View>
      <Pressable
         style={{
          flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:20,padding:12,backgroundColor:"white"}}
      >
        <Pressable 
          onPress={() => setModalVisible(!modalVisible)}
          style={{flexDirection:"row",alignItems:"center"}}>
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{fontSize:15,fontWeight:"500",marginLeft:8}}>Sort</Text>
        </Pressable>

        <Pressable style={{flexDirection:"row",alignItems:"center"}}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{fontSize:15,fontWeight:"500",marginLeft:8}}>Filter</Text>
        </Pressable>

        <Pressable 
        onPress={() => navigation.navigate("Map", {
          searchResults:searchPlaces
        })}
          style={{
            flexDirection:"row",
            alignItems:"center"
          }}
        >
          <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
          <Text style={{fontSize:15,fontWeight:"500",marginLeft:8}}>Map</Text>
        </Pressable>
      </Pressable>

      {loading ? (
        <Text>Fetching places...</Text>
      ) : (
      <ScrollView style={{backgroundColor:"#f5f5f5"}}>
        {sortedData?.filter((item) => item.place === route.params.place)
        .map((item) => item.properties.map((property, index) => (
          <PropertyCard rooms={route.params.rooms} 
            children={route.params.children}
            adults={route.params.adults}
            selectedDates={route.params.selectedDates}
            property={property}
            availableRooms={property.rooms}
          />
          )
        ))}
      </ScrollView>
      )}

      <BottomModal 
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up","down"]}
        swipeThreshold={200} footer={
        <ModalFooter>
        <Pressable 
        onPress={() => applyFilter(selectedFilter)}
          style={{
            paddingRight:10,marginLeft:"auto",marginRight:"auto",marginVertical:10,marginBottom:20
            }}>
          <Text>Apply</Text>
        </Pressable>
      </ModalFooter>
    }
      modalTitle={<ModalTitle title="Sort and Filter "/>}
      modalAnimation={new SlideAnimation({
        slideFrom:"bottom"
      })}
      onHardwareBackPress={() => setModalVisible(!modalVisible)}
      visible={modalVisible}
      onTouchOutside={() => setModalVisible(!modalVisible)}
    >
      <ModalContent style={{width:"100%",height:280}}>
        <View style={{flexDirection:"row"}}>
          <View style={{marginVertical:10,flex:2, heigth:200,borderRightWidth:1,borderColor:"#e0e0e0"}}>
            <Text style={{textAlign:"center"}}>Sort</Text>
          </View>

          <View style={{flex:3,margin:10}}>
            {filters.map((item,index) => (
              <Pressable 
                onPress={() => setSelectedFilter(item.filter)}
                style={{flexDirection:"row",alignItems:"center",marginVertical:10}} key={index}>
                  {selectedFilter.includes(item.filter) ? (
                    <FontAwesome name="circle" size={18} color="green"/>
                  ) : (
                  <Entypo name="circle" size={18} color="black" />
                  )}
                <Text style={{fontSize:16,fontWeight:"500",marginLeft:6}}>{item.filter}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ModalContent>
      </BottomModal>
    </View>
  )
}

export default PlacesScreen