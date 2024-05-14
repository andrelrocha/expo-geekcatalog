import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function FaceIDAuthentication() {
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    try {
      const isAuthenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Use Face ID to authenticate',
        fallbackLabel: 'Use Passcode',
      });

      if (isAuthenticated.success) {
        Alert.alert('Authentication successful!');
      } else {
        Alert.alert('Authentication failed!');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Authentication with Face ID</Text>
        <Button title="Authenticate" onPress={authenticate} />
      </View>
  );
}
