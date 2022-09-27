import React, { useContext, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);

  return (
    <ScrollView
      style={styles.containerScroll}
      contentContainerStyle={styles.containerScroll}
    >
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.wrapper}>
          <Image source={require('../assets/torneo.png')} style={styles.image} />
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
          <Text>{''}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
    borderColor: '#347eff',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: '#347eff',
  },
  dont: {
    flexDirection: 'row',
    marginTop: 20,
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ffcd34',
    paddingVertical: 14,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'italic',
  },
  image: {
    // height: 250,
    width: 330,
    resizeMode: 'contain',
  },
  img: {
    height: 250,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoginScreen;
