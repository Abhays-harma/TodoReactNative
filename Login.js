import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('todoApp.db');
  };

  const handleLogin = async () => {
    if (username.trim() && password.trim()) {
      try {
        const db = await openDatabase();
        const result = await db.getFirstAsync(
          'SELECT * FROM users WHERE username = ? AND password = ?;',
          [username, password]
        );

        if (result) {
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('TodoApp');
        } else {
          Alert.alert('Error', 'Invalid username or password.');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Username and password cannot be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    marginTop: 15,
  },
  signupText: {
    color: '#4CAF50',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Login;
