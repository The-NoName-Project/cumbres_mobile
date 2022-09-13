import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout, res } = useContext(AuthContext);

  //cambia el role_id =1 a admin y role_id =2 a alumno
  const role = userInfo.user.role_id === 1 ? 'Admin' : 'Alumno';


  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Bienvenido de Nuevo</Text>
      <Text style={styles.welcome}>{userInfo.user.name} {userInfo.user.app} {userInfo.user.apm}</Text>
      {res === false ? (
        <>
          <Text style={styles.res}> No has contestado la encuesta <Icon name="close" size={30} color={'red'} /></Text>
        </>
      ) : (
        <Text style={styles.res}>Has contestado la encuesta <Icon name="check" size={30} color={'green'} /></Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  grup: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  button: {
    marginTop: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  res: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen;