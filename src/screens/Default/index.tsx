import React, { ReactNode } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { styles } from "./styles";

interface PageDefaultProps {
  children: ReactNode;
}

const PageDefault = ({ children }: PageDefaultProps) => {
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustKeyboardInsets={true}
    >
      {children}
    </ScrollView>
  );
};



export default PageDefault;
