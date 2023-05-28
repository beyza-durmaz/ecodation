import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function App(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = () => {
    if (!isValidEmail) {
      Alert.alert("Lütfen geçerli bir email adresi giriniz!")
    } else if (password.length < 6) {
      Alert.alert("Lütfen en az 6 karakterli bir şifre giriniz!")
    } else {
      Alert.alert(email, password);
    }
  }

  const validateEmail = (email: string) => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    setIsValidEmail(isValid);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("./src/assets/image.png")} />
        <View style={styles.form}>
          <Text style={styles.title}>Log In</Text>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              validateEmail(text)
            }}
            autoComplete='email'
            style={[styles.input, !isValidEmail && styles.invalidInput]}
            placeholder={isFocused ? '' : 'Enter Your Email'}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                setIsValidPassword(text.length >= 6)
              }}
              autoComplete='password'
              style={[styles.input, !isValidPassword && styles.invalidInput]}
              placeholder={isFocused ? '' : 'Enter Your Password'}
              keyboardType='numeric'
              onFocus={handleFocus}
              onBlur={handleBlur}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eye}
              onPress={togglePasswordVisibility}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color='grey' />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.forgotBtn}>Forgot Password!</Text>
          </View>
          <View>
            <Text style={{ top: 80, textAlign: "center", color: "black" }}>Don't have an account?
              <Text style={{ color: "#0065FF" }}> Register!</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 230,
    height: 230,
    resizeMode: "contain",
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    color: "black"
  },
  input: {
    backgroundColor: "#E0EDF1",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  form: {
    rowGap: 20,
    marginHorizontal: 25,
    padding: 5,
  },
  btn: {
    backgroundColor: "#0065FF",
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  forgotBtn: {
    textAlign: "center",
    padding: 10,
  },
  passwordContainer: {
    position: "relative",
    display: 'flex',
    justifyContent: "center"
  },
  eye: {
    position: "absolute",
    right: 10,
  },
  invalidInput: {
    borderWidth: 0.5,
    borderColor: "red",
  }
});

export default App;
