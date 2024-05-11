import React, { ReactNode, useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { styles } from "./styles";

interface PageDefaultProps {
  children: ReactNode;
  onRefresh?: () => void;
}

const PageDefault = (props: PageDefaultProps) => {
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true); 
        if (props.onRefresh) {
            setTimeout(async () => {
                setRefreshing(false); 
                props.onRefresh && props.onRefresh(); 
                return;
            }, 2000);
        }
        setTimeout(async () => {
            setRefreshing(false); 
        }, 2000);
    }, []);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="handled" 
      refreshControl={props.onRefresh ? (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : undefined}
    >
      {props.children}
    </ScrollView>
  );
};



export default PageDefault;
