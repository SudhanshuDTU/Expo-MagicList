import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <View style={style.container}>
      <Text style={[style.title, task.completed && style.completed]}>
        {task.title} {task.completed ? "(Completed)" : "(Pending)"}
      </Text>
      <Text style={style.description}>{task.description}</Text>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={[style.button, task.completed ? style.pendingButton : style.completedButton]}
          onPress={onToggleComplete}
        >
          <Text style={style.buttonText}>
            {task.completed ? "Mark as Pending" : "Mark as Completed"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.deleteButton} onPress={onDelete}>
          <Text style={style.buttonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  completed: {
    textDecorationLine: 'line-through', 
    color: '#6c757d', 
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#28a745', 
  },
  pendingButton: {
    backgroundColor: '#ffc107', 
  },
  deleteButton: {
    backgroundColor: '#dc3545', 
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
  },
});
