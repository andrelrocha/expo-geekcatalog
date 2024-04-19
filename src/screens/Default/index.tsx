import React, { ReactNode } from "react";
import { ScrollView } from "react-native";
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
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};



export default PageDefault;
