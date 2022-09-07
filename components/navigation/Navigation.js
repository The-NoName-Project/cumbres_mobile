import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {splashLoading ? (
          <Tab.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <Tab.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                tabBarLabel: 'Login',
                tabBarIcon: ({color, size}) => (
                  <Icon name="user" color={'black'} size={15} />
                ),
              }}
            />
            <Tab.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
