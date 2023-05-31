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

    const goToSignupPage = () => {
        navigation.navigate("SignupPage");
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
                <TouchableOpacity
                    style={styles.signupBtn}
                    onPress={goToSignupPage}>
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
        paddingHorizontal: 5,
    },
    img: {
        width: 230,
        height: 230,
        marginVertical: 30,
    },
    title: {
        marginTop: 20,
        fontSize: 30,
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
        marginTop: 45,
        gap: 25,
    },
    loginBtn: {
        backgroundColor: "#FFB601",
        padding: 15,
        paddingHorizontal: 140,
        borderRadius: 5,
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 2,
        textAlign: "center",
    },
    signupBtn: {
        borderWidth: 1,
        borderColor: "#FFB601",
        padding: 15,
        paddingHorizontal: 140,
        borderRadius: 5,
    },
    signupText: {
        color: "#FFB601",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 2,
        textAlign: "center",
    }
})

export default WelcomePage;