import axios from "axios";
import React from "react";
import { Text } from "react-native";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Headers from "../component/Header";

export default function AddTodo(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [description, setDescription] = React.useState("");

  const addTodo = async () => {
    try {
      setIsLoading(true);
      const data = {
        name: name,
        status: status,
        description: description,
      };
      if (!data.name || !data.status || !data.description) {
        setIsError(true);
        setError("Please fill in all the fields");
        console.log("Data", data);
      } else {
        if (data.status !== "Done" && data.status !== "Progress") {
          setIsError(true);
          setError("Status Wajib Done atau Progress");
          console.log("Data", data.status);
        } else {
          const response = await axios.post(
            "http://192.168.100.30:4000/api/v1/todo",
            data
          );
          setError("Berhasil");
          setIsLoading(false);
          props.navigation.navigate("Home");
        }
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Headers title='Title' />
      <TextInput
        style={{
          borderWidth: 0.5,
          marginTop: 10,
          marginBottom: 10,
          height: 40,
          width: 350,
          padding: 6,
          borderRadius: 5,
        }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Headers title='Description' />
      <TextInput
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderWidth: 0.5,
          height: 100,
          width: 350,
          padding: 6,
          borderRadius: 5,
        }}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Headers title='Status' />
      <TextInput
        style={{
          marginTop: 10,
          borderRadius: 5,
          borderWidth: 0.5,
          height: 30,
          width: 350,
          padding: 6,
        }}
        value={status}
        onChangeText={(text) => setStatus(text)}
      />
      {isError && (
        <View>{error && <Text style={{ color: "red" }}>{error}</Text>}</View>
      )}
      <TouchableOpacity style={styles.btnSave} onPress={addTodo}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnSave: {
    width: 100,
    backgroundColor: "#10bbeb",
    marginTop: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
  },
});
