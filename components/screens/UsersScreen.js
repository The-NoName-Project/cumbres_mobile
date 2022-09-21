import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Error404 from "../error/404";
import axios from "axios";
import { BASE_URL } from "../config";
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./RegisterScreen";

export default function Users({ navigation }) {

    const { userInfo, isLoading } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    const createAt = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    const time = (date) => {
        const d = new Date(date);
        return `${d.getHours()}:${d.getMinutes()}`;
    }


    //hace la petición a la api para obtener los datos del usuario
    const getUser = () => {
        setLoad(true);
        axios.get(BASE_URL + '/all-users',
            {
                headers: { Authorization: `Bearer ${userInfo.access_token}` },
            })
            .then(function (response) {
                let users = response.data;
                setUsers(users);
                AsyncStorage.setItem('users', JSON.stringify(users));
                setLoad(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoad(false);
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <ScrollView>
            {userInfo.user.role_id === 1 ? (
                <View style={styles.container}>
                    <Spinner visible={isLoading} />
                    <Spinner visible={load} />
                    <Image style={styles.image} source={require('../assets/torneo.png')} />
                    <Text style={styles.welcome}>Información del Usuario 👤</Text>
                    {users.map((user, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.text}>Nombre: {user.name} {user.app} {user.apm}</Text>
                            <Text style={styles.text}>Email: {user.email}</Text>
                            {user.school_id === null ? (
                                <Text style={styles.text}>Escuela: No asignada ❌</Text>
                            ) : (
                                <Text style={styles.text}>Escuela: {user.school.name}</Text>
                            )}
                            {user.level_id === null ? (
                                <Text style={styles.text}>Nivel de competicion: No asignado ❌</Text>
                            ) : (
                                <Text style={styles.text}>Nivel de competicion: {user.level.name}</Text>
                            )}
                            <Text style={styles.text}>Tipo de usuario: {user.role.name}</Text>
                            <Text style={styles.text}>Creado el: {createAt(user.created_at)} a las {time(user.created_at)}</Text>
                            <Text style={styles.text}>Actualizado el: {createAt(user.created_at)} a las {time(user.created_at)}</Text>

                        </View>
                    ))}
                </View>
            ) : (
                <Error404 />
            )}
        </ScrollView>
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
        margin: 10,
        shadowColor: '#',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        maxHeight: 350,
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
    sub: {
        fontSize: 18,
        marginBottom: 8,
    },
    image: {
        width: 330,
        resizeMode: 'contain',
    },
});

const adduser = () => {
    return (
        <RegisterScreen />
    );
}