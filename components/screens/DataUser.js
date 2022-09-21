import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/AntDesign';

export default function DataUser() {
    const { userInfo, res } = useContext(AuthContext);
    //remplaza el role_id =1 a admin y role_id =2 a alumno
    const role = userInfo.user.role_id === 1 ? "Admin" : "Alumno";
    const createAt = userInfo.user.created_at;
    const date = createAt.split("T");
    const date2 = date[0].split("-");
    const date3 = date2[2] + "/" + date2[1] + "/" + date2[0];
    const time = date[1].split(":");
    const time2 = time[0] + ":" + time[1];
    const date4 = date3 + " " + time2;

    return (

        <View style={styles.container}>
            <Image source={require('../assets/torneo.png')} style={styles.image} />
            <Text style={styles.welcome}>Información del Usuario 👤</Text>
            <Text></Text>
            <Text></Text>
            {res === false ? (
                <>
                    <Text style={styles.res}> No has contestado la encuesta ❌</Text>
                </>
            ) : (
                <Text style={styles.res}>Has contestado la encuesta ✅</Text>
            )}
            <View style={styles.card}>
                <View style={styles.viewicon}>
                    <Icon name="user" size={40} color={'#000'} style={{ margin: 20 }} />
                </View>
                <Text style={styles.text}>Nombre: {userInfo.user.name} {userInfo.user.app} {userInfo.user.apm}</Text>
                <Text style={styles.text}>Email: {userInfo.user.email}</Text>
                {userInfo.user.school_id === null ? (
                    <Text style={styles.text}>Escuela: No asignada ❌</Text>
                ) : (
                    <Text style={styles.text}>Escuela: {userInfo.user.school.name}</Text>
                )}
                {userInfo.user.level_id === null ? (
                    <Text style={styles.text}>Nivel de competicion: No asignado ❌</Text>
                ) : (
                    <Text style={styles.text}>Nivel de competicion: {userInfo.user.level.name}</Text>
                )}
                <Text style={styles.text}>Rol: {role}</Text>
                <Text style={styles.text}>Fecha de Registro: {date4}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    welcome: {
        fontSize: 28,
        marginBottom: 8,
    },
    logout: {
        fontSize: 18,
        marginBottom: 8,
        color: "red",
    },
    grup: {
        flex: 1,
    },
    buttonText: {
        fontSize: 18,
        color: "blue",
    },
    button: {
        marginTop: 20,
        flexDirection: "row",
    },
    icon: {
        marginLeft: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        shadowColor: '#',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        maxHeight: 400,
        maxWidth: 400,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
        margin: 10,
        fontWeight: '600',
    },
    viewicon: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        margin: 20,
    },
    res: {
        fontSize: 18,
        marginBottom: 8,
        margin: 10,
        fontWeight: '600',
    },
    image: {
        width: 330,
        height: 200,
        resizeMode: 'contain',
    },
});