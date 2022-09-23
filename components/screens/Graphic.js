import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from "react-native";
import axios from 'axios';
import {
    LineChart,
} from "react-native-chart-kit";

export default function Graphic() {
    const screenWidth = Dimensions.get("window").width;
    const [name, setName] = useState([]);
    const [total, setTotal] = useState([]);

    const data = {
        labels: name,
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

    const peticionApi = async () => {
        await axios.get('https://the-noname-project.herokuapp.com/api/question/all')
            .then(response => {
                var respuesta = response.data;
                var auxTotal = [], auxName = [];
                respuesta.map(elemento => {
                    auxTotal.push(elemento.total);
                    auxName.push(elemento.user_id.name);
                });
                setTotal(auxTotal);
                setName(auxName);
            })
    }

    useEffect(() => {
        peticionApi();

    }, [])

    const chartConfig = {
        backgroundGradientFrom: "#ADD8E6",
        backgroundGradientFromOpacity: 80,
        backgroundGradientTo: "#ADD8E6", //Parte de atrás de la gráfica
        backgroundGradientToOpacity: 1.3,
        color: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
        strokeWidth: 6, // optional, default 3, en line chart es para resaltar la línea pendiente
        barPercentage: 1.0, //Grosor de las barras
        useShadowColorFromDataset: false // optional
    };


    return (

        <SafeAreaView style={styles.container}>
            <View >
                <Image style={styles.image} source={require('../assets/torneo.png')} />
                <Text style={styles.welcome}>Puntuación obtenida</Text>
            </View>


            <LineChart
                data={data}
                option={opciones}
                width={screenWidth}
                height={450}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={60}
            />

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

});
