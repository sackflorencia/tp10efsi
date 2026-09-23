import { View, StyleSheet } from "react-native";

import Form from "./components/Form";

export default function App() {
  function handleRegistration(data) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Form onSubmit={handleRegistration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});