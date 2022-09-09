import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Error404 from "../error/404";

export default function DataUser() {
    const { userInfo } = useContext(AuthContext);
    //remplaza el role_id =1 a admin y role_id =2 a alumno
    const role = userInfo.user.role_id === 1 ? "Admin" : "Alumno";

    return (
        <>
            {userInfo.user ? (
                <>
                    <View style={styles.container}>
                        <Text style={styles.data}>Nombre: {userInfo.user.name}</Text>
                        <Text style={styles.data}>Apellido Paterno: {userInfo.user.app}</Text>
                        <Text style={styles.data}>Apellido Materno: {userInfo.user.apm}</Text>
                        <Text style={styles.data}>Correo: {userInfo.user.email}</Text>
                        <Text style={styles.data}>{role}</Text>
                    </View >
                </>
            ) : (
                <Error404 />
            )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    data: {
        fontSize: 18,
        marginBottom: 8,
    },
});