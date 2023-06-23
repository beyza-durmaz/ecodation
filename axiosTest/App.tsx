import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import axios from 'axios';

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const baseUrl = "http://www.kursadozdemir.com";

  const getData = () => {
    axios.get(`${baseUrl}/Test/GetListele`).then(response => {
      if (response.data.DURUM) {
        setList(response.data.NESNE)
      } else {
        console.log(response.data.MESAJ)
      }
    })
  }

  useEffect(() => {
    getData();
  }, [])

  const addData = () => {
    axios.post(`${baseUrl}/Test/Ekle`, {
      AD: name,
      SOYAD: surname,
    }).then(response => {
      if (response.data.DURUM) {
        setName("");
        setSurname("");
        getData();
      } else {
        console.log("Hata oluştu!" + response.data.MESAJ)
      }
    })
  }

  const deleteData = (_id: string) => {

    axios.post(`${baseUrl}/Test/Sil`, {
      ID: _id
    }).then(response => {
      if (response.data.DURUM) {
        setName("");
        setSurname("");

        getData();
      } else {
        console.log("Hata oluştu!" + response.data.MESAJ)
      }
    })
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 0.5, paddingTop: 30, }}>
        <TextInput
          style={{
            backgroundColor: "#ddd",
            width: 300,
            paddingLeft: 20,
            marginTop: 20,
            borderRadius: 5,
          }}
          placeholder='Ad giriniz'
          value={name}
          onChangeText={setName} />
        <TextInput
          style={{
            backgroundColor: "#ddd",
            width: 300,
            paddingLeft: 20,
            marginTop: 20,
            borderRadius: 5,
          }}
          placeholder='Soyad giriniz'
          value={surname}
          onChangeText={setSurname} />
        <Pressable
          onPress={addData}
          style={{
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            height: 40,
            borderRadius: 5,
          }}>
          <Text style={{
            color: "white",
            fontSize: 16,
          }}>Ekle</Text>
        </Pressable>
      </View>
      <View style={{ flex: 0.5 }}>
        {
          list && list.length > 0 ? (
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginVertical: 2,
                  alignItems: "center",
                  gap: 10,
                }}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginRight: 100,
                    }}>
                    {item["AD"]} {item["SOYAD"]}
                  </Text>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      backgroundColor: "red",
                      width: 50,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                    }}
                    onPress={() => deleteData(item["ID"])} >
                    <Text
                      style={{
                        color: "white",
                      }}>Sil</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      backgroundColor: "blue",
                      width: 80,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,

                    }}
                     >
                    <Text
                      style={{
                        color: "white",
                      }}>Düzenle</Text>
                  </Pressable>
                </View>
              )} />)
            : null
        }
      </View>
    </View>
  )
}

export default App;