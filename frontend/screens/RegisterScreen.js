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

const RegisterScreen = ({
  navigation,
}) => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const registerUser =
    async () => {

      if (
        !name ||
        !email ||
        !password
      ) {

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
            "/auth/register",
            {
              name,
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
          "Registration Failed",
          "Try again"
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
          Create{"\n"}Account
        </Text>

        <Text style={styles.subtitle}>
          Start building your AI
          productivity workflow.
        </Text>

      </View>

      {/* CARD */}

      <View style={styles.card}>

        {/* NAME */}

        <View style={styles.inputBox}>

          <Ionicons
            name="person-outline"
            size={20}
            color="#64748B"
          />

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#64748B"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

        </View>

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
            onChangeText={
              setPassword
            }
          />

        </View>

        {/* BUTTON */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={registerUser}
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
                  Create Account
                </Text>

                <Ionicons
                  name="sparkles"
                  size={20}
                  color="white"
                />
              </>

            )}

          </LinearGradient>

        </TouchableOpacity>

        {/* LOGIN */}

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            navigation.navigate(
              "Login"
            )
          }
        >

          <Text
            style={
              styles.loginText
            }
          >
            Already have an account?
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default RegisterScreen;

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

    loginBtn: {
      alignItems: "center",
      marginTop: 26,
    },

    loginText: {
      color: "#94A3B8",
      fontSize: 15,
      fontWeight: "600",
    },

});