import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function GeneralInformation({navigation}) {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [data2, setData2] = useState([]);

  const [data3, setData3] = useState([]);

  const getGender = async () => {
    try {
      const response = await fetch(
        'https://the-noname-project.herokuapp.com/api/gender',
      );
      const json = await response.json();
      ///elimina el segundo elemento del array
      json.splice(1, 1);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGender();
  }, []);

  const getTopUser = async () => {
    try {
      const response = await fetch(
        'https://the-noname-project.herokuapp.com/api/top/user',
      );
      const json = await response.json();
      setData2(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopUser();
  }, []);

  const getTopSchool = async () => {
    try {
      const response = await fetch(
        'https://the-noname-project.herokuapp.com/api/top/school',
      );
      const json = await response.json();
      setData3(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopSchool();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Card style={styles.card}>
          <Text style={styles.title}>Información general</Text>
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Text style={styles.text}>
                Total de puntos:{item.total} | Genero: {item.gender}
              </Text>
            )}
          />
        </Card>
      )}
      {data2.map((user, index) => (
        <View key={index}>
          <Card style={styles.cardInformation}>
            <Text style={styles.title}>Top 10 de Usuarios 🎖️</Text>
            <Text style={styles.text}> </Text>
            <Text style={styles.text}>Total: {user.total}</Text>
            <Text style={styles.text}>
              Participante: {user.user_id.name} {user.user_id.app}{' '}
              {user.user_id.apm}
            </Text>
            <Text style={styles.text}>Genero: {user.user_id.gender}</Text>
            <Text style={styles.text}>
              Nivel o Categoria: {user.user_id.level_id.name}
            </Text>
            <Text style={styles.text}>
              Escuela: {user.user_id.school_id.name}
            </Text>
          </Card>
        </View>
      ))}
      <Card style={styles.cardInformation}>
        <Text style={styles.title}>Top 10 de Escuelas 🎖️</Text>
        <Text style={styles.text}> </Text>
        <ScrollView>
          {data3.map((school, index) => (
            <View key={index}>
              <Text style={styles.text}>
                Total de puntos: {school.total} || Escuela:
                {school.school_id.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    maxHeight: 250,
    maxWidth: 400,
  },
  cardInformation: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    maxHeight: 450,
    maxWidth: 400,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    margin: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
});
