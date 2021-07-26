import React from "react";
import axios from "axios";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Headers from "../component/Header";

export default function DetailTodo(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [changeStatus, setChangeStatus] = React.useState("");
  const id = props.route.params.id;
  const name = props.route.params.name;
  const description = props.route.params.description;
  const status = props.route.params.status;

  const updateStatus = async () => {
    try {
      setIsLoading(true);
      const data = {
        status: changeStatus,
      };
      if (!data.status) {
        setIsError(true);
        setError("Please fill in all the fields");
      } else {
        if (data.status !== "Done") {
          setIsError(true);
          setError("Status Wajib Done atau Progress");
          console.log("Data", data.status);
        } else {
          const response = await axios.patch(
            `http://192.168.100.30:4000/api/v1/todo/update/${id}`,
            data
          );
          console.log(response.data);
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
  React.useEffect(() => {
    updateStatus();
  }, [id]);

  return (
    <View style={styles.container}>
      <Headers title='Title' />
      <Text style={{ fontSize: 25, marginBottom: 12 }}>{name}</Text>
      <Headers title='Description' />
      <Text style={{ fontSize: 25, marginBottom: 12 }}>{description}</Text>
      <Headers title='Status' />
      <Text style={{ fontSize: 25, marginBottom: 12 }}>{status}</Text>
      {status === "Progress" && (
        <View style={{ marginTop: 10 }}>
          <Headers title='Change Status' />
          <TextInput
            style={{
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              height: 30,
              width: 350,
              padding: 6,
            }}
            value={changeStatus}
            onChangeText={(text) => setChangeStatus(text)}
          />
          {isError && (
            <View>
              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
          )}
          <TouchableOpacity style={styles.btnSave} onPress={updateStatus}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
