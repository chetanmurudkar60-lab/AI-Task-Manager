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
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  Ionicons,
} from "@expo/vector-icons";

import API from "../services/api";

const AddTaskScreen = ({
  navigation,
}) => {

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  // CREATE TASK

  const createTask =
    async () => {

      if (
        !title ||
        !description
      ) {

        Alert.alert(
          "Error",
          "Fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        await API.post(
          "/tasks",
          {
            title,
            description,
          }
        );

        Alert.alert(
          "Success",
          "AI task generated"
        );

        navigation.goBack();

      } catch (error) {

        Alert.alert(
          "Error",
          "Failed to create task"
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

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            style={
              styles.backButton
            }
            onPress={() =>
              navigation.goBack()
            }
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#F8FAFC"
            />

          </TouchableOpacity>

          <Text style={styles.small}>
            AI TASK CREATOR
          </Text>

        </View>

        {/* HERO */}

        <Text style={styles.title}>
          Create{"\n"}New Task
        </Text>

        <Text style={styles.subtitle}>
          Describe your idea and let
          AI generate a structured
          workflow automatically.
        </Text>

        {/* MAIN CARD */}

        <LinearGradient
          colors={[
            "rgba(139,92,246,0.14)",
            "rgba(6,182,212,0.06)",
          ]}
          style={styles.card}
        >

          {/* TITLE */}

          <Text
            style={styles.label}
          >
            Task Title
          </Text>

          <View
            style={styles.inputBox}
          >

            <Ionicons
              name="sparkles-outline"
              size={20}
              color="#64748B"
            />

            <TextInput
              placeholder="Build AI SaaS..."
              placeholderTextColor="#64748B"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

          </View>

          {/* DESCRIPTION */}

          <Text
            style={[
              styles.label,
              {
                marginTop: 24,
              },
            ]}
          >
            Description
          </Text>

          <View
            style={
              styles.textAreaBox
            }
          >

            <TextInput
              placeholder="Describe your project, workflow or goal..."
              placeholderTextColor="#64748B"
              multiline
              style={
                styles.textArea
              }
              value={description}
              onChangeText={
                setDescription
              }
            />

          </View>

          {/* BUTTON */}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={createTask}
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
                  <Ionicons
                    name="sparkles"
                    size={22}
                    color="white"
                  />

                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Generate AI Task
                  </Text>
                </>

              )}

            </LinearGradient>

          </TouchableOpacity>

        </LinearGradient>

      </ScrollView>

    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#050816",
      paddingHorizontal: 22,
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

    header: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
      marginBottom: 28,
    },

    backButton: {
      width: 52,
      height: 52,
      borderRadius: 18,
      backgroundColor:
        "rgba(255,255,255,0.06)",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.08)",
      marginRight: 16,
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
      letterSpacing: -2,
    },

    subtitle: {
      color: "#94A3B8",
      fontSize: 16,
      lineHeight: 28,
      marginTop: 20,
      width: "92%",
      marginBottom: 34,
    },

    card: {
      borderRadius: 34,
      padding: 26,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.08)",
      marginBottom: 80,
    },

    label: {
      color: "#CBD5E1",
      fontSize: 15,
      marginBottom: 14,
      fontWeight: "600",
    },

    inputBox: {
      height: 64,
      backgroundColor:
        "rgba(255,255,255,0.05)",
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 18,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.05)",
    },

    input: {
      flex: 1,
      color: "#F8FAFC",
      fontSize: 16,
      marginLeft: 12,
    },

    textAreaBox: {
      backgroundColor:
        "rgba(255,255,255,0.05)",
      borderRadius: 24,
      padding: 18,
      minHeight: 180,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.05)",
    },

    textArea: {
      color: "#F8FAFC",
      fontSize: 16,
      lineHeight: 28,
      textAlignVertical: "top",
    },

    button: {
      height: 68,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 32,
      shadowColor: "#8B5CF6",
      shadowOpacity: 0.35,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      elevation: 10,
    },

    buttonText: {
      color: "white",
      fontSize: 17,
      fontWeight: "700",
      marginLeft: 10,
    },

});