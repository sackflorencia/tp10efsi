import { View, StyleSheet } from "react-native";

import Form from "./components/Form";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

export default function App() {
  function handleRegistration(data) {
    console.log(data);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Form onSubmit={handleRegistration} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});