import { View, Text, StyleSheet } from "react-native";

export default function TicketField({ label, value }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#45749C",
        marginBottom: 4,
    },

    value: {
        fontSize: 17,
        color: "#224E6B",
        fontWeight: "500",
    },
});