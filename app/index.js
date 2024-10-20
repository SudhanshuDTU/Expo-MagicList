import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { createTable, fetchGroups, insertGroup, deleteGroup } from "../db/database"; // Import deleteGroup
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert ,Image} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function HomeScreen() {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getGroups = () => {
      fetchGroups((fetchedGroups) => {
        console.log("Fetched groups in useEffect:", fetchedGroups);
        setGroups(fetchedGroups);
      });
    };

    getGroups();
  }, []);

  const addGroup = async () => {
    if (!groupName) return;
    await insertGroup(groupName);
    console.log(`Group inserted: ${groupName}`);
    setGroupName("");
    fetchGroups((fetchedGroups) => {
      setGroups(fetchedGroups);
      console.log("Fetched groups after inserting:", fetchedGroups);
    });
  };

  const removeGroup = (groupId) => {
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteGroup(groupId);
            fetchGroups((fetchedGroups) => {
              setGroups(fetchedGroups);
            });
          },
        },
      ]
    );
  };

  return (
    <View>
      <Image
        source={require('../assets/logo-index.png')}
        style={style.logo}
      />
      <TextInput
        style={style.input}
        placeholderTextColor={'#1e2124'}
        placeholder="New Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <TouchableOpacity style={style.button} onPress={addGroup}>
        <Text style={style.buttonText}>Add Group</Text>
      </TouchableOpacity>
      <Text style={style.myGroupText}>My Groups:</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item,index }) => (
          <View style={style.groupItem}>
            <Text style={style.groupText} onPress={() => router.push(`/${item.id}`)}>
              {`${index + 1}. ${item.name}`}
            </Text>
            <TouchableOpacity style={style.deleteButton} onPress={() => removeGroup(item.id)}>
            <FontAwesome5 name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    margin: 10,
    fontSize: 40,
    backgroundColor: '#186fc2',
    borderRadius: 10,
  },
  button: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  myGroupText: {
    paddingHorizontal: 10,
    fontWeight: '700',
    color: '#570a23',
    marginTop: 30,
    fontSize: 20,
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo:{
    marginTop: '5',
    marginHorizontal: 'auto',
    width: '60%',
    height: 180,
    resizeMode: 'contain', 
    margin: 20,
  }
});
