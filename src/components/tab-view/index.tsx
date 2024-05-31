import React, { ComponentType, useState } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { TabView as ReactTabView, SceneMap } from 'react-native-tab-view';
import { colors } from '../../utils/colors';

const initialLayout = { width: Dimensions.get('window').width };

interface Route {
    key: string;
    title: string;
}

interface TabViewProps {
  routes: Route[];
  scenes: { [key: string]: ComponentType<unknown> };
  swipeEnabled?: boolean;
}


export default function TabView(props: TabViewProps) {
  const [index, setIndex] = useState(0);

  const { routes, scenes, swipeEnabled = true } = props;

  const renderScene = SceneMap(scenes);

  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const isFocused = props.navigationState.index === i;
          const backgroundColor = isFocused ? colors.sage : colors.sageOpacity;
          const opacity = isFocused ? 1 : 0.5;
          const fontWeight = isFocused ? 'bold' : 'normal';
          
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, { backgroundColor }]}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity, fontWeight }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ReactTabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      swipeEnabled={swipeEnabled}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.sageOpacity,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});