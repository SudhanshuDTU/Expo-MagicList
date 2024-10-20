import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View,Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchTasks, markTaskComplete, deleteTask } from "../db/database";
import TaskItem from "../components/TaskItem";

export default function GroupTasksScreen() {
  const { groupId } = useLocalSearchParams();
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTasks(groupId, (data) => setTasks(data));
  }, [groupId]);

  const toggleTaskCompletion = (taskId, completed) => {
    markTaskComplete(taskId, completed ? 0 : 1);
    fetchTasks(groupId, (data) => setTasks(data)); // Refresh task list
  };

  

  const removeTask = (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this Task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteTask(taskId);
            fetchTasks(groupId, (data) => setTasks(data));
          },
        },
      ]
    );
  };





  

  return (
    <View style={style.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={() => toggleTaskCompletion(item.id, item.completed)}
            onDelete={() => removeTask(item.id)}
          />
        )}
      />

      <TouchableOpacity style={style.button} onPress={() => router.push(`/${groupId}/add-task`)}>
        <Text style={style.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  button: {
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    backgroundColor: '#28a745', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
