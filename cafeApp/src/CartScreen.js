import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CartScreen() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [number, setNumber] = useState(1);
  const [isListUpdated, setListUpdated] = useState(false);

  const navigation = useNavigation();

  const baseUrl = "http://www.kursadozdemir.com";

  const getData = () => {
    axios.post(`${baseUrl}/Sepet/Listele`, {
      ID_KULLANICI: 1,
    })
      .then(response => {
        if (response.data.DURUM) {
          setList(response.data.NESNE)
          if (response.data.NESNE != null) {
            let sum = 0;
            response.data.NESNE.map((item, index) => (
              sum += item.FIYAT * (item.MIKTAR + 1)
            ));
            console.log("total", sum);
            setTotal(sum);
          }
        }
      })
  }

  useEffect(() => {
    if (isListUpdated) {
      setListUpdated(true)
    } else {
      getData()
    }
  }, [])

  const decreaseBtn = (ID_URUN) => {
    setList(prevList => {
      return prevList.map(item => {
        if (item.ID_URUN === ID_URUN) {
          const newQuantity = item.MIKTAR - 1;
          const newTotal = total - item.FIYAT; // Fiyatı toplamdan çıkar
          setTotal(newTotal); // Toplamı güncelle
          if (newQuantity === -1) {
            deleteCart(ID_URUN, item.FIYAT);
            return null;
          } else {
            return {
              ...item,
              MIKTAR: newQuantity
            };
          }
        }
        return item;
      }).filter(Boolean)
    });
  }

  const increaseBtn = (ID_URUN) => {
    setList(prevList => {
      return prevList.map(item => {
        if (item.ID_URUN === ID_URUN) {
          const newTotal = total + item.FIYAT; // Fiyatı toplama ekle
          setTotal(newTotal); // Toplamı güncelle
          return {
            ...item,
            MIKTAR: item.MIKTAR + 1
          };
        }
        return item;
      });
    });
  }

  const deleteCart = (ID_URUN) => {
    const deletedItem = list.find(item => item.ID_URUN === ID_URUN);
    if (deletedItem) {
      const deletedItemTotal = total - (deletedItem.FIYAT * (deletedItem.MIKTAR + 1));
      setList(prevList => prevList.filter(item => item.ID_URUN !== ID_URUN));
      setTotal(deletedItemTotal);
      setListUpdated(true);
    }
  }

  const navigeToOrderScreen = () => {
    axios.post(`${baseUrl}/Siparis/Ekle`, {
      ID_KULLANICI: 1,
    }).then(response => {
      console.log(response.data)
      if (response.data.DURUM) {
        navigation.navigate("Order")
      } else {
        console.log(response.data.MESAJ);
      }
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
        {list.map((item, index) => (
          <View key={index} style={styles.inner_container}>
            <TouchableOpacity onPress={() => deleteCart(item.ID_URUN)}>
              <Ionicons name='remove-circle-outline' size={25} color="green" />
            </TouchableOpacity>

            <Image
              source={{ uri: item["GORSEL_URL"] }}
              style={styles.img}
              resizeMode="contain"
            />
            <View style={{ width: "40%", height: 80, alignSelf: "flex-start", justifyContent: "space-between" }}>
              <Text style={styles.label}>{item.ADI}</Text>
              <Text style={styles.price}>{item.FIYAT} TL</Text>
            </View>
            <View style={styles.number}>
              <Ionicons name='remove-outline' size={20} color="gray"
                onPress={() => decreaseBtn(item.ID_URUN)} />
              <Text style={{ color: "gray", fontSize: 20, paddingHorizontal: 5, }}>{[item.MIKTAR + number]}</Text>
              <Ionicons name='add-outline' size={20} color="gray"
                onPress={() => increaseBtn(item.ID_URUN)} />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ width: "100%", paddingHorizontal: 10, paddingTop: 8, }}>
        <Text style={{ width: "100%", textAlign: "right", fontSize: 18, textAlignVertical: "bottom", color: "black" }}>Toplam tutar: {total} TL</Text>
        <Pressable
          style={styles.orderBtn}
          onPress={() => navigeToOrderScreen()}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Siparişlerim</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inner_container: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderBtn: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  number: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  },
  label: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
  },
  price: {
    color: "gray",
    fontSize: 18,
  },
})

export default CartScreen;