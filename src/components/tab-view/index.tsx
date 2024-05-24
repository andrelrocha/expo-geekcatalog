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
}


export default function TabView({ routes, scenes }: TabViewProps) {
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap(scenes);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
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
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.sageOpacity,
  },
});