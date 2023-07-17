import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';

function OrderScreen() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const baseUrl = "http://www.kursadozdemir.com";

  const getData = () => {
    axios.post(`${baseUrl}/Siparis/Listele`, {
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
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
        {list.map((item, index) => (
          <View key={index} style={styles.inner_container}>
            <View style={{flexDirection: "row"}}>
              <Image
                source={{ uri: item["GORSEL_URL"] }}
                style={styles.img}
                resizeMode="contain"
              />
              <View style={{ marginLeft: 10, }}>
                <Text style={styles.label}>{item.ADI}</Text>
                <Text style={styles.price}>{item.FIYAT} TL</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner_container: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
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

export default OrderScreen