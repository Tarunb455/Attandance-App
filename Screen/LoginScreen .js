import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import logoimg from "../assets/logo.png";
import { API_URL as URL } from "@env";

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log(URL);

    setLoading(true);
    setError("");

    try {
      // Convert email to lowercase
      const lowerCaseEmail = userData.email.toLowerCase();

      const response = await axios.post(`${URL}/login`, {
        ...userData,
        email: lowerCaseEmail, // Use lowercase email in API call
      });
      // console.log('Login API Response:', response.data);
      // console.log(response.data.user._id);

      setLoading(false);

      // Save token to AsyncStorage
      await AsyncStorage.setItem("emp_id", response.data.user._id);

      // Show alert upon successful login
      Alert.alert("Login Successful", response.data.message, [
        { text: "OK", onPress: () => navigation.navigate("dashboard") },
      ]);
    } catch (error) {
      setLoading(false);
      // console.error('Error logging in:', error.response.data.error);
      setError("Invalid email or password. Please try again.");
      Alert.alert("Login Failed", error.response.data.error);
    }
  };

  const handleInputChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={logoimg} style={styles.logoImg} />
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#999"
          value={userData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Forgot Password</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoImg: {
    position: "absolute",
    top: 50,
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    borderColor: "#BBDEFB",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#E3F2FD",
  },
  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    color: "#1E88E5",
  },
});

export default LoginScreen;
