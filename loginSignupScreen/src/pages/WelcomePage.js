import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomePage() {
    const navigation = useNavigation();

    const goToLoginPage = () => {
        navigation.navigate("LoginPage")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner_container}>
                <Image
                    source={require("../assets/image.png")}
                    style={styles.img} />
                <Text style={styles.title}>Welcome !</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolorem?</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={goToLoginPage}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupBtn}>
                    <Text style={styles.signupText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    inner_container: {
        alignItems: "center",
        paddingHorizontal: 30,
    },
    img: {
        width: 210,
        height: 210,
        marginVertical: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        paddingBottom: 15,
        color: "black",
        letterSpacing: 2,
    },
    description: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 25,
    },
    buttonsContainer: {
        marginTop: 40,
        gap: 20,
    },
    loginBtn: {
        backgroundColor: "#FFB601",
        padding: 12,
        paddingHorizontal: 90,
        borderRadius: 5,
    },
    loginText: {
        color: "#fff",
    },
    signupBtn: {
        borderWidth: 1,
        borderColor: "#FFB601",
        padding: 12,
        paddingHorizontal: 90,
        borderRadius: 5,
    },
    signupText: {
        color: "#FFB601",
    }
})

export default WelcomePage;