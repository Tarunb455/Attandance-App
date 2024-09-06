import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bgImg from "../assets/bg_img.png";
import logo from "../assets/logo.png";
import axios from "axios";
import { API_URL } from "@env";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [checkOutEnable, setCheckOutEnable] = useState(false);
  const [empId, setEmpId] = useState(null);

  useEffect(() => {
    console.log(API_URL);
    const fetchEmpId = async () => {
      try {
        const id = await AsyncStorage.getItem("emp_id");
        if (id !== null) {
          setEmpId(id); // Set the emp_id in state if available
          console.log("employee ID found in AsyncStorage");
        } else {
          console.log("No employee ID found in AsyncStorage");
        }
      } catch (error) {
        console.error("Failed to fetch emp_id from AsyncStorage", error);
        // Handle error (e.g., show an alert)
      }
    };

    fetchEmpId();
  }, []);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    );
    getSavedDate();
  }, []);

  const saveDate = async () => {
    const date = new Date();
    await AsyncStorage.setItem(
      "DATE",
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    );
  };

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem("DATE");
    const status = await AsyncStorage.getItem("STATUS");

    if (
      date ===
        `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}` &&
      status === "CIN"
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(true);
    } else if (
      date ===
        `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}` &&
      status === "COUT"
    ) {
      setCheckInEnable(false);
      setCheckOutEnable(false);
    }
  };

  const attandanceApi = async (type) => {
    try {
      const response = await axios.post(`${API_URL}/markAttendance`, {
        userId: empId,
        type: type,
      });
      Alert.alert("Successful", response.data.message);

      if (type === "Check-In") {
        await AsyncStorage.setItem("STATUS", "CIN");
        saveDate();
        setCheckInEnable(false);
        setCheckOutEnable(true);
      } else if (type === "Check-Out") {
        await AsyncStorage.setItem("STATUS", "COUT");
        setCheckInEnable(false);
        setCheckOutEnable(false);
      }

      console.log(response.data.message); // Log the type of attendance (check-in or check-out)
    } catch (error) {
      Alert.alert("Error", "Server problem. Please Contact HR.");
      console.error("Attendance API request failed", error);
    }
  };

  const saveCheckin = async () => {
    attandanceApi("Check-In");
  };

  const saveCheckout = async () => {
    attandanceApi("Check-Out");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={bgImg} style={styles.image} />
      </View>
      <Text style={styles.dateText}>{`Today's Date: ${currentDate}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={!checkInEnable}
          style={[
            styles.button,
            { backgroundColor: checkInEnable ? "green" : "gray" },
          ]}
          onPress={saveCheckin}
        >
          <Text style={styles.buttonText}>Check-in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!checkOutEnable}
          style={[
            styles.button,
            { backgroundColor: checkOutEnable ? "green" : "gray" },
          ]}
          onPress={saveCheckout}
        >
          <Text style={styles.buttonText}>Check-out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Image source={logo} style={styles.logoImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginTop: 20,
    marginLeft: 20,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    width: 150,
    resizeMode: "contain",
  },
});

export default Dashboard;
