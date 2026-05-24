import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  Ionicons,
} from "@expo/vector-icons";

import API from "../services/api";

const LoginScreen = ({
  navigation,
}) => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loginUser = async () => {

    if (!email || !password) {

      Alert.alert(
        "Error",
        "Fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      await AsyncStorage.setItem(
        "token",
        response.data.token
      );

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

    } catch (error) {

      Alert.alert(
        "Login Failed",
        "Invalid credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
      />

      {/* ORBS */}

      <View style={styles.orb1} />

      <View style={styles.orb2} />

      {/* HEADER */}

      <View style={styles.top}>

        <Text style={styles.small}>
          AI TASK MANAGER
        </Text>

        <Text style={styles.title}>
          Welcome{"\n"}Back
        </Text>

        <Text style={styles.subtitle}>
          Enter your credentials
          to continue your AI
          workflow.
        </Text>

      </View>

      {/* CARD */}

      <View style={styles.card}>

        {/* EMAIL */}

        <View style={styles.inputBox}>

          <Ionicons
            name="mail-outline"
            size={20}
            color="#64748B"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#64748B"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

        </View>

        {/* PASSWORD */}

        <View style={styles.inputBox}>

          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#64748B"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#64748B"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

        </View>

        {/* BUTTON */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={loginUser}
          disabled={loading}
        >

          <LinearGradient
            colors={[
              "#8B5CF6",
              "#06B6D4",
            ]}
            style={styles.button}
          >

            {loading ? (

              <ActivityIndicator
                color="white"
              />

            ) : (

              <>
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Continue
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="white"
                />
              </>

            )}

          </LinearGradient>

        </TouchableOpacity>

        {/* REGISTER */}

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() =>
            navigation.navigate(
              "Register"
            )
          }
        >

          <Text
            style={
              styles.registerText
            }
          >
            Create Account
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default LoginScreen;

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#050816",
      paddingHorizontal: 24,
    },

    orb1: {
      position: "absolute",
      width: 240,
      height: 240,
      borderRadius: 200,
      backgroundColor:
        "rgba(139,92,246,0.16)",
      top: -60,
      right: -60,
    },

    orb2: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 200,
      backgroundColor:
        "rgba(6,182,212,0.12)",
      bottom: 80,
      left: -80,
    },

    top: {
      marginTop: 70,
    },

    small: {
      color: "#64748B",
      fontSize: 13,
      letterSpacing: 2,
      fontWeight: "600",
    },

    title: {
      color: "#F8FAFC",
      fontSize: 52,
      fontWeight: "900",
      lineHeight: 56,
      marginTop: 18,
      letterSpacing: -2,
    },

    subtitle: {
      color: "#94A3B8",
      fontSize: 16,
      lineHeight: 26,
      marginTop: 18,
      width: "90%",
    },

    card: {
      marginTop: 55,
      backgroundColor:
        "rgba(255,255,255,0.05)",
      borderRadius: 32,
      padding: 24,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.08)",
    },

    inputBox: {
      height: 62,
      backgroundColor:
        "rgba(255,255,255,0.04)",
      borderRadius: 18,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 18,
      marginBottom: 18,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.05)",
    },

    input: {
      flex: 1,
      color: "#F8FAFC",
      marginLeft: 12,
      fontSize: 16,
    },

    button: {
      height: 62,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },

    buttonText: {
      color: "white",
      fontSize: 17,
      fontWeight: "700",
      marginRight: 10,
    },

    registerBtn: {
      alignItems: "center",
      marginTop: 26,
    },

    registerText: {
      color: "#94A3B8",
      fontSize: 15,
      fontWeight: "600",
    },

});