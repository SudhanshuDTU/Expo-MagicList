import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { insertTask } from "../../db/database";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { groupId } = useLocalSearchParams();
  const router = useRouter();

  const addTask = () => {
    insertTask(groupId, title, description);
    router.back(); // Navigate back to the group screen
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={style.input}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={style.input}
        multiline={true} // Allow multiple lines for the description
        numberOfLines={4} // Show 4 lines of input
      />
      <TouchableOpacity style={style.button} onPress={addTask}>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff', 
    fontSize: 16,
  },
  button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28a745', 
    borderRadius: 5,
    marginTop: 10,
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
