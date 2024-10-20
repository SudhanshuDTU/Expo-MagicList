import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("todo.db");

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id INTEGER,
        title TEXT,
        description TEXT,
        completed INTEGER
      );`
    );
  });
};

export const insertGroup = (name) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO groups (name) VALUES (?)`,
      [name],
      (_, result) => console.log("Group inserted", result),
      (_, error) => console.error("Error inserting group", error)
    );
  });
};

export const fetchGroups = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM groups",
      [],
      (_, { rows: { _array } }) => {
        console.log("Fetched groups from database:", _array);
        return callback(_array); // Call the callback with the fetched groups
      },
      (_, error) => {
        console.error("Error fetching groups:", error);
       return callback([]); // Call the callback with an empty array in case of error
      }
    );
  });
};

export const insertTask = (groupId, title, description) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO tasks (group_id, title, description, completed) VALUES (?, ?, ?, 0)`,
      [groupId, title, description],
      (_, result) => console.log("Task inserted", result),
      (_, error) => console.error("Error inserting task", error)
    );
  });
};

export const fetchTasks = (groupId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM tasks WHERE group_id = ?",
      [groupId],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.error("Error fetching tasks", error)
    );
  });
};

export const markTaskComplete = (taskId, completed) => {
  db.transaction(tx => {
    tx.executeSql(
      "UPDATE tasks SET completed = ? WHERE id = ?",
      [completed, taskId],
      (_, result) => console.log("Task updated", result),
      (_, error) => console.error("Error updating task", error)
    );
  });
};

export const deleteTask = (taskId) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM tasks WHERE id = ?",
      [taskId],
      (_, result) => console.log("Task deleted", result),
      (_, error) => console.error("Error deleting task", error)
    );
  });
};

export const deleteGroup = (groupId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM groups WHERE id = ?",
      [groupId],
      (_, result) => {
        console.log(`Group with ID ${groupId} deleted successfully.`);
      },
      (tx, error) => {
        console.error("Error deleting group: ", error);
      }
    );
  });
};