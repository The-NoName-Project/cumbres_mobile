import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout, res } = useContext(AuthContext);
  const admin = userInfo.user.role_id === 1 ? true : false;
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const getActivities = () => {
    setLoad(true);
    axios.get(BASE_URL + '/activities',
      {
        headers: { Authorization: `Bearer ${userInfo.access_token}` },
      })
      .then(function (response) {
        let data = response.data;
        setData(data);
        setLoad(false);
        AsyncStorage.setItem('data', JSON.stringify(data));
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  }

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/torneo.png')} />
        <Spinner visible={isLoading} />
        <Spinner visible={load} />
        <Text style={styles.welcome}>Bienvenido de Nuevo</Text>
        <Text style={styles.welcome}>{userInfo.user.name} {userInfo.user.app} {userInfo.user.apm}</Text>
        {admin === true ? (
          <>
            {data.map((user, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.title}>Alumno 1</Text>
                <Text style={styles.text}>Nombre: {user.people1.name} {user.people1.app} {user.people1.apm}</Text>
                {user.people1.school_id === null ? (
                  <Text style={styles.text}>Escuela: No asignada ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Escuela: {user.people1.school_id}</Text>
                  </>
                )}
                {user.people1.level_id === null ? (
                  <Text style={styles.text}>Nivel de competicion: No asignado ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Nivel de competicion: {user.people1.level_id}</Text>
                  </>
                )}
                <Text style={styles.title}>Alumno 2</Text>
                <Text style={styles.text}>Nombre: {user.people2.name} {user.people2.app} {user.people2.apm}</Text>
                {user.people2.school_id === null ? (
                  <Text style={styles.text}>Escuela: No asignada ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Escuela: {user.people2.school_id}</Text>
                  </>
                )}
                {user.people2.level_id === null ? (
                  <Text style={styles.text}>Nivel de competicion: No asignado ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Nivel de competicion: {user.people2.level_id}</Text>
                  </>
                )}
                <Text style={styles.title}>Visor</Text>
                <Text style={styles.text}>Nombre: {user.visor.name} {user.visor.app} {user.visor.apm}</Text>
                <Text style={styles.title}>Deporte</Text>
                <Text style={styles.text}>Nombre: {user.sport.name}</Text>
                <Text style={styles.title}>Fecha</Text>
                <Text style={styles.text}>Fecha: {user.date}</Text>
              </View>
            ))}
          </>
        ) : (
          <>
            {res === false ? (
              <>
                <Text style={styles.res}> No has contestado la encuesta ❌</Text>
              </>
            ) : (
              <Text style={styles.res}>Has contestado la encuesta ✅</Text>
            )}
            {data.map((user, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.title}>Alumno 1</Text>
                <Text style={styles.text}>Nombre: {user.people1.name} {user.people1.app} {user.people1.apm}</Text>
                {user.people1.school_id === null ? (
                  <Text style={styles.text}>Escuela: No asignada ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Escuela: {user.people1.school_id}</Text>
                  </>
                )}
                {user.people1.level_id === null ? (
                  <Text style={styles.text}>Nivel de competicion: No asignado ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Nivel de competicion: {user.people1.level_id}</Text>
                  </>
                )}
                <Text style={styles.title}>Alumno 2</Text>
                <Text style={styles.text}>Nombre: {user.people2.name} {user.people2.app} {user.people2.apm}</Text>
                {user.people2.school_id === null ? (
                  <Text style={styles.text}>Escuela: No asignada ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Escuela: {user.people2.school_id}</Text>
                  </>
                )}
                {user.people2.level_id === null ? (
                  <Text style={styles.text}>Nivel de competicion: No asignado ❌</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Nivel de competicion: {user.people2.level_id}</Text>
                  </>
                )}
                <Text style={styles.title}>Visor</Text>
                <Text style={styles.text}>Nombre: {user.visor.name} {user.visor.app} {user.visor.apm}</Text>
                <Text style={styles.title}>Deporte</Text>
                <Text style={styles.text}>Nombre: {user.sport.name}</Text>
                <Text style={styles.title}>Fecha</Text>
                <Text style={styles.text}>Fecha: {user.date}</Text>
              </View>
            ))}
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={() => {
          //muestra un alerta para confirmar si se quiere cerrar sesion
          Alert.alert(
            "Cerrar Sesión",
            "¿Estas seguro de cerrar sesión?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => logout() }
            ],
            { cancelable: false }
          );
        }}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
          <Icon name="logout" size={20} color={'blue'} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    margin: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  icon: {
    marginLeft: 10,
  },
  scroll: {
    flex: 1,
    alignContent: 'center',
    padding: 20,
    marginTop: 20,
    margin: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
  },
});

export default HomeScreen;