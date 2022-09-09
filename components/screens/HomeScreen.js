import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  //cambia el role_id =1 a admin y role_id =2 a alumno
  const role = userInfo.user.role_id === 1 ? 'Admin' : 'Alumno';


  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Bienvenido de Nuevo</Text>
      <Text style={styles.welcome}>{userInfo.user.name} {userInfo.user.app} {userInfo.user.apm}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  logout: {
    fontSize: 18,
    marginBottom: 8,
    color: 'red',
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grup: {
    flex: 1,
  }
});

export default HomeScreen;