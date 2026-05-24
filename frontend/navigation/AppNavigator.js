import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  View,
  ActivityIndicator,
} from "react-native";

import LoginScreen
from "../screens/LoginScreen";

import RegisterScreen
from "../screens/RegisterScreen";

import HomeScreen
from "../screens/HomeScreen";

import AddTaskScreen
from "../screens/AddTaskScreen";

import TaskDetailsScreen
from "../screens/TaskDetailsScreen";

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {

  const [loading, setLoading] =
    useState(true);

  const [isLoggedIn,
    setIsLoggedIn] =
    useState(false);

  // CHECK TOKEN
  const checkLogin = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      setIsLoggedIn(!!token);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    checkLogin();

    const interval =
      setInterval(() => {

        checkLogin();

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ActivityIndicator
          size="large"
        />

      </View>
    );
  }

  return (

    <NavigationContainer>

      <Stack.Navigator>

        {!isLoggedIn ? (

          <>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={
                RegisterScreen
              }
              options={{
                headerShown: false,
              }}
            />

          </>

        ) : (

          <>

            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="AddTask"
              component={
                AddTaskScreen
              }
            />

            <Stack.Screen
              name="TaskDetails"
              component={
                TaskDetailsScreen
              }
            />

          </>

        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}