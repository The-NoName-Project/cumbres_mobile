import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={style.con}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const style = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#06bcee',
  },
});

export default SplashScreen;
