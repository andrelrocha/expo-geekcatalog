import React from 'react';
import { Text, Image, View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import logo from '../../assets/controller-xbox.png';
import { styles } from './styles';

class Header extends React.Component {
  render () {
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(true);
    }

    return (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Geek Catalog</Text>
        </View>
    );
  }
}

export default Header;