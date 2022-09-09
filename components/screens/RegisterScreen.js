import React, { useContext, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [app, setApp] = useState(null);
  const [apm, setApm] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const { isLoading, register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.label}>Nombre (s)</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Inrtoduce tu nombre"
          onChangeText={text => setName(text)}
        />
        <Text style={styles.label}>Apellido Paterno</Text>
        <TextInput
          style={styles.input}
          value={app}
          placeholder="Inrtoduce tu apellido paterno"
          onChangeText={text => setApp(text)}
        />
        <Text style={styles.label}>Apellido Materno</Text>
        <TextInput
          style={styles.input}
          value={apm}
          placeholder="Inrtoduce tu apellido materno"
          onChangeText={text => setApm(text)}
        />
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Inrtoduce tu Correo Electronico"
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Inrtoduce tu Contraseña"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Registrate"
          onPress={() => {
            register(name, email, password, app, apm);
          }}
        />

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> Inicia Sesion</Text>
          </TouchableOpacity>
        </View>
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
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
