import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
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
    <View className="flex-1 bg-gray-200 items-center justify-center p-5">
      <Text className="text-4xl font-semibold mb-8 text-gray-800">Todo App</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-base bg-gray-100"
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#aaa"
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-base bg-gray-100"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity className="w-full bg-green-600 p-4 rounded-lg items-center mt-2" onPress={handleLogin}>
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="mt-4"
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text className="text-green-600 text-base underline">Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
