import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Questions from '../screens/Questions';
import DataUser from '../screens/DataUser';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {splashLoading ? (
          <Tab.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.access_token ? (
          <>
            <Tab.Screen name="Home" component={HomeScreen}
              options={{
                headerShown: false,
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ }) => (
                  <Icon name="home" color={'black'} size={15} />
                ),
              }}
            />
            <Tab.Screen name="Questions" component={Questions}
              options={{
                headerShown: false,
                tabBarLabel: 'Preguntas',
                tabBarIcon: ({ }) => (
                  <Icon name="questioncircleo" color={'black'} size={15} />
                ),
              }}
            />
            <Tab.Screen name="DataUser" component={DataUser}
              options={{
                headerShown: false,
                tabBarLabel: 'Datos',
                tabBarIcon: ({ }) => (
                  <Icon name="user" color={'black'} size={15} />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                tabBarLabel: 'Inicia Sesion',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="user" color={'black'} size={15} />
                ),
              }}
            />
            <Tab.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
                tabBarLabel: 'Registro',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="adduser" color={'black'} size={15} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
