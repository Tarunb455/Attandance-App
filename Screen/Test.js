import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { API_URL } from '@env';

const Test = () => {
  const [empId, setEmpId] = useState(null);

  useEffect(() => {
    const fetchEmpId = async () => {
      try {
        const id = await AsyncStorage.getItem('emp_id');
        if (id !== null) {
          setEmpId(id); // Set the emp_id in state if available
        } else {
          console.log('No employee ID found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to fetch emp_id from AsyncStorage', error);
        // Handle error (e.g., show an alert)
      }
    };

    fetchEmpId();
  }, []); 

  const attandanceApi = async (type) => {
    try {
      const response = await axios.post(`${API_URL}/markAttendance`, {
        userId: empId,
        type: type.toLowerCase(), // Ensure type is lowercase as expected
      });
      console.log(response.data.message); // Log the type of attendance (check-in or check-out)
    } catch (error) {
      console.error('Attendance API request failed', error);
      // Handle error (e.g., show an alert)
    }
  };

  const handleCheckIn = () => {
    attandanceApi("check-in");
  };

  const handleCheckOut = () => {
    attandanceApi("check-out");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{empId ? `Employee ID: ${empId}` : 'Loading...'}</Text>
      <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>Check In</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity style={styles.button} onPress={handleCheckOut}>
        <Text style={styles.buttonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  space: {
    height: 20, // Add space between the buttons
  },
});

export default Test;
