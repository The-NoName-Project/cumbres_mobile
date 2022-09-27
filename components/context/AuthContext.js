import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [res, setRes] = useState(false);
  const [act, setAct] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, app, apm, gender, school_id, level_id, email, password, role_id) => {
    setIsLoading(true);

    axios.post(BASE_URL + '/register', {
      name,
      app,
      apm,
      gender,
      school_id,
      role_id,
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
        setUserInfo(userInfo);

        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };


  const questions = async (q1, q2, q3, q4, q5, q6, q7, q8, id) => {
    setIsLoading(true);
    //cambia el id por user_id
    let user_id = id;
    axios
      .post(BASE_URL + '/question', {
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        user_id,
      })
      .then(res => {
        let questions = res.data.message;
        setRes(true);
        AsyncStorage.setItem('questions', JSON.stringify(questions));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`questions error ${e}`);
        setRes(false);
        setIsLoading(false);
      });
  };

  const activities = (peopleone, peopletwo, sport, visor, scoreone, scoretwo) => {
    setIsLoading(true);
    axios
      .post(BASE_URL + '/activities', {
        peopleone,
        peopletwo,
        sport,
        visor,
        scoreone,
        scoretwo,
      }, {
        headers: { Authorization: `Bearer ${userInfo.access_token}` },
      })
      .then(res => {
        let act = res.data.message;
        console.log(act);
        setAct(act);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`activities error ${e}`);
        setAct(false);
        setIsLoading(false);
      });
  };


  const setResFalse = (res) => {
    setRes(res);
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('questions');
    setRes(false);
    setUserInfo({});
    setIsLoading(false);
    console.log('logout');
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let res = true;
      res = JSON.parse(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
        setRes(true);
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
        questions,
        res,
        logout,
        activities,
        act,
        setResFalse,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
