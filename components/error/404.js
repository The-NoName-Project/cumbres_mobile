//screen que aparece quando o usuário tenta acessar uma rota que no existe
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default function Error404() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Page_not_found.png')} style={styles.image} />
            <Text style={styles.text}>No hemos encontrado el recurso, lo sentimos</Text>
            <Text style={styles.sad}> :( </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    sad: {
        fontSize: 50,
        fontWeight: 'bold',
        paddingTop: 20,
    }
});
