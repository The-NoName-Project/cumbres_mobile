import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASE_URL } from '../config';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [app, setApp] = useState(null);
  const [apm, setApm] = useState(null);
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [school_id, setSchool_id] = useState(null);
  const [level_id, setLevel_id] = useState(null);
  const [role_id, setRole_id] = useState(null);
  const [getSchools, setGetSchools] = useState([]);
  const [getLevels, setGetLevels] = useState([]);
  const [getRoles, setGetRoles] = useState([]);
  const [load, setLoad] = useState(false);
  const { isLoading, register } = useContext(AuthContext);

  const getRole = () => {
    setLoad(true);
    axios.get(BASE_URL + '/role')
      .then(function (response) {
        let data = response.data;
        setGetRoles(data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  }

  const getSchool = () => {
    setLoad(true);
    axios.get(BASE_URL + '/school')
      .then(function (response) {
        let data = response.data;
        setGetSchools(data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  }

  const getLevel = () => {
    setLoad(true);
    axios.get(BASE_URL + '/level')
      .then(function (response) {
        let data = response.data;
        setGetLevels(data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  }

  useEffect(() => {
    getRole();
    getSchool();
    getLevel();
  }, []);

  const renderRole = () => {
    return getRoles.map((role, index) => {
      return (
        <Picker.Item key={index} label={role.name} value={role.id} />
      )
    })
  }

  const renderSchool = () => {
    return getSchools.map((school, index) => {
      return (
        <Picker.Item key={index} label={school.name} value={school.id} />
      )
    })
  }

  const renderLevel = () => {
    return getLevels.map((level, index) => {
      return (
        <Picker.Item key={index} label={level.name} value={level.id} />
      )
    })
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={require('../assets/torneo.png')} style={styles.logo} />
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Spinner visible={load} />
        <View style={styles.wrapper}>
          <Text style={styles.label}>Nombre (s)</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Introduce tu nombre"
            onChangeText={text => setName(text)}
          />
          <Text style={styles.label}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
            value={app}
            placeholder="Introduce tu apellido paterno"
            onChangeText={text => setApp(text)}
          />
          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
            value={apm}
            placeholder="Introduce tu apellido materno"
            onChangeText={text => setApm(text)}
          />
          <Text style={styles.label}>Genero</Text>
          <Picker
            selectedValue={gender}
            mode="dropdown"
            style={{ height: 50, width: 300 }}
            onValueChange={itemValue => setGender(itemValue)}>
            <Picker.Item label="Selecciona tu genero" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Introduce tu Correo Electronico"
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Introduce tu Contraseña"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <Text style={styles.label}>Nivel</Text>
          <Picker
            selectedValue={level_id}
            style={{ height: 50, width: 300 }}
            onValueChange={itemValue => setLevel_id(itemValue)}
          >
            <Picker.Item label="Selecciona el Nivel" value="" />
            {renderLevel()}
          </Picker>
          <Text style={styles.label}>Escuela</Text>
          <Picker
            selectedValue={school_id}
            style={{ height: 50, width: 300 }}
            onValueChange={itemValue => setSchool_id(itemValue)}
          >
            <Picker.Item label="Selecciona la Escuela" value="" />
            {renderSchool()}
          </Picker>
          <Text style={styles.label}>Rol</Text>
          <Picker
            selectedValue={role_id}
            style={{ height: 50, width: 300 }}
            onValueChange={itemValue => setRole_id(itemValue)}
          >
            <Picker.Item label="Selecciona el Rol" value="" />
            {renderRole()}
          </Picker>


          <TouchableOpacity style={styles.button} onPress={() => register(name, app, apm, school_id, level_id, email, password, role_id)}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -10
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff3238',
    paddingVertical: 14,
    borderRadius: 5,
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingTop: 30,
  },
  scroll: {
    backgroundColor: '#fff',
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 330,
  },
});

export default RegisterScreen;
