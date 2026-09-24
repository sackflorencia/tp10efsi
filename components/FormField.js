import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#224E6B",
        marginBottom: 7,
    },

    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#45749C",
        borderRadius: 10,
        padding: 13,
        fontSize: 16,
        backgroundColor: "rgba(225, 255, 255, 0.70)",
        color: "#224E6B",
    },

    error: {
        marginTop: 5,
        color: "#B23A48",
        fontSize: 13,
        fontWeight: "500",
    },
});