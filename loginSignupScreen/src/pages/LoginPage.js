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
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isBlur, setIsBlur] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const validateEmail = (email) => {
    // e-posta doğrulama regex'i
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // e-posta doğrulama işlemi
    const isValid = emailRegex.test(email)
    setIsValidEmail(isValid);
  }

  const validatePassword = (password) => {
    if (password.length < 6) {
      // console.log("geçersiz şifre");
      setIsValidPassword(false)
      return false;
    } else {
      setIsValidPassword(true)
      // console.log("şifre geçerli");
      return true;
    }
  }

  const handleLogin = () => {
    if (isValidEmail && isValidPassword) {
      Alert.alert(email, password)
    } else if (!isValidEmail || !isValidPassword) {
      Alert.alert("Enter valid email and password!")
    } else {
      Alert.alert("Enter your email and password!")
    }
  }

  const handleFocus = () => {
    setIsBlur(false);
  }

  const handleBlur = () => {
    setIsBlur(true);
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
          style={[
            styles.input,
            isBlur ? !isValidEmail && styles.invalidInput : styles.input
          ]}
          placeholder='Enter your email'
          onFocus={handleFocus}
          onBlur={handleBlur} />

        {
          isBlur ? !isValidEmail && <Ionicons
            name="alert-circle-outline"
            size={27}
            color="red"
            style={styles.invalidInputIcon} /> : null
        }

        <TextInput
          value={password}
          onChangeText={text => {
            setPassword(text)
            validatePassword(text)
          }}
          style={[
            styles.input,
            isBlur ? !isValidPassword && styles.invalidInput : styles.input
          ]}
          placeholder='Enter your password'
          keyboardType='numeric'
          secureTextEntry={!showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur} />

        <TouchableOpacity
          style={styles.eye}
          onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={28}
            color='grey' />
        </TouchableOpacity>

      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
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
          <Text style={{ color: "#CB7900", fontWeight: "bold" }}> Sign up</Text>
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
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
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
    columnGap: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  footer: {
    textAlign: "center",
    top: 20,
  },
  invalidInput: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  invalidInputIcon: {
    position: "absolute",
    right: 13,
    top: 0,
  }
})

export default LoginPage;