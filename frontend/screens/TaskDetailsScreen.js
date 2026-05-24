import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
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

const TaskDetailsScreen = ({
  route,
  navigation,
}) => {

  const { task } =
    route.params;

  // DELETE TASK

  const deleteTask =
    async () => {

      try {

        await API.delete(
          `/tasks/${task._id}`
        );

        Alert.alert(
          "Deleted",
          "Task removed successfully"
        );

        navigation.navigate(
          "Home"
        );

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Failed to delete task"
        );
      }
    };

  // TOGGLE TASK STATUS

  const toggleComplete =
    async () => {

      try {

        await API.patch(
          `/tasks/${task._id}/toggle`
        );

        Alert.alert(
          "Updated",
          "Task status changed"
        );

        navigation.navigate(
          "Home"
        );

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Failed to update task"
        );
      }
    };

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
      />

      {/* BACKGROUND ORBS */}

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
              navigation.navigate(
                "Home"
              )
            }
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#F8FAFC"
            />

          </TouchableOpacity>

          <Text style={styles.small}>
            AI TASK DETAILS
          </Text>

        </View>

        {/* HERO CARD */}

        <LinearGradient
          colors={[
            "rgba(139,92,246,0.18)",
            "rgba(6,182,212,0.08)",
          ]}
          style={styles.heroCard}
        >

          <View
            style={styles.titleRow}
          >

            <Text
              style={styles.title}
            >
              {task.title}
            </Text>

            <View
              style={[
                styles.priorityDot,

                task.priority ===
                "HIGH"
                  ? {
                      backgroundColor:
                        "#EF4444",
                    }
                  : task.priority ===
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

          <Text
            style={
              styles.description
            }
          >
            {task.description}
          </Text>

          {/* STATS */}

          <View
            style={styles.statsRow}
          >

            <View
              style={styles.statBox}
            >

              <Text
                style={
                  styles.statValue
                }
              >
                {task.timeline}
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                Days
              </Text>

            </View>

            <View
              style={
                styles.statDivider
              }
            />

            <View
              style={styles.statBox}
            >

              <Text
                style={
                  styles.statValue
                }
              >
                {
                  task.subtasks
                    ?.length
                }
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                Subtasks
              </Text>

            </View>

          </View>

        </LinearGradient>

        {/* SUBTASKS */}

        <Text
          style={styles.sectionTitle}
        >
          AI Generated Steps
        </Text>

        {task.subtasks?.map(
          (subtask, index) => (

            <View
              key={index}
              style={
                styles.subtaskCard
              }
            >

              <View
                style={
                  styles.subtaskIndex
                }
              >

                <Text
                  style={
                    styles.indexText
                  }
                >
                  {index + 1}
                </Text>

              </View>

              <Text
                style={
                  styles.subtaskText
                }
              >
                {subtask}
              </Text>

            </View>

          )
        )}

        {/* TOOLS */}

        <Text
          style={styles.sectionTitle}
        >
          Recommended Tools
        </Text>

        <View style={styles.toolsRow}>

          {task.tools?.map(
            (tool, index) => (

              <View
                key={index}
                style={styles.toolTag}
              >

                <Text
                  style={
                    styles.toolText
                  }
                >
                  {tool}
                </Text>

              </View>

            )
          )}

        </View>

        {/* COMPLETE BUTTON */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toggleComplete}
        >

          <LinearGradient
            colors={
              task.completed
                ? [
                    "#EF4444",
                    "#DC2626",
                  ]
                : [
                    "#8B5CF6",
                    "#06B6D4",
                  ]
            }
            style={styles.actionBtn}
          >

            <Ionicons
              name={
                task.completed
                  ? "close-circle"
                  : "checkmark-circle"
              }
              size={22}
              color="white"
            />

            <Text
              style={
                styles.actionText
              }
            >
              {task.completed
                ? "Mark Pending"
                : "Mark Complete"}
            </Text>

          </LinearGradient>

        </TouchableOpacity>

        {/* DELETE BUTTON */}

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={deleteTask}
        >

          <Ionicons
            name="trash-outline"
            size={20}
            color="#EF4444"
          />

          <Text
            style={
              styles.deleteText
            }
          >
            Delete Task
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default TaskDetailsScreen;

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
      marginBottom: 30,
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

    heroCard: {
      borderRadius: 34,
      padding: 28,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.08)",
      marginBottom: 30,
    },

    titleRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    title: {
      color: "#F8FAFC",
      fontSize: 32,
      fontWeight: "900",
      flex: 1,
      marginRight: 12,
      letterSpacing: -1,
    },

    priorityDot: {
      width: 14,
      height: 14,
      borderRadius: 10,
    },

    description: {
      color: "#94A3B8",
      fontSize: 16,
      lineHeight: 28,
      marginTop: 18,
    },

    statsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 30,
    },

    statBox: {
      flex: 1,
    },

    statValue: {
      color: "#F8FAFC",
      fontSize: 30,
      fontWeight: "800",
    },

    statLabel: {
      color: "#64748B",
      marginTop: 6,
    },

    statDivider: {
      width: 1,
      height: 50,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    sectionTitle: {
      color: "#F8FAFC",
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 18,
      letterSpacing: -0.5,
    },

    subtaskCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "rgba(255,255,255,0.05)",
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.06)",
    },

    subtaskIndex: {
      width: 38,
      height: 38,
      borderRadius: 20,
      backgroundColor:
        "rgba(139,92,246,0.18)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },

    indexText: {
      color: "#8B5CF6",
      fontWeight: "700",
    },

    subtaskText: {
      color: "#CBD5E1",
      fontSize: 15,
      flex: 1,
      lineHeight: 24,
    },

    toolsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 30,
    },

    toolTag: {
      backgroundColor:
        "rgba(6,182,212,0.12)",
      borderRadius: 18,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginRight: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor:
        "rgba(6,182,212,0.15)",
    },

    toolText: {
      color: "#67E8F9",
      fontWeight: "600",
    },

    actionBtn: {
      height: 64,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 18,
    },

    actionText: {
      color: "white",
      fontSize: 17,
      fontWeight: "700",
      marginLeft: 10,
    },

    deleteBtn: {
      height: 60,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor:
        "rgba(239,68,68,0.08)",
      marginBottom: 80,
      borderWidth: 1,
      borderColor:
        "rgba(239,68,68,0.12)",
    },

    deleteText: {
      color: "#EF4444",
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 10,
    },

});