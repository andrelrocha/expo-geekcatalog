import React from 'react';
import { Text, Image, View, Platform, StatusBar } from 'react-native';
import { styles } from './styles';

const logo = require('../../assets/controller-xbox.png');

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