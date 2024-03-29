import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function ProductScreen({ route }) {
    const [list, setList] = useState([]);

    const { categoryID } = route.params;

    const navigation = useNavigation();

    const baseUrl = "http://www.kursadozdemir.com";

    const getData = () => {
        axios.post(`${baseUrl}/Urun/Listele`, {
            ID_KATEGORI: categoryID
        })
            .then(response => {
                console.log(response.data)
                if (response.data.DURUM) {
                    setList(response.data.NESNE)
                }
            })
    }

    useEffect(() => {
        getData()
    }, [categoryID]);

    const windowWidth = Dimensions.get('window').width;

    const navigateToProductDetail = (item) => {
        navigation.navigate("ProductDetail", { product: item })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name='person-circle-outline' size={30} color="green" />
                    <Ionicons name='cart-outline' size={30} color="green" />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name='search-outline' size={26} color="gray" style={styles.srcIcon} />
                    <TextInput placeholder='Favori Kahveni Ara..' style={[styles.search, { width: windowWidth * 0.92 }]} />
                </View>
                <View style={[styles.main, { gap: windowWidth * 0.01 }]}>
                    {
                        list.length > 0 ? list.map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}>
                                <View
                                    style={[styles.mainContainer, { width: windowWidth * 0.45, height: windowWidth * 0.6 }]}
                                    key={item["ID_KATEGORI"]}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: item["GORSEL_URL"] }}
                                            style={styles.img}
                                            resizeMode="contain" />
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.label}>{item["ADI"]}</Text>
                                        <Text style={styles.desc}>{item["ACIKLAMA"]}</Text>
                                        <View style={styles.bottomSection}>
                                            <Text style={styles.price}>{item["FIYAT"]} TL</Text>
                                            <TouchableOpacity
                                                onPress={() => navigateToProductDetail(item)}>
                                                <Ionicons name='arrow-forward-circle' size={40} color="green" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
        margin: 15,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
    },
    search: {
        backgroundColor: "#ddd",
        width: 330,
        paddingLeft: 60,
        borderRadius: 100,
        marginVertical: 20,
    },
    inputContainer: {
        position: "relative",
    },
    srcIcon: {
        position: "absolute",
        top: 29,
        left: 19,
        zIndex: 1,
    },
    main: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    mainContainer: {
        height: 250,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        borderRadius: 20,
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        padding: 10,
        gap: 5,
        flexWrap: "wrap",
    },
    label: {
        fontSize: 18,
        color: "black",
        letterSpacing: 1,
    },
    desc: {
        letterSpacing: 0.5,
        flexWrap: "wrap",
        width: 135,
        fontSize: 12,
    },
    price: {
        fontSize: 18,
        color: "black",
    },
    bottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default ProductScreen;