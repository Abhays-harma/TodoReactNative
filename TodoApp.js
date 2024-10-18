import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, Modal, Pressable, Keyboard, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('todoApp.db');

const TodoApp = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Create the groups and tasks tables if they don't exist
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
          CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, title TEXT, description TEXT, completed BOOLEAN);
        `);
        loadGroups(); // Load groups from the database on startup
      } catch (error) {
        Alert.alert('Database Error', 'Failed to initialize database: ' + error.message);
      }
    };

    initializeDatabase();
  }, []);

  // Load groups from the database
  const loadGroups = async () => {
    try {
      const groupsData = await db.getAllAsync('SELECT * FROM groups;');
      const enrichedGroups = groupsData.map(group => ({ ...group, tasks: [] }));
      setGroups(enrichedGroups);
      enrichedGroups.forEach(group => {
        loadTasksForGroup(group.id);
      });
    } catch (error) {
      Alert.alert('Database Error', 'Failed to load groups: ' + error.message);
    }
  };

  // Load tasks for a specific group
  const loadTasksForGroup = async (groupId) => {
    try {
      const tasks = await db.getAllAsync('SELECT * FROM tasks WHERE group_id = ?;', [groupId]);
      setGroups(prevGroups => prevGroups.map(group =>
        group.id === groupId ? { ...group, tasks } : group
      ));
    } catch (error) {
      Alert.alert('Database Error', 'Failed to load tasks for the group: ' + error.message);
    }
  };

  // Add a new group
  const handleAddGroup = async () => {
    if (groupName.trim()) {
      try {
        const result = await db.runAsync('INSERT INTO groups (name) VALUES (?);', [groupName]);
        const newGroup = { id: result.lastInsertRowId, name: groupName, tasks: [] };
        setGroups([...groups, newGroup]);
        setGroupName('');
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert('Database Error', 'Failed to add group: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Group name cannot be empty.');
    }
  };

  // Delete a group and its tasks
  const deleteGroup = async (groupId) => {
    try {
      await db.runAsync('DELETE FROM groups WHERE id = ?;', [groupId]);
      await db.runAsync('DELETE FROM tasks WHERE group_id = ?;', [groupId]);
      loadGroups(); // Reload groups after deletion
    } catch (error) {
      Alert.alert('Database Error', 'Failed to delete group: ' + error.message);
    }
  };

  // Add a new task to the selected group
  const handleAddTask = async () => {
    if (taskTitle.trim()) {
      try {
        const result = await db.runAsync('INSERT INTO tasks (group_id, title, description, completed) VALUES (?, ?, ?, ?);',
          [selectedGroup.id, taskTitle, taskDescription, false]
        );
        const newTask = { id: result.lastInsertRowId, title: taskTitle, description: taskDescription, completed: false };
        setGroups(prevGroups => prevGroups.map(group =>
          group.id === selectedGroup.id ? { ...group, tasks: [...group.tasks, newTask] } : group
        ));
        setTaskTitle('');
        setTaskDescription('');
        setIsModalVisible(false);
      } catch (error) {
        Alert.alert('Database Error', 'Failed to add task: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Task title cannot be empty.');
    }
  };

  // Edit an existing task
  const handleEditTask = async () => {
    if (taskTitle.trim()) {
      try {
        await db.runAsync('UPDATE tasks SET title = ?, description = ? WHERE id = ?;', [taskTitle, taskDescription, selectedTask.id]);
        loadTasksForGroup(selectedGroup.id); // Reload tasks for the group after update
        setTaskTitle('');
        setTaskDescription('');
        setIsEditModalVisible(false);
      } catch (error) {
        Alert.alert('Database Error', 'Failed to edit task: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Task title cannot be empty.');
    }
  };

  // Toggle task completion status
  const toggleTaskStatus = async (group, taskId) => {
    try {
      const task = group.tasks.find(t => t.id === taskId);
      const newStatus = !task.completed;
      await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?;', [newStatus, taskId]);
      loadTasksForGroup(group.id); // Reload tasks for the group after update
    } catch (error) {
      Alert.alert('Database Error', 'Failed to toggle task status: ' + error.message);
    }
  };

  // Delete a task
  const deleteTask = async (group, taskId) => {
    try {
      await db.runAsync('DELETE FROM tasks WHERE id = ?;', [taskId]);
      loadTasksForGroup(group.id); // Reload tasks after deletion
    } catch (error) {
      Alert.alert('Database Error', 'Failed to delete task: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Group Creation */}
      <View style={styles.groupInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter group name"
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
        />
        <Pressable style={styles.addButton} onPress={handleAddGroup}>
          <Text style={styles.addButtonText}>Add Group</Text>
        </Pressable>
      </View>

      {/* Group List */}
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}>{item.name}</Text>
              <Pressable style={styles.deleteGroupButton} onPress={() => deleteGroup(item.id)}>
                <Text style={styles.deleteGroupButtonText}>Delete</Text>
              </Pressable>
            </View>

            {/* Task List for Group */}
            <FlatList
              data={item.tasks}
              keyExtractor={(task) => task.id.toString()}
              renderItem={({ item: task }) => (
                <TouchableOpacity style={task.completed ? styles.taskCompleted : styles.task} onPress={() => toggleTaskStatus(item, task.id)}>
                  <Text style={task.completed ? styles.taskTitleCompleted : styles.taskTitle}>
                    {task.title}
                  </Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                  <View style={styles.taskActions}>
                    <Pressable style={styles.editButton} onPress={() => {
                      setSelectedTask(task);
                      setTaskTitle(task.title);
                      setTaskDescription(task.description);
                      setIsEditModalVisible(true);
                    }}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </Pressable>
                    <Pressable style={styles.deleteButton} onPress={() => deleteTask(item, task.id)}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* Add Task Button */}
            <Pressable
              style={styles.addTaskButton}
              onPress={() => {
                setSelectedGroup(item);
                setIsModalVisible(true);
              }}
            >
              <Text style={styles.addTaskButtonText}>Add Task</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Modal for Adding Task */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Task Title"
              placeholderTextColor="#aaa"
              value={taskTitle}
              onChangeText={(text) => setTaskTitle(text)}
            />
            <TextInput
              style={[styles.modalInput, styles.textArea]}
              placeholder="Task Description"
              placeholderTextColor="#aaa"
              value={taskDescription}
              onChangeText={(text) => setTaskDescription(text)}
              multiline={true}
              numberOfLines={4}
            />

            <Pressable style={styles.addButtonModal} onPress={handleAddTask}>
              <Text style={styles.addButtonTextModal}>Add Task</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for Editing Task */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Task Title"
              placeholderTextColor="#aaa"
              value={taskTitle}
              onChangeText={(text) => setTaskTitle(text)}
            />
            <TextInput
              style={[styles.modalInput, styles.textArea]}
              placeholder="Task Description"
              placeholderTextColor="#aaa"
              value={taskDescription}
              onChangeText={(text) => setTaskDescription(text)}
              multiline={true}
              numberOfLines={4}
            />

            <Pressable style={styles.addButtonModal} onPress={handleEditTask}>
              <Text style={styles.addButtonTextModal}>Save Changes</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  groupInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  groupContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteGroupButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deleteGroupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  task: {
    backgroundColor: '#e6e6e6',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  taskCompleted: {
    backgroundColor: '#d4edda',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTitleCompleted: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 4,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addTaskButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  addTaskButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButtonModal: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButtonTextModal: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoApp;

