/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import logo from '../../assets/controller-xbox.png';
import { styles } from './styles';

class Header extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Backlog APP</Text>
      </View>
    );
  }
}

export default Header;