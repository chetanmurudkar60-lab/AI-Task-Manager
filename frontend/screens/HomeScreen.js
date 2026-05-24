import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
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

import {
  useFocusEffect,
} from "@react-navigation/native";

import API from "../services/api";

const { width } =
  Dimensions.get("window");

const HomeScreen = ({
  navigation,
}) => {

  const [tasks, setTasks] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LOAD USER
  useEffect(() => {

    loadUser();

  }, []);

  const loadUser = async () => {

    const userData =
      await AsyncStorage.getItem(
        "user"
      );

    if (userData) {

      setUser(
        JSON.parse(userData)
      );
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      setLoading(true);

      const response =
        await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {

      fetchTasks();

    }, [])
  );

  // LOGOUT
  const logout = async () => {

    await AsyncStorage.clear();

    Alert.alert(
      "Logged Out"
    );
  };

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const productivity =
    tasks.length === 0
      ? 0
      : Math.round(
          (
            completedTasks /
            tasks.length
          ) * 100
        );

  // TASK CARD
  const renderTask = ({
    item,
  }) => (

    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.taskCard}
      onPress={() =>
        navigation.navigate(
          "TaskDetails",
          { task: item }
        )
      }
    >

      {/* GLOW LINE */}

      <LinearGradient
        colors={[
          "#8B5CF6",
          "#06B6D4",
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        style={styles.cardGlow}
      />

      {/* TOP */}

      <View
        style={styles.cardHeader}
      >

        <Text
          numberOfLines={1}
          style={styles.taskTitle}
        >
          {item.title}
        </Text>

        <View
          style={[
            styles.priorityDot,

            item.priority ===
            "HIGH"
              ? {
                  backgroundColor:
                    "#EF4444",
                }
              : item.priority ===
                "MEDIUM"
              ? {
                  backgroundColor:
                    "#F59E0B",
                }
              : {
                  backgroundColor:
                    "#22C55E",
                },
          ]}
        />

      </View>

      {/* DESCRIPTION */}

      <Text
        numberOfLines={2}
        style={
          styles.taskDescription
        }
      >
        {item.description}
      </Text>

      {/* FOOTER */}

      <View
        style={styles.cardFooter}
      >

        <View
          style={styles.footerLeft}
        >

          <Ionicons
            name="time-outline"
            size={15}
            color="#64748B"
          />

          <Text
            style={styles.footerText}
          >
            {item.timeline} days
          </Text>

        </View>

        {item.completed && (

          <View
            style={
              styles.completedBadge
            }
          >

            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#22C55E"
            />

            <Text
              style={
                styles.completedText
              }
            >
              Complete
            </Text>

          </View>

        )}

      </View>

    </TouchableOpacity>
  );

  if (loading) {

    return (

      <View
        style={styles.loader}
      >

        <ActivityIndicator
          size="large"
          color="#8B5CF6"
        />

      </View>
    );
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
      />

      {/* BACKGROUND ORBS */}

      <View
        style={styles.orbPurple}
      />

      <View
        style={styles.orbBlue}
      />

      {/* HEADER */}

      <View style={styles.header}>

        <View>

          <Text
            style={styles.greeting}
          >
            Good Evening
          </Text>

          <Text
            style={styles.username}
          >
            {user?.name}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >

          <Ionicons
            name="log-out-outline"
            size={22}
            color="#F8FAFC"
          />

        </TouchableOpacity>

      </View>

      {/* AI INSIGHT PANEL */}

      <LinearGradient
        colors={[
          "rgba(139,92,246,0.18)",
          "rgba(6,182,212,0.08)",
        ]}
        style={styles.heroCard}
      >

        <Text
          style={styles.heroTitle}
        >
          AI Productivity
        </Text>

        <Text
          style={styles.heroScore}
        >
          {productivity}%
        </Text>

        <Text
          style={styles.heroSub}
        >
          Your workflow efficiency
          is improving rapidly.
        </Text>

        <View
          style={styles.heroFooter}
        >

          <View
            style={styles.metricBox}
          >

            <Text
              style={
                styles.metricValue
              }
            >
              {tasks.length}
            </Text>

            <Text
              style={
                styles.metricLabel
              }
            >
              Total
            </Text>

          </View>

          <View
            style={styles.metricDivider}
          />

          <View
            style={styles.metricBox}
          >

            <Text
              style={
                styles.metricValue
              }
            >
              {completedTasks}
            </Text>

            <Text
              style={
                styles.metricLabel
              }
            >
              Done
            </Text>

          </View>

        </View>

      </LinearGradient>

      {/* SECTION */}

      <View
        style={styles.sectionHeader}
      >

        <Text
          style={styles.sectionTitle}
        >
          Active Tasks
        </Text>

      </View>

      {/* TASKS */}

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) =>
          item._id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      />

      {/* FLOATING BUTTON */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() =>
          navigation.navigate(
            "AddTask"
          )
        }
      >

        <LinearGradient
          colors={[
            "#8B5CF6",
            "#06B6D4",
          ]}
          style={styles.fabGradient}
        >

          <Ionicons
            name="add"
            size={34}
            color="white"
          />

        </LinearGradient>

      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#050816",
      paddingHorizontal: 22,
    },

    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#050816",
    },

    // BACKGROUND ORBS

    orbPurple: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 200,
      backgroundColor:
        "rgba(124,58,237,0.18)",
      top: -80,
      right: -70,
    },

    orbBlue: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 200,
      backgroundColor:
        "rgba(6,182,212,0.12)",
      bottom: 120,
      left: -80,
    },

    // HEADER

    header: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginTop: 12,
      marginBottom: 28,
    },

    greeting: {
      color: "#94A3B8",
      fontSize: 16,
      letterSpacing: 0.5,
    },

    username: {
      color: "#F8FAFC",
      fontSize: 34,
      fontWeight: "800",
      marginTop: 5,
      letterSpacing: -1,
    },

    logoutButton: {
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
    },

    // HERO

    heroCard: {
      borderRadius: 34,
      padding: 28,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.08)",
      overflow: "hidden",
      marginBottom: 34,
    },

    heroTitle: {
      color: "#CBD5E1",
      fontSize: 16,
      letterSpacing: 0.5,
    },

    heroScore: {
      color: "#F8FAFC",
      fontSize: 72,
      fontWeight: "900",
      marginTop: 8,
      letterSpacing: -3,
    },

    heroSub: {
      color: "#94A3B8",
      fontSize: 15,
      lineHeight: 24,
      marginTop: 4,
      width: "85%",
    },

    heroFooter: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 28,
    },

    metricBox: {
      flex: 1,
    },

    metricValue: {
      color: "#F8FAFC",
      fontSize: 28,
      fontWeight: "700",
    },

    metricLabel: {
      color: "#64748B",
      marginTop: 4,
      fontSize: 14,
    },

    metricDivider: {
      width: 1,
      height: 42,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    // SECTION

    sectionHeader: {
      marginBottom: 18,
    },

    sectionTitle: {
      color: "#F8FAFC",
      fontSize: 24,
      fontWeight: "700",
      letterSpacing: -0.5,
    },

    // TASK CARD

    taskCard: {
      backgroundColor:
        "rgba(255,255,255,0.05)",
      borderRadius: 28,
      padding: 22,
      marginBottom: 18,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.06)",
      overflow: "hidden",
    },

    cardGlow: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 4,
      width: "100%",
    },

    cardHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    taskTitle: {
      color: "#F8FAFC",
      fontSize: 20,
      fontWeight: "700",
      flex: 1,
      marginRight: 10,
      letterSpacing: -0.5,
    },

    priorityDot: {
      width: 12,
      height: 12,
      borderRadius: 10,
    },

    taskDescription: {
      color: "#94A3B8",
      fontSize: 15,
      lineHeight: 24,
      marginTop: 16,
    },

    cardFooter: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginTop: 22,
    },

    footerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    footerText: {
      color: "#64748B",
      marginLeft: 6,
      fontSize: 14,
    },

    completedBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "rgba(34,197,94,0.12)",
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 20,
    },

    completedText: {
      color: "#22C55E",
      marginLeft: 6,
      fontWeight: "600",
      fontSize: 13,
    },

    // FAB

    fab: {
      position: "absolute",
      bottom: 34,
      right: 26,
    },

    fabGradient: {
      width: 76,
      height: 76,
      borderRadius: 38,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#8B5CF6",
      shadowOpacity: 0.4,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      elevation: 12,
    },

});