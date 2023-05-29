import React, { useEffect } from "react";
import { styles } from "../styles";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  LogBox,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo as addTodoReducer,
  deleteTodo as deleteTodoReducer,
  getTodos,
  getTodosItems,
} from "../Redux/Slices/TodoSlice";
import {} from "../Redux/Slices/TodoSlice";
import Item from "../components/Todo";
let initial = true;
const Home = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [text, setText] = useState("");
  const [currentTodo, setCurrentTodo] = useState({});
  const todos = useSelector(getTodosItems);

  const addTodo = () => {
    dispatch(addTodoReducer({ title: text, id: Date.now(), status: "to-do" }));
    setText("");
  };

  const deleteTodo = (todo) => {
    dispatch(deleteTodoReducer(todo));
  };

  const saveToLocalStorage = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (e) {}
  };

  const filterTodos = (cond) => {
    setActiveTab(cond);
  };

  useEffect(() => {
    if (initial) {
      dispatch(getTodos());
      initial = false;
    } else {
      saveToLocalStorage();
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          presentationStyle="overFullScreen"
        >
          <View style={{ ...styles.centeredView, padding: 5 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
            <View style={styles.modalView}>
              <Text style={{ ...styles.modalText, padding: 5 }}>
                Sure Delete Todo?
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                deleteTodo(currentTodo);
                setModalVisible(false);
              }}
            >
              <Text>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>No</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      {/* inputGroup */}
      <Text style={{ ...styles.text, margin: "20" }}>TODO List</Text>
      <TextInput
        style={styles.input}
        placeholder="What Needs To Be DONE.."
        onSubmitEditing={() => addTodo()}
        value={text}
        onChangeText={(text) => setText(text)}
      />

      {/* todoList */}
      <View style={{ width: "90%" }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Item
              key={item.id.toString()}
              todo={item}
              activeTab={activeTab}
              setModalVisible={setModalVisible}
              setCurrentTodo={setCurrentTodo}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* dividerLines */}
      <View style={styles.dividerLine}></View>
      <View style={styles.dividerLine}></View>
      <View style={styles.dividerLine}></View>

      {/* filterContainer */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            activeTab == "all" ? styles.activeFilterBtn : styles.filterBtn,
          ]}
          onPress={() => filterTodos("all")}
        >
          <Text
            style={[
              activeTab == "all" ? styles.activeFilterText : styles.filterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            activeTab == "to-do" ? styles.activeFilterBtn : styles.filterBtn,
          ]}
          onPress={() => filterTodos("to-do")}
        >
          <Text
            style={[
              activeTab == "to-do"
                ? styles.activeFilterText
                : styles.filterText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            activeTab == "completed"
              ? styles.activeFilterBtn
              : styles.filterBtn,
          ]}
          onPress={() => filterTodos("completed")}
        >
          <Text
            style={[
              activeTab == "completed"
                ? styles.activeFilterText
                : styles.filterText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
