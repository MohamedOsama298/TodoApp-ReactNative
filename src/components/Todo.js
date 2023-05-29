import { useDispatch } from "react-redux";
import { updateTodoItemStatus } from "../Redux/Slices/TodoSlice";
import { Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../styles";

export default function Item({
  todo,
  activeTab,
  setModalVisible,
  setCurrentTodo,
}) {
  const dispatch = useDispatch();

  const settodosStatus = (item) => {
    dispatch(updateTodoItemStatus(item));
  };

  return (
    <>
      {(todo.status == activeTab || activeTab == "all") && (
        <View style={styles.item}>
          <View style={styles.item}>
            <TouchableOpacity
              style={[
                todo.status == "completed"
                  ? styles.submittedBtn
                  : styles.submitBtn,
              ]}
              onPress={() => settodosStatus(todo)}
            ></TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Details", { todo });
              }}
            >
              <Text
                style={todo.status == "to-do" ? styles.todo : styles.doneTodo}
              >
                {todo.title}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setCurrentTodo(todo);
              setModalVisible(true);
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
