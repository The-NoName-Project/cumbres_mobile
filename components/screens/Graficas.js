import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';
import {Picker} from '@react-native-picker/picker';
import {BASE_URL} from '../config';

export default function Graphic() {
  const screenWidth = Dimensions.get('window').width;
  const [name, setName] = useState([]);
  const [total, setTotal] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pick, setPick] = useState(false);
  const [school, setSchool] = useState([]);
  const [school_id, setSchool_id] = useState([]);

  const peticionApi = () => {
    setLoading(true);
    axios
      .get('https://the-noname-project.herokuapp.com/api/question/all')
      .then(response => {
        var respuesta = response.data;
        var auxTotal = [],
          auxName = [],
          auxSchool = [];
        respuesta.map(elemento => {
          const aux = 0;
          const tot = aux + elemento.total;
          auxTotal.push(tot);
          const apm = elemento.user_id.apm.charAt(0);
          const name =
            elemento.user_id.name + ' ' + elemento.user_id.app + ' ' + apm;
          auxName.push(name);
          //si el campo es igual a null, se guarda un string vacio
          const school =
            elemento.user_id.school_id === null
              ? 'No hay registro'
              : elemento.user_id.school_id.name;
          auxSchool.push(school);
        });
        setTotal(auxTotal);
        setName(auxName);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const getSchool = () => {
    setLoading(true);
    axios
      .get(BASE_URL + '/results')
      .then(response => {
        const data = response.data;
        var auxTotal = [],
          auxName = [],
          auxSchool = [];
        data.map(elemento => {
          const tot = elemento.total;
          auxTotal.push(tot);
          const name = elemento.name;
          auxName.push(name);
          const school = elemento.school_id;
            auxSchool.push(school);
        });
        setSchool_id(auxSchool);
        setData(auxTotal);
        setSchool(auxName);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    peticionApi();
    getSchool();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conta}>
        <Spinner
          visible={loading}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Image style={styles.image} source={require('../assets/torneo.png')} />
        <Text style={styles.welcome}>
          Puntuación obtenida
          {pick === null ? (
            <Text></Text>
          ) : pick === true ? (
            <Text> por usuario</Text>
          ) : (
            <Text> por escuela</Text>
          )}
        </Text>
        <Picker
          selectedValue={pick}
          mode="dropdown"
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setPick(itemValue);
          }}>
          <Picker.Item label="Selecciona una opción" value={null} />
          <Picker.Item label="Grafica por Escuela" value={false} />
          <Picker.Item label="Gráfica por Estudiante" value={true} />
        </Picker>
      </View>
      <View style={styles.conta}>
        {pick === null ? (
          <Text style={styles.welcome}>
            Para visualizar una grafica seleccione una opción
          </Text>
        ) : pick === true ? (
          <Chart
            style={{height: 300, width: 400}}
            data={[
              {x: 0, y: 0},
              //recorre el arreglo de total y lo asigna a y
              ...total.map((y, x) => ({x, y})),
              {x: total.length, y: 0},
            ]}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: -1, max: total.length+1}}
            yDomain={{min: 0, max: 30}}>
            <VerticalAxis
              tickCount={11}
              theme={{labels: {formatter: v => v.toFixed(2)}}}
            />
            <HorizontalAxis tickCount={5} />
            <Area
              theme={{
                gradient: {
                  from: {color: '#347eff'},
                  to: {color: '#347eff', opacity: 0.4},
                },
              }}
            />
            <Line
              tooltipComponent={<Tooltip />}
              theme={{
                stroke: {color: '#347eff', width: 5},
                scatter: {default: {width: 4, height: 4, rx: 2}},
              }}
            />
          </Chart>
        ) : (
          <Chart
            style={{height: 300, width: 400}}
            data={[
              {x: 0, y: 0},
              //recorre el arreglo de total y lo asigna a y
              ...data.map((y, x) => ({x, y})),
              {x: data.length, y: 0},
            ]}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{min: -1, max: data.length+1}}
            yDomain={{min: 0, max: 100}}>
            <VerticalAxis
              tickCount={11}
              theme={{labels: {formatter: v => v.toFixed(2)}}}
            />
            <HorizontalAxis tickCount={5} />
            <Area
              theme={{
                gradient: {
                  from: {color: '#ffa502'},
                  to: {color: '#ffa502', opacity: 0.4},
                },
              }}
            />
            <Line
              tooltipComponent={<Tooltip />}
              theme={{
                stroke: {color: '#ffa502', width: 5},
                scatter: {default: {width: 4, height: 4, rx: 2}},
              }}
            />
          </Chart>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    margin: 20,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  conta: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    margin: 20,
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  picker: {
    height: 50,
    width: 300,
    color: '#000',
    justifyContent: 'center',
  },
});
