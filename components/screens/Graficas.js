import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from "react-native";
import axios from 'axios';
import {
    LineChart,
} from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";

export default function Graphic() {
    const screenWidth = Dimensions.get("window").width;
    const [name, setName] = useState([]);
    const [total, setTotal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pick, setPick] = useState(false);
    const [school, setSchool] = useState([]);

    const data = {
        labels: name,
        datasets: [
            {
                data: total
            }
        ]
    };

    const schoolData = {
        labels: school,
        datasets: [
            {
                data: total
            }
        ]
    };

    const opciones = {
        maintainAspectRatio: false,
        responsive: true
    }

    const peticionApi = () => {
        setLoading(true);
        axios.get('https://the-noname-project.herokuapp.com/api/question/all')
            .then(response => {
                var respuesta = response.data;
                var auxTotal = [], auxName = [], auxSchool = [];
                respuesta.map(elemento => {
                    //añade el numero 0 al arreglo auxTotal 
                    const aux = 0;
                    const tot = aux + elemento.total
                    //crea un array con el total de votos
                    auxTotal.push(tot);
                    //recupera el apellido y solo guarda la primera letra
                    const apm = elemento.user_id.apm.charAt(0);
                    const name = elemento.user_id.name + " " + elemento.user_id.app + " " + apm;
                    auxName.push(name);
                    //si el campo es igual a null, se guarda un string vacio
                    const school = elemento.user_id.school_id === null ? "No hay registro" : elemento.user_id.school_id.name;
                    auxSchool.push(school);
                });
                setTotal(auxTotal);
                setName(auxName);
                setSchool(auxSchool);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    useEffect(() => {
        peticionApi();
    }, []);

    const chartConfig = {
        backgroundGradientFrom: "#347eff",
        backgroundGradientFromOpacity: 80,
        backgroundGradientTo: "#ffcd34", //Parte de atrás de la gráfica
        backgroundGradientToOpacity: 1.3,
        //color: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 6, // optional, default 3, en line chart es para resaltar la línea pendiente
        barPercentage: 1.0, //Grosor de las barras
        useShadowColorFromDataset: false // optional
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.conta}>
                <Spinner
                    visible={loading}
                    textContent={'Cargando...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Image style={styles.image} source={require('../assets/torneo.png')} />
                <Text style={styles.welcome}>Puntuación obtenida Individual</Text>
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
                {/* {pick === null ? <Text style={styles.welcome}>Para visualizar una grafica seleccione una opción</Text> :
                    pick === true ?
                        <LineChart
                            data={data}
                            width={screenWidth}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            {...opciones}
                        />
                        :
                        <LineChart
                            data={schoolData}
                            width={screenWidth}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            {...opciones}
                        />
                } */}
            </View>

        </SafeAreaView>

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
        color: '#FFF'
    },
    picker: {
        height: 50,
        width: 300,
        color: '#000',
        justifyContent: 'center',
    },
});