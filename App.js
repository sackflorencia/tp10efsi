import { useState, useEffect } from "react";
import Form from "./components/Form";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
import TicketConfirmation from "./components/TicketConfirmation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ImageBackground } from "react-native";

export default function App() {
  const [registrationData, setRegistrationData] = useState(null);
  const [lastEmail, setLastEmail] = useState("");

  useEffect(() => {
    async function loadLastEmail() {
      const savedEmail = await AsyncStorage.getItem("lastEmail");

      if (savedEmail) {
        setLastEmail(savedEmail);
      }
    }

    loadLastEmail();
  }, []);

  async function handleFormSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await AsyncStorage.setItem("lastEmail", data.email);

    setRegistrationData(data);
  }

  function handleNewRegistration() {
    setRegistrationData(null);
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("./assets/wallpaper.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          {registrationData ? (
            <TicketConfirmation
              data={registrationData}
              onNewRegistration={handleNewRegistration}
            />
          ) : (
            <Form
              onSubmit={handleFormSubmit}
              lastEmail={lastEmail}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
});