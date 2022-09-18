import React, { useContext, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            //if que valida que los campos no esten vacios
            if (email === null || password === null) {
              Alert.alert('Error', 'Los campos no pueden estar vacios');
            }
            //if que valida que el correo sea valido
            else if (
              email.includes('@') === false ||
              email.includes('.com') === false
            ) {
              Alert.alert('Error', 'El correo no es valido');
            }
            //if que valida que la contraseña tenga mas de 6 caracteres
            else if (password.length < 6) {
              Alert.alert('Error', 'La contraseña debe tener mas de 6 caracteres');
            }
            //si todo esta bien se hace la peticion a la api
            else {
              login(email, password);
            }
          }}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  dont: {
    flexDirection: 'row',
    marginTop: 20,
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 14,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
