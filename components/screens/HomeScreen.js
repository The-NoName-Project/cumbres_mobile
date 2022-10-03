import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeneralInformation from './GeneralInformation';

const HomeScreen = ({navigation}) => {
  const {userInfo, isLoading, logout, res} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const getActivities = () => {
    setLoad(true);
    axios
      .get(BASE_URL + '/activities', {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
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
  };

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
        <Text style={styles.welcome}>
          {userInfo.user.name} {userInfo.user.app} {userInfo.user.apm}
        </Text>
        {res === false ? (
          <>
            <Text style={styles.res}> No has contestado la encuesta ❌</Text>
          </>
        ) : (
          <Text style={styles.res}>Has contestado la encuesta ✅</Text>
        )}
        <GeneralInformation />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    margin: 20,
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
