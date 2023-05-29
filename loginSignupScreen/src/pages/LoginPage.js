import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const validateEmail = (email) => {
    // e-posta doğrulama regex'i
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // e-posta doğrulama işlemi
    if (emailRegex.test(email)) {
      console.log("E-posta geçerli");
      return true;
    } else {
      console.log("Geçersiz e-posta adresi");
      return false;
    }
  }

  const validatePassword = (password) => {
    if (password.length < 6) {
      console.log("geçersiz şifre");
      return false;
    } else {
      console.log("şifre geçerli");
      return true;
    }
  }

  const handleLogin = () => {
    Alert.alert(email, password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.description}>Sign in to continue</Text>
      </View>
      <View style={styles.inputsContainer} >
        <TextInput
          value={email}
          onChangeText={text => {
            setEmail(text)
            validateEmail(text)
          }}
          style={styles.input}
          placeholder='Enter your email' />
        <TextInput
          value={password}
          onChangeText={text => {
            setPassword(text)
            validatePassword(text)
          }}
          style={styles.input}
          placeholder='Enter your password'
          keyboardType='numeric'
          secureTextEntry={!showPassword} />
        <TouchableOpacity
          style={styles.eye}
          onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={27}
            color='grey' />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logos}>
        <Image style={styles.logo} source={require("../assets/googleLogo.png")} />
        <Image style={styles.logo} source={require("../assets/facebook.png")} />
        <Image style={styles.logo} source={require("../assets/apple.png")} />
      </View>
      <View>
        <Text style={styles.footer}>Already have an account?
          <Text style={{ color: "#CB7900" }}> Sign up</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 15,
    color: "#CB7900",
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 3,
  },
  inputsContainer: {
    marginTop: 60,
    gap: 20,
  },
  input: {
    borderColor: "black",
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  buttonsContainer: {
    marginTop: 40,
    gap: 5,
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#FFB601",
    padding: 12,
    width: "80%",
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
  },
  eye: {
    position: "absolute",
    right: 13,
    top: 64,
  },
  forgotText: {
    textAlign: "center",
    padding: 8,
  },
  logos: {
    alignItems: "center",
    margin: 50,
    columnGap: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  logo: {
    width: 40,
    height: 40,
  },
  footer: {
    textAlign: "center",
    top: 20,
  }
})

export default LoginPage;