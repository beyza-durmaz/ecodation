import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function ProductDetail({ route }) {
    const [number, setNumber] = useState(1);

    const navigation = useNavigation();

    const { product } = route.params;

    const baseUrl = "http://www.kursadozdemir.com";

    const decreaseBtn = () => {
        setNumber(number - 1);
    }

    const increaseBtn = () => {
        setNumber(number + 1);
    }

    const addToCart = () => {
        axios.post(`${baseUrl}/Sepet/Ekle`, {
            ID_URUN: product.ID_URUN,
            ID_KULLANICI: 1,
            MIKTAR: number
        }).then(response => {
            console.log(response.data)
            if (response.data.DURUM) {
                navigation.navigate("Cart");
            } else {
                console.log(response.data.MESAJ);
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                <Ionicons name='heart-outline' size={30} color="white" style={{ alignSelf: "flex-start", padding: 10 }} />
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Ionicons name='cart-outline' size={30} color="white" style={{ alignSelf: "flex-end", padding: 10 }} />
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: product["GORSEL_URL"] }}
                style={styles.img}
                resizeMode="contain"
            />
            <View style={styles.inner_container}>
                <View style={styles.number}>
                    <Ionicons name='remove-outline' size={25} color="white"
                        onPress={decreaseBtn} />
                    <Text style={{ color: "white", fontSize: 25, }}>{number}</Text>
                    <Ionicons name='add-outline' size={25} color="white"
                        onPress={increaseBtn} />
                </View>
                <View style={styles.altBilgi}>
                    <Text style={styles.label}>{product.ADI}</Text>
                    <Text style={styles.desc}>{product.ACIKLAMA}</Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 30
                    }}>
                        <Text style={styles.price}>{product.FIYAT} TL</Text>
                        <View style={{
                            flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#ddd",
                            paddingHorizontal: 5
                        }}>
                            <Ionicons name='star' size={30} color="yellow" />
                            <Text style={{ color: "black", fontSize: 18 }}>4.8</Text>
                        </View>
                    </View>
                    <Pressable
                        style={styles.addToCartBtn}
                        onPress={addToCart}>
                        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Sepete Ekle</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // padding: 16,
        backgroundColor: "green",
    },
    inner_container: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        // height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        position: "relative",
        top: 100,
    },
    number: {
        display: "flex",
        flexDirection: "row",
        marginTop: 100,
        marginBottom: 30,
        backgroundColor: "white",
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: "green",
        width: 100,
        justifyContent: "space-between",
        alignItems: "center"
    },
    altBilgi: {
        flex: 1,
    },
    img: {
        top: 60,
        width: 180,
        height: 180,
        borderRadius: 100,
        marginBottom: 10,
        zIndex: 1,
        position: "absolute",
        borderWidth: 2,
        borderColor: "white",
    },
    label: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        color: "black",
        letterSpacing: 2,
        textAlign: "center"
    },
    desc: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        alignSelf: "flex-end"
    },
    addToCartBtn: {
        backgroundColor: "green",
        padding: 15,
        paddingHorizontal: 120,
        borderRadius: 5,
        marginTop: 45,
    },
});

export default ProductDetail