import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function CategoriesScreen() {
  const [list, setList] = useState([]);

  const navigation = useNavigation();

  const baseUrl = "http://www.kursadozdemir.com";

  const getData = () => {
    axios.post(`${baseUrl}/Kategori/Listele`, {})
      .then(response => {
        console.log(response.data)
        if (response.data.DURUM) {
          setList(response.data.NESNE)
        }
      })
  }

  useEffect(() => {
    getData();
  }, [])

  const handleCategoryPress = (categoryID) => {
    navigation.navigate("Product", { categoryID });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name='person-circle-outline' size={30} color="green" />
          <Text style={styles.hello}>Merhaba,
            <Text style={{ fontWeight: "bold", color: "green" }}> Beyza!</Text>
          </Text>
          <Ionicons name='cart-outline' size={30} color="green" />
        </View>
        <View style={styles.main}>
          <Text style={styles.categoriesText}>Kategoriler</Text>
          {
            list.length > 0 ? list.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleCategoryPress(item["ID_KATEGORI"])}>
                <View
                  style={styles.mainContainer}
                  key={item["ID_KATEGORI"]}>
                  <Image source={{ uri: item["GORSEL_URL"] }} style={styles.img} />
                  <Text style={styles.label}>{item["ADI"]}</Text>
                </View>
              </TouchableWithoutFeedback>
            )) : null
          }
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    // justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: {
    fontSize: 17,
    color: "#454545",
    backgroundColor: "#eee",
    borderRadius: 500,
    width: 160,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  main: {
    flexDirection: "column",
    marginVertical: 20,
  },
  categoriesText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#454545",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  mainContainer: {
    marginBottom: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 336,
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  img: {
    position: "relative",
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  label: {
    textAlignVertical: "center",
    textAlign: "center",
    width: "100%",
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: "absolute",
    fontSize: 20,
    color: "black",
    paddingRight: 10,
    letterSpacing: 5,
  },
});

export default CategoriesScreen;