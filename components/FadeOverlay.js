import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';

export default function FadeOverlay({ children, ...props }) {
  const [fadeOpacity, setFadeOpacity] = useState(0);

  function handleScroll({ nativeEvent }) {
    if (nativeEvent.contentOffset.y <= 0) setFadeOpacity(0);
    else setFadeOpacity(1);
  }

  return (
    <View {...props}>
      <Animatable.View
        transition="opacity"
        style={{opacity: fadeOpacity, ...styles.fade}}
        duration={1000}
        pointerEvents="none"
      >
        <LinearGradient
          style={styles.fade}
          colors={[`rgba(0,0,0,0.1)`, 'transparent']}
        />
      </Animatable.View>
      {React.cloneElement(children, {
        onScroll: handleScroll
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1
  },
  container: {
    position: 'relative'
  }
});
