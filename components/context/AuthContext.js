import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [role, setRole] = useState({});
  const [school, setSchool] = useState({});

  const getSchool = () => {
    axios
      .get(BASE_URL + '/school')
      .then(res => {
        let school = res.data;
        console.log('school', school);
        setSchool(school);
        AsyncStorage.setItem('school', JSON.stringify(school));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getRole = () => {
    axios
      .get(BASE_URL + '/role')
      .then(res => {
        let role = res.data;
        console.log('role', role);
        setRole(role);
        AsyncStorage.setItem('role', JSON.stringify(role));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const register = (name, app, apm, school_id, level_id, email, password) => {
    setIsLoading(true);

    axios.post(BASE_URL + '/register', {
      name,
      app,
      apm,
      school_id,
      role_id: 2,
      level_id,
      email,
      password,
    })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(BASE_URL + '/login', {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        getRole,
        getSchool,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
