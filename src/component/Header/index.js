import React from "react";
import { View, Text } from "react-native";

export default function Headers(props) {
  return (
    <View>
      <Text style={{ fontSize: 16 }}>{props.title}</Text>
    </View>
  );
}
