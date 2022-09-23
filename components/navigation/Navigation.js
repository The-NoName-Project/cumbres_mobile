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
import Users from '../screens/UsersScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import Logout from '../screens/LogoutScrenn';
import Graphic from '../screens/Graphic';

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

            {userInfo.user.role_id > 1 ? (
              <>
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
            ) : null}

            {userInfo.user.role_id === 1 ? (
              <>
                <Tab.Screen name="AddUser" component={RegisterScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: 'Añadir Usuarios',
                    tabBarIcon: ({ }) => (
                      <Icon name="team" color={'black'} size={15} />
                    ),
                  }}
                />
                <Tab.Screen name="AllUser" component={Users}
                  options={{
                    headerShown: false,
                    tabBarLabel: 'Todos los Usuarios',
                    tabBarIcon: ({ }) => (
                      <Icon name="user" color={'black'} size={15} />
                    ),
                  }}
                />
                <Tab.Screen name="Grafica" component={Graphic}
                  options={{
                    headerShown: false,
                    tabBarLabel: 'Gráfica',
                    tabBarIcon: ({ }) => (
                      <Icon name="linechart" color={'black'} size={15} />
                    ),
                  }}
                />
                <Tab.Screen name='Actividades' component={ActivitiesScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: 'Actividades',
                    tabBarIcon: ({ }) => (
                      <Icon name='bars' color={'black'} size={15} />
                    )
                  }}
                />
              </>
            ) : null}
            <Tab.Screen name="Logout" component={Logout}
              options={{
                headerShown: false,
                tabBarLabel: 'Cerrar Sesión',
                tabBarIcon: ({ }) => (
                  <Icon name="logout" color={'black'} size={15} />
                ),
              }}
            />
          </>
        ) :
          (
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

            </>
          )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
