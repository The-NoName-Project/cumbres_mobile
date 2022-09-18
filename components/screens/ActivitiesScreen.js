import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, TextInput, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';
import { BASE_URL } from '../config';

export default function ActivitiesScreen() {
    const { activities, userInfo } = useContext(AuthContext);
    const [getPeople1, setGetPeople1] = useState([]);
    const [getPeople2, setGetPeople2] = useState([]);
    const [getVisor, setGetVisor] = useState([]);
    const [scoreone, setScoreone] = useState('');
    const [scoretwo, setScoretwo] = useState('');
    const [getSport, setGetSport] = useState([]);
    const [peopleone, setPeopleOne] = useState('');
    const [peopletwo, setPeopleTwo] = useState('');
    const [visor, setVisor] = useState('');
    const [sport, setSport] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //pide los usuarios
    const getPeople = () => {
        setIsLoading(true);
        axios.get(BASE_URL + '/all-users',
            {
                headers: { Authorization: `Bearer ${userInfo.access_token}` },
            })
            .then(function (response) {
                let users = response.data;
                setGetPeople1(users);
                setGetPeople2(users);
                setGetVisor(users);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    }

    //pide los deportes
    const getSports = () => {
        setIsLoading(true);
        axios.get(BASE_URL + '/sports',
            {
                headers: { Authorization: `Bearer ${userInfo.access_token}` },
            })
            .then(function (response) {
                let sports = response.data;
                setGetSport(sports);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                isLoading(false);
            });
    }

    useEffect(() => {
        getPeople();
        getSports();
    }, []);


    const renderPeople1 = () => {
        return getPeople1.map((item, index) => {
            const name = item.name + ' ' + item.app + ' ' + item.apm;
            return <Picker.Item key={index} label={name} value={item.id} />
        })
    }

    const renderPeople2 = () => {
        return getPeople2.map((item, index) => {
            const name = item.name + ' ' + item.app + ' ' + item.apm;
            return <Picker.Item key={index} label={name} value={item.id} />
        })
    }

    const renderVisor = () => {
        return getVisor.map((item, index) => {
            const name = item.name + ' ' + item.app + ' ' + item.apm;
            return <Picker.Item key={index} label={name} value={item.id} />
        })
    }

    const renderSport = () => {
        return getSport.map((item, index) => {
            return <Picker.Item key={index} label={item.name} value={item.id} />
        })
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Spinner visible={isLoading} />
                <Text style={styles.title}>Crear Actividades</Text>
                <Text></Text>
                <Text style={styles.text}>Nombre del deporte</Text>
                <Picker
                    selectedValue={sport}
                    style={styles.picker}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => setSport(itemValue)}
                >
                    {renderSport()}
                </Picker>
                <Text style={styles.text}>Jugador 1</Text>
                <Picker
                    selectedValue={peopleone}
                    style={styles.picker}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => setPeopleOne(itemValue)}
                >
                    {renderPeople1()}
                </Picker>
                <Text style={styles.text}>Jugador 2</Text>
                <Picker
                    selectedValue={peopletwo}
                    mode="dropdown"
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setPeopleTwo(itemValue)}
                >
                    {renderPeople2()}
                </Picker>
                <Text style={styles.text}>Puntuación jugador 1</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setScoreone(text)}
                    value={scoreone}
                    placeholder="Puntuación jugador 1"
                    keyboardType="numeric"
                />
                <Text style={styles.text}>Puntuación jugador 2</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setScoretwo(text)}
                    value={scoretwo}
                    placeholder="Puntuación jugador 2"
                    keyboardType="numeric"
                />
                <Text style={styles.text}>Visor</Text>
                <Picker
                    selectedValue={visor}
                    style={styles.picker}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => setVisor(itemValue)}
                >
                    {renderVisor()}
                </Picker>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (peopleone == peopletwo) {
                        Alert.alert('No puedes jugar contra ti mismo');
                    }
                    if (peopleone == visor || peopletwo == visor) {
                        Alert.alert('No puedes ser visor de tu partido');
                    }
                    if (sport === null || peopleone === null || peopletwo === null || scoreone === '' || scoretwo === '' || visor === null) {
                        Alert.alert('Debes llenar todos los campos');
                    }
                    else {
                        activities(sport, peopleone, peopletwo, scoreone, scoretwo, visor);
                    }
                }}>
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginTop: 20,
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    picker: {
        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: 300,
        backgroundColor: '#000',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
