import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('todoApp.db');
  };

  const handleSignUp = async () => {
    if (username.trim() && password.trim()) {
      try {
        const db = await openDatabase();
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
          );
        `);

        const result = await db.runAsync(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          username,
          password
        );

        if (result.changes > 0) {
          Alert.alert('Success', 'Account created successfully!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Failed to create account.');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Username and password cannot be empty.');
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Text className="text-2xl font-semibold mb-7 text-gray-800">Create Account</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-base bg-gray-100"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-base bg-gray-100"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity className="w-full bg-green-500 p-4 rounded-lg items-center mt-2" onPress={handleSignUp}>
        <Text className="text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="mt-4 text-green-500 text-base underline">Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
