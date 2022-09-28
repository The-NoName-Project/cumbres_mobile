import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {BASE_URL} from '../config';

export default function VisorQuestion({navigation}) {
  const {isLoading, questionsVisor, userInfo, res, setResFalse} =
    useContext(AuthContext);
  const [getSport, setGetSport] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [getSchool, setGetSchool] = useState([]);
  const [load, setLoad] = useState(false);
  const [sport_id, setSport] = useState(null);
  const [level_id, setLevel] = useState(null);
  const [gender, setGender] = useState(null);
  const [school_id, setSchool] = useState(null);
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);
  const [q4, setQ4] = useState(null);
  const [q5, setQ5] = useState(null);
  const [q6, setQ6] = useState(null);
  const [q7, setQ7] = useState(null);
  const [q8, setQ8] = useState(null);
  const id = userInfo.user.id;

  const getSchools = () => {
    setLoad(true);
    axios
      .get(BASE_URL + '/school')
      .then(function (response) {
        let data = response.data;
        setGetSchool(data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  };

  const getLevel = () => {
    setLoad(true);
    axios
      .get(BASE_URL + '/level')
      .then(function (response) {
        let data = response.data;
        setGetCategory(data);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  };

  //pide los deportes
  const getSports = () => {
    setLoad(true);
    axios
      .get(BASE_URL + '/sports', {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(function (response) {
        let sports = response.data;
        setGetSport(sports);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  };

  useEffect(() => {
    getSchools();
    getLevel();
    getSports();
  }, []);

  const renderSchool = () => {
    return getSchool.map((school, index) => {
      return <Picker.Item key={index} label={school.name} value={school.id} />;
    });
  };

  const renderLevel = () => {
    return getCategory.map((level, index) => {
      return <Picker.Item key={index} label={level.name} value={level.id} />;
    });
  };

  const renderSport = () => {
    return getSport.map((item, index) => {
      return <Picker.Item key={index} label={item.name} value={item.id} />;
    });
  };

  const handlePress = () => {
    if (
      q1 == null ||
      q2 == null ||
      q3 == null ||
      q4 == null ||
      q5 == null ||
      q6 == null ||
      q7 == null ||
      q8 == null ||
      sport_id == null ||
      level_id  == null ||
      gender == null ||
      school_id == null
    ) {
      Alert.alert('Error', 'Por favor contesta todas las preguntas');
    } else {
      questionsVisor(q1, q2, q3, q4, q5, q6, q7, q8, id, sport_id, level_id, gender, school_id  );
      navigation.navigate('Home');
    }
  };

  return (
    <>
      {res === false ? (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Image
              source={require('../assets/torneo.png')}
              style={styles.image}
            />
            <Spinner visible={load} />
            <Spinner visible={isLoading} />
            <Text style={styles.label}>Deporte</Text>
            <Picker
              selectedValue={sport_id}
              style={styles.picker}
              mode="dropdown"
              onValueChange={itemValue => setSport(itemValue)}>
              <Picker.Item label="Selecciona un deporte" value="" />
              {renderSport()}
            </Picker>
            <Text style={styles.label}>Categoria</Text>
            <Picker
              selectedValue={level_id}
              style={styles.picker}
              mode="dropdown"
              onValueChange={itemValue => setLevel(itemValue)}>
              <Picker.Item label="Selecciona una categoria" value="" />
              {renderLevel()}
            </Picker>
            <Text style={styles.label}>Genero</Text>
            <Picker
              selectedValue={gender}
              mode="dropdown"
              style={styles.picker}
              onValueChange={itemValue => setGender(itemValue)}>
              <Picker.Item label="Selecciona tu genero" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
            </Picker>
            <Text style={styles.label}>Escuela</Text>
            <Picker
              selectedValue={school_id}
              style={styles.picker}
              mode="dropdown"
              onValueChange={itemValue => setSchool(itemValue)}>
              <Picker.Item label="Selecciona una escuela" value="" />
              {renderSchool()}
            </Picker>
            <Text> </Text>
            {/* Hr componente de preguntas */}
            <Text style={styles.hr} />
            <Text style={styles.title}>Preguntas</Text>
            <Text />
            <Text style={styles.label}>
              1.- ¿Se reunió el Colegio para hacer una oración antes del juego?
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q1}
              style={styles.picker}
              onValueChange={itemValue => setQ1(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              2.- ¿El Colegio saludó a contrincantes y árbitros de manera
              educada y cordial?
            </Text>
            <Picker
              selectedValue={q2}
              mode={'dropdown'}
              style={styles.picker}
              onValueChange={itemValue => setQ2(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              3.- ¿Las porras de los padres de familia fueron positivas y sin
              ofender al equipo contrario
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q3}
              style={styles.picker}
              onValueChange={itemValue => setQ3(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              4.- ¿La actitud de los jugadores dentro y fuera de la cancha fue
              respetuosa, sin burla ni malas palabras?
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q4}
              style={styles.picker}
              onValueChange={itemValue => setQ4(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              5.- ¿El Colegio respetó las decisiones del árbitro?
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q5}
              style={styles.picker}
              onValueChange={itemValue => setQ5(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              6.- ¿Al finalizar, los atletas se despidieron amistosamente?
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q6}
              style={styles.picker}
              onValueChange={itemValue => setQ6(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              7.- ¿Los Padres de familia respetaron al entrenador en todo
              momento?
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q7}
              style={styles.picker}
              onValueChange={itemValue => setQ7(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <Text style={styles.label}>
              8.- ¿El Colegio y la porra recogió la basura al terminar su
              partido?
            </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={q8}
              style={styles.picker}
              onValueChange={itemValue => setQ8(itemValue)}>
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Totalmente de acuerdo" value="3" />
              <Picker.Item label="De acuerdo" value="2" />
              <Picker.Item label="En desacuerdo" value="1" />
              <Picker.Item label="Totalmente en desacuerdo" value="0" />
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handlePress(q1, q2, q3, q4, q5, q6, q7, q8, id);
              }}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <Text>{}</Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Image
            source={require('../assets/torneo.png')}
            style={styles.image}
          />
          <Text style={styles.text}>
            Gracias por contestar las preguntas ✅
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //res sea false de nuevo
              // eslint-disable-next-line no-shadow
              const res = false;
              setResFalse(res);
            }}>
            <Text style={styles.buttonText}>Volver a contestar</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'justify',
    margin: 10,
  },
  picker: {
    height: 50,
    width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  scroll: {
    flex: 1,
    padding: 10,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 0,
    width: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  hr: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: 300,
    margin: 10,
  },
});
