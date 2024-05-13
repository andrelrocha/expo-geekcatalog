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
        // Authentication successful, allow access to the app
        Alert.alert('Authentication successful!');
      } else {
        // Authentication failed or was canceled
        Alert.alert('Authentication failed!');
      }
    } catch (error) {
      // Handle error
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
