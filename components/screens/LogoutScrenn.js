import { useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
    const { logout } = useContext(AuthContext);
    return (
        <View style={style.container}>
            <Image source={require('../assets/torneo.png')} style={style.image} />
            <Text style={style.alert}>¿Estás seguro de que quieres cerrar sesión?</Text>
            <TouchableOpacity onPress={() => {
                Alert.alert(
                    "Cerrar sesión",
                    "¿Estás seguro de que quieres cerrar sesión?",
                    [
                        {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => logout() }
                    ],
                    { cancelable: false }
                );
            }} style={style.button}>
                <Text style={style.text}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 10,
    },
    alert: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#000',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});