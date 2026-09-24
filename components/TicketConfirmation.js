import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import TicketField from "./TicketField";

export default function TicketConfirmation({
    data,
    onNewRegistration,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>¡Inscripción confirmada!</Text>

                <View style={styles.ticket}>
                    <TicketField
                        label="Nombre completo"
                        value={data.fullName}
                    />

                    <TicketField
                        label="Email"
                        value={data.email}
                    />

                    <TicketField
                        label="Edad"
                        value={data.age}
                    />

                    <TicketField
                        label="Tipo de entrada"
                        value={data.entryType}
                    />

                    <TicketField
                        label="Teléfono"
                        value={data.phone || "No ingresado"}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onNewRegistration}
                >
                    <Text style={styles.buttonText}>
                        Volver a inscribir a otra persona
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "transparent",
    },

    card: {
        padding: 24,
        backgroundColor: "rgba(225, 239, 242, 0.50)",
        borderRadius: 20,

        shadowColor: "#224E6B",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#224E6B",
        marginBottom: 28,
        textAlign: "center",
    },

    ticket: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,

        borderWidth: 1,
        borderColor: "#45749C",

        shadowColor: "#224E6B",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },

    button: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#45749C",
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});