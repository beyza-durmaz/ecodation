import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

function App() {
  const movieData = [
    {
      id: 1,
      img: require("./src/assets/image/pianist.jpg"),
      title: "The Pianist",
      director: "Roman Polanski",
      rating: "8.5/10",
    },
    {
      id: 2,
      img: require("./src/assets/image/lifeIsBeautiful.jpg"),
      title: "Life is Beautiful",
      director: "Roberto Benigni",
      rating: "8.8/10",
    },
    {
      id: 3,
      img: require("./src/assets/image/kefernahum.jpg"),
      title: "Kefernahum",
      director: "Nadin Labaki",
      rating: "8.4/10",
    },
    {
      id: 4,
      img: require("./src/assets/image/intoTheWild.jpg"),
      title: "Into the Wild",
      director: "Sean Penn",
      rating: "8.1/10",
    },
    {
      id: 5,
      img: require("./src/assets/image/inception.png"),
      title: "Inception",
      director: "Christopher Nolan",
      rating: "8.9/10",
    },
  ]

  return (
    <SafeAreaView style={{ marginBottom: 100 }}>
      <Text style={styles.label}>Movies</Text>
      <FlatList
        data={movieData}
        renderItem={({ item }) => (
          <View style={styles.container}>

            <View style={styles.boxContainer}>
              <Image source={item.img} style={styles.img} />
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.director}>{item.director}</Text>
                </View>
                <View>
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  boxContainer: {
    width: 380,
    height: 180,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    height: 160,
    marginHorizontal: 10,
    justifyContent: "space-between"
  },
  title: {
    fontSize: 28,
    color: "green",
  },
  director: {
    letterSpacing: 2,
    fontSize: 18,
    marginTop: 5,
  },
  rating: {
    fontSize: 30,
    marginTop: 20,
    color: "black"
  },
})

export default App