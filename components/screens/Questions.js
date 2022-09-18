import React, { useState, useContext } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { AuthContext } from "../context/AuthContext";
import Spinner from 'react-native-loading-spinner-overlay';

export default function Questions({ navigation }) {

    const { isLoading, questions, userInfo, res } = useContext(AuthContext);
    const [q1, setQ1] = useState(null);
    const [q2, setQ2] = useState(null);
    const [q3, setQ3] = useState(null);
    const [q4, setQ4] = useState(null);
    const [q5, setQ5] = useState(null);
    const [q6, setQ6] = useState(null);
    const [q7, setQ7] = useState(null);
    const [q8, setQ8] = useState(null);
    const id = userInfo.user.id;

    //si se presiona el boton de enviar regresa a la pantalla de inicio
    const handlePress = () => {
        questions(q1, q2, q3, q4, q5, q6, q7, q8, id);
        navigation.navigate('Home');
    }

    return (
        <>
            {res === false ? (
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Spinner visible={isLoading} />
                        <Text style={styles.label}>1.- ¿Se reunió el Colegio para hacer una oración antes del juego?</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q1}
                            style={styles.picker}
                            onValueChange={itemValue => setQ1(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>2.- ¿El Colegio saludó a contrincantes y árbitros de manera educada y cordial?</Text>
                        <Picker
                            selectedValue={q2}
                            mode={'dropdown'}
                            style={styles.picker}
                            onValueChange={itemValue => setQ2(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>3.- ¿Las porras de los padres de familia fueron positivas y sin ofender al equipo contrario</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q3}
                            style={styles.picker}
                            onValueChange={itemValue => setQ3(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>4.- ¿La actitud de los jugadores dentro y fuera de la cancha fue respetuosa, sin burla ni malas palabras?</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q4}
                            style={styles.picker}
                            onValueChange={itemValue => setQ4(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>5.- ¿El Colegio respetó las decisiones del árbitro?</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q5}
                            style={styles.picker}
                            onValueChange={itemValue => setQ5(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>6.- ¿Al finalizar, los atletas se despidieron amistosamente?</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q6}
                            style={styles.picker}
                            onValueChange={itemValue => setQ6(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>7.- ¿Los Padres de familia respetaron al entrenador en todo momento?</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q7}
                            style={styles.picker}
                            onValueChange={itemValue => setQ7(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <Text style={styles.label}>8.- ¿El Colegio y la porra recogió la basura al terminar su partido?</Text>
                        <Picker
                            mode={'dropdown'}
                            selectedValue={q8}
                            style={styles.picker}
                            onValueChange={itemValue => setQ8(itemValue)}
                        >
                            <Picker.Item label='Seleccione una opción' value='' />
                            <Picker.Item label="Totalmente De acuerdo" value="3" />
                            <Picker.Item label="De acuerdo" value="2" />
                            <Picker.Item label="En desacuerdo" value="1" />
                            <Picker.Item label="Totalmente en desacuerdo" value="0" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            value={id}
                        />
                        {/* <Text>{id}</Text> */}

                        <TouchableOpacity style={styles.button} onPress={() => {
                            handlePress(q1, q2, q3, q4, q5, q6, q7, q8, id)
                        }}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                        <Text>
                            { }
                        </Text>
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.text}>Gracias por contestar las preguntas ✅</Text>
                </View>

            )}
        </>
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
    }
})
