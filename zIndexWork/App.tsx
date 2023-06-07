import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

const App = () => {
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(1);
  const [index2, setIndex2] = useState(2);
  const [index3, setIndex3] = useState(3);
  const [index4, setIndex4] = useState(4);
  const [index5, setIndex5] = useState(5);

  const next = () => {

    if (page == 5) {
      setPage(1)
    } else {
      setPage(page + 1)
    }

    if (page == 1) {
      setIndex(1)
      setIndex2(2)
      setIndex3(3)
      setIndex4(4)
      setIndex5(5)
    } else if (page == 2) {
      setIndex(2)
      setIndex2(3)
      setIndex3(4)
      setIndex4(5)
      setIndex5(1)
    } else if (page == 3) {
      setIndex(3)
      setIndex2(4)
      setIndex3(5)
      setIndex4(1)
      setIndex5(2)
    } else if (page == 4) {
      setIndex(4)
      setIndex2(5)
      setIndex3(1)
      setIndex4(2)
      setIndex5(3)
    } else if (page == 5) {
      setIndex(5)
      setIndex2(1)
      setIndex3(2)
      setIndex4(3)
      setIndex5(4)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "red", position: "absolute", width: 250, height: 150, top: 50, left: "20%", zIndex: index }}></View>
        <View style={{ backgroundColor: "yellow", position: "absolute", width: 250, height: 150, top: 125, left: "20%", zIndex: index2 }}></View>
        <View style={{ backgroundColor: "blue", position: "absolute", width: 250, height: 150, top: 200, left: "20%", zIndex: index3 }}></View>
        <View style={{ backgroundColor: "green", position: "absolute", width: 250, height: 150, top: 275, left: "20%", zIndex: index4 }}></View>
        <View style={{ backgroundColor: "purple", position: "absolute", width: 250, height: 150, top: 350, left: "20%", zIndex: index5 }}></View>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Pressable style={{ backgroundColor: "gray", width: 80, height: 80, justifyContent: "center", alignItems: "center", top: 210, borderRadius: 100 }} onPress={next}>
          <Text style={{ color: "white" }}>Button</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default App;